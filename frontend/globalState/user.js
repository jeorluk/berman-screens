import { createContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CURRENT_USER_QUERY } from '../components/User'
import Error from '../components/ErrorMessage'

export const UserContext = createContext()

export const UserProvider = props => {
  const [user, setUser] = useState()
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    onCompleted() {
      setUser(data.me)
    },
  })

  //   const updateUserDB = () => {
  //     console.log('UpdateUserDB Not needed')
  //   }

  if (loading) {
    console.log('Loading')
    return <p>Loading...</p>
  }
  if (error) return <Error error={error} />

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
