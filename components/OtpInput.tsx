import { cn } from "@/utils/cn";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

export interface OtpInputRef {
  clear: () => void;
  focus: () => void;
}

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  error?: string;
  autoFocus?: boolean;
}

export const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(
  ({ length = 6, value, onChange, error, autoFocus = true }, ref) => {
    const inputs = useRef<Array<TextInput | null>>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

    const digits = Array.from({ length }, (_, i) => value[i] ?? "");

    useImperativeHandle(ref, () => ({
      clear: () => {
        onChange("");
        inputs.current[0]?.focus();
      },
      focus: () => inputs.current[0]?.focus(),
    }));

    const setDigit = (index: number, digit: string) => {
      const chars = value.split("");
      chars[index] = digit;
      const next = chars.join("").slice(0, length);
      onChange(next);

      if (digit && index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    };

    const handleChangeText = (index: number, text: string) => {
      // Handles pasted multi-character codes as well as single digits.
      const cleaned = text.replace(/[^0-9]/g, "");
      if (cleaned.length > 1) {
        const next = (value.slice(0, index) + cleaned).slice(0, length);
        onChange(next);
        const nextIndex = Math.min(next.length, length - 1);
        inputs.current[nextIndex]?.focus();
        return;
      }
      setDigit(index, cleaned);
    };

    const handleKeyPress = (
      index: number,
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
        inputs.current[index - 1]?.focus();
        setDigit(index - 1, "");
      }
    };

    return (
      <View className="gap-1.5">
        <View className="flex-row justify-between gap-2">
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={digit}
              onChangeText={(text) => handleChangeText(index, text)}
              onKeyPress={(e) => handleKeyPress(index, e)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() =>
                setFocusedIndex((prev) => (prev === index ? null : prev))
              }
              keyboardType="number-pad"
              maxLength={length}
              autoFocus={autoFocus && index === 0}
              className={cn(
                "flex-1 h-14 rounded-xl border bg-surface text-center font-manrope-semibold text-xl text-text",
                error
                  ? "border-danger"
                  : focusedIndex === index
                    ? "border-brand"
                    : "border-border",
              )}
            />
          ))}
        </View>

        {error ? (
          <Text className="font-manrope text-xs text-danger">{error}</Text>
        ) : null}
      </View>
    );
  },
);

OtpInput.displayName = "OtpInput";
