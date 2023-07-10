import Link from "next/link"
import Search from "./Search"

const Nav = () => {
  return (
    <div>
        <Search/>
        <Link href="/">Home</Link>
    </div>
  )
}

export default Nav