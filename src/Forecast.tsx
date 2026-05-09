import CurrentWeather from './CurrentWeather'
import WeatherDetails from './WeatherDetails'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'

export type Value = {
          cityName: string;
          country: string;
          latitude: number;
          longitude: number;
}


type ForecastProps = {
   weather: any;
   error: string | null;
   loading: boolean;
   values: Value | null,
   precipUnit: string;
   windUnit: string;
   
}

export default function Forecast({weather, loading, values, precipUnit, windUnit}: ForecastProps ){
   
    return(
       <div className="grid md:grid-cols-3 gap-4 pb-6 mt-8 ">
         <div className="md:col-span-2">
            <CurrentWeather weather={weather} loading={loading} values={values}/>
            <WeatherDetails weather={weather} loading={loading} precipUnit={precipUnit} windUnit={windUnit}/>
            <DailyForecast weather={weather} loading={loading}/>
         </div>
        <HourlyForecast weather={weather} loading={loading}/>
       </div>
    )
}