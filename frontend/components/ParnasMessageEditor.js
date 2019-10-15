import React from 'react'
import styled from 'styled-components'
import { Card, Button } from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditorStyles = styled.div`
  position: relative;

  .deleteButton {
    position: absolute;
    top: 0;
    right: 0;
  }
`

const ParnasMessageEditor = ({ data, dataIndex, dispatch }) => {
  return (
    <EditorStyles>
      <Card>
        <Button className="deleteButton" onClick={e => console.log(e)}>
          <FontAwesomeIcon icon="trash" />
        </Button>
        <p>Order: {data.order}</p>
        <p>Message: {data.message}</p>
      </Card>
    </EditorStyles>
  )
}

export default ParnasMessageEditor
