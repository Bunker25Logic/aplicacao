import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import AppBar from "../components/AppBar";
import CategoryMenuItem from "../components/CategoryMenuItem";
import PhraseCard from "../components/PhraseCard";
import SideMenu from "../components/SideMenu";
import ThemeSettingsScreen from "./ThemeSettingsScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import AboutScreen from "./AboutScreen";
import { BUNKER } from "../theme/bunker25logic";

const FAVORITES_KEY = "@frases_favoritos";

function getAllPhrasesWithCategory(categories) {
  const result = [];
  categories.forEach((cat) => {
    cat.phrases.forEach((p) => {
      result.push({
        ...p,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryColor: cat.color,
      });
    });
  });
  return result;
}

export default function HomeScreen({ categories, onRequestExit }) {
  const [screen, setScreen] = useState("home");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [settingsScreen, setSettingsScreen] = useState(null); // 'theme' | 'notifications' | 'about' | null

  const { favoriteIds, toggleFavorite } = useFavorites();

  const selectedCategory =
    categories.find((c) => c.id === selectedCategoryId) ?? null;
  const phrases = selectedCategory?.phrases ?? [];

  useEffect(() => {
    const backAction = () => {
      // 1. Fechar modals soltos
      if (settingsScreen !== null) {
        setSettingsScreen(null);
        return true;
      }
      if (favoritesOpen) {
        setFavoritesOpen(false);
        return true;
      }
      if (menuOpen) {
        setMenuOpen(false);
        return true;
      }
      if (selectedPhrase !== null) {
        setSelectedPhrase(null);
        return true;
      }
      // 2. Fechar categoria e voltar para listar categorias
      if (screen === "category") {
        setScreen("home");
        setSelectedCategoryId(null);
        return true;
      }
      // 3. Se estiver na home base, exibir modal de saída do App.js
      if (onRequestExit) {
        onRequestExit();
      }
      return true; // prevent exit from react-native automatically
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [
    settingsScreen,
    favoritesOpen,
    menuOpen,
    selectedPhrase,
    screen,
    onRequestExit,
  ]);

  const handleSelectCategory = (categoryId) => {
    // Slight delay so the unmount doesn't interrupt the tap animation (prevents Android crash)
    setTimeout(() => {
      setSelectedCategoryId(categoryId);
      setScreen("category");
    }, 150);
  };

  const handleBack = () => {
    setScreen("home");
    setSelectedCategoryId(null);
  };

  const handleOpenPhrase = (phrase) => {
    setSelectedPhrase(phrase);
  };

  const handleCloseModal = () => {
    setSelectedPhrase(null);
  };

  const handleSettingPress = (id) => {
    if (id === "theme") {
      setSettingsScreen("theme");
    } else if (id === "notifications") {
      setSettingsScreen("notifications");
    } else if (id === "about") {
      setSettingsScreen("about");
    }
  };

  const allPhrasesWithCategory = getAllPhrasesWithCategory(categories);
  const favoritePhrases = allPhrasesWithCategory.filter((p) =>
    favoriteIds.includes(p.id),
  );

  if (settingsScreen === "theme") {
    return <ThemeSettingsScreen onClose={() => setSettingsScreen(null)} />;
  }

  if (settingsScreen === "notifications") {
    return (
      <NotificationSettingsScreen onClose={() => setSettingsScreen(null)} />
    );
  }

  if (settingsScreen === "about") {
    return <AboutScreen onClose={() => setSettingsScreen(null)} />;
  }

  return (
    <View style={styles.container}>
      <AppBar
        title={screen === "home" ? "Home" : (selectedCategory?.name ?? "")}
        onMenuPress={() => setMenuOpen(true)}
        onHeartPress={() => setFavoritesOpen(true)}
        onBackPress={handleBack}
        showBack={screen === "category"}
        favoritesCount={favoriteIds.length}
      />

      {screen === "home" ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CategoryMenuItem
              category={item}
              onPress={() => handleSelectCategory(item.id)}
            />
          )}
        />
      ) : (
        <FlatList
          key={selectedCategory?.id}
          data={phrases}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <PhraseCard
              phrase={item}
              color={selectedCategory?.color}
              isFavorite={favoriteIds.includes(item.id)}
              onPress={() => handleOpenPhrase(item)}
              onFavoritePress={toggleFavorite}
            />
          )}
        />
      )}

      <Modal
        visible={!!selectedPhrase}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCategory ? (
              <Text style={styles.modalCategory}>{selectedCategory.name}</Text>
            ) : null}
            <Text style={styles.modalText}>{selectedPhrase?.text}</Text>
            {selectedPhrase?.author ? (
              <Text style={styles.modalAuthor}>— {selectedPhrase.author}</Text>
            ) : null}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalFavoriteBtn}
                onPress={() => {
                  toggleFavorite(selectedPhrase);
                }}
              >
                <MaterialCommunityIcons
                  name={
                    favoriteIds.includes(selectedPhrase?.id)
                      ? "heart"
                      : "heart-outline"
                  }
                  size={24}
                  color={
                    favoriteIds.includes(selectedPhrase?.id)
                      ? "#EC4899"
                      : BUNKER.colors.muted
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCloseModal}
                activeOpacity={0.85}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSettingPress={handleSettingPress}
      />

      <Modal
        visible={favoritesOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFavoritesOpen(false)}
      >
        <View style={styles.favOverlay}>
          <View style={styles.favContent}>
            <View style={styles.favHeader}>
              <Text style={styles.favTitle}>Favoritos</Text>
              <TouchableOpacity onPress={() => setFavoritesOpen(false)}>
                <Text style={styles.favClose}>Fechar</Text>
              </TouchableOpacity>
            </View>
            {favoritePhrases.length === 0 ? (
              <View style={styles.favEmpty}>
                <Text style={styles.favEmptyText}>
                  Nenhuma frase favoritada ainda.
                </Text>
                <Text style={styles.favEmptyHint}>
                  Toque no coração para adicionar.
                </Text>
              </View>
            ) : (
              <FlatList
                data={favoritePhrases}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.favList}
                renderItem={({ item }) => (
                  <View style={styles.favItem}>
                    <TouchableOpacity
                      style={styles.favItemTouch}
                      onPress={() => {
                        setFavoritesOpen(false);
                        setSelectedCategoryId(item.categoryId);
                        setScreen("category");
                        setTimeout(() => handleOpenPhrase(item), 300);
                      }}
                    >
                      <Text style={styles.favItemText} numberOfLines={2}>
                        {item.text}
                      </Text>
                      <Text style={styles.favItemCat}>{item.categoryName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.favItemHeart}
                      onPress={() => toggleFavorite(item)}
                    >
                      <MaterialCommunityIcons
                        name="heart"
                        size={20}
                        color="#EC4899"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BUNKER.colors.base,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: BUNKER.colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: BUNKER.colors.surface,
    borderRadius: 20,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: BUNKER.colors.borderStrong,
    shadowColor: BUNKER.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 3,
  },
  modalCategory: {
    color: BUNKER.colors.support,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: BUNKER.fonts.bodyStrong,
    letterSpacing: 0.5,
  },
  modalText: {
    color: BUNKER.colors.text,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: BUNKER.fonts.body,
    lineHeight: 26,
  },
  modalAuthor: {
    color: BUNKER.colors.muted,
    fontSize: 14,
    textAlign: "right",
    marginBottom: 16,
    fontFamily: BUNKER.fonts.body,
  },
  modalActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalFavoriteBtn: {
    padding: 8,
    marginRight: 12,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BUNKER.radius.pill,
    backgroundColor: BUNKER.colors.accent,
    shadowColor: BUNKER.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 2,
  },
  modalButtonText: {
    color: BUNKER.colors.base,
    fontSize: 14,
    fontFamily: BUNKER.fonts.bodyStrong,
  },
  favOverlay: {
    flex: 1,
    backgroundColor: BUNKER.colors.overlay,
    justifyContent: "flex-end",
  },
  favContent: {
    backgroundColor: BUNKER.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "70%",
    paddingBottom: 24,
  },
  favHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: BUNKER.colors.border,
  },
  favTitle: {
    fontSize: 20,
    fontFamily: BUNKER.fonts.title,
    color: BUNKER.colors.text,
  },
  favClose: {
    fontSize: 16,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.accent,
  },
  favEmpty: {
    padding: 40,
    alignItems: "center",
  },
  favEmptyText: {
    color: BUNKER.colors.muted,
    fontSize: 16,
    fontFamily: BUNKER.fonts.body,
    marginBottom: 8,
  },
  favEmptyHint: {
    color: BUNKER.colors.text,
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
  },
  favList: {
    padding: 20,
  },
  favItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: BUNKER.colors.surface2,
    padding: 16,
    borderRadius: BUNKER.radius.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
  },
  favItemTouch: {
    flex: 1,
  },
  favItemHeart: {
    padding: 4,
  },
  favItemText: {
    color: BUNKER.colors.text,
    fontSize: 15,
    fontFamily: BUNKER.fonts.body,
    marginBottom: 6,
  },
  favItemCat: {
    color: BUNKER.colors.support,
    fontSize: 12,
    fontFamily: BUNKER.fonts.body,
  },
});
