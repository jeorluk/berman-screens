import React from 'react'
import styled from 'styled-components'
import SchedulePane from './SchedulePane'
import UpdatePane from './UpdatePane'

const UpdateLayout = styled.div`
  height: 90vh;
  /* overflow: auto; */
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
`
const UpdateStandard = () => {
  return (
    <UpdateLayout>
      <SchedulePane />
      <UpdatePane />
    </UpdateLayout>
  )
}

export default UpdateStandard
