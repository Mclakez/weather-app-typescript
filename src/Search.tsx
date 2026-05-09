import searchIcon from "/assets/images/icon-search.svg";
import { useState } from 'react'
import type { SelectedCity } from "./App";

type SearchProps = {
    setCity: (unit: string) => void;
    onAction: (unit: string) => Promise<void>;
    onSelect: (unit: SelectedCity) => void;

}

export default function Search({ setCity, onAction, onSelect}: SearchProps) {
    
    const [citySearch, setCitySearch] = useState("")
    const [citySuggestions, setCitySuggestions] = useState<SelectedCity[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
async function getCitySearchDetails(e: React.ChangeEvent<HTMLInputElement>) {
            let value = e.target.value
            setCitySearch(value)
       
            if (value.length <= 2) {
                setCitySuggestions([])
                return
            } else {
                 setError(null)
            try {
                
                setLoading(true)
                const cityRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5&language=en&format=json`)
                const cityData = await cityRes.json()
                
                setCitySuggestions(cityData.results || [])
                // console.log(citySuggestions)
                
    
            } catch (error) {
                setError(`${error}, Something went wrong . Check your API`)
            } finally {
                setLoading(false)
            }
            }
           
    }



    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
            <div className="relative w-full md:w-[40%]">
                <img src={searchIcon} alt="Search Icon" className="absolute left-4 top-1/2 -translate-y-1/2"/>
                <input 
                placeholder="Search for a place..."
                type="text"
                className="bg-neutral-800 px-12 py-2 rounded-lg w-full"
                // value={city} 
                // onChange={e => setCity(e.target.value)}

                value={citySearch} 
                onChange={e => getCitySearchDetails(e)}
                />

                {loading ? (<ul className="bg-neutral-800 flex flex-col gap-2 px-2 py-1 rounded-lg w-full absolute right-0 mt-2">
                            
                            <li className="flex gap-2 text-left bg-neutral-700 rounded-lg p-1 items-center"><SearchLoader /><span>Search in progress</span></li>
                    </ul>) :  (citySuggestions.length > 0 && (
                    <ul className="bg-neutral-800 flex flex-col gap-2 px-2 py-1 rounded-lg w-full absolute right-0 mt-2">
                        {citySuggestions.map(city => (
                            <li key={city.id} className="flex flex-col gap-2 text-left hover:bg-neutral-700 rounded-md p-1" onClick={() => 
                                {
                                setCitySearch(`${city.name}, ${city.country}`)
                                setCity(city.name)
                                setCitySuggestions([])
                                onSelect(city)
                            }
                            }>{city.name},{city.country}</li>
                        ))}
                    </ul>
                ))}

                

        </div>
            {/* <button className="bg-blue-700 py-2 px-4 rounded" onClick={() => { onAction()}}>Search</button> */}
            <button className="bg-blue-700 py-2 px-4 rounded-lg w-full md:w-fit font-sans focus-visible:ring-4 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1b4c]" onClick={() => { 
                onAction(citySearch)
                setCity(citySearch)
                setCitySuggestions([])
                }}>Search</button>
        </div>
    )
}

function SearchLoader() {
    const dots = [
        { cx: 0,   cy: -32, delay: 0    },
        { cx: 16,  cy: -27, delay: 0.1  },
        { cx: 28,  cy: -14, delay: 0.2  },
        { cx: 32,  cy: 0,   delay: 0.3  },
        { cx: 28,  cy: 14,  delay: 0.4  },
        { cx: 16,  cy: 27,  delay: 0.5  },
        { cx: 0,   cy: 32,  delay: 0.6  },
        { cx: -16, cy: 27,  delay: 0.7  },
        { cx: -28, cy: 14,  delay: 0.8  },
        { cx: -32, cy: 0,   delay: 0.9  },
        { cx: -28, cy: -14, delay: 1.0  },
    ]

    return (
        <svg width="16" height="16" viewBox="-40 -40 80 80">
            {dots.map((dot, i) => (
                <circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="4"
                    fill="currentColor"
                    style={{
                        animation: "fade 1.2s ease-in-out infinite",
                        animationDelay: `${dot.delay}s`,
                        opacity: 0.15
                    }}
                />
            ))}
            <style>{`
                @keyframes fade {
                    0%, 100% { opacity: 0.15; }
                    50%       { opacity: 1; }
                }
            `}</style>
        </svg>
    )
}