import React from 'react'
import styled from 'styled-components/native'

const ForecastSearch = ({ city, setCity, fetchLatLongHandler }) => {
  const handleSubmit = e => {
    fetchLatLongHandler()
  }

  return (
    <Container>
      <SearchBy>
        <ButtonLabel>Search By</ButtonLabel>
        <Buttons
          title="City"
          color={'rgba(255, 255, 255, 0.6)'}
          accessibilityLabel="Search Weather By City"
        />
        <Buttons
          title="Postal Code/Zip"
          color={'rgba(255, 255, 255, 0.6)'}
          accessibilityLabel="Search Weather By ZIP/Postal Code"
        />
      </SearchBy>

      <SearchCity
        onChangeText={setCity}
        value={city}
        placeholder={'Search By City'}
        onSubmitEditing={handleSubmit}
      />
    </Container>
  )
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`

const Buttons = styled.Button`
  color: black;
  background-color: gray;
`

const SearchBy = styled.View`
  display: flex;
  flex-direction: row;
  color: white;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  max-width: 700px;
`

const ButtonLabel = styled.Text`
  color: white;
  margin-right: 10px;
`

const SearchCity = styled.TextInput`
  height: 50px;
  margin: 12px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 95%;
  max-width: 700px;
`

export default ForecastSearch
