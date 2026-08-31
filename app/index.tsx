import "@/global.css";
import { router } from "expo-router";
import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";

const Screen = styled(Pressable);
export default function App() {
  return (
    <Screen
      className="flex-1 items-center justify-center bg-brand"
      onPress={() => router.push("/(auth)")}
    >
      <View className="">
        <Text className="text-6xl font-manrope-extralight text-white">
          Talaan
        </Text>
      </View>
    </Screen>
  );
}
