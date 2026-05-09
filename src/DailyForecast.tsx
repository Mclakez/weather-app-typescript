import iconSunny from "/assets/images/icon-sunny.webp";
import iconPartlyCloudy from "/assets/images/icon-partly-cloudy.webp";
import iconOvercast from "/assets/images/icon-overcast.webp";
import iconFog from "/assets/images/icon-fog.webp";
import iconDrizzle from "/assets/images/icon-drizzle.webp";
import iconRain from "/assets/images/icon-rain.webp";
import iconSnow from "/assets/images/icon-snow.webp";
import type { WeatherData } from "./App";

const weatherIcons:Record<number, string> = {
    0: iconSunny,
    1: iconPartlyCloudy,
    2: iconOvercast,        // Seems icon cloudy isnt available
    3: iconOvercast,
    45: iconFog,
    48: iconFog,
    51: iconDrizzle,
    53: iconDrizzle,
    55: iconDrizzle,
    61: iconRain,
    63: iconRain,
    65: iconRain,
    71: iconSnow,
    73: iconSnow,
    75: iconSnow,
};

type DailyForecastProps = {
    weather: WeatherData;
    loading: boolean;
}

function getWeatherIcon(code: number) {
    return weatherIcons[code] || iconSunny;
}

export default function DailyForecast({weather,loading}: DailyForecastProps) {
    if (loading) {
        const items =[]
        let i = 1

        while (i <= 7) {
            items.push(<div key={i} className="bg-neutral-800 rounded flex flex-col gap-2 flex-1 min-w-[100px] py-2 h-30 animate-pulse">
                        
                        </div>);
                        i++;
        }

        return <div>
            <p className="text-left mb-2">Daily Forecast</p>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                
                {items.map(item => item)}
           
           
        </div>
        </div>
    }
    

    return(
        <div className="font-sans">
            <p className="text-left mb-2">Daily Forecast</p>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                
                {weather.daily.time.map((day, index) => (
                    <div  key={day} className="bg-neutral-800 rounded flex flex-col gap-2 py-2 border border-neutral-600">
                        <p className="text-neutral-400">{new Date(day).toLocaleDateString("en-US", { weekday: "short" })}</p>
                        <img src={getWeatherIcon(weather.daily.weather_code[index])} className="w-16 mx-auto"/>
                        <div className="flex justify-between items-center px-2">
                            <p>{weather.daily.temperature_2m_min[index]}&deg;</p>
                            <p>{weather.daily.temperature_2m_max[index]}&deg;</p>
                        </div>
                    </div>
                ))}
           
           
        </div>
        </div>
    )
}
