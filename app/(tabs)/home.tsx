import Screen from "@/components/ScreenArea";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-cente">
        <Text className="text-xl font-bold text-blue-500">Home</Text>
      </View>
    </Screen>
  );
}
