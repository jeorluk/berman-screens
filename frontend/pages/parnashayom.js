import DisplayParnas from '../components/DisplayParnas'
import { ContextProvider } from '../globalState/state'

const MSDisplay = props => {
  return (
    <ContextProvider division="parnashayom">
      <DisplayParnas />
    </ContextProvider>
  )
}

export default MSDisplay
