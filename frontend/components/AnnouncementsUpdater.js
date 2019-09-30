import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { AnnouncementContext } from '../globalState'
import Announcement from './Announcement'
import { Button } from './Styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const AnnouncementsUpdaterStyles = styled.div`
  width: 100%;
  margin: 0 5px;
`

const AnnouncementList = styled.div`
  padding: 8px;
`
const AnnouncementsUpdater = () => {
  const { announcements, dispatch } = useContext(AnnouncementContext)

  const [localAnnouncements, setLocalAnnouncements] = useState([])

  useEffect(() => {
    if (announcements) {
      setLocalAnnouncements(announcements)
    }
  }, [announcements])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newAnnouncements = [...localAnnouncements]
    const movedAnouncement = newAnnouncements.splice(source.index, 1)[0]
    newAnnouncements.splice(destination.index, 0, movedAnouncement)

    setLocalAnnouncements(newAnnouncements)
    dispatch({ type: 'UPDATE_ORDER', payload: newAnnouncements })
  }

  return (
    <AnnouncementsUpdaterStyles>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="announcementsList">
          {provided => (
            <AnnouncementList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {localAnnouncements.map((item, index) => {
                return (
                  <Announcement
                    key={item.id}
                    data={item}
                    dataindex={index}
                    dispatch={dispatch}
                  />
                )
              })}
              {provided.placeholder}
            </AnnouncementList>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={() => dispatch({ type: 'ADD_ANNOUNCEMENT' })}>
        Add Page
      </Button>
    </AnnouncementsUpdaterStyles>
  )
}

export default AnnouncementsUpdater
