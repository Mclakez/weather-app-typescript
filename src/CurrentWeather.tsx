import bigBg from "/assets/images/bg-today-large.svg";
import iconSunny from "/assets/images/icon-sunny.webp";
import iconPartlyCloudy from "/assets/images/icon-partly-cloudy.webp";
import iconOvercast from "/assets/images/icon-overcast.webp";
import iconFog from "/assets/images/icon-fog.webp";
import iconDrizzle from "/assets/images/icon-drizzle.webp";
import iconRain from "/assets/images/icon-rain.webp";
import iconSnow from "/assets/images/icon-snow.webp";
import './App.css'
import type { Value } from './Forecast.tsx'

type CurrentWeatherProps = {
    weather: any;
    loading: boolean;
    values: Value | null;
}

export default function CurrentWeather({ weather, loading, values}: CurrentWeatherProps) {
    if(loading) {
        return (
            <div>
                <div className="bg-neutral-800 bg-cover bg-center flex flex-col gap-2 items-center justify-center h-52 px-2 rounded-lg font-sans animate-pulse" style={{ minHeight: '180px' }}>
                     <div className="flex gap-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay: -0.5s]"></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay: -0.8s]"></div>
                     </div>
                     <p>Loading...</p>
                </div>
            </div>
        )
    }

    if(!weather) return null

    const date = new Date(weather.current.time)

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    })

    let weatherIcon;
    if (weather.current.weather_code === 0) {
        weatherIcon = iconSunny;
    } else if (weather.current.weather_code === 1) {
        weatherIcon = iconPartlyCloudy;
    } else if (weather.current.weather_code === 2) {
        weatherIcon = iconOvercast;
    } else if (weather.current.weather_code === 3) {
        weatherIcon = iconOvercast;
    } else if (weather.current.weather_code === 45 || weather.current.weather_code === 48) {
        weatherIcon = iconFog;
    } else if (weather.current.weather_code === 51 || weather.current.weather_code === 53 || weather.current.weather_code === 55) {
        weatherIcon = iconDrizzle;
    } else if (weather.current.weather_code === 61 || weather.current.weather_code === 63 || weather.current.weather_code === 65) {
        weatherIcon = iconRain;
    } else if (weather.current.weather_code === 71 || weather.current.weather_code === 73 || weather.current.weather_code === 75) {
        weatherIcon = iconSnow;
    } else {
        weatherIcon = iconSunny;
    }

    return(
        <div>
            <div style={{ backgroundImage: `url(${bigBg})` }} className=" bg-cover bg-center flex flex-col md:flex-row items-center justify-center md:justify-between h-52 pt-4 md:pt-0 px-4 rounded-lg gap-4 md:gap-8 font-sans">
                <div className="flex  flex-col items-start gap-2">
                    <p className="font-500 text-xl ">{values?.cityName ?? "Berlin"}, {values?.country ?? "Germany"}</p>
                    <p className="text-sm font-sans">{formattedDate}</p>
                </div>
                <div className="flex items-center">
                    <img src={weatherIcon} className="w-24"/>
                    <h2 className="text-7xl italic">{weather.current.temperature_2m}&deg;</h2>
                </div>
            </div>
        </div>
    )
}