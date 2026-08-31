import { cn } from "@/utils/cn";
import React, { forwardRef, useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  isPassword?: boolean;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      isPassword = false,
      containerClassName,
      className,
      secureTextEntry,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [hidden, setHidden] = useState(true);

    const secure = isPassword ? hidden : secureTextEntry;

    return (
      <View className={cn("gap-1.5", containerClassName)}>
        {label ? (
          <Text className="font-manrope-medium text-sm text-text">{label}</Text>
        ) : null}

        <View
          className={cn(
            "flex-row items-center rounded-xl border bg-surface px-4",
            error
              ? "border-danger"
              : focused
                ? "border-brand"
                : "border-border",
          )}
        >
          <TextInput
            ref={ref}
            className={cn(
              "flex-1 h-12 font-manrope text-base text-text",
              className,
            )}
            placeholderTextColor="#64746a"
            secureTextEntry={secure}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />

          {isPassword ? (
            <Pressable onPress={() => setHidden((v) => !v)} hitSlop={8}>
              <Text className="font-manrope-medium text-sm text-brand-dark">
                {hidden ? "Show" : "Hide"}
              </Text>
            </Pressable>
          ) : null}
        </View>

        {error ? (
          <Text className="font-manrope text-xs text-danger">{error}</Text>
        ) : hint ? (
          <Text className="font-manrope text-xs text-text-muted">{hint}</Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = "Input";
