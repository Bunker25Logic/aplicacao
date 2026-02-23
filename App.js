import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  BackHandler,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import TabBar from "./components/TabBar";
import StorageConsent from "./components/StorageConsent";
import ExitModal from "./components/ExitModal";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import { CATEGORIES } from "./data/phrases";
import * as Font from "expo-font";
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotifications,
} from "./services/notifications";
import { Orbitron_700Bold } from "@expo-google-fonts/orbitron";
import {
  Oxanium_400Regular,
  Oxanium_600SemiBold,
} from "@expo-google-fonts/oxanium";
import { BUNKER } from "./theme/bunker25logic";

const STORAGE_CONSENT_KEY = "@frases_storage_consent";

function MainContent({ fontsReady }) {
  const [activeTab, setActiveTab] = useState("home");
  const [storageConsent, setStorageConsent] = useState(null);
  const [exitModalVisible, setExitModalVisible] = useState(false);

  const { favoriteIds } = useFavorites();

  useEffect(() => {
    const backAction = () => {
      // Se não estiver na home principal da navegação inferior, voltar para ela
      if (activeTab !== "home") {
        setActiveTab("home");
        return true; // prevent default behavior (exit)
      }
      return false; // deixa o filho (HomeScreen) ou o default lidarem com o back
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [activeTab]);

  useEffect(() => {
    const check = async () => {
      try {
        const val = await AsyncStorage.getItem(STORAGE_CONSENT_KEY);
        setStorageConsent(val === "true");
      } catch {
        setStorageConsent(false);
      }
    };
    check();
  }, []);

  const handleStorageAccept = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_CONSENT_KEY, "true");
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
        <StorageConsent
          visible={storageConsent === false}
          onAccept={handleStorageAccept}
        />
      )}

      {activeTab === "home" ? (
        <HomeScreen
          categories={CATEGORIES}
          onSwitchToFavorites={() => setActiveTab("favorites")}
          onRequestExit={() => setExitModalVisible(true)}
        />
      ) : (
        <FavoritesScreen categories={CATEGORIES} onMenuPress={() => {}} />
      )}

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favoriteIds.length}
      />

      <ExitModal
        visible={exitModalVisible}
        onCancel={() => setExitModalVisible(false)}
        onConfirm={() => BackHandler.exitApp()}
      />
    </SafeAreaView>
  );
}

export default function App() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    // Inject Custom Scrollbar CSS for Web only
    if (Platform.OS === "web") {
      const style = document.createElement("style");
      style.textContent = `
        ::-webkit-scrollbar {
          width: 6px;
          background-color: ${BUNKER.colors.base};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${BUNKER.colors.accent};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${BUNKER.colors.support};
        }
      `;
      document.head.appendChild(style);
    }

    const loadFontsAndServices = async () => {
      try {
        await Font.loadAsync({
          Orbitron_700Bold,
          Oxanium_400Regular,
          Oxanium_600SemiBold,
        });

        // Register for push notifications and schedule daily phrases
        if (Platform.OS !== "web") {
          const hasPermission = await registerForPushNotificationsAsync();
          if (hasPermission) {
            await scheduleDailyNotifications();
          }
        }
      } catch (e) {
        console.warn("Error loading fonts or notifications:", e);
      } finally {
        setFontsReady(true);
      }
    };
    loadFontsAndServices();
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
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: BUNKER.colors.muted,
    marginTop: 12,
    fontSize: 16,
  },
});
