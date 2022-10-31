import {Button, Container, TextField, Card} from '@mui/material/';
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@mui/material/Grid';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import React from "react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function signIn() {
  const [isShown, setIsShown] = useState(false);

  var [registerUsername, setRegisterUsername] = useState("");
  const handleregisterUsername = e => {
    setRegisterUsername(e.target.value);
  } 
  const [registerEmail, setRegisterEmail] = useState("");
  const handleregisterEmail = e => {
    setRegisterEmail(e.target.value);
  } 
  const [registerPassword, setRegisterPassword] = useState("");
  const handleregisterPassword = e => {
    setRegisterPassword(e.target.value);
  } 
  const [registerConf, setRegisterConf] = useState("");
  const handleregisterConf = e => {
    setRegisterConf(e.target.value);
  } 
  var [loginUsername, setLoginUsername] = useState("");
  const handleloginUsername = e => {
    setLoginUsername(e.target.value);
  } 
  var [loginPassword, setLoginPassword] = useState("");
  const handleloginPassword = e => {
    setLoginPassword(e.target.value);
  } 

  const router = useRouter();
  const changestate = async(e) => {
    setIsShown(current => !current);
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    const getValid = await axios.get('/api/login/ValidateLogin', {
      params: {
        username: loginUsername,
        password: loginPassword,
      }
    })
    if (getValid.data.isFound == true) {
      Cookies.set('login_info', loginUsername + "," + getValid.data.id, { secure: true })
      router.push({pathname: '/home', query: { username: loginUsername, pass: loginPassword}}, '/home', { shallow: true });
    } else {
      document.getElementById("err").innerText = "User not found.";
    }
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    const getValid = await axios.get('/api/login/ValidateRegister', {
      params: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        confpassword: registerConf,
      }
    })
    if (getValid.data.isAdded == true) {
      Cookies.set('login_info', registerUsername + "," + getValid.data.id, { secure: true })
      router.push({pathname: '/home', query: { username: registerUsername, pass: registerPassword}}, '/home', { shallow: true });
    } else {
      document.getElementById("err").innerText = getValid.data.error;
    }
  }

  const Demo = async(e) => {
    e.preventDefault();
    loginUsername = "demo";
    loginPassword = "demo";
    handleLogin(e);
  }
  
  return (
    <>
      <Container id="main" className="App">
        {!isShown && (
          <form onSubmit={handleLogin}>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={10}>
                <Card variant="outlined" style={{padding: "3em", paddingTop: "0em"}}>
                  <h1 style={{marginTop: "1em"}}>IssueTrack</h1>
                  <BugReportOutlinedIcon fontSize='large'/>
                  <h3 style={{marginTop: "1em"}}><u>Login</u></h3>
                  <TextField style={{margin: "1em"}} required id="username" label="Username" value={loginUsername} onChange={handleloginUsername} />
                  <br />
                  <TextField type="password" style={{margin: "1em"}} required id="password" label="Password" value={loginPassword} onChange={handleloginPassword} />
                  <br />
                  <Button style={{margin: "1em"}} type="submit" variant="contained" color="primary" size="large">submit</Button>
                  <br />
                  <p id="err"></p>
                  <Button style={{margin: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={changestate}>Register</Button>
                  <Button style={{margin: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={Demo}>Demo Login</Button>
                </Card>
              </Grid>
            </Grid>
          </form>
        )}
        {isShown && (
          <form onSubmit={handleRegister}>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={10}>
                <Card variant="outlined" style={{padding: "3em", paddingTop: "0em"}}>
                  <h1 style={{marginTop: "1em"}}>IssueTrack</h1>
                  <BugReportOutlinedIcon fontSize='large'/>
                  <h3 style={{marginTop: "1em"}}><u>Register</u></h3>
                  <TextField style={{margin: "1em"}} required id="register_username" label="Username" value={registerUsername} onChange={handleregisterUsername} />
                  <br />
                  <TextField type="email" style={{margin: "1em"}} required id="register_email" label="Email" value={registerEmail} onChange={handleregisterEmail} />
                  <br />
                  <TextField type="password" style={{margin: "1em"}} required id="register_password" label="Password" value={registerPassword} onChange={handleregisterPassword} />
                  <br />
                  <TextField type="password" style={{margin: "1em"}} required id="conf_password" label="Confirm Password" value={registerConf} onChange={handleregisterConf} />
                  <br />
                  <Button style={{margin: "1em", backgroundColor: "grey"}} variant="contained" size="large" onClick={changestate}>Login</Button>
                  <Button style={{margin: "1em"}} type="submit" variant="contained" color="primary" size="large">submit</Button>
                  <p id="err"></p>
                </Card>
              </Grid>
            </Grid>
          </form>
        )}
      </Container>
    </>
  );
}
