import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER } from '../theme/bunker25logic';

export default function AboutScreen({ onClose }) {
  const openLink = (url) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={BUNKER.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Sobre</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>B25</Text>
          </View>
          <Text style={styles.appName}>Frases Diárias</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>
          <Text style={styles.sectionText}>
            Frases Diárias é um aplicativo desenvolvido com a identidade visual Bunker25Logic,
            oferecendo uma coleção de frases motivacionais, inspiradoras e reflexivas para
            enriquecer seu dia a dia.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos</Text>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={BUNKER.colors.accent} />
            <Text style={styles.featureText}>Frases organizadas por categorias</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={BUNKER.colors.accent} />
            <Text style={styles.featureText}>Sistema de favoritos</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={BUNKER.colors.accent} />
            <Text style={styles.featureText}>Armazenamento offline</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={BUNKER.colors.accent} />
            <Text style={styles.featureText}>Notificações diárias</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identidade Visual</Text>
          <Text style={styles.sectionText}>
            Este aplicativo utiliza a identidade visual Bunker25Logic, caracterizada por:
          </Text>
          <View style={styles.brandItem}>
            <View style={[styles.colorBox, { backgroundColor: BUNKER.colors.base }]} />
            <Text style={styles.brandText}>Deep Purple Base</Text>
          </View>
          <View style={styles.brandItem}>
            <View style={[styles.colorBox, { backgroundColor: BUNKER.colors.accent }]} />
            <Text style={styles.brandText}>Neon Green Accent</Text>
          </View>
          <View style={styles.brandItem}>
            <View style={[styles.colorBox, { backgroundColor: BUNKER.colors.support }]} />
            <Text style={styles.brandText}>Cobalt Blue Support</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desenvolvimento</Text>
          <Text style={styles.sectionText}>
            Desenvolvido com React Native e Expo, utilizando as fontes Orbitron e Oxanium
            para uma experiência visual única e moderna.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Bunker25Logic</Text>
          <Text style={styles.footerText}>Todos os direitos reservados</Text>
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
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: BUNKER.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontFamily: BUNKER.fonts.title,
    color: BUNKER.colors.base,
  },
  appName: {
    fontSize: 24,
    fontFamily: BUNKER.fonts.title,
    color: BUNKER.colors.text,
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    lineHeight: 22,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.text,
  },
  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
  },
  brandText: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.text,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: BUNKER.colors.border,
  },
  footerText: {
    fontSize: 12,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    marginBottom: 4,
  },
});
