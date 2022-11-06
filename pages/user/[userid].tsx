import { Backdrop, Button, Card, CircularProgress, Fade, Modal, Tab, Tabs, TextField, Typography } from '@mui/material';
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function UserProfile() {
  const router = useRouter();
  const { userid } = router.query;

  const [isFound, setFound] = useState(null);
  const [isAuth, setAuth] = useState(null);
  const [userEmail, setEmail] = useState("");
  const [userStatus, setStatus] = useState("");
  const [createdUser, setCreatedUser] = useState("");

  useEffect( () => {
    if(!userid) {
      return;
    }
    const fetchAuth = async () => {
      if (getCookie('login_info') != undefined) {
          var strsplit = getCookie('login_info').toString().split(",");
          var username_cookie = strsplit[0];
          var id_cookiestrsplit = strsplit[1];
          const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
          if (getAuth.data.isAuth == true) {
              setAuth(getAuth.data.isAuth);
          } else {
            setAuth(getAuth.data.isAuth);
        }
      } else {
        setAuth(false);
      }
    }
    const fetchData = async () => {
      const response = await axios.get('/api/user/GetUserInfo?userid=' + userid);
      setFound(response.data.isFound);
      setEmail(response.data.email);
      setStatus(response.data.status);
      setCreatedUser(response.data.created);
    }
    fetchData();
    fetchAuth();
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  // SOME USER STATS

  // EDIT PROFILE - (CAN BE CHANGED IF OWNER), Description, Status/Last Online Date, Teams - optional to be public
  // ISSUES CREATED
  // ISSUES ASSIGNED
  // ISSUES CLOSED
  // CURRENT WORK - ONLY IF OWNERS PROFILE (NOT STARTED, WIP, COMPLETED - EACH TEAM + INDIVIDUAL)

  if (isFound == true) {
    return (
      <>
          <Mynav params={{username: userid}} />
          <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
            <Grid item={true} xs={12}>
              {isAuth == true &&
                <>
                  <Box sx={{justifyContent: "center", textAlign: "center", padding: "1em"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Profile" {...a11yProps(0)} />
                      <Tab label="Stats" {...a11yProps(1)} />
                      <Tab label="Activity" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                      <Avatar src="/vercel.svg" sx={{ width: 150, height: 150 }} style={{alignItems: 'center'}}/>
                    </Box>
                    <h1>{userid}</h1>
                    <h4>Status: {userStatus}</h4>
                    <h5>Joined: {createdUser}</h5>
                    <Button onClick={handleOpen}>Edit Profile</Button>
                    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500,}}>
                      <Fade in={open}>
                        <Box sx={style}>
                          <Typography id="transition-modal-title" variant="h4" component="h4">
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
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Grid container spacing={1} style={{justifyContent: "center", textAlign: "center", padding: "2em"}}>
                      <Grid item={true} xs={4}>
                        <Pie data={piedata} />
                      </Grid>
                      <Grid item={true} xs={8}>
                        <Line data={linedata} />
                      </Grid>
                      
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
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

