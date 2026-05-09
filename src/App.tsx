import './App.css'
// import StyleGuide from './StyleGuide.jsx'
import Header from './Header'
import Search from './Search'
import Error from './Error'
import Forecast from './Forecast'
import { useState, useEffect } from "react";

export type WeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;

    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        is_day: number;
        wind_speed_10m: number;
        precipitation: number;
        rain: number;
        showers: number;
        snowfall: number;
        weather_code: number;
    };

    current_units: {
        time: string;
        interval: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        apparent_temperature: string;
        wind_speed_10m: string;
        precipitation: string;
        rain: string;
        showers: string;
        snowfall: string;
        weather_code: string;
    };

    hourly: {
        time: string[];
        temperature_2m: number[];
        rain: number[];
        showers: number[];
        snowfall: number[];
        weather_code: number[];
    };

    hourly_units: {
        time: string;
        temperature_2m: string;
        rain: string;
        showers: string;
        snowfall: string;
        weather_code: string;
    };

    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        snowfall_sum: number[];
        showers_sum: number[];
        rain_sum: number[];
        weather_code: number[];
    };

    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        snowfall_sum: string;
        showers_sum: string;
        rain_sum: string;
        weather_code: string;
    };
};


export type SelectedCity = {
  id: number
    name: string
    country: string
    latitude: number
    longitude: number
}

type CityValues = {
    cityName: string
    country: string
    latitude: number
    longitude: number
  }

function App() {

const [city, setCity] = useState("Berlin")
const [values, setValues] = useState<CityValues | null>(null)
const [latitude, setLatitude ] = useState(52.52); 
const [ longitude, setLongitude] = useState(13.41);
const [ tempUnit, setTempUnit] = useState("celsius")
const [windUnit, setWindUnit] = useState("kmh")
const [precipUnit, setPrecipUnit] = useState("mm")
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,precipitation,rain,showers,snowfall,weather_code&hourly=temperature_2m,rain,showers,snowfall,weather_code&daily=temperature_2m_max,temperature_2m_min,snowfall_sum,showers_sum,rain_sum,weather_code&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}&precipitation_unit=${precipUnit}`;

// &temperature_unit=${unit}
   const [weather, setWeather] = useState<WeatherData | null>(null)
   const [error, setError] = useState<string | null>(null)
   const [loading, setLoading] = useState<boolean>(true)

    async function getCityDetails(selectedCity: string) : Promise<void> {
       setError(null)
        try {
          const cityRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${selectedCity}&count=1&language=en&format=json`)
        const cityData = await cityRes.json()

        if (!cityData.results || cityData.results.length === 0) {
            setError("not_found")
            return
        }
        
        const cityValues = {
          cityName: cityData.results[0].name,
          country: cityData.results[0].country,
          latitude: cityData.results[0].latitude,
          longitude: cityData.results[0].longitude
        }
        console.log(cityValues)
        setValues(cityValues)
        setLatitude(cityValues.latitude)
        setLongitude(cityValues.longitude)
        } catch (err) {
          setError("api_error")
        }
    }

    function selectCity(selectedCity: SelectedCity): void {
    setValues({
        cityName: selectedCity.name,
        country: selectedCity.country,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude
    })
    setLatitude(selectedCity.latitude)
    setLongitude(selectedCity.longitude)
    
}


     async function fetchCurrentWeather() {
            setError(null)
            setLoading(true)
    
            try {
                setLoading(true)
                const weatherRes = await fetch(url)
                const weatherData = await weatherRes.json()
                setWeather(weatherData)
                
    
            } catch (error) {
                setError(`${error}, Something went wrong . Check your API`)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
  fetchCurrentWeather();
}, [latitude, longitude, tempUnit, windUnit, precipUnit]);
    
    

    if(error === "not_found") {
      return (
        <div className="bg-neutral-900 text-neutral-0 px-16 min-h-[100vh]">
            <Header setTempUnit={setTempUnit} setPrecipUnit={setPrecipUnit} setWindUnit={setWindUnit} tempUnit={tempUnit} precipUnit={precipUnit} windUnit={windUnit} />
            <h1 className="font-heading text-4xl mb-12">How's the sky looking today?</h1>
            <Search setCity={setCity} onAction={getCityDetails} onSelect={selectCity} />
            <Error callWeather={fetchCurrentWeather} error={error} /> {/* 👈 shows "No results found" */}
        </div>
    )
    } 
    if(error){
       return (
    <div className="bg-neutral-900 text-neutral-0 px-16 min-h-[100vh]">
      <Header />
      <Error callWeather={fetchCurrentWeather} error={error}/>
    </div>
  )
    }

  return (
    <div className="bg-neutral-900 text-neutral-0 px-4 md:px-16 min-h-[100vh] grid place-items-center w-full">
      <div className="max-w-[1500px]">
        <Header setTempUnit={setTempUnit} setPrecipUnit={setPrecipUnit} setWindUnit={setWindUnit} tempUnit={tempUnit} precipUnit={precipUnit} windUnit={windUnit} />
        <h1 className="font-heading text-4xl mb-12">How's the sky looking today?</h1>
        <Search setCity={setCity} onAction={getCityDetails} onSelect={selectCity} />
        <Forecast weather={weather} error={error} loading={loading} values={values} precipUnit={precipUnit} windUnit={windUnit} />
      </div>
    </div>
  )
}

export default App
