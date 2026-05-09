type WeatherDetailsProps = {
    weather: any;
    loading: boolean;
    precipUnit: string;
    windUnit: string;
}

export default function WeatherDetails({weather, loading, precipUnit, windUnit}: WeatherDetailsProps) {
    if (loading) {
        return (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center mt-6 mb-8 justify-between">
            <div className="bg-neutral-800 rounded flex flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2">
                <span className="text-sm text-neutral-400">Feels like</span>
                <p className="text-3xl">---</p>
            </div>

            <div className="bg-neutral-800 rounded flex flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2">
                <span className="text-sm text-neutral-400">Humidity</span>
                <p className="text-3xl">---</p>
            </div>

            <div className="bg-neutral-800 rounded flex
            
            
             flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2">
                <span className="text-sm text-neutral-400">Wind</span>
                <p className="text-3xl">---</p>
            </div>

            <div className="bg-neutral-800 rounded flex flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2">
                <span className="text-sm text-neutral-400">Precipitation</span>
                <p className="text-3xl">---</p>
            </div>

        </div>
        )
    }

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center mt-6 mb-8 justify-between">
            <div className="bg-neutral-800 rounded flex flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2 border border-neutral-600">
                <span className="text-sm text-neutral-200">Feels like</span>
                <p className="text-3xl font-thin">{weather.current.apparent_temperature}&deg;</p>
            </div>

            <div className="bg-neutral-800 rounded flex flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2 border border-neutral-600">
                <span className="text-sm text-neutral-200">Humidity</span>
                <p className="text-3xl font-thin">{weather.current.relative_humidity_2m}%</p>
            </div>

            <div className="bg-neutral-800 rounded flex
            
            
             flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2 border border-neutral-600">
                <span className="text-sm text-neutral-200">Wind</span>
                <p className="text-3xl font-thin">{weather.current.wind_speed_10m
} <span>{windUnit}</span></p>
            </div>

            <div className="bg-neutral-800 rounded flex flex-col gap-4 items-start py-4 flex-1 min-w-[100px] px-2 border border-neutral-600">
                <span className="text-sm text-neutral-200">Precipitation</span>
                <p className="text-3xl font-thin">{weather.current.precipitation}<span className="ml-1">{precipUnit}</span></p>
            </div>

        </div>
    )
}