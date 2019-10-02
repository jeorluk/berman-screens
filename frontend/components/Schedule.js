import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ScheduleContext } from '../globalState'

const ScheduleStyles = styled.div`
  margin: 0;
  padding: 0;
  padding-left: 10px;
  font-size: 2.5rem;
  line-height: 1.1;

  h3 {
    margin: 5px;
    text-align: center;
  }

  @media only screen and (max-width: ${props => props.theme.smallBreak}) {
    width: 100%;
    font-size: 1.5rem;
  }
`

const Schedule = () => {
  const { activeSchedule } = useContext(ScheduleContext)
  if (!activeSchedule) {
    return <p>No schedule!</p>
  }

  return (
    <ScheduleStyles>
      <h3>{activeSchedule.name}</h3>
      <div dangerouslySetInnerHTML={{ __html: activeSchedule.periods }} />
    </ScheduleStyles>
  )
}

export default Schedule
