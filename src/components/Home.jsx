import React, { useEffect, useState, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { firebaseAuth } from "../utils/firbase-config";
import { onAuthStateChanged } from "firebase/auth";

function Home() {
  const [notes, setNotes] = useState([]);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();

  const memoizedFooter = useMemo(() => <Footer />, []);
  const memoizedHeader = useMemo(() => <Header />, []);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      try {
        if (currentUser) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/user/notes/` +
              currentUser.email
          );
          const currentNotes = response.data.notes;
          currentNotes && setNotes(currentNotes);
          setEmail(currentUser.email);
        } else navigate("/login");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteNote = (index) => {
    const noteId = notes[index]._id;
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/api/user/delete`, {
        email,
        noteId,
      })
      .then((response) => {
        setNotes(response.data);
        getNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {memoizedHeader}
      <CreateArea onAdd={getNotes} />
      {notes &&
        notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={() => {
                deleteNote(index);
              }}
              afterDelete={getNotes}
            />
          );
        })}
      {memoizedFooter}
    </div>
  );
}

export default Home;
