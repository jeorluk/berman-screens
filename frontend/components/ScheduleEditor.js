import React, { useContext } from 'react'
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { Button, Card } from './Styles'
import { ScheduleContext } from '../globalState/'

const EditorStyles = styled.div`
  position: relative;
  width: 100%;
  /* text-align: center; */

  .editable {
    max-width: 100%;
    overflow: auto;
    padding: 0 10px;

    background: white;
    color: ${props => props.theme.primary};
    display: grid;
    grid-template-columns: 1fr;

    font-size: 2rem;
    font-weight: normal;
    line-height: 1.25;
    margin: 2px;
    border: 0;
    outline: 0;
    border: 1px solid grey;

    &:hover {
      margin-bottom: 1px;
      border: 2px solid black;
    }

    &:focus {
      /* margin: 0; */
      border: 2px solid ${props => props.theme.primaryLight};
    }
  }

  .editButton {
    margin: 2px;
  }

  .deleteButton {
    position: absolute;
    top: 0;
    right: 0;
  }
`
const ScheduleEditor = () => {
  const {
    editSchedule,
    setEditSchedule,
    setEditScheduleDirty,
    deleteScheduleFromDB,
  } = useContext(ScheduleContext)

  const sanitizeConf = {
    allowedTags: ['div', 'b', 'p', 'br'],
    // allowedAttributes: { a: ['href'], style: ['text-align'] },
    allowedAttributes: { '*': ['style'] },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
    },
  }

  const sanitize = () => {
    setEditSchedule(prevState => {
      return {
        ...prevState,
        periods: sanitizeHtml(prevState.periods, sanitizeConf),
      }
    })
  }

  if (!editSchedule) {
    return <Card>No schedule selected to edit</Card>
  }
  return (
    <Card>
      <EditorStyles>
        <Button
          className="deleteButton"
          onClick={() => {
            deleteScheduleFromDB()
          }}
        >
          <FontAwesomeIcon icon="trash" />
        </Button>
        <input
          type="text"
          name="scheduleName"
          placeholder="Schedule Name"
          value={editSchedule.name}
          onChange={e => {
            setEditSchedule({ ...editSchedule, name: e.target.value })
            setEditScheduleDirty(true)
          }}
        />
        <div className="buttonRow">
          <EditButton name="bold" cmd="bold" />
          <EditButton name="align-center" cmd="justifyCenter" />
          <EditButton name="align-left" cmd="justifyLeft" />
        </div>

        <ContentEditable
          className="editable"
          //   html={editSchedule.periods} // innerHTML of the editable div
          html={editSchedule.periods}
          tagName="pre"
          // disabled={!this.state.editable} // use true to disable edition
          onChange={e => {
            console.log(e.target.value)
            setEditSchedule({ ...editSchedule, periods: e.target.value })
            // setHtml(e.target.value)
            setEditScheduleDirty(true)
          }} // handle innerHTML change
          onBlur={() => {
            sanitize()
          }}
        />
      </EditorStyles>
    </Card>
  )
}

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
      <FontAwesomeIcon icon={props.name} color="white" />
      {/* {props.name || props.cmd} */}
    </Button>
  )
}
export default ScheduleEditor
