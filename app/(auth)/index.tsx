import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input";
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

interface SignInScreenProps {
  onSignIn?: (
    email: string,
    password: string,
    remember: boolean,
  ) => Promise<void> | void;
  onForgotPassword?: () => void;
  onSignUpPress?: () => void;
  onGooglePress?: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignIn({
  onSignIn,
  onForgotPassword,
  onSignUpPress,
  onGooglePress,
}: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Enter your email address";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Enter your password";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await onSignIn?.(email, password, remember);
      router.push("/home");
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
          contentContainerClassName="flex-grow px-6 py-10 justify-center gap-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-2">
            <Text className="font-manrope-extrabold text-3xl text-text">
              Welcome back
            </Text>
            <Text className="font-manrope text-base text-text-muted">
              Sign in to pick up right where you left off.
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
              onChangeText={(value) => {
                setEmail(value);
                if (errors.email)
                  setErrors((e) => ({ ...e, email: undefined }));
              }}
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              isPassword
              autoCapitalize="none"
              autoComplete="password"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                if (errors.password)
                  setErrors((e) => ({ ...e, password: undefined }));
              }}
              error={errors.password}
            />

            <View className="flex-row items-center justify-between">
              <Checkbox
                checked={remember}
                onChange={setRemember}
                label="Remember me"
              />
              <Pressable onPress={onForgotPassword} hitSlop={8}>
                <Text className="font-manrope-medium text-sm text-brand-dark">
                  Forgot password?
                </Text>
              </Pressable>
            </View>

            <Button label="Sign in" onPress={handleSignIn} loading={loading} />
          </View>

          <Divider label="or continue with" />

          <View className="gap-3">
            <Button
              label="Continue with Google"
              variant="secondary"
              onPress={onGooglePress}
            />
          </View>

          <View className="flex-row justify-center gap-1">
            <Text className="font-manrope text-sm text-text-muted">
              Don't have an account?
            </Text>
            <Pressable onPress={onSignUpPress} hitSlop={8}>
              <Text className="font-manrope-semibold text-sm text-brand-dark">
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
