import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCityName = createAsyncThunk(
    "city/fetchCityName",
    async (
        {
            name
        }: {
            name: string
        }) => {
        const API_ID = 'Fryo1l9pHWFnUsLPXz1+5w==diWDx99AdOfwv4zW'

        const res = await fetch(
            `https://api.api-ninjas.com/v1/city?name=${name}`,

            {
                method: 'GET',
                headers: {
                    'X-Api-Key': API_ID,
                }
            }
        );

        if (!res.ok) throw new Error("Failed to fetch city name");

        return await res.json();
    }
);
