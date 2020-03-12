import React, { useState } from 'react'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import { Card, Button, Form } from './Styles'
import { useMutation } from '@apollo/react-hooks'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($name: String!, $password: String!) {
    signin(name: $name, password: $password) {
      id
      name
    }
  }
`

const Signin = () => {
  const [signInForm, setValues] = useState({
    name: '',
    password: '',
  })

  const saveToState = e => {
    setValues({
      ...signInForm,
      [e.target.name]: e.target.value,
    })
  }

  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION)

  return (
    <Card>
      <Form
        method='post'
        onSubmit={e => {
          e.preventDefault()
          signin({
            variables: { name: signInForm.name, password: signInForm.password },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          })
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2 style={{ textAlign: 'center' }}>Please sign in!</h2>
          <Error error={error} />

          <input
            type='text'
            name='name'
            placeholder='name'
            autoComplete='username'
            value={signInForm.name}
            onChange={saveToState}
          />

          <input
            type='password'
            name='password'
            placeholder='password'
            autoComplete='current-password'
            value={signInForm.password}
            onChange={saveToState}
          />
          <Button type='submit'>Sign In!</Button>
        </fieldset>
      </Form>
    </Card>
  )
}

export default Signin
