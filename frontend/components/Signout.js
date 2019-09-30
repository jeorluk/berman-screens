import React, { Component } from 'react'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'
import { Button } from './Styles'
import { useMutation } from '@apollo/react-hooks'

const SIGNOUT_MUTATION = gql`
  mutation SignoutMutation {
    signout {
      message
    }
  }
`

const Signout = props => {
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION)

  return (
    <Button
      onClick={e => {
        signout({ refetchQueries: [{ query: CURRENT_USER_QUERY }] })
      }}
    >
      Signout
    </Button>
  )
}
export default Signout
