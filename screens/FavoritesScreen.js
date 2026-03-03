import React, { useMemo } from "react";
import { useThemeContext } from "../context/ThemeContext";
import {
  View,
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
  Modal,
  BackHandler,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppBar from "../components/AppBar";
import { useFavorites } from "../context/FavoritesContext";
import { BUNKER, getColors } from "../theme/bunker25logic";

function getAllPhrasesWithCategory(categories) {
  const result = [];
  categories.forEach((cat) => {
    if (cat.phrases) {
      cat.phrases.forEach((p) => {
        result.push({
          ...p,
          categoryId: cat.id,
          categoryName: cat.name,
          categoryColor: cat.color,
        });
      });
    } else if (cat.subcategories) {
      cat.subcategories.forEach((sub) => {
        if (sub.phrases) {
          sub.phrases.forEach((p) => {
            result.push({
              ...p,
              categoryId: sub.id,
              categoryName: sub.name,
              categoryColor: sub.color || cat.color,
            });
          });
        }
      });
    }
  });
  return result;
}

export default function FavoritesScreen({ categories, onMenuPress }) {
  const { themeMode } = useThemeContext();
  const colors = getColors(themeMode);

  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const [selectedPhrase, setSelectedPhrase] = React.useState(null);

  React.useEffect(() => {
    const backAction = () => {
      if (selectedPhrase !== null) {
        setSelectedPhrase(null);
        return true;
      }
      return false; // laisse o App.js lidar e voltar para a Home
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedPhrase]);

  const sections = useMemo(() => {
    const allPhrases = getAllPhrasesWithCategory(categories);
    const favorites = allPhrases.filter((p) => favoriteIds.includes(p.id));

    const byCategory = {};
    favorites.forEach((p) => {
      if (!byCategory[p.categoryName]) {
        byCategory[p.categoryName] = {
          title: p.categoryName,
          data: [],
          color: p.categoryColor,
        };
      }
      byCategory[p.categoryName].data.push(p);
    });

    return Object.values(byCategory).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }, [categories, favoriteIds]);

  if (favoriteIds.length === 0) {
    return (
      <View style={styles.container}>
        <AppBar
          title="Favoritos"
          onMenuPress={onMenuPress}
          onHeartPress={() => {}}
          favoritesCount={0}
        />
        <View style={styles.empty}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={64}
            color={colors.muted}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>Nenhuma frase favoritada</Text>
          <Text style={styles.emptyText}>
            Toque no coração em qualquer frase para adicioná-la aqui e acessá-la
            offline.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar
        title="Favoritos"
        onMenuPress={onMenuPress}
        onHeartPress={() => {}}
        favoritesCount={favoriteIds.length}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View
            style={[
              styles.sectionHeader,
              { borderLeftColor: section.color || colors.accent },
            ]}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionCount}>
              {section.data.length} frase(s)
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setSelectedPhrase(item)}
            activeOpacity={0.85}
          >
            <Text style={styles.itemText} numberOfLines={2}>
              {item.text}
            </Text>
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={() => toggleFavorite(item)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons name="heart" size={20} color="#EC4899" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!selectedPhrase}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPhrase(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPhrase && (
              <>
                <Text style={styles.modalCategory}>
                  {selectedPhrase.categoryName}
                </Text>
                <Text style={styles.modalText}>{selectedPhrase.text}</Text>
                {selectedPhrase.author ? (
                  <Text style={styles.modalAuthor}>
                    — {selectedPhrase.author}
                  </Text>
                ) : null}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalFavoriteBtn}
                    onPress={() => toggleFavorite(selectedPhrase)}
                  >
                    <MaterialCommunityIcons
                      name="heart"
                      size={24}
                      color="#EC4899"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setSelectedPhrase(null)}
                  >
                    <Text style={styles.modalButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </>
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
    paddingTop: 12,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: BUNKER.colors.accent,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
  },
  sectionCount: {
    fontSize: 12,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: BUNKER.colors.surface2,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
  },
  itemText: {
    flex: 1,
    color: BUNKER.colors.text,
    fontSize: 15,
    fontFamily: BUNKER.fonts.body,
  },
  heartBtn: {
    padding: 4,
    marginLeft: 8,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 20,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    textAlign: "center",
    lineHeight: 22,
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
  },
  modalCategory: {
    color: BUNKER.colors.support,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: BUNKER.fonts.bodyStrong,
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
  },
  modalButtonText: {
    color: BUNKER.colors.base,
    fontSize: 14,
    fontFamily: BUNKER.fonts.bodyStrong,
  },
});
