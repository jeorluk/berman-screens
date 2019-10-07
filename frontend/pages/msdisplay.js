import Display from '../components/Display'
import { ContextProvider } from '../globalState/state'

const MSDisplay = props => {
  return (
    <ContextProvider division="middleschool">
      <Display />
    </ContextProvider>
  )
}

export default MSDisplay
