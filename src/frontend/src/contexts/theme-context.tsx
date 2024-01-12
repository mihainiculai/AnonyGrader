"use client";
import React, { useEffect, ReactNode } from 'react';
import Cookies from "js-cookie";

const ThemeContext = React.createContext({
    theme: "light",
    toggleTheme: () => { },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = React.useState<string>('light');

    useEffect(() => {
        const savedTheme = Cookies.get('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        Cookies.set('theme', newTheme);
        setTheme(newTheme);
    };

    useEffect(() => {
        const cookieTheme = Cookies.get('theme');
        if (cookieTheme === 'light' || cookieTheme === 'dark') {
            setTheme(cookieTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export default ThemeContext;