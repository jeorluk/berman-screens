import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ParnasContext } from '../globalState'

const DisplayParnasStyles = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 1 rem;
  background: white;
  display: grid;
  grid-gap: 4rem;
  align-content: center;
  justify-items: center;

  font-size: 3.4vw;
  font-weight: 800;
  text-align: center;
  }
`

const DisplayParnas = () => {
  const { messages } = useContext(ParnasContext)

  const [pageArray, setPageArray] = useState([])
  const [visiblePageIndex, setVisiblePageIndex] = useState(0)

  useEffect(() => {
    const createdArray = createPageArray(messages)
    setPageArray(createdArray)
  }, [messages])

  useEffect(() => {
    const interval = setInterval(setVisibleIndex, 4000)
    console.log('set interval')
    console.table(pageArray)
    return () => {
      console.log('Clear interval')
      clearInterval(interval)
    }
  }, [pageArray])

  const setVisibleIndex = () => {
    if (pageArray.length > 0) {
      setVisiblePageIndex(previousIndex => {
        return (previousIndex + 1) % pageArray.length
      })
    } else setVisiblePageIndex(0)
  }

  const createPageArray = array => {
    const newArray = []
    newArray.push("<img src='static/weareberman.jpg' alt='We are Berman'/>")
    if (array) {
      array.map(message => {
        newArray.push(message.message)
      })
    }
    newArray.push(
      "<div>Parnas Hayom was established in loving memory of</div><div>Phyllis Himmelstein, z”l</div><div>great-aunt of two Berman graduates & K-4th grade teacher who had a very deep love and admiration for children.</div><div><i>To dedicate a day of learning,please stop by the front desk.</i></div><img src='static/binspired.jpg' alt='Be inspired'/>"
    )
    return newArray
  }

  return pageArray.map((item, index) => {
    return (
      <DisplayParnasStyles
        key={index}
        style={{
          display: index === visiblePageIndex ? '' : 'none',
        }}
        dangerouslySetInnerHTML={{ __html: item }}
      />
    )
  })
}
export default DisplayParnas