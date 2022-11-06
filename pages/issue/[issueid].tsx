import { Box, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Mynav from "../comps/Mynav";

export default function Ticket() {
    const router = useRouter();
    const { issueid } = router.query;
  
    const [isAuth, setAuth] = useState(null);
    const [userid, setUserId] = useState("");
  
    useEffect( () => {
      if(!issueid) {
        return;
      }
      const fetchAuth = async () => { // AUTH NEEDS TO BE INDIVIDUAL WHO CREATED TICKET OR IS A TEAM TICKET THEN ALL TEAM CAN VIEW/EDIT
        if (getCookie('login_info') != undefined) {
            var strsplit = getCookie('login_info').toString().split(",");
            var username_cookie = strsplit[0];
            var id_cookiestrsplit = strsplit[1];
            const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
            if (getAuth.data.isAuth == true) {
                setAuth(getAuth.data.isAuth);
                setUserId(username_cookie);
            } else {
              setAuth(getAuth.data.isAuth);
          }
        } else {
          setAuth(false);
        }
      }
      fetchAuth();
    }, [issueid]);
  
    if (isAuth == true) {
      return (
        <>
            <Mynav params={{username: userid}}/>
        </>
      )
    } else if (isAuth == false) {
      return (
        <>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
              <Grid item={true} xs={12}>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                  <p>You are not authorised to view this ticket.</p>
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