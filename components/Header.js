import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BUNKER } from '../theme/bunker25logic';

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: BUNKER.colors.text,
    marginBottom: 8,
    fontFamily: BUNKER.fonts.title,
    letterSpacing: 1,
    textShadowColor: BUNKER.colors.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: BUNKER.colors.muted,
    maxWidth: '90%',
    fontFamily: BUNKER.fonts.body,
  },
});
