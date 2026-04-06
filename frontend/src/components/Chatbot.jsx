import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useChatbotContext } from '../context/ChatbotContext';
import './Chatbot.css';

const API_URL = import.meta.env.VITE_API_URL;

const PAGE_CONTEXT = {
    '/':          'Estás en la página de inicio de ShirtFinder.',
    '/catalog':   'Estás en el catálogo de camisetas. Puedes usar filtros por equipo, marca, talla, temporada y valoración.',
    '/favorites': 'Estás en tu lista de favoritos.',
    '/foro':      'Estás en el foro de ShirtFinder donde los usuarios debaten sobre camisetas.',
    '/my-account':'Estás en tu perfil de usuario.',
    '/login':     'Estás en la página de inicio de sesión.',
    '/register':  'Estás en la página de registro.',
};

// Convierte markdown básico a HTML
function parseMarkdown(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        .replace(/\n{2,}/g, '</p><p>')
        .replace(/\n/g, '<br/>')
        .replace(/^(.+)$/, '<p>$1</p>');
}

function MessageContent({ text }) {
    return (
        <span
            dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
            className="sf-chatbot__msg-content"
        />
    );
}

function Chatbot({ user }) {
    const location = useLocation();
    const { pageData } = useChatbotContext();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: '¡Hola! Soy el asistente de ShirtFinder. ¿En qué te puedo ayudar?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState({ width: 320, height: 480 });
    const bottomRef = useRef(null);
    const resizing = useRef(null);
    const abortRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const startResize = (e, direction) => {
        e.preventDefault();
        resizing.current = { direction, startX: e.clientX, startY: e.clientY, ...size };
    };

    useEffect(() => {
        const onMove = (e) => {
            if (!resizing.current) return;
            const { direction, startX, startY, width, height } = resizing.current;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            let newWidth = width;
            let newHeight = height;
            if (direction.includes('left'))   newWidth  = Math.min(600, Math.max(260, width - dx));
            if (direction.includes('right'))  newWidth  = Math.min(600, Math.max(260, width + dx));
            if (direction.includes('top'))    newHeight = Math.min(700, Math.max(300, height - dy));
            if (direction.includes('bottom')) newHeight = Math.min(700, Math.max(300, height + dy));
            setSize({ width: newWidth, height: newHeight });
        };
        const onUp = () => { resizing.current = null; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, []);

    const buildContext = () => {
        const path = location.pathname;

        if (pageData?.type === 'shirt') {
            const avg = pageData.averageRating > 0
                ? `${pageData.averageRating.toFixed(1)}/5 (${pageData.totalReviews} valoraciones)`
                : 'sin valoraciones aún';

            let reviewsText = '';
            if (pageData.reviews?.length > 0) {
                reviewsText = ' Opiniones de usuarios: ' +
                    pageData.reviews.map(r => `[${r.rating}/5] "${r.text}"`).join(' | ');
            }

            return `Estás viendo la camiseta del ${pageData.team}, temporada ${pageData.season}, ` +
                `liga ${pageData.league}, marca ${pageData.brand}, colores: ${pageData.color}. ` +
                `Valoración media: ${avg}.` +
                (pageData.description ? ` Descripción: ${pageData.description}.` : '') +
                reviewsText;
        }

        if (pageData?.type === 'post') {
            let repliesText = '';
            if (pageData.replies?.length > 0) {
                repliesText = ' Respuestas: ' +
                    pageData.replies.map(r => `${r.author}: "${r.text}"`).join(' | ');
            }
            return `Estás leyendo el post del foro titulado "${pageData.title}" ` +
                `escrito por ${pageData.author}. Contenido: ${pageData.content}.` +
                repliesText;
        }

        const exact = PAGE_CONTEXT[location.pathname];
        if (exact) return exact;
        if (location.pathname.startsWith('/catalog'))    return PAGE_CONTEXT['/catalog'];
        if (location.pathname.startsWith('/foro/'))      return 'Estás leyendo un post del foro.';
        if (location.pathname.startsWith('/my-account')) return PAGE_CONTEXT['/my-account'];
        return '';
    };

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const ctx = buildContext();
        const fullMessage = ctx ? `[Contexto de página: ${ctx}]\n${text}` : text;

        const updatedMessages = [...messages, { role: 'user', text }];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        const historyToSend = updatedMessages
            .slice(1, -1)
            .map(m => ({ role: m.role, parts: [{ text: m.text }] }));

        const controller = new AbortController();
        abortRef.current = controller;

        // Añadimos el mensaje vacío del bot que iremos rellenando
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        try {
            const res = await fetch(`${API_URL}/api/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: fullMessage, history: historyToSend }),
                signal: controller.signal
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Error del servidor');
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                accumulated += decoder.decode(value, { stream: true });
                // Actualizamos el último mensaje en tiempo real
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'model', text: accumulated };
                    return updated;
                });
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                setMessages(prev => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    updated[updated.length - 1] = {
                        role: 'model',
                        text: last.text ? last.text + ' [cancelado]' : 'Mensaje cancelado.'
                    };
                    return updated;
                });
            } else {
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'model', text: `Error: ${err.message}` };
                    return updated;
                });
            }
        } finally {
            setLoading(false);
            abortRef.current = null;
        }
    };

    const cancelMessage = () => {
        abortRef.current?.abort();
    };

    const clearChat = () => {
        setMessages([{ role: 'model', text: '¡Hola! Soy el asistente de ShirtFinder. ¿En qué te puedo ayudar?' }]);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="sf-chatbot">
            {open && (
                <div
                    className="sf-chatbot__widget"
                    style={{ width: size.width, height: size.height }}
                >
                    <div className="sf-chatbot__resize sf-chatbot__resize--top"         onMouseDown={e => startResize(e, 'top')} />
                    <div className="sf-chatbot__resize sf-chatbot__resize--left"        onMouseDown={e => startResize(e, 'left')} />
                    <div className="sf-chatbot__resize sf-chatbot__resize--top-left"    onMouseDown={e => startResize(e, 'top-left')} />
                    <div className="sf-chatbot__resize sf-chatbot__resize--top-right"   onMouseDown={e => startResize(e, 'top-right')} />
                    <div className="sf-chatbot__resize sf-chatbot__resize--bottom-left" onMouseDown={e => startResize(e, 'bottom-left')} />

                    <div className="sf-chatbot__header">
                        <div className="sf-chatbot__header-title">
                            <span className="sf-chatbot__header-dot" />
                            Asistente ShirtFinder
                        </div>
                        <div className="sf-chatbot__header-actions">
                            <button
                                className="sf-chatbot__icon-btn"
                                onClick={clearChat}
                                aria-label="Nueva conversación"
                                title="Nueva conversación"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
                                    <polyline points="1 4 1 10 7 10" />
                                    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
                                </svg>
                            </button>
                            <button className="sf-chatbot__close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
                        </div>
                    </div>

                    {pageData?.type === 'shirt' && (
                        <div className="sf-chatbot__page-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            Viendo: {pageData.team} {pageData.season}
                        </div>
                    )}

                    {pageData?.type === 'post' && (
                        <div className="sf-chatbot__page-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Post: {pageData.title?.slice(0, 30)}{pageData.title?.length > 30 ? '…' : ''}
                        </div>
                    )}

                    <div className="sf-chatbot__messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`sf-chatbot__msg sf-chatbot__msg--${msg.role}`}>
                                {msg.role === 'model'
                                    ? <MessageContent text={msg.text} />
                                    : msg.text
                                }
                            </div>
                        ))}
                        {loading && messages[messages.length - 1]?.text === '' && (
                            <div className="sf-chatbot__msg sf-chatbot__msg--model sf-chatbot__typing">
                                <span /><span /><span />
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="sf-chatbot__input-area">
                        <input
                            type="text"
                            className="sf-chatbot__input"
                            placeholder="Escribe un mensaje..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            disabled={loading}
                        />
                        {loading ? (
                            <button className="sf-chatbot__send sf-chatbot__send--stop" onClick={cancelMessage} aria-label="Cancelar">
                                <span className="sf-chatbot__stop-icon" />
                            </button>
                        ) : (
                            <button
                                className="sf-chatbot__send"
                                onClick={sendMessage}
                                disabled={!input.trim()}
                                aria-label="Enviar"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            )}

            <button
                className={`sf-chatbot__bubble${open ? ' sf-chatbot__bubble--open' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Abrir asistente"
            >
                {loading ? (
                    <span className="sf-chatbot__bubble-thinking" />
                ) : open ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="26" height="26">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>
        </div>
    );
}

export default Chatbot;