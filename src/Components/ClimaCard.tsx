

import '../styles/ClimaCardStyles.css'

interface ClimaCardProps {
  infoClima: {
    location: {
      name: string;
      region: string;
      country: string;
      localtime: string;
    };
    current: {
      condition: {
        icon: string;
      };
    };
    forecastItem: {
      astro:{
        sunrise:string,
        sunset:string
      }
      date: string;
      day: {
        avghumidity: number;
        condition: {
          text: string;
          icon:string
        };
        daily_chance_of_rain: number;
        mintemp_c: number;
        mintemp_f: number;
        maxtemp_c: number;
        maxtemp_f: number;
      };
    };
  };
}


const ClimaCard: React.FC<ClimaCardProps> = ({ infoClima }) => {

  const location = infoClima?.location;
  const current = infoClima?.current;
  const {forecastItem} = infoClima



  const configTime = (localTime:string) => {
    const dateObj = new Date(localTime)
    let hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear()

    const amPM = hours >= 12 ? "PM" : "AM";
    hours = hours % 12
    hours = hours ? hours : 12


    const formatedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

    const formatedDate = `${day}-${month}-${year}`

    return { time: formatedTime, amPM: amPM, date: formatedDate }
  }


const forecastDateObj = configTime(forecastItem?.date)


  const { time,  amPM } = configTime(location?.localtime)

  
  return (




    <div className="clima-card" >
      <div className="clima-card-content" >
    

        <div className="clima-card-body">
        
          <p className="clima-card-text-time">Día: {forecastDateObj.date}</p>

          <h2 className="clima-card-title">{location?.name}, {location?.region} , {location?.country}</h2>
          <h1 className="clima-card-text">Humedad : {forecastItem.day?.avghumidity} %</h1>
          <p className="clima-card-text">Condición: {forecastItem?.day?.condition?.text}<img width='40px' src={`http:${forecastItem?.day?.condition.icon}`}/>
          </p>
          <p className="clima-card-text">Hora Local: {time} {amPM} <img src={`http:${current?.condition.icon}`} width='45px' /></p>
          <p className="clima-card-text">Probabilidad de lluvia : {forecastItem?.day?.daily_chance_of_rain} %</p>
          <p className="clima-card-text">Mínima: {forecastItem?.day?.mintemp_c}°C , {forecastItem?.day?.mintemp_f}ºF</p>
          <p className="clima-card-text">Maxima: {forecastItem?.day?.maxtemp_c}°C ,  {forecastItem?.day?.maxtemp_f}ºF</p>
          <p className='clima-card-text'>Amanecer: {forecastItem?.astro?.sunrise} 🌅 </p>
          <p className='clima-card-text'>Atardecer: {forecastItem?.astro?.sunset} 🌆 </p>


        </div>

      </div>
    </div>
  )
}

export default ClimaCard