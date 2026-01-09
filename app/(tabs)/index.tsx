import { weatherIcons } from "@/assets/icon/weather";
import IndexLoading from "@/components/page/IndexLoading";
import ScreenLayout from "@/components/ScreenLayout";
import InformationCard from "@/components/ui/InformationCard";
import { setIsForecastLoadedBySearch } from "@/redux/slices/forecastSlice";
import { setIsWeatherLoadedBySearch } from "@/redux/slices/weatherSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchLocation } from "@/services/LocationService";
import { fetchforecast, fetchWeather } from "@/services/WeatherService";
import { formatDayLong, formatDayNumber, formatMonthShort, formatTime } from "@/utils/formatTime";
import { Entypo, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function HomeScreen() {

  const dispatch = useDispatch<AppDispatch>();
  const { lat, lon, loadingLocation, errorLocation } = useSelector((state: RootState) => state.location);
  const { currentWeather, loadingWeather, errorWeather, isWeatherLoadedBySearch } = useSelector((state: RootState) => state.weather);
  const { forecast, loadingForecast, errorForecast, isForecastLoadedBySearch } = useSelector((state: RootState) => state.forecast);

  const { timeFormatGlobal } = useSelector((state: RootState) => state.timeFormat);
  const { units, unitSymbol } = useSelector((state: RootState) => state.temperatureUnit);
  const { languageGlobal, APILanguageCode } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof lat !== 'number' && typeof lon !== 'number') {
      dispatch(fetchLocation());
    }
  }, [dispatch, lat, lon]);

  useEffect(() => {
    if (typeof lat === 'number' && typeof lon === 'number' && !isForecastLoadedBySearch && !isWeatherLoadedBySearch) {
      dispatch(fetchWeather({ lat, lon, units, lang: APILanguageCode }));
      dispatch(fetchforecast({ lat, lon, units, lang: APILanguageCode }));
    }
  }, [dispatch, lat, lon, units, APILanguageCode, isForecastLoadedBySearch, isWeatherLoadedBySearch]);

  if (loadingLocation || loadingWeather || loadingForecast) {
    return (
      <IndexLoading />
    );
  }

  if (errorLocation || errorWeather || errorForecast) {
    return (
      <ScreenLayout>
        <View>
          <Text className="text-white text-2xl">Something went wrong!</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (!currentWeather || !forecast) {
    return <IndexLoading />;
  }

  // console.log(`location lat:${lat} lon:${lon} --- weather lat:${currentWeather.coord.lat} lon:${currentWeather.coord.lon}`)

  return (
    <ScreenLayout>
      <View className="gap-6 my-8">
        <View className="w-full flex-row items-center my-2">
          <Ionicons color={'#FFFFFF'} size={32} name="location-outline" />
          <Text className="text-white text-4xl">&nbsp;{currentWeather.name}</Text>
        </View>
        <View className="flex-row bg-white/10 rounded-xl">
          <View className="flex-1 flex-col p-4 justify-between">
            <View>
              <Text className="text-white text-lg">
                {`${formatDayLong(currentWeather.dt, currentWeather.timezone, languageGlobal)}, ${formatDayNumber(currentWeather.dt, currentWeather.timezone, languageGlobal)} ${formatMonthShort(currentWeather.dt, currentWeather.timezone, languageGlobal)}`}
              </Text>
              <Text className="text-2xl text-white" >{t(`homescreen.weather.${currentWeather.weather[0].main}`)}</Text>
              <Text className="text-xl text-white" >{currentWeather.weather[0].description} </Text>
            </View>

            <View className="gap-2">
              <Text className="text-white text-4xl items-center">
                <FontAwesome name="thermometer-3" color={'#FFFFFF'} size={32} />
                &nbsp;{currentWeather.main.feels_like}&nbsp;°{unitSymbol}
              </Text>
              <Text className="text-white text-lg">{currentWeather.main.temp_min}&nbsp;°{unitSymbol}&nbsp;&nbsp;-&nbsp;&nbsp;{currentWeather.main.temp_max}&nbsp;°{unitSymbol}</Text>
            </View>
          </View>

          <Image className="flex-1 w-full" source={weatherIcons[currentWeather.weather[0].icon + '@4x']} />

        </View>

        <View className="flex-row gap-6">
          <InformationCard
            title={t(`homescreen.temperature`)}
            icon={<FontAwesome name="thermometer-3" color={'#FFFFFF'} size={18} />}
            data={`${currentWeather.main.temp} °${unitSymbol}`}
          />
          <InformationCard
            title={t(`homescreen.humidity`)}
            icon={<Ionicons name="water-outline" size={18} color={'#FFFFFF'} />}
            data={`${currentWeather.main.humidity} %`}
          />
        </View>

        <View className="flex-row gap-6">
          <InformationCard
            title={t(`homescreen.wind_speed`)}
            icon={<FontAwesome5 name="wind" size={18} color={'#FFFFFF'} />}
            data={`${currentWeather.wind.speed} m/s`}
          />
          <InformationCard
            title={t(`homescreen.clouds`)}
            icon={<Ionicons name="cloud-outline" size={18} color={'#FFFFFF'} />}
            data={`${currentWeather.clouds.all} %`}
          />
        </View>

        <View className="flex-row gap-6">
          <InformationCard
            title={t(`homescreen.visibility`)}
            icon={<Feather name="eye" size={18} color={'#FFFFFF'} />}
            data={`${currentWeather.visibility / 1000} Km`}
          />
          <InformationCard
            title={t(`homescreen.pressure`)}
            icon={<Entypo name="gauge" size={18} color={'#FFFFFF'} />}
            data={`${currentWeather.main.pressure} hPa`}
          />
        </View>

        <View className="flex-row gap-6">
          <InformationCard
            title={t(`homescreen.ground_level`)}
            icon={<MaterialCommunityIcons name="terrain" size={24} color={'#FFFFFF'} />}
            data={`${currentWeather.main.grnd_level} hPa`}
          />
          <InformationCard
            title={t(`homescreen.sea_level`)}
            icon={<MaterialCommunityIcons name="waves" size={24} color={'#FFFFFF'} />}
            data={`${currentWeather.main.sea_level} hPa`}
          />
        </View>

        <View className="flex-row gap-6">
          <InformationCard
            title={t(`homescreen.sunrise`)}
            icon={<Feather name="sunrise" size={24} color={'#FFFFFF'} />}
            data={`${formatTime(currentWeather.sys.sunrise, currentWeather.timezone, timeFormatGlobal)}`}
          />
          <InformationCard
            title={t(`homescreen.sunset`)}
            icon={<MaterialCommunityIcons name="weather-sunset" size={24} color={'#FFFFFF'} />}
            data={`${formatTime(currentWeather.sys.sunset, currentWeather.timezone, timeFormatGlobal)}`}
          />
        </View>

        <View className="w-full flex-row items-center mt-6">
          <FontAwesome name="calendar" color={'#FFFFFF'} size={18} />
          <Text className="text-white text-2xl">&nbsp;&nbsp;{t("homescreen.forecast")}</Text>
        </View>

        <View className="flex-row flex-wrap justify-around gap-1">

          {forecast.list.slice(0, 4).map((forecast: any) => (
            <View
              key={forecast.dt}
              className="bg-white/10 rounded-t-full rounded-b-full w-1/5 items-center p-1"
            >
              <Text className="text-white mt-6">
                {formatDayNumber(forecast.dt, currentWeather.timezone, languageGlobal)}&nbsp;/&nbsp;
                {formatMonthShort(forecast.dt, currentWeather.timezone, languageGlobal)}
              </Text>
              <Text className="text-white">
                {formatTime(forecast.dt, currentWeather.timezone, timeFormatGlobal)}
              </Text>
              <Image
                className="w-12 h-12"
                source={weatherIcons[forecast.weather[0].icon]}
              />
              <Text className="text-white mb-6">
                {forecast.main.feels_like}&nbsp;°{unitSymbol}
              </Text>
            </View>
          ))}

        </View>

        <Link href={'/(tabs)/forecast'} className="text-white text-xl">{t("homescreen.see_full_forecast")}...</Link>

        {(lat?.toFixed(2) !== currentWeather.coord.lat.toFixed(2) && lon?.toFixed(2) !== currentWeather.coord.lon.toFixed(2)) && (<View className="items-center">
          <Pressable onPress={() => {
            dispatch(fetchLocation())
            dispatch(setIsForecastLoadedBySearch(false))
            dispatch(setIsWeatherLoadedBySearch(false))
          }}>
            <Text className="bg-blue-500 py-3 px-4 text-white text-xl rounded-xl">Get weather by your current location!</Text>
          </Pressable>
        </View>
        )}

      </View>
    </ScreenLayout >
  );
}
