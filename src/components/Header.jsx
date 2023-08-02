import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firbase-config";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    signOut(firebaseAuth).catch((err) => console.log(err));

    onAuthStateChanged(firebaseAuth, (currentUSer) => {
      if (currentUSer) navigate("/login");
    });
  };
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <Tooltip title="Logout">
        <Zoom in={true}>
          <Fab size="small" onClick={handleLogout}>
            <PowerSettingsNewIcon />
          </Fab>
        </Zoom>
      </Tooltip>
    </header>
  );
}

export default Header;
