import React, { useContext } from 'react'
import styled from 'styled-components'
import { Card } from './Styles'
import { ScheduleContext, UserContext } from '../globalState'

const SchedulePickerStyles = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;

  #scheduleSelects {
    display: grid;
    grid-template-columns: auto 1fr;

    fieldset {
      display: contents;
    }
  }
`

const SchedulePicker = props => {
  const {
    activeSchedule,
    editSchedule,
    setActiveSchedule,
    setEditSchedule,
    setSelectedSchedulesDirty,
  } = useContext(ScheduleContext)
  const { user } = useContext(UserContext)

  return (
    <Card>
      <SchedulePickerStyles>
        <label htmlFor="activeSchedule">Active Schedule: </label>
        <select
          name="activeSchedule"
          value={activeSchedule ? activeSchedule.id : ''}
          onChange={e => {
            setActiveSchedule(
              user.schedules.filter(item => {
                return item.id.includes(e.target.value)
              })[0]
            )
            setSelectedSchedulesDirty(true)
          }}
        >
          <option value="" disabled>
            Select your option
          </option>

          {user
            ? user.schedules.map(scheduleName => {
                return (
                  <option key={scheduleName.id} value={scheduleName.id}>
                    {scheduleName.name}
                  </option>
                )
              })
            : null}
        </select>
        <label htmlFor="scheduleToEdit">Schedule To Edit: </label>
        <select
          name="scheduleToEdit"
          value={editSchedule ? editSchedule.id : ''}
          onChange={e => {
            if (e.target.value === 'CREATE_NEW_SCHEDULE') {
              setEditSchedule({ name: '', periods: '' })
            } else {
              setEditSchedule(
                user.schedules.filter(item => {
                  return item.id.includes(e.target.value)
                })[0]
              )
            }
            setSelectedSchedulesDirty(true)
          }}
        >
          <option value="" disabled>
            Select your option
          </option>
          <option value="CREATE_NEW_SCHEDULE">Add New Schedule...</option>
          {user
            ? user.schedules.map(scheduleName => {
                return (
                  <option key={scheduleName.id} value={scheduleName.id}>
                    {scheduleName.name}
                  </option>
                )
              })
            : null}
        </select>
      </SchedulePickerStyles>
    </Card>
  )
}

export default SchedulePicker
