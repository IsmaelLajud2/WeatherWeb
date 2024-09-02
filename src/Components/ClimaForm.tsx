import React, {useState} from 'react'
import '../styles/ClimaFormStyles.css'


interface ClimaFormProps{
    changeCity:(city:string)=>void ,
    setError:(error:string)=>void 
}

const ClimaForm : React.FC<ClimaFormProps> = ({changeCity,setError})  => {

    const [city, setCity] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setCity(e.target.value)
     } 

    const handleSubmit =(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (city.trim() === "" ) {
            setError("Debes ingresar una ciudad válida.");
            return
         
        }
       
        changeCity(city)
        setCity("")
       

    }

  return (
    <> 
    <div className='form-container'>

   
    <form className="form" onSubmit={handleSubmit}>
      <button>
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
      </button>
      <input value={city} onChange={handleChange} className="input" placeholder="Ingresa una ciudad"  type="text"/>
      <button className="reset" type="reset">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      </button>
  </form>
  </div>
    </>
    )
}

export default ClimaForm