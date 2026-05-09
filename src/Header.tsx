import logo from "/assets/images/logo.svg";
import unitsIcon from "/assets/images/icon-units.svg";
import dropdownIcon from "/assets/images/icon-dropdown.svg";
import checkmarkIcon from "/assets/images/icon-checkmark.svg";
import { useState } from "react";

type HeaderProps = {
    setTempUnit?: (unit: string) => void
    setPrecipUnit?: (unit: string) => void
    setWindUnit?: (unit: string) => void
    tempUnit?: string
    precipUnit?: string
    windUnit?: string
}



export default function Header({ setTempUnit, setPrecipUnit, setWindUnit, tempUnit, precipUnit, windUnit }: HeaderProps) {

const [units, setShowUnits] = useState(false)
const [metric, setMetric] = useState('imperial')

function displayUnits() {
  setShowUnits(!units)
  console.log('show units working')
}

function switchMetric() {
  const newMetric = metric === 'imperial' ? 'metric' : 'imperial'
  setTempUnit?.(newMetric === 'imperial' ? 'fahrenheit' : 'celsius')
  setWindUnit?.(newMetric === 'imperial' ? 'mph' : 'kmh')
  setPrecipUnit?.(newMetric === 'imperial' ? 'inch' : 'mm')
  setMetric?.(newMetric)
}


  return (
    <header className="bg-neutral-900 flex items-center justify-between py-8">
        <div>
            <img src={logo} alt="App Logo" className="w-40"/>
        </div>
      <div className="font-sans relative">
        <button  className="bg-neutral-800 flex items-center gap-3 px-2 py-2 rounded hover:cursor-pointer" onClick={displayUnits}>
        <img src={unitsIcon} alt="Units Icon" />
        <span>Units</span>
        <img src={dropdownIcon} alt="Dropdown Icon" />
      </button>

      {units && (
        <div className="bg-neutral-800 flex flex-col  px-2 py-1 rounded w-60 absolute right-0 mt-2 z-20">
        <button className="bg-transparent hover:bg-neutral-700 rounded text-left p-1" onClick={() => 
          switchMetric()
        }>{metric === 'imperial' ? 'Switch to metric' : 'Switch to imperial'}</button>
        <ul>
          <li className="flex flex-col gap-2 text-left">
            <span className="text-neutral-500 text-sm">Temperature</span>
            <div className={`flex justify-between rounded p-1 ${tempUnit === "celsius" ? "bg-neutral-700" : ""}`} onClick={() => setTempUnit?.('celsius')}><span>Celsius(℃)</span>
            {tempUnit === "celsius"&& <img src={checkmarkIcon} alt="Checkmark Icon" />}
            </div>

            <div className={`flex justify-between rounded p-1 ${tempUnit === "fahrenheit" ? "bg-neutral-700" : ""}`} onClick={() => setTempUnit?.('fahrenheit')}><span>Farenheit(℉)</span>
            {tempUnit === "fahrenheit" && <img src={checkmarkIcon} alt="Checkmark Icon" />}
            </div>
          </li>

          <hr className="border-neutral-500  my-4"/>

          <li className="flex flex-col gap-2 text-left">
            <span className="text-neutral-500 text-sm">Wind Speed</span>
            <div className={`flex justify-between rounded p-1 ${windUnit === "kmh" ? "bg-neutral-700" : ""}`} onClick={() => setWindUnit?.('kmh')}><span>km/h</span>
            {windUnit === "kmh" && <img src={checkmarkIcon} alt="Checkmark Icon" />}
            </div>
            <div className={`flex justify-between rounded p-1 ${windUnit === "mph" ? "bg-neutral-700" : ""}`} onClick={() => setWindUnit?.('mph')}><span>mph</span>
            {windUnit === "mph" && <img src={checkmarkIcon} alt="Checkmark Icon" />}
            </div>
          </li>

          <hr className="border-neutral-500 my-4" />

          <li className="flex flex-col gap-2 text-left">
            <span className="text-neutral-500 text-sm">Precipitation</span>
            <div className={`flex justify-between rounded p-1 ${precipUnit === "mm" ? "bg-neutral-700" : ""}`} onClick={() => setPrecipUnit?.('mm')}><span>Millimetres(mm)</span>
            {precipUnit === "mm" && <img src={checkmarkIcon} alt="Checkmark Icon" />}
            </div>
            <div className={`flex justify-between rounded p-1 ${precipUnit === "inch" ? "bg-neutral-700" : ""}`} onClick={() => setPrecipUnit?.('inch')}><span>Inches(in)</span>
            {precipUnit === "inch" && <img src={checkmarkIcon} alt="Checkmark Icon" />}
            </div>
          </li>

        </ul>

        


      </div>
      )}
      
      </div>
    </header>
  );
}
