import  React, { useEffect, useState} from 'react'
import WeatherCard from './WeatherCard'
import './styles.css'

const Temperature = () => {
  const [searchValue, setSearchValue] = useState('visakhapatnam')
  const [tempInfo, setTempInfo] = useState({})

  // To taken API Website https://openweathermap.org/
  
  const getWeatherInfo = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1a97604f23add47da9f4bc7717d1e721`;
      const response = await fetch(url);
      const data = await response.json();
      const {temp, humidity, pressure} = data.main;
      const {main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const myNewWeatherReport = {
        temp, humidity, pressure, weathermood, name, speed, country, sunset,
      }
      setTempInfo(myNewWeatherReport)

    }catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    getWeatherInfo()
    // eslint-disable-next-line
  }, [])



  return (
    <>
      <div className='wrap'>
        <div className='search' >
          <input type = "search" placeholder='Search...' autoFocus id="search" className='searchTerm' value = {searchValue} onChange = {(event) => setSearchValue(event.target.value) }/>
          <button className='searchButton' type='button' onClick = {getWeatherInfo}>Search</button>
        </div>
      </div>

      {/*our temperature card*/}
      <WeatherCard tempInfo={tempInfo}/>
      
    </>
  )
}

export default Temperature
