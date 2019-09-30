import Link from 'next/link'
import App from 'next/app'

const Index = () => (
  <div>
    <h1>Berman Screens</h1>
    <p>
      Welcome to the Berman Screens site. Do you want the{' '}
      <Link href="/msdisplay">
        <a>Middle School Display Screen</a>
      </Link>{' '}
      or the{' '}
      <Link href="/update">
        <a>Update Screen</a>
      </Link>
      ?
    </p>
  </div>
)

export default Index
