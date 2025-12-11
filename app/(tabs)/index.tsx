import { weatherIcons } from "@/assets/icon/weather";
import IndexLoading from "@/components/page/IndexLoading";
import ScreenLayout from "@/components/ScreenLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchLocation } from "@/services/LocationService";
import { fetchforecast, fetchWeather } from "@/services/WeatherService";
import { formatDate_DayLong, formatDate_DayNumber, formatDate_MonthShort, formatTime_HHMM } from "@/utils/formatTime";
import { Entypo, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {

  const dispatch = useDispatch<AppDispatch>();
  const { lat, lon, loading, error } = useSelector((state: RootState) => state.location);
  const { currentWeather, loadingWeather, errorWeather } = useSelector((state: RootState) => state.weather);
  const { forecast, loadingForecast, errorForecast } = useSelector((state: RootState) => state.forecast);

  useEffect(() => {
    dispatch(fetchLocation());
  }, [dispatch]);

  useEffect(() => {
    if (lat && lon) {
      dispatch(fetchWeather({ lat, lon }))
      dispatch(fetchforecast({ lat, lon }))
    };
  }, [dispatch, lat, lon]);

  if (loading || loadingWeather || loadingForecast) {
    return (
        <IndexLoading />
    );
  }

  if (error || errorWeather || errorForecast) {
    return (
      <ScreenLayout>
        <View>
          <Text className="text-white text-2xl">Something went wrong!</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>

      <View className="gap-6 mt-8">
        <View className="w-full flex-row items-center my-2">
          <Ionicons color={'#FFFFFF'} size={32} name="location-outline" />
          <Text className="text-white text-4xl">&nbsp;{currentWeather?.name}</Text>
        </View>

        <View className="flex-row bg-white/10 rounded-xl">

          <View className="flex-1 flex-col p-4 justify-between">
            <View>
              <Text className="text-white text-lg">
                {`${formatDate_DayLong(currentWeather?.dt)}, ${formatDate_DayNumber(currentWeather?.dt)} ${formatDate_MonthShort(currentWeather?.dt)}`}
              </Text>
              <Text className="text-2xl text-white" >{currentWeather?.weather?.[0]?.main} </Text>
            </View>

            <View className="gap-2">
              <Text className="text-white text-4xl items-center">
                <FontAwesome name="thermometer-3" color={'#FFFFFF'} size={32} />
                &nbsp;{currentWeather?.main?.feels_like}&nbsp;°C
              </Text>
              <Text className="text-white text-lg">{currentWeather?.main?.temp_min}&nbsp;°C&nbsp;&nbsp;-&nbsp;&nbsp;{currentWeather?.main?.temp_max}&nbsp;°C</Text>
            </View>
          </View>

          <Image className="flex-1 w-full" source={weatherIcons[currentWeather?.weather?.[0]?.icon + '@4x']} />

        </View>

        <View className="flex-row gap-6">

          <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
            <Text className="text-white text-lg font-light">
              Temperature
            </Text>
            <Text className="text-white items-center justify-center text-2xl">
              <FontAwesome name="thermometer-3" color={'#FFFFFF'} size={18} />
              &nbsp;&nbsp;{currentWeather?.main.temp}&nbsp;°C
            </Text>
          </View>

          <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
            <Text className="text-white text-lg font-light">
              Humidity
            </Text>
            <Text className="text-white items-center justify-center text-2xl">
              <Ionicons name="water-outline" size={18} color={'#FFFFFF'} />
              &nbsp;&nbsp;{currentWeather?.main?.humidity}&nbsp;%
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
              &nbsp;&nbsp;{currentWeather?.wind?.speed}&nbsp;m/s
            </Text>
          </View>

          <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
            <Text className="text-white text-lg font-light">
              Clouds
            </Text>
            <Text className="text-white items-center justify-center text-2xl">
              <Ionicons name="cloud-outline" size={18} color={'#FFFFFF'} />
              &nbsp;&nbsp;{currentWeather?.clouds?.all}&nbsp;%
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
              &nbsp;&nbsp;{currentWeather?.visibility / 1000}&nbsp;Km
            </Text>
          </View>

          <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
            <Text className="text-white text-lg font-light">
              Pressure
            </Text>
            <Text className="text-white items-center justify-center text-2xl">
              <Entypo name="gauge" size={18} color={'#FFFFFF'} />
              &nbsp;&nbsp;{currentWeather?.main.pressure}&nbsp;hPa
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
              &nbsp;&nbsp;{currentWeather?.main?.grnd_level}&nbsp;hPa
            </Text>
          </View>

          <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
            <Text className="text-white text-lg font-light">
              Sea Level
            </Text>
            <Text className="text-white items-center justify-center text-2xl">
              <MaterialCommunityIcons name="waves" size={24} color={'#FFFFFF'} />
              &nbsp;&nbsp;{currentWeather?.main?.sea_level}&nbsp;hPa
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
              &nbsp;&nbsp;{formatTime_HHMM(currentWeather?.sys?.sunrise)}
            </Text>
          </View>

          <View className="flex-1 flex-col p-4 bg-white/10 rounded-xl">
            <Text className="text-white text-lg font-light">
              Sunset
            </Text>
            <Text className="text-white items-center justify-center text-2xl">
              <MaterialCommunityIcons name="weather-sunset" size={24} color={'#FFFFFF'} />
              &nbsp;&nbsp;{formatTime_HHMM(currentWeather?.sys?.sunset)}
            </Text>
          </View>

        </View>

        <View className="w-full flex-row items-center mt-6">
          <FontAwesome name="calendar" color={'#FFFFFF'} size={18} />
          <Text className="text-white text-2xl">&nbsp;&nbsp;Forecast</Text>
        </View>

        <View className="flex-row flex-wrap justify-around gap-2">
          {forecast?.list?.slice(0, 40).map((forecast: any) => (
            <View
              key={forecast.dt}
              className="bg-white/10 rounded-t-full rounded-b-full w-1/5 items-center p-2"
            >
              <Text className="text-white mt-6">
                {formatDate_DayNumber(forecast.dt)}&nbsp;/&nbsp;
                {formatDate_MonthShort(forecast.dt)}
              </Text>
              <Text className="text-white">
                {formatTime_HHMM(forecast.dt)}
              </Text>
              <Image
                className="w-12 h-12"
                source={weatherIcons[forecast.weather[0].icon]}
              />
              <Text className="text-white mb-6">
                {forecast.main.feels_like}&nbsp;°C
              </Text>
            </View>
          ))}
        </View>

        <Link href={'/Forecast'} className="text-white text-xl mb-8">See Full Forecast...</Link>

      </View>
    </ScreenLayout >
  );
}
