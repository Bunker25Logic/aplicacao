import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER } from '../theme/bunker25logic';

export default function CategoryMenuItem({ category, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.name}>{category.name}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={BUNKER.colors.muted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BUNKER.colors.surface2,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
  },
  name: {
    color: BUNKER.colors.text,
    fontSize: 16,
    fontFamily: BUNKER.fonts.body,
    flex: 1,
  },
});
