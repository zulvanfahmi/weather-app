import SearchLoading from "@/components/page/SearchLoading";
import ScreenLayout from "@/components/ScreenLayout";
import Skeleton from "@/components/Skeleton";
import { setIsForecastLoadedBySearch } from "@/redux/slices/forecastSlice";
import { setIsWeatherLoadedBySearch } from "@/redux/slices/weatherSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCityName } from "@/services/CityNameService";
import { fetchLocation } from "@/services/LocationService";
import { fetchforecast, fetchWeather } from "@/services/WeatherService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import countries from "i18n-iso-countries";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {

    const [citySearch, setCitySearch] = useState("");
    const [isFocusedCitySearch, setIsFocusedCitySearch] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { currentWeather, loadingWeather, errorWeather } = useSelector((state: RootState) => state.weather);
    const { forecast, loadingForecast, errorForecast } = useSelector((state: RootState) => state.forecast);
    const { cityName, loadingCityName } = useSelector((state: RootState) => state.cityName)
    const { APILanguageCode } = useSelector((state: RootState) => state.language);
    const { units } = useSelector((state: RootState) => state.temperatureUnit);
    const { lat, lon, loadingLocation, errorLocation } = useSelector((state: RootState) => state.location);
    const { t } = useTranslation();
    const [firstTimeAccessSearchPage, setFirstTimeAccessSearchPage] = useState(true);

    useEffect(() => {
        if (currentWeather?.name && citySearch === "") {
            setCitySearch(currentWeather.name);
        }
    }, [currentWeather]);

    if (loadingLocation || loadingWeather || loadingForecast) {
        return (
            <SearchLoading />
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
        return <SearchLoading />;
    }

    return (
        <ScreenLayout>
            <View className="flex-col gap-4 mt-8">

                <View className="w-full flex-row items-center">
                    <Ionicons color={'#FFFFFF'} size={24} name="location-outline" />
                    <Text className="text-white text-2xl">&nbsp;{t(`search.search_city`)}</Text>
                </View>

                <View className="flex-row items-center border border-slate-800 rounded-xl bg-white h-fit">
                    <TextInput
                        className="pl-2 text-xl flex-1 text-black border-r border-black"
                        value={citySearch}
                        onChangeText={setCitySearch}
                        returnKeyType="search"
                        keyboardType="default"
                        onFocus={() => setIsFocusedCitySearch(true)}
                        onBlur={() => setIsFocusedCitySearch(false)}
                        onSubmitEditing={() => {
                            dispatch(fetchCityName({ name: citySearch.trim() }));
                            setFirstTimeAccessSearchPage(false);
                        }}
                    />
                    <Pressable onPress={() => {
                        dispatch(fetchCityName({ name: citySearch.trim() }));
                        setFirstTimeAccessSearchPage(false);
                    }}
                        className="items-center justify-center">
                        <Ionicons
                            color={'#000000'}
                            size={24}
                            name="search"
                            style={{
                                paddingHorizontal: 8
                            }}
                        />
                    </Pressable>
                </View>

                <View className={`flex-row items-center justify-center ${isFocusedCitySearch ? "" : "hidden"}`}>
                    <Text className="text-white">{t(`search.search_by_click_icon`)}</Text>
                    <Ionicons
                        color={'#FFFFFF'}
                        size={12}
                        name="search"
                    />
                </View>

                <View className="flex-col mx-1">
                    {(!loadingCityName && cityName.length > 0) && cityName.map((city: any, index: number) => (
                        <Pressable onPress={() => {
                            dispatch(fetchWeather({ lat: city.latitude, lon: city.longitude, units, lang: APILanguageCode }));
                            dispatch(fetchforecast({ lat: city.latitude, lon: city.longitude, units, lang: APILanguageCode }));
                            dispatch(setIsWeatherLoadedBySearch(true));
                            dispatch(setIsForecastLoadedBySearch(true));
                            router.navigate('/');
                        }}
                            className="border-b border-slate-600 py-4" key={index}>
                            <Text className="text-2xl text-white pb-1">{city.name}</Text>
                            <Text className="text-white">{t(`search.country`)} : {countries.getName(city.country, APILanguageCode)}</Text>
                        </Pressable>
                    ))}
                    {(!loadingCityName && cityName.length === 0 && firstTimeAccessSearchPage === false) && (
                        <View className="border-b border-slate-600 py-4">
                            <Text className="text-xl text-white pb-1">{t(`search.not_found`)}</Text>
                            <Text className="text-white text-justify">{t(`search.not_found_subtitle`)}</Text>
                        </View>
                    )}
                    {loadingCityName && (
                        <View className="border-b border-slate-600 py-4">
                            <Skeleton width={'40%'} height={20} style={{ marginBottom: 6 }} />
                            <Skeleton width={'40%'} height={16} style={{ marginBottom: 6 }} />
                        </View>
                    )}

                    {(lat?.toFixed(2) !== currentWeather.coord.lat.toFixed(2) && lon?.toFixed(2) !== currentWeather.coord.lon.toFixed(2)) && (
                        <View className="items-center py-4">
                            <Pressable onPress={() => {
                                dispatch(fetchLocation())
                                dispatch(setIsForecastLoadedBySearch(false))
                                dispatch(setIsWeatherLoadedBySearch(false))
                            }}>
                                <Text className="bg-blue-500 py-3 px-4 text-white text-xl rounded-xl">{t(`search.get_weather_by_location`)}</Text>
                            </Pressable>
                        </View>
                    )}
                </View>

            </View>

        </ScreenLayout>
    )
}