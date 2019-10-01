import React from 'react'
import styled from 'styled-components'
import SchedulePane from './SchedulePane'
import MainScreenData from './MainScreenData'

const DisplayLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;

  #mainContent {
    color: ${props => props.theme.primary};
    background: ${props => props.theme.secondary};
    font-size: 50px;
  }

  #logo {
    height: 200px;
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
`
const Display = props => {
  const { division } = props
  // const { loading: userLoading, error: userError, data: userData } = useQuery(
  //   SINGLE_USER_QUERY,
  //   {
  //     variables: { name: division },
  //   }
  // )
  // console.log(userData)

  // if (userLoading) return <h2>Loading...</h2>
  // if (userError) return { userError }
  return (
    <DisplayLayout>
      <SchedulePane />
      <div id="mainContent">
        <MainScreenData />
      </div>
      <img id="logo" src="static/BermanLogo.jpg" alt="Berman Logo" />
    </DisplayLayout>
  )
}

export default Display
