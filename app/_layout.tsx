import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "manrope-regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "manrope-light": require("../assets/fonts/Manrope-Light.ttf"),
    "manrope-medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "manrope-semibold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "manrope-bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-extrabold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "manrope-extralight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
