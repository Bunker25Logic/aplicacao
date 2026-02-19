import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER } from '../theme/bunker25logic';

export default function TabBar({ activeTab, onTabChange, favoritesCount }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && styles.tabActive]}
        onPress={() => onTabChange('home')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="home"
          size={24}
          color={activeTab === 'home' ? BUNKER.colors.accent : BUNKER.colors.muted}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'home' && styles.tabLabelActive,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'favorites' && styles.tabActive]}
        onPress={() => onTabChange('favorites')}
        activeOpacity={0.8}
      >
        <View>
          <MaterialCommunityIcons
            name={favoritesCount > 0 ? 'heart' : 'heart-outline'}
            size={24}
            color={activeTab === 'favorites' ? BUNKER.colors.accent : BUNKER.colors.muted}
          />
          {favoritesCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'favorites' && styles.tabLabelActive,
          ]}
        >
          Favoritos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BUNKER.colors.surface,
    borderTopWidth: 1,
    borderTopColor: BUNKER.colors.border,
    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {},
  tabLabel: {
    fontSize: 12,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    marginTop: 4,
  },
  tabLabelActive: {
    color: BUNKER.colors.accent,
    fontFamily: BUNKER.fonts.bodyStrong,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#EC4899',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: BUNKER.fonts.bodyStrong,
  },
});
