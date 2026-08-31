import { Button } from "@/components/Button";
import { OtpInput, OtpInputRef } from "@/components/OtpInput";
import Screen from "@/components/ScreenArea";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const RESEND_SECONDS = 30;
const CODE_LENGTH = 6;

interface OtpScreenProps {
  onBack?: () => void;
  /** Called with the entered code, before navigating to the new-password screen. */
  onVerify?: (code: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
}

export default function Otp({ onBack, onVerify, onResend }: OtpScreenProps) {
  const { destination } = useLocalSearchParams<{ destination?: string }>();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const otpRef = useRef<OtpInputRef>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = async () => {
    if (code.length < CODE_LENGTH) {
      setError("Enter the full code");
      return;
    }
    setError(undefined);
    try {
      setLoading(true);
      await onVerify?.(code);
      router.push({
        pathname: "/(auth)/new-password",
        params: { destination },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    try {
      setResending(true);
      await onResend?.();
      setSecondsLeft(RESEND_SECONDS);
      otpRef.current?.clear();
      setError(undefined);
    } finally {
      setResending(false);
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
                Enter your code
              </Text>
              <Text className="font-manrope text-base text-text-muted">
                We sent a {CODE_LENGTH}-digit code to{" "}
                <Text className="font-manrope-semibold text-text">
                  {destination ?? "your email"}
                </Text>
                .
              </Text>
            </View>

            {/* Form */}
            <View className="gap-6">
              <OtpInput
                ref={otpRef}
                length={CODE_LENGTH}
                value={code}
                onChange={(value) => {
                  setCode(value);
                  if (error) setError(undefined);
                }}
                error={error}
              />

              <Button label="Verify" onPress={handleVerify} loading={loading} />

              <View className="flex-row items-center justify-center gap-1">
                <Text className="font-manrope text-sm text-text-muted">
                  Didn&apos;t get a code?
                </Text>
                <Pressable
                  onPress={handleResend}
                  disabled={secondsLeft > 0 || resending}
                  hitSlop={8}
                >
                  <Text
                    className={
                      secondsLeft > 0
                        ? "font-manrope-semibold text-sm text-text-muted"
                        : "font-manrope-semibold text-sm text-brand-dark"
                    }
                  >
                    {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
