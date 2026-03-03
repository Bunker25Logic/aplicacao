import React, { useEffect, useRef } from "react";
import { useThemeContext } from "../context/ThemeContext";
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Easing,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BUNKER, getColors } from "../theme/bunker25logic";

export default function CategoryMenuItem({ category, onPress }) {
  const { themeMode } = useThemeContext();
  const colors = getColors(themeMode);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  const shakeValueX = useRef(new Animated.Value(0)).current;
  const shakeValueY = useRef(new Animated.Value(0)).current;

  // Infinite Glitch Animation
  useEffect(() => {
    const glitchAnimX = Animated.sequence([
      Animated.timing(shakeValueX, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValueX, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValueX, {
        toValue: 2,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValueX, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.delay(Math.random() * 2000 + 1000), // Random pause between glitches
    ]);

    const glitchAnimY = Animated.sequence([
      Animated.timing(shakeValueY, {
        toValue: 1,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValueY, {
        toValue: -1,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(shakeValueY, {
        toValue: 0,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.delay(Math.random() * 2000 + 1000),
    ]);

    const loopX = Animated.loop(glitchAnimX);
    const loopY = Animated.loop(glitchAnimY);

    loopX.start();
    loopY.start();

    return () => {
      loopX.stop();
      loopY.stop();
    };
  }, [shakeValueX, shakeValueY]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(glowValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false, // Color interpolation doesn't support native driver well on all setups
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const transformStyle = {
    transform: [
      { scale: scaleValue },
      { translateX: shakeValueX },
      { translateY: shakeValueY },
    ],
    marginHorizontal: 20,
    marginBottom: 10,
  };

  const colorStyle = {
    borderColor: glowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        colors.border,
        category.color || colors.accent,
      ],
    }),
    shadowColor: category.color || colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    }),
    shadowRadius: glowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    }),
    elevation: 3, // Fixed elevation instead of animated to prevent Android crash
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={transformStyle}>
        <Animated.View style={[styles.card, colorStyle]}>
          <Text
            style={[
              styles.name,
              { color: category.color || colors.text },
            ]}
          >
            {category.name}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color={colors.muted}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BUNKER.colors.surface2,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: BUNKER.radius.md,
    borderWidth: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: BUNKER.fonts.bodyStrong,
    flex: 1,
    letterSpacing: 0.5,
  },
});
