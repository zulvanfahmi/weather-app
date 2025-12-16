import { Text, View } from "react-native";

type Props = {
  title: string;
  icon: React.ReactNode;
  data: string;
};

export default function InformationCard({ title, icon, data }: Props) {
  return (
    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
      <Text className="text-white text-lg font-light">{title}</Text>
      <Text className="text-white text-2xl">
        {icon}&nbsp;&nbsp;{data}
      </Text>
    </View>
  );
}
