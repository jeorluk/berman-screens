import Test from '../components/Test'
import SignInGate from '../components/SignInGate'

const TestPage = props => {
  return (
    <SignInGate>
      <Test />
    </SignInGate>
  )
}

export default TestPage
