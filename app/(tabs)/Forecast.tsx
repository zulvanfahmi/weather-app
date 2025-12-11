import { weatherIcons } from "@/assets/icon/weather";
import ScreenLayout from "@/components/ScreenLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchforecast } from "@/services/WeatherService";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Forecast() {

  const dispatch = useDispatch<AppDispatch>();
  const { lat, lon, loading, error } = useSelector((state: RootState) => state.location);
  const { forecast, loadingForecast, errorForecast } = useSelector((state: RootState) => state.forecast);

  useEffect(() => {
    if (lat && lon) dispatch(fetchforecast({ lat, lon }));
  }, [dispatch, lat, lon]);

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center gap-4">
        <Text className="text-white text-2xl">{forecast?.city?.name}</Text>
      </View>
      <View className="flex-row flex-wrap justify-around">

        {forecast?.list?.map((forecast: any) => (
          <View
            key={forecast.dt}
            className="bg-white/10 rounded w-1/5 items-center m-1 p-2"
          >
            <Text className="text-white">
              {new Date(forecast.dt * 1000).toLocaleString("en-EN", {
                day: "numeric",
              })}&nbsp;/&nbsp;
              {new Date(forecast.dt * 1000).toLocaleString("en-EN", {
                month: "numeric",
              })}
            </Text>
            <Text className="text-white">
              {new Date(forecast.dt * 1000).toLocaleTimeString("en-EN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
            <Image
              className="w-12 h-12"
              source={weatherIcons[forecast.weather[0].icon]}
            />
          </View>
        ))}

      </View>

    </ScreenLayout>
  );
}
