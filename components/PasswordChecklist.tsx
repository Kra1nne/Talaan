import { cn } from "@/utils/cn";
import React from "react";
import { Text, View } from "react-native";

export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

export const DEFAULT_PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One number", test: (v) => /[0-9]/.test(v) },
];

export interface PasswordChecklistProps {
  value: string;
  rules?: PasswordRule[];
}

export function PasswordChecklist({ value, rules = DEFAULT_PASSWORD_RULES }: PasswordChecklistProps) {
  return (
    <View className="gap-1.5">
      {rules.map((rule) => {
        const met = rule.test(value);
        return (
          <View key={rule.label} className="flex-row items-center gap-2">
            <View
              className={cn(
                "w-4 h-4 rounded-full items-center justify-center",
                met ? "bg-success" : "bg-surface-muted border border-border"
              )}
            >
              {met ? (
                <Text className="text-success-foreground text-[10px] font-manrope-bold">✓</Text>
              ) : null}
            </View>
            <Text className={cn("font-manrope text-xs", met ? "text-text" : "text-text-muted")}>
              {rule.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
