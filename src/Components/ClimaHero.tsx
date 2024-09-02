import { useState,useEffect } from 'react'
import axios from 'axios'
import '../styles/App.css'
import Loading from './Loading'

import ClimaForm from './ClimaForm'
import { Carousel } from 'react-bootstrap'
import ClimaCard from './ClimaCard'
interface Clima {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
}

function ClimaHero() {

const [clima ,setClima] =useState<Clima | null>(null)
const [loading ,setLoading] =useState(true)
const [image ,setImage] =useState(null)  
const [error ,setError] =useState("")

const getClima = async (ciudad ="Barcelona") =>{
  try {
    if (!ciudad.trim()) {
      throw new Error('Debes ingresar una ciudad')
    }
    const response = await axios.get(`${import.meta.env.VITE_CLIMA_API_URL}&key=${import.meta.env.VITE_API_KEY_WEATHER}&q=${ciudad}&days=3&lang=es`)
    const data :Clima = response.data
    setClima(data)
    console.log(data)


    const imagenApi = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: ciudad, client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, per_page: 1 }
    });
    const imageUrl = imagenApi.data.results[0]?.urls?.regular;
    setImage(imageUrl);
    setLoading(false)
    setError("")


  } catch (error) {
    console.log(error)
    
    setError("No se pudo encontrar la ciudad. Por favor, intenta con otra.");

}
}

useEffect(() =>{
  getClima()
}, [])

const style = {
  backgroundImage: `url(${image})`,
}
const handleChange = (ciudad : string) => {
  getClima(ciudad)
}


 return (
    
<div className='app-container' style={style}>
  <h1 className='app-title'>Weather App ⛅ </h1>
 <ClimaForm changeCity={handleChange}  setError={setError}></ClimaForm>
   {error && <div  style={{ color: "#c0392b", textAlign: 'center' }}>{error}</div>}
    <div style={{ display: 'flex', justifyContent: 'center',alignItems:"center", gap: '20px', marginTop: '20px' }}></div>


{loading ? (
  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }} >
    <Loading />
  </div>
) : (
  clima && (
    <Carousel interval={100000}>
      {clima.forecast.forecastday.map((forecastItem, index) => (
        <Carousel.Item className='carousel-item' key={index}>
          <ClimaCard key={index} infoClima={{ location: clima.location, current: clima.current, forecastItem }} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
)}
</div>
)
}


export default ClimaHero
