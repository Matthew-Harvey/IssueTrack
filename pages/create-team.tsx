import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, Link, TextField } from '@mui/material';
import { Container } from '@mui/system';

export default function home() {
    const [isAuth, setAuth] = useState(null);
    const [username, setUsername] = useState("");

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
                }
            }
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

    const [addedmembers, setAddMember] = useState("");
    const [isMemberValid, setMemberValid] = useState("");
    const addmember = async function () {
        const response = await axios.get('/api/user/GetUserInfo?userid=' + team_member);
        console.log(response.data.isFound, response.data.username);
        if (response.data.isFound == true) {
            setMemberValid("User found and added to team.");
            setAddMember(addedmembers + " " + team_member);
        } else {
            setMemberValid("User not found.");
        }
        
    }

    const CreateTeam = async function () {
        console.log(team_username, team_name, username, addedmembers);
        var membersarr = addedmembers.split(" ");
        await axios.post('/api/team/CreateTeam', {
            params: {
                teamid: team_username,
                teamname: team_name,
                userid: username,
                members: membersarr,
            }
        })
    }

    if (isAuth == true) {
        return (
            <>
                <Mynav params={{username: username}}/>
                <Container style={{padding: "1em"}}>
                    <TextField id="teamusername" label="Team ID" variant="filled" value={team_username} onChange={(e) => TeamUsernameChange(e.target.value)} />
                    <TextField id="teamname" label="Team Name" variant="filled" value={team_name} onChange={(e) => TeamNameChange(e.target.value)} />
                    <TextField id="teammember" label="Add Member with Username" variant="filled" value={team_member} onChange={(e) => TeamMemberChange(e.target.value)} />
                    <Button variant="contained" onClick={addmember} style={{margin: "1em"}}>Add Member</Button>
                    <p>{isMemberValid}</p>
                    <p>{addedmembers}</p>
                    <Button variant="contained" onClick={CreateTeam} style={{margin: "1em"}}>Add Member</Button>
                </Container>
            </>
        )
    } else if (isAuth == false){
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
                    <Grid item={true} xs={12}>
                    <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                        <p>You must login in order to create a new team.</p>
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