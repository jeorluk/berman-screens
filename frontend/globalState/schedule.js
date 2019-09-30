import { createContext, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY, SINGLE_USER_QUERY } from '../components/User'

export const ScheduleContext = createContext()

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($activeScheduleId: ID, $editScheduleId: ID) {
    updateUser(
      activeScheduleId: $activeScheduleId
      editScheduleId: $editScheduleId
    ) {
      id
      name
      activeSchedule {
        id
        periods
        name
      }
    }
  }
`
const UPDATE_SCHEDULE_MUTATION = gql`
  mutation UpdateSchedule($id: ID!, $name: String!, $periods: String!) {
    updateSchedule(id: $id, name: $name, periods: $periods) {
      id
      name
    }
  }
`

const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateSchedule($name: String!, $periods: String!) {
    createSchedule(name: $name, periods: $periods) {
      id
      name
    }
  }
`

const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(id: $id) {
      id
      name
    }
  }
`

export const ScheduleProvider = ({ children, userData }) => {
  const [activeSchedule, setActiveSchedule] = useState()
  const [editSchedule, setEditSchedule] = useState()
  const [selectedSchedulesDirty, setSelectedSchedulesDirty] = useState(false)
  const [editScheduleDirty, setEditScheduleDirty] = useState(false)

  useEffect(() => {
    if (userData) {
      setActiveSchedule(userData.activeSchedule)
      setEditSchedule(userData.editSchedule)
    }
  }, [userData])

  const [updateUser] = useMutation(UPDATE_USER_MUTATION)
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE_MUTATION)
  const [createSchedule] = useMutation(CREATE_SCHEDULE_MUTATION)
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION)

  //Add active and edit schedule ids to updates for updateUser mutation
  const updates = {}
  if (activeSchedule) {
    updates.activeScheduleId = activeSchedule.id
  }
  if (editSchedule) {
    updates.editScheduleId = editSchedule.id
  }

  const deleteScheduleFromDB = () => {
    //Delete the selected editSchedule
    deleteSchedule({
      variables: { id: editSchedule.id },
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    })

    //Edit schedule is not dirty since it was deleted
    setEditScheduleDirty(false)
  }

  const updateScheduleDB = () => {
    //If either schedule has changed, connect schedules to User
    if (selectedSchedulesDirty) {
      updateUser({
        variables: updates,
        refetchQueries: [
          {
            query: CURRENT_USER_QUERY,
          },
        ],
      })
      //Reset dirty flag
      setSelectedSchedulesDirty(false)
    }

    //If editSchedule has changed, update the changed schedule
    if (editScheduleDirty) {
      editSchedule.id
        ? updateSchedule({
            variables: editSchedule,
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          })
        : createSchedule({
            variables: editSchedule,
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          })
      //Reset dirty flag
      setEditScheduleDirty(false)
    }
  }

  return (
    <ScheduleContext.Provider
      value={{
        activeSchedule,
        setActiveSchedule,
        editSchedule,
        setEditSchedule,
        updateScheduleDB,
        setSelectedSchedulesDirty,
        setEditScheduleDirty,
        deleteScheduleFromDB,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}
