import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import {
  DEFAULT_PASSWORD_RULES,
  PasswordChecklist,
} from "@/components/PasswordChecklist";
import Screen from "@/components/ScreenArea";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

interface NewPasswordScreenProps {
  onBack?: () => void;
  /** Called with the new password, before navigating back to sign-in. */
  onResetPassword?: (password: string) => Promise<void> | void;
}

export default function NewPassword({
  onBack,
  onResetPassword,
}: NewPasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (key: keyof FormErrors) => {
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const unmet = DEFAULT_PASSWORD_RULES.find((rule) => !rule.test(password));
    if (unmet) {
      nextErrors.password = unmet.label;
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await onResetPassword?.(password);
      router.replace("/(auth)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 py-6 gap-8"
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={onBack ?? router.back}
            hitSlop={8}
            className="flex-row items-center gap-1 self-start"
          >
            <Text className="font-manrope-semibold text-base text-text">←</Text>
            <Text className="font-manrope-medium text-base text-text">
              Back
            </Text>
          </Pressable>

          <View className="gap-8">
            <View className="gap-2">
              <Text className="font-manrope-extrabold text-3xl text-text">
                Set a new password
              </Text>
              <Text className="font-manrope text-base text-text-muted">
                Make it something you haven&apos;t used before.
              </Text>
            </View>

            {/* Form */}
            <View className="gap-4">
              <Input
                label="New password"
                placeholder="••••••••"
                isPassword
                autoCapitalize="none"
                autoComplete="new-password"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  clearError("password");
                }}
                error={errors.password}
              />

              <PasswordChecklist value={password} />

              <Input
                label="Confirm new password"
                placeholder="••••••••"
                isPassword
                autoCapitalize="none"
                autoComplete="new-password"
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  clearError("confirmPassword");
                }}
                error={errors.confirmPassword}
              />

              <Button
                label="Reset password"
                onPress={handleReset}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
