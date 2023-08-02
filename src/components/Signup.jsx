import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, provider } from "../utils/firbase-config";
import React, { useEffect, useState } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GoogleButton from "react-google-button";

function Signup() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [passwordNotFound, setPasswordNotFound] = useState(false);
  const [passwordChar, setPasswordChar] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => {
      return { ...prevFormValues, [name]: value };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formValues;
      email &&
        password &&
        (await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        ).catch((error) => {
          setPasswordChar(!passwordChar);
          console.log(error);
        }));
      !email && setEmailNotFound(!emailNotFound);
      !password && setPasswordNotFound(!passwordNotFound);
    } catch (err) {
      console.log(err);
    }

    onAuthStateChanged(firebaseAuth, (currentUSer) => {
      if (currentUSer) navigate("/");
    });
  };

  function handleLogin() {
    navigate("/login");
  }

  function removeError() {
    emailNotFound && setEmailNotFound(!emailNotFound);
    passwordNotFound && setPasswordNotFound(!passwordNotFound);
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      onAuthStateChanged(firebaseAuth, (currentUSer) => {
        if (currentUSer) navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-form-container">
      <Box
        className="register-form"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Zoom in={true}>
            <HighlightIcon fontSize="large" />
          </Zoom>
        </div>
        <div>
          <TextField
            type="email"
            name="email"
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange}
            onClick={removeError}
            label="Email"
            error={emailNotFound}
            helperText={emailNotFound ? "Enter the valid email" : ""}
          />
        </div>

        <div>
          <TextField
            type="password"
            name="password"
            autoComplete="current-password"
            value={formValues.password}
            onChange={handleChange}
            onClick={removeError}
            label="Password"
            error={passwordNotFound || passwordChar}
            helperText={
              passwordNotFound
                ? "Enter the correct password"
                : passwordChar
                ? "Password must be greater than 6 characters!"
                : ""
            }
          />
        </div>
        <Button onClick={handleSignUp} variant="contained">
          Sign Up
        </Button>
        <hr />
        <div>
          <Button
            type="button"
            onClick={handleLogin}
            variant="outlined"
            style={{
              border: "1px solid rgba(247, 197, 61, 0.4)",
              backgroundColor: "rgba(252, 252, 252, 0.2)",
              color: "#f5ba13",
            }}
          >
            Login
          </Button>
        </div>
        <div>
          <GoogleButton
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: "rgba(252, 252, 252, 0.2)",
              color: "#7e7d7d",
              width: "265px",
              marginLeft: "23px",
              marginTop: "15px",
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default Signup;
