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
import { BUNKER, getColors } from '../theme/bunker25logic';
import { useThemeContext } from '../context/ThemeContext';

export default function AboutScreen({ onClose }) {
  const { themeMode } = useThemeContext();
  const colors = getColors(themeMode);

  const openLink = (url) => {
    Linking.openURL(url).catch(() => { });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.base }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Sobre</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoSection}>
          <View style={[styles.logoBox, { backgroundColor: colors.accent }]}>
            <Text style={[styles.logoText, { color: colors.base }]}>B25</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>Frases Diárias</Text>
          <Text style={[styles.version, { color: colors.muted }]}>Versão 1.0.3</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Sobre o App</Text>
          <Text style={[styles.sectionText, { color: colors.muted }]}>
            Frases Diárias é um aplicativo desenvolvido com a identidade visual Bunker25Logic,
            oferecendo uma coleção de frases motivacionais, inspiradoras e reflexivas para
            enriquecer seu dia a dia.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recursos</Text>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.accent} />
            <Text style={[styles.featureText, { color: colors.text }]}>Frases organizadas por categorias</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.accent} />
            <Text style={[styles.featureText, { color: colors.text }]}>Sistema de favoritos</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.accent} />
            <Text style={[styles.featureText, { color: colors.text }]}>Armazenamento offline</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="check-circle" size={20} color={colors.accent} />
            <Text style={[styles.featureText, { color: colors.text }]}>Notificações diárias</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Identidade Visual</Text>
          <Text style={[styles.sectionText, { color: colors.muted }]}>
            Este aplicativo utiliza a identidade visual Bunker25Logic, caracterizada por:
          </Text>
          <View style={styles.brandItem}>
            <View style={[styles.colorBox, { backgroundColor: colors.base, borderColor: colors.border }]} />
            <Text style={[styles.brandText, { color: colors.text }]}>Base ({themeMode})</Text>
          </View>
          <View style={styles.brandItem}>
            <View style={[styles.colorBox, { backgroundColor: colors.accent, borderColor: colors.border }]} />
            <Text style={[styles.brandText, { color: colors.text }]}>Accent</Text>
          </View>
          <View style={styles.brandItem}>
            <View style={[styles.colorBox, { backgroundColor: colors.support, borderColor: colors.border }]} />
            <Text style={[styles.brandText, { color: colors.text }]}>Support</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Desenvolvimento</Text>
          <Text style={[styles.sectionText, { color: colors.muted }]}>
            Desenvolvido com React Native e Expo, utilizando as fontes Orbitron e Oxanium
            para uma experiência visual única e moderna.
          </Text>
        </View>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.muted }]}>© 2026 Bunker25Logic</Text>
          <Text style={[styles.footerText, { color: colors.muted }]}>Todos os direitos reservados</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: BUNKER.fonts.title,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontFamily: BUNKER.fonts.title,
  },
  appName: {
    fontSize: 24,
    fontFamily: BUNKER.fonts.title,
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: BUNKER.fonts.bodyStrong,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
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
  },
  brandText: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.body,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    fontFamily: BUNKER.fonts.body,
    marginBottom: 4,
  },
});
