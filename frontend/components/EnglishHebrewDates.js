import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment'

const DateStyles = styled.div`
  text-align: center;
  line-height: 1.5;
`

const EnglishHebrewDates = () => {
  const [hebrewDate, setHebrewDate] = useState('')

  useEffect(() => {
    getHebrewDate()
    const intervalID = setInterval(() => {
      this.getFormattedEnglishDate()
      this.getHebrewDate()
    }, 60 * 60 * 1000)

    return clearInterval(intervalID)
  }, [])

  const getHebrewDate = () => {
    const date = new Date()
    const gy = date.getFullYear()
    const gm = date.getMonth() + 1
    const gd = date.getDate()

    fetch(
      `https://www.hebcal.com/converter/?cfg=json&gy=${gy}&gm=${gm}&gd=${gd}&g2h=1`
    )
      .then(resp => resp.json())
      .then(myJson => {
        setHebrewDate(myJson.hebrew)
      })
  }

  return (
    <DateStyles>
      <Moment interval={1000 * 60 * 60} format='dddd, MMMM D, YYYY' />
      <div>{hebrewDate}</div>
      <Moment
        style={{ fontFamily: 'monospace' }}
        interval={1000}
        format='LTS'
      />
    </DateStyles>
  )
}

export default EnglishHebrewDates
