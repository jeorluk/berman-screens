import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Draggable } from 'react-beautiful-dnd'
import { Button, Card } from './Styles'

const AnnouncementStyles = styled.div`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  /* justify-items: left; */

  .buttonRow {
    width: 100%;
    display: flex;
  }

  .deleteButton {
    margin-left: auto;
  }
  .fileInput {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  textarea {
    width: 100%;
    resize: none;
  }

  img {
    margin: auto;
    width: 70%;
    max-width: 400px;
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
const uploadFile = async (e, dataindex, dispatch) => {
  const file = e.target.files[0]
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'berman')

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/orlukj/image/upload',
    {
      method: 'POST',
      body: data,
    }
  )

  if (res.ok) {
    const fileInfo = await res.json()
    dispatch({
      type: 'UPDATE_ITEMS',
      index: dataindex,
      items: fileInfo.secure_url,
    })
  } else {
    alert('Something went wrong. Maybe the image was too large.')
  }
}

// const Announcement = ({ data, dataindex, dragStart, dragEnd, dispatch }) => {
const Announcement = ({ data, dataindex, dispatch }) => {
  return (
    <Draggable draggableId={data.id} index={dataindex}>
      {provided => (
        <AnnouncementStyles>
          <Card
            className="announcementCard"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="buttonRow">
              <Handle {...provided.dragHandleProps}>:::</Handle>

              <Button
                onClick={e => {
                  dispatch({ type: 'UPDATE_TYPE', index: dataindex })
                }}
              >
                Switch to {data.isLinkToImage ? 'text' : 'image/PDF'}
              </Button>

              {data.isLinkToImage && (
                <>
                  <Button>
                    <label htmlFor={dataindex}>Choose a File</label>
                  </Button>
                  <input
                    className="fileInput"
                    type="file"
                    id={dataindex}
                    name="file"
                    placeholder="Upload an image or PDF"
                    onChange={e => {
                      uploadFile(e, dataindex, dispatch)
                    }}
                  />
                </>
              )}
              <Button
                className="deleteButton"
                onClick={e =>
                  dispatch({ type: 'DELETE_ANNOUNCEMENT', index: dataindex })
                }
              >
                <FontAwesomeIcon icon="trash" />
              </Button>
            </div>

            {data.isLinkToImage ? (
              <>
                {data.items.length > 0 && (
                  <img src={data.items} alt="Upload Preview" />
                )}
              </>
            ) : (
              <div>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_NAME',
                      index: dataindex,
                      title: e.target.value,
                    })
                  }
                  placeholder="Screen Name"
                />

                <textarea
                  rows="8"
                  name="items"
                  value={data.items.join('\n')}
                  placeholder="Add some announcements"
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_ITEMS',
                      index: dataindex,
                      items: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </Card>
        </AnnouncementStyles>
      )}
    </Draggable>
  )
}

export default Announcement
