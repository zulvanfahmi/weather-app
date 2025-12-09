import { weatherIcons } from "@/assets/icon/weather";
import ScreenLayout from "@/components/ScreenLayout";
import useWeather from "@/hooks/useWeather";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchLocation } from "@/services/LocationService";
import {
  formatDate_DayLong,
  formatDate_DayNumber,
  formatDate_MonthLong,
  formatDate_YearNumber,
  formatTime_HHMM
} from "@/utils/formatTime";

import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {

  const dispatch = useDispatch<AppDispatch>();
  const { lat, lon, loading, error } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    dispatch(fetchLocation());
  }, []);

  const currentWeather = useWeather(lat, lon);

  if (loading) {
    return (
      <ScreenLayout>
        <View><Text>Loading...</Text></View>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout>
        <View><Text>Enable Location Permission to continue.</Text></View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center gap-4">
        <Text className="text-white text-2xl">
          {`${formatDate_DayLong(currentWeather?.dt)}, ${formatDate_DayNumber(currentWeather?.dt)} ${formatDate_MonthLong(currentWeather?.dt)} ${formatDate_YearNumber(currentWeather?.dt)} at ${formatTime_HHMM(currentWeather?.dt)}`}
        </Text>
        <Text className="text-white text-4xl">{currentWeather?.name}</Text>
        <View className="flex-row justify-between w-full px-12">
          <Text className="text-white text-lg">Sunrise&nbsp;:&nbsp;{formatTime_HHMM(currentWeather?.sys?.sunrise)}
          </Text>
          <Text className="text-white text-lg">Sunset&nbsp;:&nbsp;{formatTime_HHMM(currentWeather?.sys?.sunset)}</Text>
        </View>
        <Image className="w-60 h-60 bg-white/10 rounded-xl mt-12" source={weatherIcons[currentWeather?.weather?.[0]?.icon + '@4x']} />
        <Text className="text-6xl text-white" >{currentWeather?.weather?.[0]?.main} </Text>
        <Text className="text-4xl text-white" >{currentWeather?.main?.feels_like}&nbsp;°C </Text>
        <View className="w-full px-4 gap-4 mt-12">
          <View className="justify-between flex-row">
            <Text className="text-white text-xl">Temperature</Text>
            <Text className="text-white text-xl">{currentWeather?.main?.temp}&nbsp;°C</Text>
          </View>
          <View className="justify-between flex-row">
            <Text className="text-white text-xl">Temperature Feels Like</Text>
            <Text className="text-white text-xl">{currentWeather?.main?.feels_like}&nbsp;°C</Text>
          </View>
          <View className="justify-between flex-row">
            <Text className="text-white text-xl">Temperature Range</Text>
            <Text className="text-white text-xl">{currentWeather?.main?.temp_min}&nbsp;°C - {currentWeather?.main?.temp_max}&nbsp;°C</Text>
          </View>
          <View className="justify-between flex-row">
            <Text className="text-white text-xl">Humidity</Text>
            <Text className="text-white text-xl">{currentWeather?.main?.humidity}&nbsp;%</Text>
          </View>
          <View className="justify-between flex-row">
            <Text className="text-white text-xl">Visibility</Text>
            <Text className="text-white text-xl">{currentWeather?.visibility / 1000}&nbsp;Km</Text>
          </View>
          <View className="justify-between flex-row">
            <Text className="text-white text-xl">Wind</Text>
            <Text className="text-white text-xl">{currentWeather?.wind?.speed}&nbsp;m/s</Text>
          </View>
        </View>
      </View>
    </ScreenLayout>);
}
