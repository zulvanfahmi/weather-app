import ScreenLayout from "@/components/ScreenLayout";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Skeleton from "../Skeleton";

export default function ForecastLoading() {

    return (

        <ScreenLayout>

            <View className="gap-6 mt-8">

                <View className="w-full flex-row items-center">
                    <Ionicons color={'#FFFFFF'} size={32} name="location-outline" />
                    <Skeleton width={'70%'} height={36} />
                </View>

                <Text className="text-white text-2xl mt-4">Real Feel Temperature Graphic</Text>


                <Skeleton width={'100%'} height={240} />


                <Text className="text-white text-2xl mt-4">5 Days Weather Forecast</Text>

                <Skeleton width={'100%'} height={60} />

                <Skeleton width={'100%'} height={60} />


            </View>

        </ScreenLayout>
    );
}
