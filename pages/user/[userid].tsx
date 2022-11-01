import { Backdrop, Button, CircularProgress, Fade, Modal, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import Mynav from '../comps/Mynav';

export default function UserProfile() {
  const router = useRouter();
  const { userid } = router.query;

  const [isFound, setFound] = useState(null);
  const [isAuth, setAuth] = useState(null);
  const [userEmail, setEmail] = useState("");
  const [userStatus, setStatus] = useState("");

  useEffect( () => {
    const fetchData = async () => {
      const response = await axios.get('/api/user/GetUserInfo?userid=' + userid);
      setFound(response.data.isFound);
      setEmail(response.data.email);
      setStatus(response.data.status);
    }
    const fetchAuth = async () => {
      if (getCookie('login_info') != undefined) {
          var strsplit = getCookie('login_info').toString().split(",");
          var username_cookie = strsplit[0];
          var id_cookiestrsplit = strsplit[1];
          const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
          if (getAuth.data.isAuth == true) {
              setAuth(getAuth.data.isAuth);
          }
      }
    }
    fetchAuth();
    fetchData();
  }, [userid, isFound, isAuth]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateDetails = async (userid) => {
    await axios.get("/api/user/UpdateUserInfo", {params: {id: userid, email: userEmail, status: userStatus}});
  }
  
  const EmailChange = (value) => {
    setEmail(value);
  }

  const StatusChange = (value) => {
    setStatus(value);
  }

  // SOME USER STATS

  // EDIT PROFILE - (CAN BE CHANGED IF OWNER), Description, Status/Last Online Date, Teams - optional to be public
  // ISSUES CREATED
  // ISSUES ASSIGNED
  // ISSUES CLOSED
  // CURRENT WORK - ONLY IF OWNERS PROFILE (NOT STARTED, WIP, COMPLETED - EACH TEAM + INDIVIDUAL)

  if (isFound == true) {
    return (
      <>
          <Mynav params={{username: userid}}/>
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
            <Grid item={true} xs={12}>
              <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                <Avatar src="/vercel.svg" sx={{ width: 150, height: 150 }} style={{alignItems: 'center'}}/>
              </Box>
              <h1>{userid}</h1>
              <h4>{userStatus}</h4>
              {isAuth == true &&
                <>
                  <Button onClick={handleOpen}>Edit Profile</Button>
                  <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h5" component="h2">
                          Details:
                        </Typography>
                        <br />
                        <TextField style={{margin: "1em", marginLeft: "0em"}} disabled fullWidth id="outlined-multiline-flexible" label="Username" multiline maxRows={4} defaultValue={userid}/>
                        <TextField style={{margin: "1em", marginLeft: "0em"}} fullWidth id="outlined-multiline-flexible" label="Email" multiline maxRows={4} defaultValue={userEmail} onChange={(e) => EmailChange(e.target.value)}/>
                        <TextField style={{margin: "1em", marginLeft: "0em"}} fullWidth id="outlined-multiline-flexible" label="Status" multiline maxRows={4} defaultValue={userStatus} onChange={(e) => StatusChange(e.target.value)}/>
                        <Button onClick={function(){ handleClose(); updateDetails(userid)}}>Submit</Button>
                      </Box>
                    </Fade>
                  </Modal>
                </>
              }
            </Grid>
          </Grid>
      </>
    )
  } else if (isFound == false) {
    return (
      <>
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
            <Grid item={true} xs={12}>
              <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                <p>USER DOES NOT EXIST</p>
              </Box>
            </Grid>
          </Grid>
      </>
    )
  } else {
    return (
      <>
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
            <Grid item={true} xs={12}>
              <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box>
            </Grid>
          </Grid>
      </>
    )
  }
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};