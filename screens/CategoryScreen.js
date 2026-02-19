import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import PhraseCard from '../components/PhraseCard';

export default function CategoryScreen({ category, onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{category.name}</Text>
      </View>

      <Header
        title={category.name}
        subtitle={category.description || 'Frases dessa categoria'}
      />

      <FlatList
        data={category.phrases}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <PhraseCard phrase={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#0F172A',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
    marginRight: 8,
  },
  backText: {
    color: '#E5E7EB',
    fontSize: 14,
  },
  topBarTitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 24,
  },
});
