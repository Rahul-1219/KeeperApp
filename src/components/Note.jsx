import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function Note(props) {
  // useEffect(() => {
  //   reload();
  // }, []);

  function handleClick() {
    props.onDelete();
  }
  // function reload() {
  //   props.afterDelete();
  // }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Tooltip title="Delete">
        <Zoom in={true}>
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
        </Zoom>
      </Tooltip>
    </div>
  );
}

export default Note;
