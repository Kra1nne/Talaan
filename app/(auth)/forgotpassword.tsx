import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Screen from "@/components/ScreenArea";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

interface ForgotPasswordScreenProps {
  onBack?: () => void;
  /** Called with the email once validated. Navigate to the OTP screen on success. */
  onSendCode?: (email: string) => Promise<void> | void;
}

export default function ForgotPasswordScreen({
  onBack,
  onSendCode,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError("Enter your email address");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError(undefined);
    try {
      setLoading(true);
      await onSendCode?.(email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 py-6 gap-8"
          keyboardShouldPersistTaps="handled"
        >
          <BackButton onPress={onBack ?? (() => router.push("/(auth)"))} />

          <View className="gap-8">
            {/* Header */}
            <View className="gap-2">
              <Text className="font-manrope-extrabold text-3xl text-text">
                Forgot password?
              </Text>
              <Text className="font-manrope text-base text-text-muted">
                Enter the email linked to your account and we'll send you a code
                to reset your password.
              </Text>
            </View>

            {/* Form */}
            <View className="gap-4">
              <Input
                label="Email"
                placeholder="you@example.com"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  if (error) setError(undefined);
                }}
                error={error}
              />

              <Button
                label="Send code"
                onPress={handleSendCode}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
