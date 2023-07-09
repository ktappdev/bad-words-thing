"use client";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Avatar, makeStyles } from "@mui/material/";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useClerk, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import Image from "next/image";

const useStyles = () => {
  const root = {};
  const avatar = {
    height: 50,
    width: 50,
  };
  return { root, avatar };
};

export default function MyUserButton() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !isSignedIn) {
    return <SignInButton />;
  }

  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const accountClicked = () => {
    router.push("/account");
    setAnchorEl(null);
  };
  const logoutClicked = () => {
    signOut();
    router.push("/");
    setAnchorEl(null);
  };

  return (
    <div id="this" className="h-8">
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
        className="h-full"
      >
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<ArrowDropDownIcon />}
          variant="text"
          className="text-black text-xs"
        >
          {user?.fullName}
          <Image
            className={"ml-2 shadow-xl rounded-full w-[24px] h-[24px]"}
            src={user?.imageUrl}
            alt="avatar"
            width={24}
            height={24}
          />
        </Button>
      </div>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={accountClicked}>My account</MenuItem>
        <MenuItem onClick={logoutClicked}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
