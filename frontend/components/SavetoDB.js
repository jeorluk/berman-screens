import React, { useContext } from 'react'
import { Button } from './Styles'
import { ScheduleContext, AnnouncementContext } from '../globalState'

const handleClick = () => {
  console.log('You clicked the new save button')
}
const SavetoDB = () => {
  const { updateScheduleDB } = useContext(ScheduleContext)
  const { updateAnnouncementDB } = useContext(AnnouncementContext)
  return (
    <Button
      onClick={() => {
        updateScheduleDB()
        updateAnnouncementDB()
      }}
    >
      Save
    </Button>
  )
}

export default SavetoDB
