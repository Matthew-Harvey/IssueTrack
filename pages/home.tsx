import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, Card, CircularProgress, Grid, Link } from '@mui/material';
import Footer from './comps/Footer';

const gradients = [
    ["linear-gradient(to bottom, #6C962B, #C66544)"],
    ["linear-gradient(to bottom, #43BD8B, #0D0D67)"],
    ["linear-gradient(to bottom, #0AAC1B, #FA450F)"],
    ["linear-gradient(to bottom, #7A4DF9, #12593E)"],
    ["linear-gradient(to bottom, #A342EE, #7401FC)"],
    ["linear-gradient(to bottom, #BE7581, #D43951)"],
    ["linear-gradient(to bottom, #265A82, #EBBABD)"],
    ["linear-gradient(to bottom, #1AEBC6, #D986CE)"],
    ["linear-gradient(to bottom, #31ECEA, #2A5364)"],
    ["linear-gradient(to bottom, #F6AEE1, #6CABDB)"],
    ["linear-gradient(to bottom, #BE86D3, #3428E0)"],
    ["linear-gradient(to bottom, #9EC6D2, #B676F5)"],
    ["linear-gradient(to bottom, #3819B2, #FFA1B8)"],
    ["linear-gradient(to bottom, #BE2053, #E9A1A5)"],
    ["linear-gradient(to bottom, #3297C5, #032F9A)"],
    ["linear-gradient(to bottom, #2288AC, #151148)"],
    ["linear-gradient(to bottom, #EF7CBB, #762282)"],
    ["linear-gradient(to bottom, #4D6366, #4B7C49)"],
    ["linear-gradient(to bottom, #A3C581, #9221B8)"],
    ["linear-gradient(to bottom, #7C2EAD, #13CBC6)"],
]

export default function home() {
    const [isAuth, setAuth] = useState(null);
    const [userid, setUsername] = useState("");
    const [userTeams, setUserTeams] = useState(Array());

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
                    const getUserTeams = await axios.get('/api/user/GetUserInfo?userid=' + userid);
                    var userteams = getUserTeams.data.teams;
                    userteams = userteams.toString().split(",");
                    setUserTeams(userteams);
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
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center", padding: "1em"}}>
                    <Grid item={true} xs={12}>
                        <p>YOU ARE LOGGED IN AS {userid}</p>
                        <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center", padding: "1em"}}>
                            <h2>Your Teams:</h2>
                            <Grid item={true} xs={12}>
                                {userTeams.map((team, key) => {
                                    var random = Math.floor(Math.random() * gradients.length);
                                    var getgradient = gradients[random][0];
                                    return (
                                        <>
                                            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center", padding: "1em"}}>
                                                <Grid item={true} xs={3}>
                                                    <Card variant="outlined" style={{background: getgradient}}>
                                                        <h3>{team}</h3>
                                                        <br />
                                                        <Button href='/teams/'>View Team</Button>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer params={{username: userid}}/>
            </>
        )
    } else if (isAuth == false){
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                    <Grid item={true} xs={12}>
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                            <p>YOU ARE NOT LOGGED IN.</p>
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