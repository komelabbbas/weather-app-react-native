import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { ScrollView } from 'react-native'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import CurrentForecast from './components/CurrentForecast'
import DailyForecast from './components/DailyForecast'
import styled from 'styled-components/native'
import config from '../config'
import { showNotification } from './utils/notification'

const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})

  const searchByLatLong = async coord => {
    try {
      const response = await axios.get(
        `${config.WEATHER_API_URL}/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${config.WEATHER_ID}&units=metric`
      )
      setWeather(response.data)
    } catch (err) {}
  }

  const searchByCity = async () => {
    try {
      if (city.length <= 1) {
        return
      }

      const response = await axios.get(
        `${config.WEATHER_BASE_URL}/data/2.5/weather?q=${city}&APPID=${config.WEATHER_ID}`
      )
      searchByLatLong(response.data?.coord)
    } catch (err) {
      const message = err?.response?.data?.message
      if (message) {
        showNotification({ message, type: 'error' })
      }
    }
  }

  const fetchUserCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('status', status)
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const coords = {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      }

      const response = await axios.get(
        `${config.WEATHER_BASE_URL}/data/2.5/weather?appid=${config.WEATHER_ID}&units=imperial&lat=${coords.lat}&lon=${coords.lon}`
      )
      const city = response.data.name
      setCity(city)
      searchByLatLong(coords)
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    fetchUserCurrentLocation()
    return () => {}
  }, [])
  return (
    <>
      <SearchBar city={city} setCity={setCity} searchByCity={searchByCity} />
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
