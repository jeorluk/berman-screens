import React from 'react'
import styled from 'styled-components'
import SchedulePane from './SchedulePane'
import MainScreenData from './MainScreenData'

const DisplayLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;

  #mainContent {
    position: relative;
    color: ${props => props.theme.primary};
    background: ${props => props.theme.secondary};
    font-size: 50px;
  }

  #logo {
    max-width: 150px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  @media only screen and (max-width: ${props => props.theme.smallBreak}) {
    grid-template-columns: 1fr;
  }
`
const Display = () => {
  return (
    <DisplayLayout>
      <SchedulePane />
      <div id="mainContent">
        <MainScreenData />
        <img id="logo" src="static/BermanLogo.jpg" alt="Berman Logo" />
      </div>
    </DisplayLayout>
  )
}

export default Display
