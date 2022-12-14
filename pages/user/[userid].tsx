import { Backdrop, Button, Fade, Modal, Tab, Tabs, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import Mynav from '../comps/Mynav';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Footer from '../comps/Footer';

export const getServerSideProps = async (ctx) => {
  const cookie = getCookie('login_info', ctx);
  var strsplit = cookie.toString().split(",");
  var username_cookie = strsplit[0];
  var id_cookiestrsplit = strsplit[1];
  const getAuth = await axios.get(process.env.BASEURL.toString() + "api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
  return { props: {auth: getAuth.data.isAuth, autheduser: username_cookie}};
}

export default function UserProfile( {auth, autheduser} ) {
  const router = useRouter();
  const { userid } = router.query;
  const [userEmail, setEmail] = useState("");
  const [userStatus, setStatus] = useState("");
  const [createdUser, setCreatedUser] = useState("");

  useEffect(() => {
    if(!userid) {
      return;
    }
    const fetchData = async () => {
      const response = await axios.get('/api/user/GetUserInfo', {params: {userid: userid}});
      setEmail(response.data.email);
      setStatus(response.data.status);
      setCreatedUser(response.data.created);
    }
    fetchData();
  }, [userid]);

  const [open, setOpen] = useState(false);
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

  const piedata = {
    labels: ['Issues Created', 'Issues Assigned To You', 'Issues Assigned To Others', 'Issues Closed'],
    datasets: [
      {
        label: "Issues Tracked",
        data: [10, 20, 45, 12],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(22, 10, 180, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(22, 10, 180, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const linedata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Issues Created",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Issues Closed",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };
  
  if (auth == true) {
    return (
      <>
          <div style={{position: "sticky", top: 0, zIndex: 100}}>
            <Mynav params={{username: autheduser}} />
          </div>
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
            <Grid item={true} xs={12}>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                  <Avatar src="/vercel.svg" sx={{ width: 200, height: 200 }} style={{alignItems: 'center'}}/>
                </Box>
                <h1>{userid}</h1>
                <h4>Status: {userStatus}</h4>
                <h5>Joined: {createdUser}</h5>
                {autheduser == userid &&
                  <>
                    <Button onClick={handleOpen}>Edit Profile</Button>
                    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                      <Fade in={open}>
                        <Box sx={style}>
                          <Typography id="transition-modal-title" variant="h4" component="h4">Details:</Typography>
                          <br />
                          <TextField style={{margin: "1em", marginLeft: "0em"}} disabled fullWidth id="outlined-multiline-flexible" label="Username" multiline maxRows={4} defaultValue={userid} />
                          <TextField style={{margin: "1em", marginLeft: "0em"}} fullWidth id="outlined-multiline-flexible" label="Email" multiline maxRows={4} defaultValue={userEmail} onChange={(e) => EmailChange(e.target.value)} />
                          <TextField style={{margin: "1em", marginLeft: "0em"}} fullWidth id="outlined-multiline-flexible" label="Status" multiline maxRows={4} defaultValue={userStatus} onChange={(e) => StatusChange(e.target.value)} />
                          <Button onClick={function(){ handleClose(); updateDetails(userid)}}>Submit</Button>
                        </Box>
                      </Fade>
                    </Modal>
                  </>
                }
            </Grid>
            <Grid item={true} xs={4}>
              <Pie data={piedata} />
            </Grid>
            <Grid item={true} xs={4}>
              <Line data={linedata} />
            </Grid>
          </Grid>
          <Footer params={{username: autheduser}} />
      </>
    )
  } else {
    return (
      <>
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
            <Grid item={true} xs={12}>
              <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                <p>USER DOES NOT EXIST / NOT LOGGED IN </p>
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

