import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Mynav from '../comps/Mynav';

export default function UserProfile() {
  const router = useRouter();
  const { userid } = router.query;

  const [isFound, setFound] = useState(null);
  const [isAuth, setAuth] = useState(false);

  useEffect( () => {
    const fetchData = async () => {
      const reponse = await axios.get('../api/UsernameExist?userid=' + userid);
      setFound(reponse.data.isFound);
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
              <h1>{userid}</h1>
              <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                <Avatar src="/vercel.svg" sx={{ width: 200, height: 200 }} style={{alignItems: 'center'}}/>
              </Box>
              {isAuth == true &&
                <Button>Edit Profile</Button>
              }
            </Grid>
          </Grid>
      </>
    )
  } else {
    return (
      <>
          <p>USER DOES NOT EXIST</p>
      </>
    )
  }
}
