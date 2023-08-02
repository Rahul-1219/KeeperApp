import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { firebaseAuth } from "../utils/firbase-config";
import { onAuthStateChanged } from "firebase/auth";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("undefined");

  const navigate = useNavigate();

  function handleClick() {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else navigate("/login");
    });
    setIsExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const submitNote = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/add`, {
        email,
        data: note,
      });
    } catch (error) {
      console.log(error);
    }
    props.onAdd();
    setNote({
      title: "",
      content: "",
    });

    e.preventDefault();
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Tooltip title="Add Note">
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </Tooltip>
      </form>
    </div>
  );
}

export default CreateArea;
