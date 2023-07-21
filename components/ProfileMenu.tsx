"use client";
import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "./AuthProvider";
import { Button } from "@mui/material";
import { getCookie } from "@/lib/getters";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

const sendRequest = async (url: string) => {
  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      "Content-Type": "application/json",
    },
  });
  if (resp.ok) {
    return "Logout succesful";
  } else {
    const error_message = await resp.json();
    const error = new Error(error_message.error);
    throw error;
  }
};

const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();

  const { trigger, data, isMutating, error } = useSWRMutation(
    "/api/logout",
    sendRequest
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    if (data) {
        router.push("/");
        updateUser(null);
    }
  }, [data]);

  return user ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Button href="/profile">
            <Typography textAlign="center">Profile</Typography>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Button onClick={() => trigger()}>
            <Typography textAlign="center">logout</Typography>
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Button href="/login" sx={{ color: "white" }} variant="text">
      login
    </Button>
  );
};

export default ProfileMenu;
