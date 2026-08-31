import React from "react";
import { Text, View } from "react-native";

export interface DividerProps {
  label?: string;
}

export function Divider({ label = "or" }: DividerProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1 h-px bg-border" />
      <Text className="font-manrope-medium text-xs text-text-muted uppercase">{label}</Text>
      <View className="flex-1 h-px bg-border" />
    </View>
  );
}
