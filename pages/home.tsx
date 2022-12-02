/* eslint-disable react-hooks/rules-of-hooks */
import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Card, CircularProgress, Grid, Link } from '@mui/material';
import Footer from './comps/Footer';
import Lottie from "lottie-react";
import WelcomeAnimation from "../public/Welcome.json";
import StatsAnimation from "../public/StatsAnimation.json";
import BuilderAnimation from "../public/BuilderAnimation.json";

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
    const [userTeamsNames, setUserTeamNames] = useState(Array());
    const [userStatus, setStatus] = useState("");
    const [createdUser, setCreatedUser] = useState("");

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
                    const getUserTeams = await axios.get('/api/user/GetUserInfo', {params: {userid: userid}});
                    var userteams = getUserTeams.data.teams;
                    userteams = userteams.toString().split(",");
                    setUserTeams(userteams);
                    var userteamnames = getUserTeams.data.teams_name;
                    userteamnames = userteamnames.toString().split(",");
                    setUserTeamNames(userteamnames);
                    setCreatedUser(getUserTeams.data.created);
                    setStatus(getUserTeams.data.status);
                } else {
                    setAuth(getAuth.data.isAuth);
                }
            } else {
                setAuth(false);
            }
        }
        fetchAuth();
    }, [isAuth]);

    const getRandom = () => {
        return Math.floor(Math.random() * gradients.length);
    }

    if (isAuth == true) {
        return (
            <>
                <div style={{position: "sticky", top: 0, zIndex: 100}}>
                    <Mynav params={{username: userid}}/>
                </div>
                <Breadcrumbs aria-label="breadcrumb" style={{paddingTop: "1em", paddingLeft: "2em"}}>
                    <Link underline="hover" color="inherit" href="/">IssueTrack</Link>
                    <Link underline="hover" color="text.primary" href="/home" aria-current="page">Home</Link>
                </Breadcrumbs>
                <Grid container spacing={0} style={{alignItems: "center", padding: "1em", paddingTop: 0}}>
                    <Grid item={true} xs={12} sm={12} md={6} lg={6}>
                        <Lottie animationData={WelcomeAnimation} />
                    </Grid>
                    <Grid item={true} xs={12} sm={12} md={6} lg={6} style={{padding: "2em"}}>
                        <Card variant='outlined' style={{padding: "3em"}}>
                            <Lottie animationData={BuilderAnimation} style={{width: 350, height: 350, alignSelf: "center", margin: "0 auto"}} />
                            <p style={{padding: "1em"}}>IssueTrack is a tracking system for teams and individuals to create, resolve and close issues related to a project of their choice!
                                Modelled using Microsoft Planner and Github issues; the aim is to create a comprehensive platform that covers gaps in the existing systems.
                                Click below to start a new issue/team and begin tracking your goals...
                            </p>
                            <Button style={{padding: "1em", margin: "1em"}} href="/myissues" variant='contained'>View My Issues</Button>
                            <Button style={{padding: "1em", margin: "1em"}} href="/create-team" variant='contained'>Create team</Button>
                        </Card>
                    </Grid>
                            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                                <Grid container spacing={0} style={{alignItems: "center", padding: "1em"}}>
                                    <Grid item={true} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                        <h2 style={{padding: "1em"}}>Your Teams:</h2>
                                    </Grid>
                                    {userTeams.map((team, _key) => {
                                        var getgradient = gradients[getRandom()][0];
                                        var teamurl = "/teams/" + team;
                                        return (
                                            <>
                                                <Grid item={true} key={_key} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                                    <Card variant="outlined" style={{background: getgradient, padding: "1em"}}>
                                                            <h3 style={{color: "white", padding: "1em"}}>{userTeamsNames[_key]}</h3>
                                                            <Link href={teamurl}>
                                                                <Button style={{margin: "1em"}} variant='contained'>View Team</Button>
                                                            </Link>
                                                    </Card>
                                                </Grid>
                                            </>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                    <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                        <Grid container style={{alignItems: "center", padding: "1em", textAlign: "center"}}>
                            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                                <Lottie animationData={StatsAnimation} style={{width: 350, height: 350, alignSelf: "center", margin: "0 auto"}} />
                                <h1>{userid}</h1>
                                <h4>Status: {userStatus}</h4>
                                <h5>Joined: {createdUser}</h5>
                                <Button style={{margin: "1em", marginLeft: "0em"}} href={"/user/" + userid} variant='contained'>Profile</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={4} lg={4} style={{textAlign: "center", padding: "2em"}}>
                        <Card variant="outlined" style={{background: "linear-gradient(-150deg,#424141 15%,#4e5056 70%,#505b6b 94%)", padding: "1em", borderRadius: "15px"}}>
                            <h3 style={{color: "white"}}>Want to contribute?</h3>
                            <br />
                            <Button style={{textAlign: "center", color: "white", border: "1px solid #bbb", padding: "0.5em", alignSelf: "flex-end", textDecorationColor: "white"}} 
                                href="https://github.com/Matthew-Harvey/IssueTrack/pulls" target="_blank">View Pull Requests
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={4} lg={4} style={{textAlign: "center", padding: "2em"}}>
                        <Card variant="outlined" style={{background: "linear-gradient(to right top, #bcc4d1, #9eb4d8, #7da4df, #5894e5, #1284eb)", padding: "1em", borderRadius: "15px"}}>
                            <h3 style={{color: "white"}}>Any Issues?</h3>
                            <br />
                            <Button style={{textAlign: "center", color: "white", border: "1px solid #bbb", padding: "0.5em", alignSelf: "flex-end", textDecorationColor: "white"}}
                                href="https://mharvey.netlify.app/#contact" target="_blank">Contact Me
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={4} lg={4} style={{textAlign: "center", padding: "2em"}}>
                        <Card variant="outlined" style={{background: "linear-gradient(to right top, #c053d1, #b849d4, #af40d7, #a436da, #982dde)", padding: "1em", borderRadius: "15px"}}>
                            <h3 style={{color: "white"}}>Read more?</h3>
                            <br />
                            <Button style={{textAlign: "center", color: "white", border: "1px solid #bbb", padding: "0.5em", alignSelf: "flex-end", textDecorationColor: "white"}}
                                href="https://github.com/Matthew-Harvey/IssueTrack/" target="_blank">IssueTrack docs
                            </Button>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={12} sm={12} md={12} lg={12} style={{textAlign: "center", padding: "2em"}}>
                        <h2>Any Issues?</h2>
                        <p>Please contact me <Link href="https://mharvey.netlify.app/#contact" target="_blank">here.</Link></p>
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
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "90vh"}}>
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