import Link from 'next/link'

const Index = () => (
  <div>
    <h1>Berman Screens</h1>
    <ul>
      <li>
        <Link href="/update">
          <a>Update Information</a>
        </Link>
      </li>
      <li>
        <Link href="/msdisplay">
          <a>Middle School Display Screen</a>
        </Link>
      </li>
      <li>
        <Link href="/usdisplay">
          <a>Upper School Display Screen</a>
        </Link>
      </li>
    </ul>
  </div>
)

export default Index
