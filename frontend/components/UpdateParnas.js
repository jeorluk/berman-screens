import React from 'react'
import styled from 'styled-components'
import ParnasUpdater from './ParnasUpdater'

const UpdateLayout = styled.div`
  height: 100vh;
  width: 100vw;
`
const UpdateStandard = () => {
  return (
    <UpdateLayout>
      <ParnasUpdater />
    </UpdateLayout>
  )
}

export default UpdateStandard
