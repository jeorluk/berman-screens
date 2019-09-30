import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { CURRENT_USER_QUERY } from './User'
import { ScheduleContext, UserContext } from '../globalState/index'
import SchedulePane from './SchedulePane'
import UpdatePane from './UpdatePane'
import { useQuery } from '@apollo/react-hooks'

const UpdateLayout = styled.div`
  height: 90vh;
  /* overflow: auto; */
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
`
const Update = () => {
  return (
    <UpdateLayout>
      <SchedulePane />
      <UpdatePane />
    </UpdateLayout>
  )
}

export default Update
