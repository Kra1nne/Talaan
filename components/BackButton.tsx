import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

export interface BackButtonProps extends PressableProps {
  label?: string;
}

export function BackButton({ label = "Back", ...props }: BackButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      className="flex-row items-center gap-1 self-start"
      {...props}
    >
      <Text className="font-manrope-semibold text-base text-text">←</Text>
      <Text className="font-manrope-medium text-base text-text">{label}</Text>
    </Pressable>
  );
}
