import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, InputLabel, Link, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Footer from './comps/Footer';


export default function IssueCreate() {
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
    
    const [teamusername, setTeamUsername] = useState("");
    const teamusernameChange = (value) => {
        setTeamUsername(value);
    };

    const [CheckTeamIDIsLoading, setCheckTeamIDLoading] = useState(false);
    const [CheckTeamIDIsUnique, setTeamIDIsUnique] = useState("");
    const CreateIssue = async function () {
        setCheckTeamIDLoading(true);
        setTeamIDIsUnique("null");
        if (assignval == true) {
            const response = await axios.get('/api/team/CheckTeamID', {
                params: {
                    teamid: teamusername,
                }
            })
            console.log(teamusername, response.data.isFound)
            if (response.data.isFound == true) {
                await axios.get('/api/issue/CreateIssue', {
                    params: {
                        issueID: issueID,
                        issueName: issueName,
                        issueSummary: issueSummary,
                        issuePriority: issuePriority,
                        issueStatus: issueStatus,
                        issueTimeRequirement: issueTimeRequirement,
                        deadlinedate: deadlinedate,
                        assignval: assignval,
                        teamusername: teamusername,
                        username: username,
                    }
                });
                router.push({pathname: '/home', query: { username: username }}, '/home', { shallow: true });
            } else {
                setTeamIDIsUnique("false");
            }
        } else {
            await axios.get('/api/issue/CreateIssue', {
                params: {
                    issueID: issueID,
                    issueName: issueName,
                    issueSummary: issueSummary,
                    issuePriority: issuePriority,
                    issueStatus: issueStatus,
                    issueTimeRequirement: issueTimeRequirement,
                    deadlinedate: deadlinedate,
                    assignval: assignval,
                    teamusername: teamusername,
                    username: username,
                }
            });
            router.push({pathname: '/home', query: { username: username }});
        }
        setCheckTeamIDLoading(false);
    }

    if (isAuth == true) {
        return (
            <>
                <div style={{position: "sticky", top: 0}}>
                    <Mynav params={{username: username}}/>
                </div>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" style={{paddingTop: "2em"}}>
                    <h2>Create a new issue</h2>
                </Box>
                <Grid container spacing={0} style={{padding: "2em"}}>
                    <Grid item={true} xs={12} sm={10} md={9} lg={8}>
                        <TextField style={{padding: "1em"}} id="issueName" label="Name" placeholder="Issue Name" variant="standard" value={issueName} onChange={(e) => issueNameChange(e.target.value)} />
                    </Grid>
                    <Grid item={true} xs={6} sm={6} md={5} lg={4}>
                        <InputLabel style={{padding: "1em"}} id="issuePriority">Issue Priority</InputLabel>
                        <Select style={{margin: "1em"}} labelId="Issue Priority" id="issuePriority" value={issuePriority} label="Issue Priority" onChange={(e) => issuePriorityChange(e.target.value)}>
                            <MenuItem value="Urgent">Urgent</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={6} sm={6} md={5} lg={4}>
                        <InputLabel style={{padding: "1em"}} id="issueStatus">Issue Status</InputLabel>
                        <Select style={{margin: "1em"}} labelId="Issue Status" id="issueStatus" value={issueStatus} label="Issue Status" onChange={(e) => issueStatusChange(e.target.value)}>
                            <MenuItem value="Backlog">Backlog</MenuItem>
                            <MenuItem value="WIP">WIP</MenuItem>
                            <MenuItem value="Blocked">Blocked</MenuItem>
                            <MenuItem value="Complete">Complete</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                        <TextField style={{padding: "1em"}} variant="standard" fullWidth label="Summary" placeholder="Issue Summary" multiline rows={4} value={issueSummary} onChange={(e) => issueSummaryChange(e.target.value)}/>
                    </Grid>
                    <Grid item={true} xs={6} sm={4} md={4} lg={4}>
                        <TextField type={"number"} style={{padding: "1em"}} id="issueTimeRequirement" label="Estimated Time" placeholder="Estimated Time Required" variant="standard" value={issueTimeRequirement} onChange={(e) => issueTimeRequirementChange(e.target.value)} />
                    </Grid>
                    <Grid item={true} xs={6} sm={4} md={4} lg={4}>
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
                    </Grid>
                    <Grid item={true} xs={6} sm={4} md={4} lg={4}>
                        <Stack style={{padding: "1em"}} direction="row" spacing={1} alignItems="center">
                            <Typography>Assign to team</Typography>
                            <Switch defaultChecked inputProps={{ 'aria-label': 'Assign Issue' }} value={assignval} onChange={() => {setAssignVal(!assignval);}} />
                            <Typography>Assign to self</Typography>
                        </Stack>
                    </Grid>
                    {assignval == true && (
                        <>
                            <Grid item={true} xs={1}>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <TextField style={{padding: "1em"}} fullWidth id="issueAssignTeam" label="Team Username" placeholder="Team Username" variant="standard" value={teamusername} onChange={(e) => teamusernameChange(e.target.value)} />
                            </Grid>
                            {CheckTeamIDIsUnique == "true" && (
                                <>
                                    <Grid item={true} xs={7}>
                                        <Alert style={{ padding: "1em" }} severity="success">Found team.</Alert>
                                    </Grid>
                                </>
                            )}
                            {CheckTeamIDIsUnique == "false" && (
                                <>
                                    <Grid item={true} xs={7}>
                                        <Alert style={{padding: "1em"}} severity="error">Team does not exist.</Alert>
                                    </Grid>
                                </>
                            )}
                        </>
                    )}
                    <Grid item={true} xs={3}>
                        <LoadingButton loading={CheckTeamIDIsLoading} variant="contained" onClick={CreateIssue} style={{margin: "1em", padding: "1em"}}>Create Issue</LoadingButton>
                    </Grid>
                </Grid>
                <Footer params={{username: username}} />
            </>
        )
    } else if (isAuth == false){
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
                    <Grid item={true} xs={12}>
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                            <p>You must login in order to create an issue.</p>
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