import React, { useContext } from 'react'
import { Button } from './Styles'
import { ScheduleContext, AnnouncementContext } from '../globalState'

const SavetoDB = () => {
  const { updateScheduleDB } = useContext(ScheduleContext)
  const { updateAnnouncementDB } = useContext(AnnouncementContext)
  return (
    <Button
      onClick={() => {
        updateScheduleDB()
        updateAnnouncementDB()
        alert('Changes saved.')
      }}
    >
      Save
    </Button>
  )
}

export default SavetoDB
