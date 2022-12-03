import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, Link, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Footer from './comps/Footer';

export const getServerSideProps = async (ctx) => {
    const cookie = getCookie('login_info', ctx);
    var strsplit = cookie.toString().split(",");
    var username_cookie = strsplit[0];
    var id_cookiestrsplit = strsplit[1];
    const getAuth = await axios.get(process.env.BASEURL.toString() + "api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
    return { props: {auth: getAuth.data.isAuth, userid: username_cookie}};
}

export default function TeamCreate({auth, userid}) {
    const router = useRouter();

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }    
    const teamid = makeid(8);

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
        var addedarr = addedmembers.split(",");
        for (var user in addedarr) {
            await axios.get('/api/user/UpdateUserTeam', {
                params: {
                    userid: user,
                    teamid: teamid,
                }
            })
        }
        await axios.get('/api/team/CreateTeam', {
            params: {
                teamid: teamid,
                teamname: team_name,
                userid: userid,
                members: addedmembers,
                overview: team_overview,
            }
        })
        router.push({pathname: '/home', query: { username: userid }});
        setCreateTeamLoading(false);
    }

    const [ResetMemberLoading, setResetMemberLoading] = useState(false);
    const resetmember = async function (e) {
        setResetMemberLoading(true);
        setAddMember(userid);
        setResetMemberLoading(false);
    }

    if (auth == true) {
        return (
            <>
                <div style={{position: "sticky", top: 0, zIndex: 100}}>
                    <Mynav params={{username: userid}}/>
                </div>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" style={{paddingTop: "2em"}}>
                    <h2>Create a new team</h2>
                </Box>
                <Grid container spacing={0} style={{padding: "2em"}}>
                    <TextField style={{padding: "1em"}} fullWidth id="teamname" label="Team Name" variant="filled" value={team_name} onChange={(e) => TeamNameChange(e.target.value)} />
                    <TextField style={{padding: "1em"}} fullWidth placeholder="Team overview" multiline rows={2} maxRows={4} value={team_overview} onChange={(e) => TeamOverviewChange(e.target.value)}/>
                    <Grid item={true} xs={12} sm={8} md={7} lg={6}>
                        <TextField style={{padding: "1em"}} fullWidth id="teammember" label="Add Member with Username" variant="filled" value={team_member} onChange={(e) => TeamMemberChange(e.target.value)} />
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={6} lg={6}>
                        <Grid container spacing={0}>
                            <Grid item={true} xs={6} sm={4} md={3} lg={2}>
                                <LoadingButton loading={CreateMemberLoading} variant="contained" color='success' onClick={addmember} style={{margin: "1em", padding: "1em"}}>Add</LoadingButton>
                            </Grid>
                            <Grid item={true} xs={6} sm={4} md={3} lg={2}>
                                <LoadingButton loading={ResetMemberLoading} variant="contained" color='error' onClick={resetmember} style={{margin: "1em", padding: "1em"}}>Reset</LoadingButton> 
                            </Grid>
                        </Grid>
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
                <Footer params={{username: userid}}/>
            </>
        )
    } else {
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                    <Grid item={true} xs={12}>
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "90vh"}}>
                            <p>You must login in order to create a new team.</p>
                            <Button><Link href='/'>Login/Register</Link></Button>
                        </Box>
                    </Grid>
                </Grid>
            </>
        )
    }
}