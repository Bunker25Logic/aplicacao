import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BUNKER } from '../theme/bunker25logic';

export default function StorageConsent({ visible, onAccept }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onAccept}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons
              name="cloud-download-outline"
              size={48}
              color={BUNKER.colors.accent}
            />
          </View>
          <Text style={styles.title}>Uso offline</Text>
          <Text style={styles.text}>
            Este app funciona 100% offline. As frases já vêm incluídas e seus
            favoritos são salvos no dispositivo para você acessá-los mesmo sem
            internet.
          </Text>
          <Text style={styles.subtext}>
            Seus dados ficam apenas no seu aparelho, com segurança e privacidade.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onAccept}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Entendi, continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: BUNKER.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: BUNKER.colors.surface,
    borderRadius: BUNKER.radius.xl,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: BUNKER.colors.borderStrong,
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: BUNKER.fonts.title,
    color: BUNKER.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 15,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  subtext: {
    fontSize: 13,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: BUNKER.colors.accent,
    paddingVertical: 14,
    borderRadius: BUNKER.radius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: BUNKER.colors.base,
    fontSize: 16,
    fontFamily: BUNKER.fonts.bodyStrong,
  },
});
