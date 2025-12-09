import { getForecast5Days } from "@/services/WeatherService";
import { useEffect, useState } from "react";

export default function useForecast(lat: number, lon: number) {

    const [data, setData] = useState<any | null>(null)

    useEffect(() => {
        getForecast5Days(lat, lon).then(res => setData(res.data))
    }, [lat, lon])

    return data;

}