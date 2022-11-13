import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, Link, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Footer from './comps/Footer';

export default function TeamCreate() {
    const [isAuth, setAuth] = useState(null);
    const [username, setUsername] = useState("");
    const router = useRouter();

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
        if (addedmembers == "") {
            setAddMember(username);
        }
        fetchAuth();
    }, [isAuth, username]);

    const [team_username, setTeamUsername] = useState("");
    const TeamUsernameChange = (value) => {
        setTeamUsername(value);
    }
    const [team_member, setTeamMember] = useState("");
    const TeamMemberChange = (value) => {
        setTeamMember(value);
    }
    const [team_name, setTeamName] = useState("");
    const TeamNameChange = (value) => {
        setTeamName(value);
    }
    const [team_overview, setTeamOverview] = useState("");
    const TeamOverviewChange = (value) => {
        setTeamOverview(value);
    }

    const [isMemberErrorMessage, setMemberErrorMessage] = useState("");
    const [isMemberErrorBoolean, setMemberErrorBoolean] = useState(false);
    const [isMemberSuccessMessage, setMemberSuccessMessage] = useState("");
    const [isMemberSuccessBoolean, setMemberSuccessBoolean] = useState(false);

    const [addedmembers, setAddMember] = useState("");
    
    const [CreateMemberLoading, setCreateMemberLoading] = useState(false);
    const addmember = async function (e) {
        setCreateMemberLoading(true);
        setMemberSuccessBoolean(false);
        setMemberErrorBoolean(false);
        var addedarr = addedmembers.split(",");
        var testarr = addedarr;
        testarr.push(team_member);
        function hasDuplicates(array) {
            return (new Set(array)).size !== array.length;
        }
        if (hasDuplicates(testarr) == false) {
            const response = await axios.get('/api/user/GetUserInfo?userid=' + team_member);
            if (response.data.isFound == true) {
                setAddMember(addedmembers + "," + team_member);
                setMemberSuccessBoolean(true);
                setMemberSuccessMessage("User has been added...");
            } else {
                setMemberErrorBoolean(true);
                setMemberErrorMessage("User has not been found...");
            }
        } else {
            setMemberErrorBoolean(true);
            setMemberErrorMessage("Member is already added to this team...");
        }
        setCreateMemberLoading(false);
    }

    const [CreateTeamIsLoading, setCreateTeamLoading] = useState(false);
    const [CreateTeamIsUniqueID, setTeamIsUniqueID] = useState(false);
    const CreateTeam = async function () {
        setCreateTeamLoading(true);
        setTeamIsUniqueID(false);
        const response = await axios.get('/api/team/CheckTeamID', {
            params: {
                teamid: team_username,
            }
        })
        if (response.data.isFound == false) {
            var addedarr = addedmembers.split(",");
            for (var user in addedarr) {
                await axios.get('/api/user/UpdateUserTeam', {
                    params: {
                        userid: user,
                        teamid: team_username,
                    }
                })
            }
            await axios.get('/api/team/CreateTeam', {
                params: {
                    teamid: team_username,
                    teamname: team_name,
                    userid: username,
                    members: addedmembers,
                    overview: team_overview,
                }
            })
            router.push({pathname: '/home', query: { username: username }});
        } else {
            setTeamIsUniqueID(true);
        }
        setCreateTeamLoading(false);
    }

    const [ResetMemberLoading, setResetMemberLoading] = useState(false);
    const resetmember = async function (e) {
        setResetMemberLoading(true);
        setAddMember(username);
        setResetMemberLoading(false);
    }

    if (isAuth == true) {
        return (
            <>
                <div style={{position: "sticky"}}>
                    <Mynav params={{username: username}}/>
                </div>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" style={{paddingTop: "2em"}}>
                    <h2>Create a new team</h2>
                </Box>
                <Grid container spacing={0} style={{padding: "2em"}}>
                    <TextField style={{padding: "1em"}} fullWidth id="teamusername" label="Team ID" variant="filled" value={team_username} onChange={(e) => TeamUsernameChange(e.target.value)} />
                    <TextField style={{padding: "1em"}} fullWidth id="teamname" label="Team Name" variant="filled" value={team_name} onChange={(e) => TeamNameChange(e.target.value)} />
                    <TextField style={{padding: "1em"}} fullWidth placeholder="Team overview" multiline rows={2} maxRows={4} value={team_overview} onChange={(e) => TeamOverviewChange(e.target.value)}/>
                    <Grid item={true} xs={12} sm={8} md={7} lg={6}>
                        <TextField style={{padding: "1em"}} fullWidth id="teammember" label="Add Member with Username" variant="filled" value={team_member} onChange={(e) => TeamMemberChange(e.target.value)} />
                    </Grid>
                    <Grid item={true} xs={12} sm={4} md={5} lg={6}>
                        <LoadingButton loading={CreateMemberLoading} variant="contained" onClick={addmember} style={{margin: "1em", padding: "1em"}}>Add Member</LoadingButton>
                        <LoadingButton loading={ResetMemberLoading} variant="contained" onClick={resetmember} style={{margin: "1em", padding: "1em"}}>Reset Members</LoadingButton>
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={5} lg={5} alignItems="center" justifyContent="center">
                        <p style={{padding: "1em"}}><h5>Added Members: </h5> {addedmembers}</p>
                    </Grid>
                    {isMemberSuccessBoolean == true && (
                        <>
                            <Grid item={true} xs={12} sm={6} md={7} lg={7}>
                                <Alert style={{ padding: "1em" }} severity="success">{isMemberSuccessMessage}</Alert>
                            </Grid>
                        </>
                    )}
                    {isMemberErrorBoolean == true && (
                        <>
                            <Grid item={true} xs={12} sm={6} md={7} lg={7}>
                                <Alert style={{padding: "1em"}} severity="error">{isMemberErrorMessage}</Alert>
                            </Grid>
                        </>
                    )}
                    <Grid item={true} xs={12} sm={5} md={4} lg={3} style={{justifyContent: "center", textAlign: "left"}}>
                        <LoadingButton loading={CreateTeamIsLoading} variant="contained" onClick={CreateTeam} style={{margin: "1em", paddingTop: "3em", padding: "1em"}}>Create Team</LoadingButton>
                        {CreateTeamIsUniqueID == true && (
                        <>
                            <Grid item={true} xs={12} sm={7} md={8} lg={9}>
                                <Alert style={{padding: "1em"}} severity="error">Team ID is already in use</Alert>
                            </Grid>
                        </>
                    )}
                    </Grid>
                </Grid>
                <Footer params={{username: username}}/>
            </>
        )
    } else if (isAuth == false){
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                    <Grid item={true} xs={12}>
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                            <p>You must login in order to create a new team.</p>
                        </Box>
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
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