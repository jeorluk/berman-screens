import React, { useState, useContext, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ParnasContext, UserContext } from '../globalState'
import SavetoDB from './SavetoDB'
import Signout from './Signout'
import { Button } from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ParnasMessageEditor from './ParnasMessageEditor'

const ParnasUpdaterStyles = styled.div`
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
`

const ParnasList = styled.div`
  padding: 8px;
`

const EditButton = props => {
  return (
    <Button
      className="editButton"
      key={props.cmd}
      onMouseDown={evt => {
        evt.preventDefault() // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg) // Send the command to the browser
      }}
    >
      <FontAwesomeIcon icon={props.name} color={props.color || 'white'} />
    </Button>
  )
}

const ParnasUpdater = () => {
  const themeContext = useContext(ThemeContext)
  const { user } = useContext(UserContext)
  const { messages, dispatch } = useContext(ParnasContext)
  const [localParnas, setLocalParnas] = useState([])

  useEffect(() => {
    if (messages) {
      console.log('rerender')
      setLocalParnas(messages)
    }
  }, [messages])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    console.log('drag ended')
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newMessages = [...localParnas]
    const movedMessage = newMessages.splice(source.index, 1)[0]
    newMessages.splice(destination.index, 0, movedMessage)

    setLocalParnas(newMessages)
    dispatch({ type: 'UPDATE_ORDER', payload: newMessages })
  }

  if (!messages || !user) {
    return <p>Loading...</p>
  }
  return (
    <ParnasUpdaterStyles>
      <div className="header">
        <p>Logged in as: {user ? user.name : 'No user'}</p>
        <SavetoDB />
        <Signout />
      </div>
      <div className="buttonRow">
        <EditButton name="bold" cmd="bold" />
        <EditButton name="align-center" cmd="justifyCenter" />
        <EditButton name="align-left" cmd="justifyLeft" />
        <EditButton
          name="tint"
          cmd="foreColor"
          color={themeContext.orange}
          arg={themeContext.orange}
        />
        <EditButton
          name="tint-slash"
          cmd="foreColor"
          color={themeContext.orange}
          arg={themeContext.primary}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="parnasList">
          {provided => (
            <ParnasList ref={provided.innerRef} {...provided.droppableProps}>
              {messages.map((message, index) => (
                <ParnasMessageEditor
                  key={message.id}
                  dataIndex={index}
                  data={message}
                />
              ))}
              {provided.placeholder}
            </ParnasList>
          )}
        </Droppable>
      </DragDropContext>

      <div></div>
      <Button onClick={() => dispatch({ type: 'ADD_MESSAGE' })}>
        Add Page
      </Button>
    </ParnasUpdaterStyles>
  )
}

export default ParnasUpdater
