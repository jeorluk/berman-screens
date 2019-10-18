import React, { useContext } from 'react'
import { UserContext } from '../globalState/index'
import UpdateStandard from './UpdateStandard'
import UpdateParnas from './UpdateParnas'

const Update = () => {
  const { user } = useContext(UserContext)
  if (!user) return <p>Loading...</p>
  return user.name === 'parnashayom' ? <UpdateParnas /> : <UpdateStandard />
}

export default Update
