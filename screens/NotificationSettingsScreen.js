import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BUNKER } from '../theme/bunker25logic';

const NOTIFICATION_KEY = '@frases_notifications';
const NOTIFICATION_TIME_KEY = '@frases_notification_time';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationSettingsScreen({ onClose }) {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('09:00');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    loadSettings();
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const loadSettings = async () => {
    try {
      const savedEnabled = await AsyncStorage.getItem(NOTIFICATION_KEY);
      const savedTime = await AsyncStorage.getItem(NOTIFICATION_TIME_KEY);
      if (savedEnabled === 'true') setEnabled(true);
      if (savedTime) setTime(savedTime);
    } catch {}
  };

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      setHasPermission(true);
      return true;
    } else {
      Alert.alert(
        'Permissão Negada',
        'Para receber notificações, é necessário permitir o acesso nas configurações do dispositivo.'
      );
      return false;
    }
  };

  const scheduleNotification = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    const [hours, minutes] = time.split(':').map(Number);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📖 Frase do Dia',
        body: 'Que tal ler uma frase inspiradora hoje?',
        sound: true,
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });
  };

  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const toggleNotifications = async (value) => {
    setEnabled(value);
    await AsyncStorage.setItem(NOTIFICATION_KEY, value.toString());

    if (value) {
      await scheduleNotification();
      Alert.alert('Sucesso', `Notificações ativadas para ${time}`);
    } else {
      await cancelNotifications();
      Alert.alert('Notificações Desativadas', 'Você não receberá mais lembretes diários.');
    }
  };

  const changeTime = async (newTime) => {
    setTime(newTime);
    await AsyncStorage.setItem(NOTIFICATION_TIME_KEY, newTime);
    if (enabled) {
      await scheduleNotification();
      Alert.alert('Horário Atualizado', `Notificações agendadas para ${newTime}`);
    }
  };

  const timeOptions = ['08:00', '09:00', '10:00', '12:00', '18:00', '20:00'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={BUNKER.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notificações</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Text style={styles.switchTitle}>Notificações Diárias</Text>
              <Text style={styles.switchDesc}>
                Receba uma frase inspiradora todos os dias
              </Text>
            </View>
            <Switch
              value={enabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: BUNKER.colors.surface2, true: BUNKER.colors.accent }}
              thumbColor={enabled ? BUNKER.colors.base : BUNKER.colors.muted}
            />
          </View>

          {enabled && (
            <View style={styles.timeSection}>
              <View style={styles.timeRow}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color={BUNKER.colors.accent}
                />
                <Text style={styles.timeLabel}>Horário atual: {time}</Text>
              </View>
              <Text style={styles.timeSubtitle}>Escolha um horário:</Text>
              <View style={styles.timeGrid}>
                {timeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.timeOption,
                      time === option && styles.timeOptionActive,
                    ]}
                    onPress={() => changeTime(option)}
                  >
                    <Text
                      style={[
                        styles.timeOptionText,
                        time === option && styles.timeOptionTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {!hasPermission && (
          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="alert-circle" size={20} color={BUNKER.colors.support} />
            <Text style={styles.infoText}>
              Para ativar as notificações, você precisará permitir o acesso nas configurações do dispositivo.
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information" size={20} color={BUNKER.colors.support} />
          <Text style={styles.infoText}>
            As notificações são enviadas localmente pelo dispositivo. Não é necessária conexão com a internet.
          </Text>
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
  section: {
    marginBottom: 32,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BUNKER.colors.surface2,
    padding: 16,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
    marginBottom: 16,
  },
  switchLabel: {
    flex: 1,
    marginRight: 16,
  },
  switchTitle: {
    fontSize: 16,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
    marginBottom: 4,
  },
  switchDesc: {
    fontSize: 13,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
  },
  timeSection: {
    backgroundColor: BUNKER.colors.surface2,
    padding: 16,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
    marginTop: 16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
    marginLeft: 12,
  },
  timeSubtitle: {
    fontSize: 13,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    marginBottom: 12,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: BUNKER.radius.md,
    backgroundColor: BUNKER.colors.surface,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
    minWidth: 80,
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  timeOptionActive: {
    backgroundColor: BUNKER.colors.accent,
    borderColor: BUNKER.colors.accent,
  },
  timeOptionText: {
    fontSize: 14,
    fontFamily: BUNKER.fonts.bodyStrong,
    color: BUNKER.colors.text,
  },
  timeOptionTextActive: {
    color: BUNKER.colors.base,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: BUNKER.colors.surface,
    padding: 16,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
    borderColor: BUNKER.colors.border,
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    fontFamily: BUNKER.fonts.body,
    color: BUNKER.colors.muted,
    lineHeight: 18,
  },
});
