import { weatherIcons } from "@/assets/icon/weather";
import ScreenLayout from "@/components/ScreenLayout";
import InformationCard from "@/components/ui/InformationCard";
import { RootState } from "@/redux/store";
import { formatDayLong, formatDayNumber, formatMonthShort, formatTime } from "@/utils/formatTime";
import { Entypo, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function DateTimestamp() {

    const { dateTimestamp } = useLocalSearchParams();
    const { forecast } = useSelector((state: RootState) => state.forecast);
    const { languageGlobal } = useSelector((state: RootState) => state.language);
    const { timeFormatGlobal } = useSelector((state: RootState) => state.timeFormat);
    const { unitSymbol } = useSelector((state: RootState) => state.temperatureUnit);
    const { t } = useTranslation();

    const selectedForecast = {
        city: forecast.city,
        weatherForecast: forecast.list.find(({ dt }: { dt: number }) => dt === Number(dateTimestamp)) || null,
    };

    return (
        <ScreenLayout>

            <View className="gap-6 my-8">
                <View className="w-full flex-row items-center my-2">
                    <Ionicons color={'#FFFFFF'} size={32} name="location-outline" />
                    <Text className="text-white text-4xl">&nbsp;{selectedForecast.city.name}</Text>
                </View>

                <View className="flex-row bg-white/10 rounded-xl">

                    <View className="flex-1 flex-col p-4 justify-between gap-8">
                        <View>
                            <Text className="text-white text-lg">
                                {`${formatDayLong(selectedForecast.weatherForecast.dt, selectedForecast.city.timezone, languageGlobal)}, ${formatDayNumber(selectedForecast.weatherForecast.dt, selectedForecast.city.timezone, languageGlobal)} ${formatMonthShort(selectedForecast.weatherForecast.dt, selectedForecast.city.timezone, languageGlobal)}`}
                            </Text>
                            <Text className="text-white text-lg">{formatTime(selectedForecast.weatherForecast.dt, selectedForecast.city.timezone, timeFormatGlobal)}</Text>
                        </View>

                        <View>
                            <Text className="text-4xl text-white" >{t(`homescreen.weather.${selectedForecast.weatherForecast.weather[0].main}`)}</Text>
                            <Text className="text-white text-xl">{selectedForecast.weatherForecast.weather[0].description}</Text>
                        </View>

                        <View className="gap-2">
                            <Text className="text-white text-4xl items-center">
                                <FontAwesome name="thermometer-3" color={'#FFFFFF'} size={32} />
                                &nbsp;{selectedForecast.weatherForecast.main.feels_like}&nbsp;°{unitSymbol}
                            </Text>
                            <Text className="text-white text-lg">{selectedForecast.weatherForecast.main.temp_min}&nbsp;°{unitSymbol}&nbsp;&nbsp;-&nbsp;&nbsp;{selectedForecast.weatherForecast.main.temp_max}&nbsp;°{unitSymbol}</Text>
                        </View>
                    </View>

                    <View className="flex-1 items-center justify-center">
                        <Image className="w-full" source={weatherIcons[selectedForecast.weatherForecast.weather[0].icon + '@4x']} />
                    </View>

                </View>

                <View className="flex-row gap-6">
                    <InformationCard
                        title={t(`homescreen.temperature`)}
                        icon={<FontAwesome name="thermometer-3" color={'#FFFFFF'} size={18} />}
                        data={`${selectedForecast.weatherForecast.main.temp} °${unitSymbol}`}
                    />
                    <InformationCard
                        title={t(`homescreen.humidity`)}
                        icon={<Ionicons name="water-outline" size={18} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.main.humidity} %`}
                    />
                </View>

                <View className="flex-row gap-6">
                    <InformationCard
                        title={t(`homescreen.wind_speed`)}
                        icon={<FontAwesome5 name="wind" size={18} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.wind.speed} m/s`}
                    />
                    <InformationCard
                        title={t(`homescreen.clouds`)}
                        icon={<Ionicons name="cloud-outline" size={18} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.clouds.all} %`}
                    />
                </View>

                <View className="flex-row gap-6">
                    <InformationCard
                        title={t(`homescreen.visibility`)}
                        icon={<Feather name="eye" size={18} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.visibility / 1000} Km`}
                    />
                    <InformationCard
                        title={t(`homescreen.pressure`)}
                        icon={<Entypo name="gauge" size={18} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.main.pressure} hPa`}
                    />
                </View>

                <View className="flex-row gap-6">
                    <InformationCard
                        title={t(`homescreen.ground_level`)}
                        icon={<MaterialCommunityIcons name="terrain" size={24} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.main.grnd_level} hPa`}
                    />
                    <InformationCard
                        title={t(`homescreen.sea_level`)}
                        icon={<MaterialCommunityIcons name="waves" size={24} color={'#FFFFFF'} />}
                        data={`${selectedForecast.weatherForecast.main.sea_level} hPa`}
                    />
                </View>

                <View className="flex-row gap-6">
                    <InformationCard
                        title={t(`homescreen.sunrise`)}
                        icon={<Feather name="sunrise" size={24} color={'#FFFFFF'} />}
                        data={`${formatTime(selectedForecast.city.sunrise, selectedForecast.city.timezone, timeFormatGlobal)}`}
                    />
                    <InformationCard
                        title={t(`homescreen.sunset`)}
                        icon={<MaterialCommunityIcons name="weather-sunset" size={24} color={'#FFFFFF'} />}
                        data={`${formatTime(selectedForecast.city.sunset, selectedForecast.city.timezone, timeFormatGlobal)}`}
                    />
                </View>

                <View className="flex-row gap-6">
                    <Pressable onPress={() => router.navigate('/forecast')} className="flex-1 flex-row justify-center items-center gap-1 p-2 bg-blue-500 rounded-xl">
                        <Ionicons name="chevron-back-outline" size={18} color={'#FFFFFF'} />
                        <Text className="text-white text-2xl">Back</Text>
                    </Pressable>
                    <View className="opacity-0 flex-1"></View>
                </View>

            </View>
        </ScreenLayout >
    )

}