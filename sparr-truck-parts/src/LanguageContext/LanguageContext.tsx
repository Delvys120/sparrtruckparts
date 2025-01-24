import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextTypes {
    isSpanish: boolean,
    toggleLanguage: () => void
}

interface LanguageProviderProps {
    children: ReactNode
}


const LanguageContext = createContext<LanguageContextTypes | undefined>(undefined);


export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [isSpanish, setIsSpanish] = useState(false);

    const toggleLanguage = () => setIsSpanish((prev) => !prev);

    return (
        <LanguageContext.Provider value={{isSpanish, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
};


export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error ("useLanguage must be used within LanguageProvider");
    };
    return context;
};