import React, { useContext } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Signout from './Signout'
import AnnouncementUpdater from './AnnouncementsUpdater'
import SchedulePicker from './SchedulePicker'
import { UserContext } from '../globalState'
import SavetoDB from './SavetoDB'
import ScheduleEditor from './ScheduleEditor'

const UpdatePaneStyles = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 75px 1fr;
  grid-template-areas:
    'header         header'
    'schedule announcements';
  /* justify-items: center; */
  overflow: auto;

  .header {
    font-size: 3rem;
    padding: 0 10px;
    grid-area: header;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    align-items: center;
  }

  .schedule {
    margin-bottom: 5px;
    grid-area: schedule;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, max-content);
    grid-gap: 10px;
    /* overflow: auto; */
  }

  .announcements {
    grid-area: announcements;
    /* overflow: auto; */
  }
`
const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateScheduleMutation($name: String!, $periods: [Json!]) {
    createSchedule(name: $name, periods: $periods) {
      id
      name
    }
  }
`

const UpdatePane = () => {
  const { user } = useContext(UserContext)

  return (
    <UpdatePaneStyles>
      <div className="header">
        <p>Logged in as: {user ? user.name : 'No user'}</p>
        <SavetoDB />
        {/* <Button>Save</Button> */}
        <Signout />
      </div>
      <div className="schedule">
        <SchedulePicker />
        <ScheduleEditor />
      </div>
      <div className="announcements">
        <AnnouncementUpdater />
      </div>
    </UpdatePaneStyles>
  )
}

export default UpdatePane
