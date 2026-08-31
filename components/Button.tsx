import { cn } from "@/utils/cn";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<
  ButtonVariant,
  { container: string; text: string; spinnerColor: string }
> = {
  primary: {
    container:
      "bg-brand active:bg-brand-dark border border-brand active:border-brand-dark",
    text: "text-brand-foreground",
    spinnerColor: "#ffffff",
  },
  secondary: {
    container: "bg-surface-muted active:bg-border border border-border",
    text: "text-text",
    spinnerColor: "#15803d",
  },
  outline: {
    container: "bg-transparent active:bg-surface-muted border border-border",
    text: "text-text",
    spinnerColor: "#15803d",
  },
  ghost: {
    container:
      "bg-transparent active:bg-surface-muted border border-transparent",
    text: "text-brand-dark",
    spinnerColor: "#15803d",
  },
  danger: {
    container: "bg-danger active:opacity-90 border border-danger",
    text: "text-danger-foreground",
    spinnerColor: "#ffffff",
  },
};

const SIZE_STYLES: Record<ButtonSize, { container: string; text: string }> = {
  sm: { container: "h-9 px-4 rounded-lg", text: "text-sm" },
  md: { container: "h-12 px-5 rounded-xl", text: "text-base" },
  lg: { container: "h-14 px-6 rounded-2xl", text: "text-base" },
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  className,
  ...props
}: ButtonProps) {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={cn(
        "flex-row items-center justify-center gap-2",
        sizeStyle.container,
        variantStyle.container,
        fullWidth && "w-full",
        isDisabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.spinnerColor} />
      ) : (
        <>
          {icon}
          <Text
            className={cn(
              "font-manrope-semibold",
              sizeStyle.text,
              variantStyle.text,
            )}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
