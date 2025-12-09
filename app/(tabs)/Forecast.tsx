import { weatherIcons } from "@/assets/icon/weather";
import ScreenLayout from "@/components/ScreenLayout";
import useForecast from "@/hooks/useForecast";
import { Image, Text, View } from "react-native";

export default function Forecast() {

  const JsonData: any = useForecast(-6.1965, 106.8219);

  return (
    <ScreenLayout>
      <View className="flex-1 justify-center items-center gap-4">
        <Text className="text-white text-2xl">{JsonData?.city?.name}</Text>
      </View>
      <View className="flex-row flex-wrap justify-around">

        {JsonData?.list?.map((forecast: any) => (
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
