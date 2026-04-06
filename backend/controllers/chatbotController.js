const { GoogleGenerativeAI } = require('@google/generative-ai');
const pool = require('../config/db');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const buildSystemPrompt = (shirts) => {
    const catalog = shirts.map(s => {
        let linea = `- ${s.team} | ${s.season} | ${s.tipo || 'N/A'} | ${s.brand} | ${s.price}€`;
        if (s.version) linea += ` | Versión: ${s.version}`;
        if (s.league)  linea += ` | Liga: ${s.league}`;
        return linea;
    }).join('\n');

    return `Eres el asistente oficial de ShirtFinder, una web especializada en camisetas de fútbol retro y actuales.

Tus funciones son:
- Ayudar a encontrar camisetas por equipo, temporada, marca o liga
- Explicar cómo funciona la web: catálogo, filtros, favoritos, foro y perfil de usuario
- Contar curiosidades e historia de equipaciones de fútbol
- Orientar al usuario según la página en la que se encuentra

Reglas importantes:
- Responde SIEMPRE en español
- Sé cercano, claro y conciso
- Si te preguntan algo que no tiene que ver con ShirtFinder, camisetas o fútbol, responde amablemente que solo puedes ayudar con temas relacionados con ShirtFinder
- Puedes usar formato markdown: **negrita** para destacar, listas con - para enumerar, y saltos de línea para organizar
- No inventes camisetas que no estén en el catálogo

Catálogo REAL y COMPLETO de ShirtFinder:

${catalog}

Si preguntan por algo fuera del catálogo, dilo con claridad y sugiere usar los filtros.`;
};

const sendMessage = async (req, res) => {
    const { message, history = [] } = req.body;

    try {
        const [shirts] = await pool.query(
            'SELECT team, season, league, brand, price, tipo, version FROM shirts ORDER BY team ASC LIMIT 150'
        );

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: { parts: [{ text: buildSystemPrompt(shirts) }] }
        });

        const chat = model.startChat({ history });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        const result = await chat.sendMessageStream(message);

        for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) res.write(text);
        }

        res.end();
    } catch (error) {
        console.error('Error Gemini:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message || 'Error desconocido' });
        } else {
            res.end();
        }
    }
};

module.exports = { sendMessage };