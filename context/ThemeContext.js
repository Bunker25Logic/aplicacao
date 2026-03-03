import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@frases_tema';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState('dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_KEY);
                if (storedTheme) {
                    setThemeMode(storedTheme);
                }
            } catch (e) {
                console.warn('Falha ao carregar tema', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            const newTheme = themeMode === 'dark' ? 'light' : 'dark';
            setThemeMode(newTheme);
            await AsyncStorage.setItem(THEME_KEY, newTheme);
        } catch (e) {
            console.warn('Falha ao salvar tema', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
    return ctx;
}
