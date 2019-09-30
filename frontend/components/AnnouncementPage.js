import React from 'react'
import styled from 'styled-components'

const AnnouncementPageStyles = styled.div`
  height: 100vh;
  width: 100%;

  h1 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  ul {
    margin-top: 15px;
    padding-top: 0;
    list-style: none;
  }

  li {
    margin-bottom: 40px;
  }

  .imageHolder {
    display: grid;
    height: 100%;
    width: 100%;
  }
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`

const AnnouncementPage = ({ screenLabel, items, isLinkToImage }) => {
  console.log(isLinkToImage)
  return (
    <AnnouncementPageStyles>
      {isLinkToImage ? (
        items.length > 0 && (
          <div className="imageHolder">
            <img src={items} alt="Upload Preview" />
          </div>
        )
      ) : (
        <div>
          <h1>{screenLabel}</h1>
          <ul>
            {items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </AnnouncementPageStyles>
  )
}

export default AnnouncementPage
