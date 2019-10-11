import styled from 'styled-components'
import { CURRENT_USER_QUERY } from './User'
import Signin from './Signin'
import { useQuery } from '@apollo/react-hooks'
import Error from './ErrorMessage'

const StyledSigninDiv = styled.div`
  margin: auto;
  margin-top: 150px;

  width: 300px;
`

const SignInGate = props => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    onCompleted: () => {
      console.log('query completed')
      console.log(data)
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <Error error={error} />

  if (!data.me) {
    return (
      <StyledSigninDiv>
        <Signin />
      </StyledSigninDiv>
    )
  }
  return props.children
}

export default SignInGate
