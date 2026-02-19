import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryCard({ category, onPress }) {
  const { name, color, description } = category;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.name}>{name}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 100,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#E5E7EB',
    fontSize: 12,
  },
});
