"use client";

import {useParams} from "next/navigation";
import useSWR from "swr";
import WeatherCard from "../components/weatherCard";
import styled from "styled-components";
import {Weather} from "@/app/interfaces/weather";

const WeatherContentWrapper = styled.main`
    width: 80vw;
    margin: auto;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const CityName = styled.h1`
    color: blueviolet;
    font-family: 'Roboto', Arial, sans-serif;
    margin: 1rem 0;
`

const WeatherCardsContainer = styled.div`
    width: 90%;
    height: 100vh;
    margin: 0 5%;
    display: flex;
    flex-flow: row wrap;
    border: transparent 5px solid;
    border-radius: 10px;
    // background-color: #5B9BD5;
    background-image: linear-gradient(#5B9BD5, white), linear-gradient(45deg, #ff6b6b, #f8b400);
    background-origin: border-box;
    background-clip: content-box, border-box;
    justify-content: center;

`


export default function CityPage() {
    const params = useParams();

    const {data, error} = useSWR(`/api/getWeatherData?city=${params.city}`,
        (url) => fetch(url).then( (res) => res.json() )
    )

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const days = data?.days || [];

    return (
        <WeatherContentWrapper>

            <CityName>{params.city}</CityName>
            <WeatherCardsContainer>
                {
                    days.map((weather: Weather, i: number) =>
                        (
                            <WeatherCard 
                                key={i}
                                datetime={weather.datetime}
                                conditions={weather.conditions}
                                description={weather.description}
                                tempmin={weather.tempmin}
                                tempmax={weather.tempmax}
                            />
                        )
                    )
                }
            </WeatherCardsContainer>

        </WeatherContentWrapper>
    )
}