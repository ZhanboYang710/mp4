"use client";

import styled from "styled-components";

import { useState } from "react";
import Link from "next/link";

const StyledDiv=styled.div`
    background-color: #B0C4C7;
    margin: 20% 20%;
    border: 1px solid transparent;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function Home() {
    
    const [city, setCity] = useState("")

    return (
        <div>
            <StyledDiv>
                <h1>Find the Weather in any city!</h1>
                <p>Enter a city name below to get the current weather</p>
                <input type="text" value={city} placeholder="city name"
                onChange={ (e) => setCity(e.target.value)}/>
                <Link href={`/${city}`}>Get Weather</Link>
            </StyledDiv>
        </div>

    );
}
