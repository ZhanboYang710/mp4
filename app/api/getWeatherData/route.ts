import { NextResponse, } from "next/server";
export const dynamic = "force-dynamic";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: Request): Promise<NextResponse>{
    //extract parameters
    const {searchParams} = new URL(request.url);

    //get value of parameter: 'city'
    const city = searchParams.get("city")

    //handle absence of 'city'
    if(!city) {
        return NextResponse.json(
            {error: "No [city] provided"},
            {status: 400}
        )
    }

    //make API request fetch data
    const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&include=days%2Ccurrent%2Cevents&key=${WEATHER_API_KEY}&contentType=json`
    );

    //handle API request Failure
    if(res.status != 200) {
        return NextResponse.json(
            {error: "Failed to fetch data"},
            {status: 500},
        );
    }

    //parse data from API
    const data = await res.json()

    //return json data in response
    return NextResponse.json(data)
}