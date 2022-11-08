import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Link } from '@mui/material';

export default function home() {
    const [isAuth, setAuth] = useState(null);
    const [userid, setUsername] = useState("");

    useEffect( () => {
        const fetchAuth = async () => {
            if (getCookie('login_info') != undefined) {
                var strsplit = getCookie('login_info').toString().split(",");
                var username_cookie = strsplit[0];
                var id_cookiestrsplit = strsplit[1];
                const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
                if (getAuth.data.isAuth == true) {
                    setAuth(getAuth.data.isAuth);
                    setUsername(getAuth.data.name);
                } else {
                    setAuth(getAuth.data.isAuth);
                }
            } else {
                setAuth(false);
            }
        }
        fetchAuth();
    }, [isAuth, userid]);

    if (isAuth == true) {
        return (
            <>
                <Mynav params={{username: userid}}/>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                    <p>YOU ARE LOGGED IN AS {userid}</p>
                </Box>
            </>
        )
    } else if (isAuth == false){
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
                    <Grid item={true} xs={12}>
                    <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                        <p>YOU ARE NOT LOGGED IN.</p>
                    </Box>
                    <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                        <Button><Link href='/'>Login/Register</Link></Button>
                    </Box>
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                    <Grid item={true} xs={12}>
                    <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                        <CircularProgress />
                    </Box>
                    </Grid>
                </Grid>
            </>
        )
    }
}