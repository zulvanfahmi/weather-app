import { weatherIcons } from "@/assets/icon/weather";
import ForecastLoading from "@/components/page/ForecastLoading";
import ScreenLayout from "@/components/ScreenLayout";
import { RootState } from "@/redux/store";
import { formatDayLong, formatDayNumber, formatMonthLong, formatMonthShort, formatTime } from "@/utils/formatTime";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

export default function Forecast() {

  const { loadingLocation, errorLocation } = useSelector((state: RootState) => state.location);
  const { loadingWeather, errorWeather } = useSelector((state: RootState) => state.weather);
  const { forecast, loadingForecast, errorForecast } = useSelector((state: RootState) => state.forecast);
  const { timeFormatGlobal } = useSelector((state: RootState) => state.timeFormat)
  const { languageGlobal } = useSelector((state: RootState) => state.language)
  const { unitSymbol } = useSelector((state: RootState) => state.temperatureUnit)

  const { t } = useTranslation();

  interface ForecastItem {
    dt: number;
    main: any;
    weather: any[];
    wind: any;
    clouds: any;
    [key: string]: any;
  }

  interface GroupedForecast {
    date: string;
    dt: number;
    data: ForecastItem[];
  }

  const [isGroupForecastOpen, setIsGroupForecastOpen] = useState<string[]>([]);

  const timezone = forecast.city.timezone ?? 0;

  const groupForecastByDate = useCallback((list: ForecastItem[]): GroupedForecast[] => {
    const grouped: Record<string, GroupedForecast> = {};

    list.forEach((item) => {
      const date = new Date((item.dt + timezone) * 1000).toISOString().split("T")[0];
      const dt = item.dt;

      if (!grouped[date]) {
        grouped[date] = {
          date,
          dt,
          data: [],
        };
      }

      grouped[date].data.push(item);
    });

    return Object.values(grouped);
  }, [timezone]);

  useEffect(() => {
    if (forecast && forecast.list) {
      setIsGroupForecastOpen(groupForecastByDate(forecast.list).map(f => f.date));
    }
  }, [forecast, groupForecastByDate]);

  if (loadingLocation || loadingWeather || loadingForecast) {
    return (
      <ForecastLoading />
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

  const timeLabels: string[] = [];
  const temperatureData: any[] = [];

  forecast.list.map((forecast: any) => {
    timeLabels.push(`${formatTime(forecast.dt, timezone, timeFormatGlobal)} ${formatDayNumber(forecast.dt, timezone, languageGlobal)}/${formatMonthShort(forecast.dt, timezone, languageGlobal)}`)
    temperatureData.push(forecast.main.feels_like)
  });

  const forecastList = groupForecastByDate(forecast.list);

  return (

    <ScreenLayout>

      <View className="gap-6 my-8">

        <View className="w-full flex-row items-center mt-2">
          <Ionicons color={'#FFFFFF'} size={32} name="location-outline" />
          <Text className="text-white text-4xl">&nbsp;{forecast.city.name}</Text>
        </View>

        <Text className="text-white text-2xl mt-4">{t("forecast.real_feel_temperature_graphic")}</Text>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
          >
            <LineChart
              data={{
                labels: timeLabels,
                datasets: [
                  {
                    data: temperatureData
                  }
                ]
              }}
              width={Dimensions.get("window").width * 5}
              height={320}
              yAxisLabel=""
              yAxisSuffix={`°${unitSymbol}`}
              yAxisInterval={1}
              horizontalLabelRotation={0}
              verticalLabelRotation={20}
              chartConfig={{
                backgroundGradientFrom: "#0f172b",
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: "#314158",
                backgroundGradientToOpacity: 1,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgb(0, 166, 244, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 12,
                },
                propsForDots: {
                  r: "2",
                  strokeWidth: "4",
                  stroke: "#ffffff"
                },
              }}
              style={{
                marginVertical: 0,
                borderRadius: 12
              }}
            />
          </ScrollView>
        </View>

        <View className="mt-4">
          <Text className="text-white text-2xl">{t("forecast.5_days_weather_forecast")}</Text>
          <Text className="text-white text-sm">{t("forecast.click_forecast_to_see_details")}</Text>
        </View>

        {forecastList.map((forecast) => {

          return (

            <View key={forecast.date} className="bg-slate-700 rounded-xl">
              <View className="flex-row justify-between items-center my-4 mx-4">
                <View className="flex-row">
                  <FontAwesome name="calendar" color={'#FFFFFF'} size={18} />
                  <Text className="text-white text-xl">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {`${formatDayLong(forecast.dt, timezone, languageGlobal)}, ${formatDayNumber(forecast.dt, timezone, languageGlobal)} ${formatMonthLong(forecast.dt, timezone, languageGlobal)}`}
                  </Text>
                </View>
                <View>
                  <Pressable onPress={() => {
                    setIsGroupForecastOpen(prev =>
                      prev.includes(forecast.date)
                        ? prev.filter(d => d !== forecast.date)
                        : [...prev, forecast.date]);
                  }}>
                    <MaterialIcons className={isGroupForecastOpen.includes(forecast.date) ? 'rotate-180' : 'rotate-0'} name="keyboard-arrow-down" color={'#FFFFFF'} size={30} />
                  </Pressable>
                </View>
              </View>

              <View
                className="bg-slate-500 rounded-b-xl overflow-hidden"
                style={{
                  height: isGroupForecastOpen.includes(forecast.date) ? undefined : 0,
                  opacity: isGroupForecastOpen.includes(forecast.date) ? 1 : 0,
                }}
              >
                {forecast.data.map((item) => (

                  <Pressable
                    onPress={() => router.push({
                      pathname: "/forecast/[dateTimestamp]",
                      params: { dateTimestamp: item.dt },
                    })}
                    key={item.dt}
                    className="flex-row items-center justify-between w-full py-1 pl-1 pr-5"
                  >
                    <View className="flex-row items-center gap-3 mr-4">
                      {/* <Text>{item.dt}</Text> */}
                      <Image className="w-12 h-12" source={weatherIcons[item.weather[0].icon]} />
                      <Text className="text-white">{formatTime(item.dt, timezone, timeFormatGlobal)}</Text>
                      <Text className="text-white">{t(`homescreen.weather.${item.weather[0].main}`)}</Text>
                      <Text className="text-white">{item.weather[0].description}</Text>
                    </View>
                    <Text className="text-white">{item.main.feels_like}&nbsp;°{unitSymbol}</Text>
                  </Pressable>

                ))}
              </View>

            </View>

          )
        })}

      </View>

    </ScreenLayout>

  );
}
