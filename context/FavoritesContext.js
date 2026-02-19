import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@frases_favoritos';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const loadFavorites = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      if (json) setFavoriteIds(JSON.parse(json));
    } catch {}
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const saveFavorites = async (ids) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch {}
  };

  const toggleFavorite = useCallback((phrase) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(phrase.id)
        ? prev.filter((id) => id !== phrase.id)
        : [...prev, phrase.id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (phraseId) => favoriteIds.includes(phraseId),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite, loadFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
