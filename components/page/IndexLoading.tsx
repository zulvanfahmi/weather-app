import ScreenLayout from "@/components/ScreenLayout";
import { Entypo, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";
import Skeleton from "../Skeleton";

export default function IndexLoading() {

    return (
        <ScreenLayout>

            <View className="gap-6 mt-8">
                <View className="w-full flex-row items-center my-2">
                    <Ionicons color={'#FFFFFF'} size={32} name="location-outline" />
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <Skeleton width={'70%'} height={30} />
                </View>

                <View className="flex-row bg-white/10 rounded-xl h-48 p-4">

                    <View className="flex-1 flex-col justify-between">
                        <View>
                            <Skeleton width={'80%'} height={18} style={{ marginBottom: 10 }} />
                            <Skeleton width={'60%'} height={20} style={{ marginBottom: 10 }} />
                        </View>

                        <View className="gap-2 flex-col">
                            <View className="flex-row items-center">
                                <FontAwesome name="thermometer-3" color={'#FFFFFF'} size={32} />
                                <Text>&nbsp;&nbsp;&nbsp;</Text>
                                <Skeleton width={100} height={20} />
                            </View>
                            <Skeleton width={'80%'} height={20} />
                        </View>

                    </View>

                    <View className="flex-1">
                        <Skeleton width={'100%'} height={'100%'} />
                    </View>

                </View>

                <View className="flex-row gap-6">

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Temperature
                        </Text>

                        <Text className="text-white items-center justify-center text-2xl">
                            <FontAwesome name="thermometer-3" color={'#FFFFFF'} size={18} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;°C
                        </Text>
                    </View>

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Humidity
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <Ionicons name="water-outline" size={18} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;%
                        </Text>
                    </View>

                </View>

                <View className="flex-row gap-6">

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Wind Speed
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <FontAwesome5 name="wind" size={18} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;m/s
                        </Text>
                    </View>

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Clouds
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <Ionicons name="cloud-outline" size={18} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;%
                        </Text>
                    </View>

                </View>

                <View className="flex-row gap-6">

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Visibility
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <Feather name="eye" size={18} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;Km
                        </Text>
                    </View>

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Pressure
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <Entypo name="gauge" size={18} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;hPa
                        </Text>
                    </View>

                </View>

                <View className="flex-row gap-6">

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Ground Level
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <MaterialCommunityIcons name="terrain" size={24} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;hPa
                        </Text>
                    </View>

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Sea Level
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <MaterialCommunityIcons name="waves" size={24} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;hPa
                        </Text>
                    </View>

                </View>

                <View className="flex-row gap-6">

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Sunrise
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <Feather name="sunrise" size={24} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;
                        </Text>
                    </View>

                    <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
                        <Text className="text-white text-lg font-light">
                            Sunset
                        </Text>
                        <Text className="text-white items-center justify-center text-2xl">
                            <MaterialCommunityIcons name="weather-sunset" size={24} color={'#FFFFFF'} />
                            &nbsp;<Skeleton width={'50%'} height={20} />&nbsp;
                        </Text>
                    </View>

                </View>

                <View className="w-full flex-row items-center mt-6">
                    <FontAwesome name="calendar" color={'#FFFFFF'} size={18} />
                    <Text className="text-white text-2xl">&nbsp;&nbsp;Forecast</Text>
                </View>

                <View className="flex-row flex-wrap justify-around mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <View
                            key={i}
                            className="
                        flex-col
                        bg-white/10 
                        rounded-t-full 
                        rounded-b-full 
                        w-1/5 
                        items-center 
                        p-2"
                        >
                            <View className="mt-6" />
                            <Skeleton width={'80%'} height={12} style={{ marginBottom: 8 }} />
                            <Skeleton width={'80%'} height={12} style={{ marginBottom: 8 }} />
                            <Skeleton width={'50%'} height={28} style={{ marginBottom: 8 }} />
                            <Skeleton width={'80%'} height={12} />
                            <View className="mb-6" />
                        </View>
                    ))}
                </View>

            </View>
        </ScreenLayout >

    )
}
