import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

export interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  children?: ReactNode;
}

export function Checkbox({
  checked,
  onChange,
  label,
  children,
}: CheckboxProps) {
  return (
    <Pressable
      className="flex-row items-center gap-2"
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      hitSlop={8}
    >
      <View
        className={cn(
          "w-5 h-5 rounded-md border items-center justify-center",
          checked ? "bg-brand border-brand" : "bg-surface border-border",
        )}
      >
        {checked ? (
          <Text className="text-brand-foreground text-xs font-manrope-bold">
            ✓
          </Text>
        ) : null}
      </View>
      {children ? (
        <View>{children}</View>
      ) : label ? (
        <Text className="font-manrope text-sm text-text">{label}</Text>
      ) : null}
    </Pressable>
  );
}
