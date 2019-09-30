import React from 'react'
import styled from 'styled-components'

const HandleStyles = styled.div`
  margin: auto 0.25em;
  font-size: 3rem;
  color: ${props => props.theme.primary};

  &:hover {
    cursor: grab;
  }
`

// function DragHandle(props) {
//   const { dragStart, dragEnd, index } = props
//   return (
//     <HandleStyles
//       draggable
//       onDragStart={e => {
//         e.dataTransfer.effectAllowed = 'move'
//         dragStart(e, index)
//       }}
//       onDragEnd={() => {
//         dragEnd()
//       }}
//     >
//       :::
//     </HandleStyles>
//   )
// }

function DragHandle(props) {
  const { dragStart, dragEnd, index } = props
  return <HandleStyles>:::</HandleStyles>
}
export default DragHandle
