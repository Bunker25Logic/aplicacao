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
import { BUNKER } from '../theme/bunker25logic';

export default function SideMenu({ visible, onClose, onSettingPress }) {
  const settings = [
    { id: 'theme', label: 'Aparência', icon: 'palette-outline' },
    { id: 'notifications', label: 'Notificações', icon: 'bell-outline' },
    { id: 'about', label: 'Sobre', icon: 'information-outline' },
    { id: 'version', label: 'Versão 1.0', icon: 'tag-outline' },
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
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialCommunityIcons name="close" size={24} color={BUNKER.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {settings.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => {
                  onSettingPress?.(item.id);
                  if (item.id !== 'version') onClose();
                }}
                activeOpacity={0.7}
                disabled={item.id === 'version'}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={BUNKER.colors.accent}
                  style={styles.itemIcon}
                />
                <Text style={styles.itemLabel}>{item.label}</Text>
                {item.id !== 'version' && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={BUNKER.colors.muted}
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
    backgroundColor: BUNKER.colors.surface,
    borderRightWidth: 1,
    borderRightColor: BUNKER.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: BUNKER.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: BUNKER.fonts.title,
    color: BUNKER.colors.text,
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
    color: BUNKER.colors.text,
  },
});
