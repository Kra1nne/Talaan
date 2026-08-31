import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/themes";
import clsx from "clsx";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, tabBar.horizontalInset);

  const TabIcon = ({ icon: Icon, focused }: TabIconProps) => {
    return (
      <View className="h-12 w-12 items-center justify-center">
        <View
          className={clsx(
            "h-12 w-12 items-center justify-center rounded-full",
            focused && "bg-brand",
          )}
        >
          <Icon
            width={15}
            height={15}
            fill={focused ? colors.card : colors.accent}
          />
        </View>
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: tabBar.height + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 0,
          paddingHorizontal: tabBar.horizontalInset,
          backgroundColor: colors.background,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: "center",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          key={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
