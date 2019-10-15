import React, { Component } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import Meta from './Meta'

const theme = {
  primary: '#001e60',
  primaryDark: '#000036',
  primaryLight: '#3e458e',

  secondary: '#ffffff',
  secondaryDark: '#cccccc',
  secondaryLight: '#ffffff',

  orange: 'rgb(241, 106, 42)',

  smallBreak: '768px',

  bs: `3px 0 6px rgba(0,0,0,.3)`,
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'montserrat';
    src: url('/static/Montserrat-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    height: 100vh;
    font-family: 'montserrat';
    font-weight: normal;
    font-style: normal;
    font-size: 1.5rem;
    background: ${theme.secondaryDark};
    color: ${theme.primary};
    padding: 0;
    margin: 0;
  }
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Meta />
          <GlobalStyle />
          {this.props.children}
        </div>
      </ThemeProvider>
    )
  }
}

export default Page
