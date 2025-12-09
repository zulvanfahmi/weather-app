import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenLayoutProps = {
  children?: React.ReactNode;
};

export default function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-indigo-950 p-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
