import { createContext, useContext, useState } from 'react';

const ChatbotContext = createContext();

export function ChatbotProvider({ children }) {
    const [pageData, setPageData] = useState(null);
    return (
        <ChatbotContext.Provider value={{ pageData, setPageData }}>
            {children}
        </ChatbotContext.Provider>
    );
}

export const useChatbotContext = () => useContext(ChatbotContext);