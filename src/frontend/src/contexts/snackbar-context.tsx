"use client";
import React, { createContext, useContext, useState } from 'react';
import { SnackbarComponent } from '../components/Snackbar';

interface SnackbarContextType {
    showSnackbar: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
}

interface SnackbarProviderProps {
    children: React.ReactNode;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'info' | 'warning' | 'error'
    });

    const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error' = 'success') => {
        setSnackbarState({ open: true, message, severity });
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <SnackbarComponent snackbarState={snackbarState} setSnackbarState={setSnackbarState} />
        </SnackbarContext.Provider>
    );
};