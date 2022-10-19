import {Button, Container, TextField, Card} from '@mui/material/';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import React from "react";
import { useRouter } from 'next/router';

import {firestore} from "./api/Firebase";
import {addDoc, getDocs, collection} from "@firebase/firestore"

export default function signIn() {
  const [isShown, setIsShown] = useState(false);
  var err = "";
  const user_collection = collection(firestore, "users");
  const router = useRouter();

  const changestate = async(e) => {
    setIsShown(current => !current);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    let snapshot = await getDocs(user_collection);
    snapshot.forEach(docSnap => {
        var userdata = docSnap.data();
        if (userdata.name === document.getElementById("username").value && userdata.pass === document.getElementById("password").value) {
          router.push({
            pathname: '/home',
            query: { username: document.getElementById("username").value, pass: document.getElementById("password").value}
          }, '/home');
        }
    });
    document.getElementById("err").innerText = "User not found.";
  }
  const handleRegister = async(e) => {
    e.preventDefault();
    var canAdd = true;
    // password + confirm match
    if (document.getElementById("conf_password").value !== document.getElementById("register_password").value) {
        canAdd = false;
        err = "Passwords dont match.";
    }
    if (canAdd === true) {
      let snapshot = await getDocs(user_collection);
      snapshot.forEach(docSnap => {
          var userdata = docSnap.data();
          if (userdata.name === document.getElementById("register_username").value) {
              canAdd = false;
          }
      });
      err = "Username is not available.";
    }
    if (canAdd === true) {
        await addDoc(collection(firestore, "users"), {
            name: document.getElementById("register_username").value,
            pass: document.getElementById("register_password").value,
        });
        setIsShown(current => !current);
        router.push({
          pathname: '/home',
          query: { username: document.getElementById("register_username").value, pass: document.getElementById("register_password").value}
        }, '/home');
    }
    try {
      document.getElementById("err").innerText = err;
    } catch (e) {
      console.log(e);
    }
  }
  const Demo = async(e) => {
    e.preventDefault();
    document.getElementById("username").value = "demo";
    document.getElementById("password").value = "demo";
    handleLogin(e);
  }
  
  return (
    <>
      <Container id="main" className="App" style={{marginTop: "2em"}}>
        {!isShown && (
          <form onSubmit={handleLogin}>
            <Grid container spacing={2} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={6}>
                <Card variant="outlined">
                  <h1 style={{marginTop: "1em"}}>IssueTrack</h1>
                  <BugReportOutlinedIcon fontSize='large'/>
                  <h3 style={{marginTop: "2em"}}><u>Login</u></h3>
                  <TextField style={{marginTop: "1em"}} required id="username" label="Username" />
                  <br />
                  <TextField style={{marginTop: "2em"}} required id="password" label="Password" />
                  <br />
                  <Button style={{marginTop: "3em", marginBottom: "3em"}} type="submit" variant="contained" color="primary" size="large">submit</Button>
                  <br />
                  <p id="err"></p>
                </Card>
              </Grid>
              <Grid item={true} xs={12}>
                <Button style={{marginTop: "3em", marginBottom: "3em", marginRight: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={changestate}>Register</Button>
                <Button style={{marginTop: "3em", marginBottom: "3em", backgroundColor: "grey"}} variant="contained" size="large" onClick={Demo}>Demo Login</Button>
              </Grid>
            </Grid>
          </form>
        )}
        {isShown && (
          <form onSubmit={handleRegister}>
            <Grid container spacing={2} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={6}>
                <Card variant="outlined">
                  <h1 style={{marginTop: "1em"}}>IssueTrack</h1>
                  <BugReportOutlinedIcon fontSize='large'/>
                  <h3 style={{marginTop: "2em"}}><u>Register</u></h3>
                  <TextField style={{marginTop: "1em"}} required id="register_username" label="Username" />
                  <br />
                  <TextField style={{marginTop: "2em"}} required id="register_password" label="Password" />
                  <br />
                  <TextField style={{marginTop: "2em"}} required id="conf_password" label="Confirm Password" />
                  <br />
                  <Button style={{marginTop: "3em", marginBottom: "3em"}} type="submit" variant="contained" color="primary" size="large">submit</Button>
                  <br />
                  <p id="err"></p>
                </Card>
              </Grid>
              <Grid item={true} xs={12}>
                <Button style={{marginTop: "3em", marginBottom: "3em", backgroundColor: "grey"}} variant="contained" size="large" onClick={changestate}>Login</Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
}
