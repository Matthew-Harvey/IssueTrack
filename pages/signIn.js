import {Button, Container, TextField, Card} from '@mui/material/';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import React from "react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function signIn() {
  const [isShown, setIsShown] = useState(false);
  const router = useRouter();

  const changestate = async(e) => {
    setIsShown(current => !current);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    const getValid = await axios.get('/api/ValidateLogin', {
      params: {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }
    })
    if (getValid.data.isFound == true) {
      Cookies.set('login_info', document.getElementById("username").value + "," + getValid.data.id, { secure: true })
      router.push({pathname: '/home', query: { username: document.getElementById("username").value, pass: document.getElementById("password").value}}, '/home', { shallow: true });
    } else {
      document.getElementById("err").innerText = "User not found.";
    }
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    const getValid = await axios.get('/api/ValidateRegister', {
      params: {
        username: document.getElementById("register_username").value,
        password: document.getElementById("register_password").value,
        confpassword: document.getElementById("conf_password").value,
      }
    })
    if (getValid.data.isAdded == true) {
      Cookies.set('login_info', document.getElementById("register_username").value + "," + getValid.data.id, { secure: true })
      router.push({pathname: '/home', query: { username: document.getElementById("register_username").value, pass: document.getElementById("register_password").value}}, '/home', { shallow: true });
    } else {
      document.getElementById("err").innerText = getValid.data.error;
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
      <Container id="main" className="App">
        {!isShown && (
          <form onSubmit={handleLogin}>
            <Grid container spacing={2} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={6}>
                <Card variant="outlined" style={{padding: "3em", paddingTop: "0em"}}>
                  <h1 style={{marginTop: "1em"}}>IssueTrack</h1>
                  <BugReportOutlinedIcon fontSize='large'/>
                  <h3 style={{marginTop: "2em"}}><u>Login</u></h3>
                  <TextField style={{marginTop: "1em"}} required id="username" label="Username" />
                  <br />
                  <TextField style={{marginTop: "2em"}} required id="password" label="Password" />
                  <br />
                  <Button style={{marginTop: "3em", marginBottom: "2em"}} type="submit" variant="contained" color="primary" size="large">submit</Button>
                  <br />
                  <p id="err"></p>
                  <Button style={{marginTop: "1em", marginBottom: "1em", marginRight: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={changestate}>Register</Button>
                  <Button style={{marginTop: "1em", marginBottom: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={Demo}>Demo Login</Button>
                </Card>
              </Grid>
            </Grid>
          </form>
        )}
        {isShown && (
          <form onSubmit={handleRegister}>
            <Grid container spacing={2} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={6}>
                <Card variant="outlined" style={{padding: "3em", paddingTop: "0em"}}>
                  <h1 style={{marginTop: "1em"}}>IssueTrack</h1>
                  <BugReportOutlinedIcon fontSize='large'/>
                  <h3 style={{marginTop: "2em"}}><u>Register</u></h3>
                  <TextField style={{marginTop: "1em"}} required id="register_username" label="Username" />
                  <br />
                  <TextField style={{marginTop: "2em"}} required id="register_password" label="Password" />
                  <br />
                  <TextField style={{marginTop: "2em"}} required id="conf_password" label="Confirm Password" />
                  <br />
                  <Button style={{marginTop: "3em", marginBottom: "2em"}} type="submit" variant="contained" color="primary" size="large">submit</Button>
                  <br />
                  <p id="err"></p>
                  <Button style={{marginTop: "1em", marginBottom: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={changestate}>Login</Button>
                </Card>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
}
