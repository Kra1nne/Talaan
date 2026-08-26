import ScreenArea from "@/components/ScreenArea";
import { Text, View } from "react-native";

export default function Credit() {
  return (
    <ScreenArea>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind! Credit: This screen is created using Nativewind
          and Expo Router.
        </Text>
      </View>
    </ScreenArea>
  );
}
