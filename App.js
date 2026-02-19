import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import TabBar from './components/TabBar';
import StorageConsent from './components/StorageConsent';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { CATEGORIES } from './data/phrases';
import * as Font from 'expo-font';
import {
  Orbitron_700Bold,
} from '@expo-google-fonts/orbitron';
import {
  Oxanium_400Regular,
  Oxanium_600SemiBold,
} from '@expo-google-fonts/oxanium';
import { BUNKER } from './theme/bunker25logic';

const STORAGE_CONSENT_KEY = '@frases_storage_consent';

function MainContent({ fontsReady }) {
  const [activeTab, setActiveTab] = useState('home');
  const [storageConsent, setStorageConsent] = useState(null);

  const { favoriteIds } = useFavorites();

  useEffect(() => {
    const check = async () => {
      try {
        const val = await AsyncStorage.getItem(STORAGE_CONSENT_KEY);
        setStorageConsent(val === 'true');
      } catch {
        setStorageConsent(false);
      }
    };
    check();
  }, []);

  const handleStorageAccept = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_CONSENT_KEY, 'true');
      setStorageConsent(true);
    } catch {}
  };

  if (!fontsReady) {
    return (
      <View style={[styles.safe, styles.loading]}>
        <ActivityIndicator size="large" color={BUNKER.colors.accent} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {storageConsent === false && (
        <StorageConsent visible={storageConsent === false} onAccept={handleStorageAccept} />
      )}

      {activeTab === 'home' ? (
        <HomeScreen
          categories={CATEGORIES}
          onSwitchToFavorites={() => setActiveTab('favorites')}
        />
      ) : (
        <FavoritesScreen
          categories={CATEGORIES}
          onMenuPress={() => {}}
        />
      )}

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favoriteIds.length}
      />
    </SafeAreaView>
  );
}

export default function App() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Orbitron_700Bold,
          Oxanium_400Regular,
          Oxanium_600SemiBold,
        });
      } catch {
      } finally {
        setFontsReady(true);
      }
    };
    loadFonts();
  }, []);

  return (
    <FavoritesProvider>
      <MainContent fontsReady={fontsReady} />
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BUNKER.colors.base,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: BUNKER.colors.muted,
    marginTop: 12,
    fontSize: 16,
  },
});
