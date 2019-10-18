import React, { useContext } from 'react'
import { Button } from './Styles'
import {
  ScheduleContext,
  AnnouncementContext,
  ParnasContext,
} from '../globalState'

const SavetoDB = () => {
  const { updateScheduleDB } = useContext(ScheduleContext)
  const { updateAnnouncementDB } = useContext(AnnouncementContext)
  const { updateParnasDB } = useContext(ParnasContext)
  return (
    <Button
      onClick={() => {
        updateScheduleDB()
        updateAnnouncementDB()
        updateParnasDB()
        alert('Changes saved.')
      }}
    >
      Save
    </Button>
  )
}

export default SavetoDB
