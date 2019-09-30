import React from 'react'
import styled from 'styled-components'
import EnglishHebrewDates from './EnglishHebrewDates'
import Schedule from './Schedule'
import WeatherPanel from './WeatherPanel'

const SchedulePaneStyles = styled.div`
  font-size: 2.7rem;
  height: 100vh;
  width: 450px;
  overflow: auto;
  /* padding: 10px 0; */
  background: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 2px 1fr auto;
  hr {
    height: 2px;
    width: 100%;
    margin: 0;
    color: ${props => props.theme.secondary};
  }
`

const SchedulePane = props => {
  return (
    <SchedulePaneStyles>
      <EnglishHebrewDates />
      <hr />
      <Schedule />
      <WeatherPanel />
    </SchedulePaneStyles>
  )
}

export default SchedulePane
