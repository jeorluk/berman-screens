import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const DateStyles = styled.div`
  text-align: center;
  line-height: 1.5;
`

const EnglishHebrewDates = () => {
  const [englishDate, setEnglishDate] = useState('')
  const [hebrewDate, setHebrewDate] = useState('')

  useEffect(() => {
    getFormattedEnglishDate()
    getHebrewDate()
    const intervalID = setInterval(() => {
      this.getFormattedEnglishDate()
      this.getHebrewDate()
    }, 60 * 60 * 1000)

    return clearInterval(intervalID)
  }, [])
  const getFormattedEnglishDate = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    const date = new Date()
    const weekday = date.getDay()
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    setEnglishDate(
      `${dayNames[weekday]}, ${monthNames[monthIndex]} ${day}, ${year}`
    )
  }

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
      <div>{englishDate}</div>
      <div>{hebrewDate}</div>
    </DateStyles>
  )
}

export default EnglishHebrewDates
