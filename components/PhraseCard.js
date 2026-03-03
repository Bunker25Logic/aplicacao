import React from 'react';
import { useThemeContext } from "../context/ThemeContext";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER, getColors } from '../theme/bunker25logic';

const MAX_LINES = 2;

export default function PhraseCard({
  phrase,
  color,
  isFavorite,
  onPress,
  onFavoritePress,
}) {
  const { themeMode } = useThemeContext();
  const colors = getColors(themeMode);

  return (
    <TouchableOpacity
      style={[styles.card, color && { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.text} numberOfLines={MAX_LINES}>
        {phrase.text}
      </Text>
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={(e) => {
          e?.stopPropagation?.();
          onFavoritePress?.(phrase);
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color={isFavorite ? '#EC4899' : colors.muted}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: BUNKER.colors.surface2,
    borderRadius: BUNKER.radius.md,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
    borderLeftWidth: 4,
    borderLeftColor: BUNKER.colors.accent,
  },
  text: {
    flex: 1,
    color: BUNKER.colors.text,
    fontSize: 15,
    fontFamily: BUNKER.fonts.body,
    lineHeight: 22,
  },
  heartBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
