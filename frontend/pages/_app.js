import App, { Container } from 'next/app'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBold,
  faAlignCenter,
  faAlignLeft,
  faTrash,
  faTint,
  faTintSlash,
} from '@fortawesome/free-solid-svg-icons'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { ContextProvider } from '../globalState/state'
import Page from '../components/Page'

class MyApp extends App {
  render() {
    library.add(
      faBold,
      faAlignCenter,
      faAlignLeft,
      faTrash,
      faTint,
      faTintSlash
    )
    const { Component, pageProps, apolloClient } = this.props
    return (
      <ApolloProvider client={apolloClient}>
        <ContextProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ContextProvider>
      </ApolloProvider>
    )
  }
}

export default withApolloClient(MyApp)

// import App, { Container } from 'next/app'
// // import { ApolloProvider } from '@apollo/react-hooks'
// import { ApolloProvider } from 'react-apollo'
// import withApollo from '../lib_old/withApollo'
// import Page from '../components/Page'
// import { ContextProvider } from '../globalState/state'

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {}
//     console.log(Component.getInitialProps)
//     if (Component.getInitialProps) {
//       console.log('calling component.getinitialprops')
//       pageProps = await Component.getInitialProps(ctx)
//     }
//     //this exposes the query to the user
//     pageProps.query = ctx.query
//     return { pageProps }
//   }

//   render() {
//     // console.log(this.props)
//     const { Component, pageProps, apollo } = this.props

//     return (
//       <Container>
//         <ApolloProvider client={apollo}>
//           <ContextProvider>
//             <Page>
//               <Component {...pageProps} />
//             </Page>
//           </ContextProvider>
//         </ApolloProvider>
//       </Container>
//     )
//   }
// }

// export default withApollo(MyApp)
