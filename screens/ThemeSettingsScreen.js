import React, { useState, useEffect } from 'react';
import { useThemeContext } from "../context/ThemeContext";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BUNKER, getColors } from '../theme/bunker25logic';

const THEME_KEY = '@frases_theme';

export default function ThemeSettingsScreen({ onClose }) {
  const { themeMode } = useThemeContext();
  const colors = getColors(themeMode);

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved) setTheme(saved);
    } catch {}
  };

  const saveTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setTheme(newTheme);
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Aparência</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tema</Text>
          <Text style={styles.sectionDesc}>
            Escolha entre tema escuro ou claro
          </Text>

          <TouchableOpacity
            style={[styles.option, theme === 'dark' && styles.optionActive]}
            onPress={() => saveTheme('dark')}
          >
            <View style={styles.optionContent}>
              <MaterialCommunityIcons
                name="weather-night"
                size={24}
                color={theme === 'dark' ? colors.accent : colors.muted}
              />
              <View style={styles.optionText}>
                <Text style={[styles.optionLabel, theme === 'dark' && styles.optionLabelActive]}>
                  Escuro
                </Text>
                <Text style={styles.optionHint}>Tema padrão Bunker25Logic</Text>
              </View>
            </View>
            {theme === 'dark' && (
              <MaterialCommunityIcons name="check" size={24} color={colors.accent} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, theme === 'light' && styles.optionActive]}
            onPress={() => saveTheme('light')}
          >
            <View style={styles.optionContent}>
              <MaterialCommunityIcons
                name="weather-sunny"
                size={24}
                color={theme === 'light' ? colors.accent : colors.muted}
              />
              <View style={styles.optionText}>
                <Text style={[styles.optionLabel, theme === 'light' && styles.optionLabelActive]}>
                  Claro
                </Text>
                <Text style={styles.optionHint}>Tema claro (em desenvolvimento)</Text>
              </View>
            </View>
            {theme === 'light' && (
              <MaterialCommunityIcons name="check" size={24} color={colors.accent} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information" size={20} color={colors.support} />
          <Text style={styles.infoText}>
            O tema claro será implementado em uma atualização futura. Por enquanto, apenas o tema escuro está disponível.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BUNKER.colors.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: BUNKER.colors.border,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: BUNKER.fonts.title,
    color: BUNKER.colors.text,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BUNKER.colors.surface2,
    padding: 16,
    borderRadius: BUNKER.radius.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
  },
  optionActive: {
    borderColor: BUNKER.colors.accent,
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    marginLeft: 16,
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
    marginBottom: 4,
  },
  optionLabelActive: {
    color: BUNKER.colors.accent,
  },
  optionHint: {
    fontSize: 12,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: BUNKER.colors.surface,
    padding: 16,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    lineHeight: 18,
  },
});
