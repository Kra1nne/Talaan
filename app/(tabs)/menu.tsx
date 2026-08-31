import MenuList from "@/components/MenuList";
import Screen from "@/components/ScreenArea";
import { icons } from "@/constants/icon";
import { ScrollView, Text, View } from "react-native";

const User = icons.user;
const Cloud = icons.cloud;
const FileText = icons.document;
const Settings = icons.settings;
const Bell = icons.bell;
const Info = icons.info;
const CircleHelp = icons.question;
const Logout = icons.logout;
const ChevronRight = icons.chevronRight;

export default function MenuPage() {
  return (
    <Screen>
      <Text className="text-3xl mb-5 font-manrope-extrabold text-foreground">
        Menu
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        <View className="bg-foreground/[0.03] rounded-3xl border border-foreground/5 p-4 mb-6 flex-row items-center gap-3">
          <View className="w-14 h-14 rounded-full bg-primary/10 items-center justify-center">
            <User width={24} height={24} fill="#2563EB" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-manrope-bold text-foreground">
              Your Profile
            </Text>
            <Text className="text-xs font-manrope-medium text-gray-400 mt-0.5">
              Tap to view your profile
            </Text>
          </View>
          <ChevronRight width={16} height={16} />
        </View>

        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 ml-1">
          Account
        </Text>
        <View className="bg-foreground/[0.03] rounded-2xl border border-foreground/5 mb-6 overflow-hidden">
          <MenuList
            title="Backup & Sync"
            icon={<Cloud height={17} width={17} />}
          />
          <MenuList
            title="Export PDF"
            icon={<FileText height={17} width={17} />}
          />
        </View>

        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 ml-1">
          Settings
        </Text>
        <View className="bg-foreground/[0.03] rounded-2xl border border-foreground/5 mb-6 overflow-hidden">
          <MenuList
            title="Preferences"
            icon={<Settings height={17} width={17} />}
          />
          <MenuList
            title="Notifications"
            icon={<Bell height={17} width={17} />}
          />
        </View>

        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 ml-1">
          Support
        </Text>
        <View className="bg-foreground/[0.03] rounded-2xl border border-foreground/5 overflow-hidden">
          <MenuList
            title="Help & Support"
            icon={<CircleHelp height={17} width={17} />}
          />
          <MenuList title="About" icon={<Info height={17} width={17} />} />
          <MenuList
            title="Logout"
            icon={<Logout height={17} width={17} fill="#EF4444" />}
            tint="bg-red-500/10"
            danger
            showChevron={false}
            isLast
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
