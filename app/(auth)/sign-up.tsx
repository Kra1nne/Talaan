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

interface SignUpScreenProps {
  onSignUp?: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void> | void;
  onSignInPress?: () => void;
  onGooglePress?: () => void;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function SignUp({
  onSignUp,
  onSignInPress,
  onGooglePress,
  onTermsPress,
  onPrivacyPress,
}: SignUpScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (key: keyof FormErrors) => {
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Enter your full name";
    if (!email.trim()) {
      nextErrors.email = "Enter your email address";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Create a password";
    } else if (password.length < 8) {
      nextErrors.password = "Use at least 8 characters";
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords don't match";
    }
    if (!agreed) nextErrors.terms = "You need to accept the terms to continue";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await onSignUp?.({ name, email, password });
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
          contentContainerClassName="flex-grow px-6 py-10 gap-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-2">
            <Text className="font-manrope-extrabold text-3xl text-text">
              Create your account
            </Text>
            <Text className="font-manrope text-base text-text-muted">
              It only takes a minute to get started.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            <Input
              label="Full name"
              placeholder="Jane Cooper"
              autoCapitalize="words"
              autoComplete="name"
              value={name}
              onChangeText={(value) => {
                setName(value);
                clearError("name");
              }}
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                clearError("email");
              }}
              error={errors.email}
            />

            <Input
              label="Password"
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
              hint={!errors.password ? "Use at least 8 characters" : undefined}
            />

            <Input
              label="Confirm password"
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

            <View className="gap-1.5">
              <Checkbox
                checked={agreed}
                onChange={(value) => {
                  setAgreed(value);
                  clearError("terms");
                }}
              >
                <Text className="font-manrope text-sm text-text">
                  I agree to the{" "}
                </Text>
                <Pressable onPress={onTermsPress} hitSlop={4}>
                  <Text className="font-manrope-semibold text-sm text-brand-dark">
                    Terms
                  </Text>
                </Pressable>
                <Text className="font-manrope text-sm text-text"> and </Text>
                <Pressable onPress={onPrivacyPress} hitSlop={4}>
                  <Text className="font-manrope-semibold text-sm text-brand-dark">
                    Privacy Policy
                  </Text>
                </Pressable>
              </Checkbox>
              {errors.terms ? (
                <Text className="font-manrope text-xs text-danger ml-7">
                  {errors.terms}
                </Text>
              ) : null}
            </View>

            <Button
              label="Create account"
              onPress={handleSignUp}
              loading={loading}
            />
          </View>

          <Divider label="or sign up with" />

          <View className="gap-3">
            <Button
              label="Continue with Google"
              variant="secondary"
              onPress={onGooglePress}
            />
          </View>

          <View className="flex-row justify-center gap-1">
            <Text className="font-manrope text-sm text-text-muted">
              Already have an account?
            </Text>
            <Pressable onPress={onSignInPress} hitSlop={8}>
              <Text className="font-manrope-semibold text-sm text-brand-dark">
                Sign in
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
