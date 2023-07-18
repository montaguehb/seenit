import Search from "./Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ProfileMenu from "./ProfileMenu";
import { Box } from "@mui/material";

const Nav = () => {
  return (
    <Box sx={{flexGrow: 2}}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h4" noWrap component="a" href="/" sx={{flexGrow: 1}}>
              Seenit
            </Typography>
            {/* <Search /> */}
            <ProfileMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Nav;
