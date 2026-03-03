import React from 'react';
import { useThemeContext } from "../context/ThemeContext";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER, getColors } from '../theme/bunker25logic';

export default function AppBar({
  title,
  onMenuPress,
  onHeartPress,
  onBackPress,
  showBack = false,
  favoritesCount = 0,
}) {
  const { themeMode } = useThemeContext();
  const colors = getColors(themeMode);

  const content = (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={showBack ? onBackPress : onMenuPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={showBack ? 'arrow-left' : 'menu'}
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={onHeartPress}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={favoritesCount > 0 ? 'heart' : 'heart-outline'}
          size={24}
          color={favoritesCount > 0 ? '#EC4899' : '#FFF'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.base, colors.support]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {content}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: BUNKER.colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: '#FFF',
    fontSize: 18,
    fontFamily: BUNKER.fonts.bodyStrong,
    textAlign: 'center',
  },
});
