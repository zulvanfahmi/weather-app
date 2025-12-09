import { getCurrentWeather } from "@/services/WeatherService";
import { useEffect, useState } from "react";

export default function useWeather(lat: number, lon: number) {

    const [data, setData] = useState<any | null>(null)

    useEffect(() => {
        getCurrentWeather(lat, lon).then(res => setData(res.data))
    }, [lat, lon])

    return data;

}

