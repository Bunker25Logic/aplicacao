import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { CATEGORIES } from "../data/phrases";

// Configure how notifications appear when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Requests permissions for push notifications.
 * Must be called early in the app lifecycle.
 */
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Pensamentos Diários",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#00BCD4",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return false;
  }

  return true;
}

/**
 * Helper to pick a random phrase from all categories
 */
function getRandomPhrase() {
  const allPhrases = [];
  CATEGORIES.forEach((category) => {
    category.phrases.forEach((phrase) => {
      allPhrases.push({
        text: phrase.text,
        author: phrase.author,
        categoryName: category.name,
      });
    });
  });

  const randomIndex = Math.floor(Math.random() * allPhrases.length);
  return allPhrases[randomIndex];
}

/**
 * Schedules the daily notifications.
 * Cancels all previously scheduled ones first to avoid duplicates.
 */
export async function scheduleDailyNotifications() {
  // Clear any existing notifications before scheduling new ones
  await Notifications.cancelAllScheduledNotificationsAsync();

  const morningPhrase = getRandomPhrase();
  const eveningPhrase = getRandomPhrase();

  // Schedule for 6:00 AM
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bom dia! ☀️",
      body: `"${morningPhrase.text}" - ${morningPhrase.author}`,
      data: { category: morningPhrase.categoryName },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 6,
      minute: 0,
    },
  });

  // Schedule for 6:00 PM (18:00)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Boa noite! 🌙",
      body: `"${eveningPhrase.text}" - ${eveningPhrase.author}`,
      data: { category: eveningPhrase.categoryName },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 0,
    },
  });

  console.log("Daily notifications scheduled for 6 AM and 6 PM!");
}

/**
 * Helper strictly for testing: schedules a notification to appear in 5 seconds
 */
export async function scheduleTestNotification() {
  const phrase = getRandomPhrase();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Teste de Notificação 🛠️",
      body: `"${phrase.text}" - ${phrase.author}`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
  console.log("Test notification scheduled for 5 seconds from now.");
}
