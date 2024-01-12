"use client";
import React, { useContext, useState, useEffect, ReactNode, FC } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import generateTheme from './theme';
import ThemeContext from '@/contexts/theme-context';

enum ThemeType {
    Light = 'light',
    Dark = 'dark',
}

const getInitialTheme = (theme: string) => {
    return theme === ThemeType.Dark ? generateTheme(ThemeType.Dark) : generateTheme(ThemeType.Light);
};

interface ThemeRegistryProps {
    children: ReactNode;
}

const ThemeRegistry: FC<ThemeRegistryProps> = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const [currentTheme, setTheme] = useState(getInitialTheme(theme));

    useEffect(() => {
        setTheme(getInitialTheme(theme));
    }, [theme]);

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <MuiThemeProvider theme={currentTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
};

export default ThemeRegistry;
