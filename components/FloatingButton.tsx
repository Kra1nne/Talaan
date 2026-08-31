import { Pressable } from "react-native";

export default function FloatingButton({
  onPress,
  children,
  className = "",
}: {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`absolute bottom-28 right-6 w-12 h-12 rounded-full bg-brand items-center justify-center active:bg-green-600 ${className}`}
      style={{
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
    >
      {children}
    </Pressable>
  );
}
