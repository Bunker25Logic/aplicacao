import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { BUNKER } from "../theme/bunker25logic";

export default function ExitModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Sair do Aplicativo?</Text>
          <Text style={styles.message}>
            Você deseja realmente fechar as Frases da Vida?
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: BUNKER.colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: BUNKER.colors.surface,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
    shadowColor: BUNKER.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontFamily: BUNKER.fonts.title,
    fontSize: 20,
    color: BUNKER.colors.text,
    marginBottom: 8,
  },
  message: {
    fontFamily: BUNKER.fonts.body,
    fontSize: 16,
    color: BUNKER.colors.muted,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: BUNKER.radius.pill,
    backgroundColor: BUNKER.colors.surface2,
    borderWidth: 1,
    borderColor: BUNKER.colors.borderStrong,
  },
  cancelText: {
    fontFamily: BUNKER.fonts.bodyStrong,
    fontSize: 14,
    color: BUNKER.colors.text,
  },
  confirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: BUNKER.radius.pill,
    backgroundColor: BUNKER.colors.accent,
  },
  confirmText: {
    fontFamily: BUNKER.fonts.bodyStrong,
    fontSize: 14,
    color: BUNKER.colors.base,
  },
});
