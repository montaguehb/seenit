import Communities from "./Communities"
import { Button } from "@mui/material";

const Sidebar = () => {
  return (
    <>
      <Communities />
      <Button href="/communities/create">Create</Button>
    </>
  )
}

export default Sidebar