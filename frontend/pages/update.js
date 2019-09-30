import SignInGate from '../components/SignInGate'
import Update from '../components/Update'
import { ScheduleProvider } from '../globalState'
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
