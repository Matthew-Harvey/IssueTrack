import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, InputLabel, Link, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DesktopDatePicker, LoadingButton } from '@mui/lab';


export default function home() {
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
        fetchAuth();
    }, [isAuth, username]);

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }    
    const issueID = makeid(8);

    const [issueName, setIssueName] = useState("");
    const issueNameChange = (value) => {
        setIssueName(value);
    }
    const [issueSummary, setIssueSummary] = useState("");
    const issueSummaryChange = (value) => {
        setIssueSummary(value);
    }

    const [issuePriority, setIssuePriority] = useState("");
    const issuePriorityChange = (value) => {
        setIssuePriority(value);
    }

    const [issueStatus, setIssueStatus] = useState("");
    const issueStatusChange = (value) => {
        setIssueStatus(value);
    }

    const [issueTimeRequirement, setIssueTimeRequirement] = useState("");
    const issueTimeRequirementChange = (value) => {
        setIssueTimeRequirement(value);
    }

    const [deadlinedate, setDeadline] = useState(new Date().toLocaleDateString());
    const changeDeadline = (value) => {
        setDeadline(value);
    };

    const [assignval, setAssignVal] = useState(false);

    // ISSUE NAME, ISSUE SUMMARY, ISSUE STATUS (Backlog, WIP, Blocked, Complete, Closed), ESTIMATED TIME REQUIRED (decimal of hours), TAGS, ATTACHMENTS, 
    // ASSIGNED TO (IF TEAM, ASK WHO IS RESPONSIBLE - using add team member), CHECKLIST, DEADLINE

    if (isAuth == true) {
        return (
            <>
                <Mynav params={{username: username}}/>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" style={{paddingTop: "2em"}}>
                    <h2>Create a new issue</h2>
                </Box>
                <Grid container spacing={0} style={{padding: "2em"}}>
                    <TextField style={{padding: "1em", width: "60%"}} id="issueName" label="Name" placeholder="Issue Name" variant="standard" value={issueName} onChange={(e) => issueNameChange(e.target.value)} />
                    <InputLabel style={{padding: "1em"}} id="issuePriority">Issue Priority</InputLabel>
                    <Select style={{margin: "1em"}} labelId="Issue Priority" id="issuePriority" value={issuePriority} label="Issue Priority" onChange={(e) => issuePriorityChange(e.target.value)}>
                        <MenuItem value={40}>Urgent</MenuItem>
                        <MenuItem value={30}>High</MenuItem>
                        <MenuItem value={20}>Medium</MenuItem>
                        <MenuItem value={10}>Low</MenuItem>
                    </Select>
                    <InputLabel style={{padding: "1em"}} id="issueStatus">Issue Status</InputLabel>
                    <Select style={{margin: "1em"}} labelId="Issue Status" id="issueStatus" value={issueStatus} label="Issue Status" onChange={(e) => issueStatusChange(e.target.value)}>
                        <MenuItem value={10}>Backlog</MenuItem>
                        <MenuItem value={20}>WIP</MenuItem>
                        <MenuItem value={30}>Blocked</MenuItem>
                        <MenuItem value={40}>Complete</MenuItem>
                        <MenuItem value={50}>Closed</MenuItem>
                    </Select>
                    <TextField style={{padding: "1em"}} variant="standard" fullWidth label="Summary" placeholder="Issue Summary" multiline rows={4} value={issueSummary} onChange={(e) => issueSummaryChange(e.target.value)}/>
                    <TextField type={"number"} style={{padding: "1em"}} id="issueTimeRequirement" label="Estimated Time" placeholder="Estimated Time Required" variant="standard" value={issueTimeRequirement} onChange={(e) => issueTimeRequirementChange(e.target.value)} />
                    <Stack style={{padding: "1em"}} direction="row" spacing={1} alignItems="center">
                        <TextField
                            id="date"
                            label="Deadline"
                            type="date"
                            value={deadlinedate}
                            onChange={(e) => changeDeadline(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Stack>
                    <Stack style={{padding: "1em"}} direction="row" spacing={1} alignItems="center">
                        <Typography>Assign to team</Typography>
                        <Switch defaultChecked inputProps={{ 'aria-label': 'Assign Issue' }} value={assignval} onChange={() => {setAssignVal(!assignval);}} />
                        <Typography>Assign to self</Typography>
                    </Stack>
                    {assignval == true && (
                        <>
                            <Grid item={true} xs={1}>
                            </Grid>
                            <Grid item={true} xs={3}>
                                <TextField style={{padding: "1em"}} fullWidth id="issueAssignTeam" label="Username" placeholder="Team Username" variant="standard" value={null} />
                            </Grid>
                            <Grid item={true} xs={2}>
                                <LoadingButton loading={false} variant="contained" onClick={null} style={{margin: "1em", padding: "1em"}}>Confirm Username</LoadingButton>
                            </Grid>
                        </>
                    )}
                </Grid>
            </>
        )
    } else if (isAuth == false){
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
                    <Grid item={true} xs={12}>
                    <Box m="auto" display="flex" alignItems="center" justifyContent="center">
                        <p>You must login in order to create an issue.</p>
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