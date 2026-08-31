import FloatingButton from "@/components/FloatingButton";
import Screen from "@/components/ScreenArea";
import { icons } from "@/constants/icon";
import { Text, View } from "react-native";

const QRCode = icons.qr_scan;
export default function Debt() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-cente">
        <Text className="text-xl font-bold text-blue-500">Debt</Text>
      </View>
      <FloatingButton onPress={() => console.log("Floating button pressed")}>
        <QRCode width={24} height={24} fill="#fff" />
      </FloatingButton>
    </Screen>
  );
}
