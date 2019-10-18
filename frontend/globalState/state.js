import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ScheduleProvider } from './schedule'
import { UserProvider } from './user'
import { AnnouncementProvider } from './announcement'
import { ParnasProvider } from './parnas'
import { CURRENT_USER_QUERY, SINGLE_USER_QUERY } from '../components/User'
import Error from '../components/ErrorMessage'

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  )
}

function ContextProvider({ children, division }) {
  const [userData, setUserData] = useState()
  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
  } = useQuery(CURRENT_USER_QUERY, {
    skip: division,
  })

  const {
    data: singleUserData,
    loading: singleUserLoading,
    error: singleUserError,
  } = useQuery(SINGLE_USER_QUERY, {
    variables: { name: division },
    skip: !division,
    pollInterval: 500,
  })

  useEffect(() => {
    if (singleUserData) {
      setUserData(singleUserData.user)
    } else if (currentUserData) {
      setUserData(currentUserData.me)
    } else return
  }, [singleUserData, currentUserData])

  if (singleUserLoading || currentUserLoading) return <p>Loading...</p>
  if (singleUserError || currentUserError)
    return <Error error={singleUserError || currentUserError} />

  console.log(userData)
  return (
    <ProviderComposer
      contexts={[
        <ScheduleProvider userData={userData} />,
        <UserProvider />,
        <AnnouncementProvider userData={userData} />,
        <ParnasProvider userData={userData} />,
      ]}
    >
      {children}
    </ProviderComposer>
  )
}

export { ContextProvider }
