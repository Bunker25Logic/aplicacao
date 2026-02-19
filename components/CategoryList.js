import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryCard from './CategoryCard';

export default function CategoryList({ categories, onPressCategory }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          onPress={() => onPressCategory(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
