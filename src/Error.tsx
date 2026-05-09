
import errorIcon from "/assets/images/icon-error.svg";
import retryIcon from "/assets/images/icon-retry.svg";

type ErrorProp = {
  callWeather: () => void
  error: string | null
}




export default function Error( {callWeather, error}: ErrorProp ) {
  const isNotFound = error === "not_found"
  
  return (
        
    
        <div className="flex flex-col justify-center items-center gap-2 mt-8">
            {isNotFound ? (<h2 className="font-heading text-3xl">No search results found.</h2>) 
            : (<div className="flex flex-col justify-center items-center gap-2 mt-8">
              <img src={errorIcon} alt="error icon" className="w-10"/>
            <h1 className="font-heading text-4xl">Something went wrong</h1>
            <p>We couldn't connect to the server(API error). Please <br/> try again in a few moments.</p>
            <button className="bg-neutral-800 rounded p-2 px-4 flex items-center justify-center gap-2 w-fit" onClick={callWeather}><img src={retryIcon} alt="retry icon" className="w-4"/><span>Retry</span></button>
            </div>)}
        </div>
       
   
  );
}
