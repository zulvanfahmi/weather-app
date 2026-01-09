import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ScreenLayout from "../ScreenLayout";
import Skeleton from "../Skeleton";

export default function SearchLoading() {

    return (
        <ScreenLayout>
            <View className="flex-col gap-4 mt-8">

                <View className="w-full flex-row items-center">
                    <Ionicons color={'#FFFFFF'} size={24} name="location-outline" />
                    <Text className="text-white text-2xl">&nbsp;Search City</Text>
                </View>

                <View className="border-b border-slate-600 py-4">
                    <Skeleton width={'40%'} height={20} style={{ marginBottom: 6 }} />
                    <Skeleton width={'40%'} height={16} style={{ marginBottom: 6 }} />
                </View>

            </View>
        </ScreenLayout>
    )
}