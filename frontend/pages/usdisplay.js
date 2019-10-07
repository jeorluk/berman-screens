import Display from '../components/Display'
import { ContextProvider } from '../globalState/state'

const USDisplay = props => {
  return (
    <ContextProvider division="upperschool">
      <Display />
    </ContextProvider>
  )
}

export default USDisplay
