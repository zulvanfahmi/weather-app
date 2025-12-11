import { weatherIcons } from "@/assets/icon/weather";
import ScreenLayout from "@/components/ScreenLayout";
import { RootState } from "@/redux/store";
import { formatDate_DayLong, formatDate_DayNumber, formatDate_MonthLong, formatDate_MonthShort, formatTime_HHMM } from "@/utils/formatTime";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

export default function Forecast() {

  const { loading, error } = useSelector((state: RootState) => state.location);
  const { currentWeather, loadingWeather, errorWeather } = useSelector((state: RootState) => state.weather);
  const { forecast, loadingForecast, errorForecast } = useSelector((state: RootState) => state.forecast);

  const timeLabels: string[] = [];
  const temperatureData: any[] = [];

  forecast.list.map((forecast: any) => {
    timeLabels.push(`${formatTime_HHMM(forecast.dt)} ${formatDate_DayNumber(forecast.dt)}/${formatDate_MonthShort(forecast.dt)}`)
    temperatureData.push(forecast.main.feels_like)
  });

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

  const groupForecastByDate = (list: ForecastItem[]): GroupedForecast[] => {
    const grouped: Record<string, GroupedForecast> = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0];
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
  };

  const forecastList = groupForecastByDate(forecast.list);

  if (loading || loadingWeather || loadingForecast) {
    return (
      <ScreenLayout>
        <View>
          <Text className="text-white text-2xl">Loading</Text>
        </View>
      </ScreenLayout>
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
              width={Dimensions.get("window").width * 10}
              height={320}
              yAxisLabel=""
              yAxisSuffix="°C"
              yAxisInterval={1}
              horizontalLabelRotation={0}
              verticalLabelRotation={20}
              chartConfig={{
                backgroundGradientFrom: "#0f172b",
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: "#314158",
                backgroundGradientToOpacity: 1,
                decimalPlaces: 1,
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

        {forecastList.map((forecast) => (

          <View key={forecast.date} className="bg-slate-700 rounded-xl">
            <View className="flex-row justify-between items-center my-4 mx-4">
              <View className="flex-row">
                <FontAwesome name="calendar" color={'#FFFFFF'} size={18} />
                <Text className="text-white text-xl">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {`${formatDate_DayLong(new Date(forecast.dt).getTime())}, ${formatDate_DayNumber(new Date(forecast.dt).getTime())} ${formatDate_MonthLong(new Date(forecast.dt).getTime())}`}
                  </Text>
              </View>
              <View>
                <MaterialIcons name="keyboard-arrow-down" color={'#FFFFFF'} size={30} />
              </View>
            </View>

            <View className="bg-slate-500 rounded-b-xl">
              {forecast.data.map((item) => (

                <View key={item.dt} className="flex-row items-center justify-between w-full py-1 pl-1 pr-5">
                  <View className="flex-row items-center gap-4 mr-4">
                    <Image className="w-12 h-12" source={weatherIcons[item.weather[0].icon]} />
                    <Text className="text-white">{formatTime_HHMM(item.dt)}</Text>
                    <Text className="text-white">{item.weather[0].main}</Text>
                    <Text className="text-white">{item.weather[0].description}</Text>
                  </View>
                  <Text className="text-white">{item.main.feels_like}&nbsp;°C</Text>
                </View>
              ))}
            </View>

          </View>

        ))}

      </View>

    </ScreenLayout>
  );
}
