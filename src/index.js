import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import SearchBar from './components/SearchBar'
import CurrentForecast from './components/CurrentForecast'
import DailyForecast from './components/DailyForecast'
import styled from 'styled-components/native'
import config from '../config'

const App = () => {
  const [city, setCity] = useState('')
  const [lat, setLat] = useState(43.6532)
  const [long, setLong] = useState(-79.3832)
  const [weather, setWeather] = useState({})

  const controller = new AbortController()
  const signal = controller.signal

  //fetch lat long by city
  const fetchLatLongHandler = () => {
    fetch(
      `${config.WEATHER_BASE_URL}/data/2.5/weather?q=${city}&APPID=${config.WEATHER_ID}`
    )
      .then(res => res.json())
      .then(data => {
        setLat(data.coord.lat)
        setLong(data.coord.lon)
      })
  }

  //updates the weather when lat long changes
  useEffect(() => {
    fetch(
      `${config.WEATHER_API_URL}/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${config.WEATHER_ID}`,
      { signal }
    )
      .then(res => res.json())
      .then(data => {
        setWeather(data)
      })
      .catch(err => {
        console.log('error', err)
      })
    return () => controller.abort()
  }, [lat, long])

  return (
    <>
      <SearchBar
        city={city}
        setCity={setCity}
        fetchLatLongHandler={fetchLatLongHandler}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        style={{ flex: 1 }}>
        <CurrentForecast currentWeather={weather} timezone={weather.timezone} />
        <FutureForecastContainer>
          {weather.daily ? (
            weather.daily.map((day, index) => {
              if (index !== 0) {
                return <DailyForecast key={day.dt} day={day} index={index} />
              }
            })
          ) : (
            <NoWeather>No Weather to show</NoWeather>
          )}
        </FutureForecastContainer>
      </ScrollView>
    </>
  )
}

const NoWeather = styled.Text`
  text-align: center;
  color: white;
`

const FutureForecastContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App
