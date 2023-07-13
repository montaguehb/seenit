import Link from "next/link"
import Search from "./Search"

const Nav = () => {
  return (
    <div>
        <Search/>
        <Link href="/">Home</Link>
        <br/>
        <Link href="/signup">Signup</Link>
        <br/>
        <Link href="/login">Login</Link>
        <br/>
        <Link href="/profile">Profile</Link>
    </div>
  )
}

export default Nav