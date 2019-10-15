import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'
import { Card, Button } from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentEditable from 'react-contenteditable'

const EditorStyles = styled.div`
  position: relative;
  margin: 5px;

  .deleteButton {
    position: absolute;
    top: 0;
    right: 0;
  }

  .editable {
    max-width: 90%;
    overflow: auto;
    padding: 0 10px;

    background-color: white;
    color: ${props => props.theme.primary};
    text-align: center;
    font-family: 'montserrat';
    font-size: 4rem;
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
`

const Handle = styled.div`
  margin: auto 0.25em;
  font-size: 3rem;
  color: ${props => props.theme.primary};

  &:hover {
    cursor: grab;
  }
`

const ParnasMessageEditor = ({ data, dataIndex, dispatch }) => {
  const [message, setMessage] = useState(data.message)

  const sanitizeConf = {
    allowedTags: ['div', 'b', 'p', 'br', 'font', 'span'],
    allowedAttributes: { '*': ['style', 'color'] },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/],
        'font-weight': [/^normal$/],
      },
    },
  }

  const sanitize = () => {
    setMessage(prevState => {
      return sanitizeHtml(prevState, sanitizeConf)
    })
  }

  return (
    <EditorStyles>
      <Draggable draggableId={data.id} index={dataIndex}>
        {provided => (
          <Card {...provided.draggableProps} ref={provided.innerRef}>
            <Handle {...provided.dragHandleProps}>:::</Handle>
            <Button className="deleteButton" onClick={e => console.log(e)}>
              <FontAwesomeIcon icon="trash" />
            </Button>
            <ContentEditable
              className="editable"
              //   html={editSchedule.periods} // innerHTML of the editable div
              html={message}
              tagName="pre"
              // disabled={!this.state.editable} // use true to disable edition
              onChange={e => {
                console.log(e.target.value)
                setMessage(e.target.value)
                //setEditSchedule({ ...editSchedule, periods: e.target.value })
                // setHtml(e.target.value)
                //setEditScheduleDirty(true)
              }} // handle innerHTML change
              onBlur={() => {
                sanitize()
              }}
            />
          </Card>
        )}
      </Draggable>
    </EditorStyles>
  )
}

export default ParnasMessageEditor
