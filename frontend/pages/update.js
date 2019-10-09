import SignInGate from '../components/SignInGate'
import Update from '../components/Update'
import { ContextProvider } from '../globalState/state'

const updatePage = payload => {
  return (
    <ContextProvider>
      <SignInGate>
        <Update />
      </SignInGate>
    </ContextProvider>
  )
}

export default updatePage
