import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Error from './ErrorMessage'

const WEATHER_QUERY = gql`
  query WEATHER_QUERY {
    weather {
      temp
      icon
      description
    }
  }
`

const WeatherContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-areas:
    'temperature    icon'
    'temperature    description';
  justify-items: center;
  align-items: center;

  #temperature {
    grid-area: temperature;
    /* height: 100%; */
    font-size: 84px;
    line-height: 125px;
    vertical-align: middle;
  }

  #weatherIcon {
    grid-area: icon;
  }

  #weatherDescription {
    grid-area: description;
    text-transform: capitalize;
    text-align: center;
  }
`

const WeatherPanel = () => {
  const { data, loading, error } = useQuery(WEATHER_QUERY, {
    pollInterval: 1000,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />

  return (
    <WeatherContainer id="weatherContainer">
      <div id="temperature">
        {data.weather.temp}
        {'\u00b0'}
      </div>
      <img
        id="weatherIcon"
        src={`static/${data.weather.icon}.png`}
        alt="Weather Icon"
      />
      <div id="weatherDescription">
        {data.weather.description === 'smoke'
          ? 'mist'
          : data.weather.description}
      </div>
    </WeatherContainer>
  )
}

export default WeatherPanel
