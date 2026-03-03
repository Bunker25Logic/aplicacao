import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER, getColors } from '../theme/bunker25logic';
import { useThemeContext } from '../context/ThemeContext';

export default function SideMenu({ visible, onClose, onSettingPress }) {
  const { themeMode, toggleTheme } = useThemeContext();
  const colors = getColors(themeMode);

  const settings = [
    {
      id: 'theme',
      label: themeMode === 'dark' ? 'Modo Claro' : 'Modo Escuro',
      icon: themeMode === 'dark' ? 'weather-sunny' : 'weather-night'
    },
    { id: 'notifications', label: 'Notificações', icon: 'bell-outline' },
    { id: 'about', label: 'Sobre', icon: 'information-outline' },
    { id: 'version', label: 'Versão 1.0.3', icon: 'tag-outline' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.drawer, { backgroundColor: colors.surface, borderRightColor: colors.border }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {settings.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => {
                  if (item.id === 'theme') {
                    toggleTheme();
                    return;
                  }
                  onSettingPress?.(item.id);
                  if (item.id !== 'version') onClose();
                }}
                activeOpacity={0.7}
                disabled={item.id === 'version'}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={colors.accent}
                  style={styles.itemIcon}
                />
                <Text style={[styles.itemLabel, { color: colors.text }]}>{item.label}</Text>
                {item.id !== 'version' && item.id !== 'theme' && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  overlayTouch: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: 280,
    borderRightWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: BUNKER.fonts.title,
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: BUNKER.radius.md,
  },
  itemIcon: {
    marginRight: 14,
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: BUNKER.fonts.body,
  },
});
