import Screen from "@/components/ScreenArea";
import { Text, View } from "react-native";

export default function Message() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-cente">
        <Text className="text-xl font-bold text-blue-500">Message</Text>
      </View>
    </Screen>
  );
}
