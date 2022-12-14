import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useState } from 'react';
import { Box, Button, Grid, InputLabel, Link, MenuItem, Select, Stack, TextField } from '@mui/material';
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

export default function IssueCreate( { auth, userid} ) {
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

    const CreateIssue = async function () {
        await axios.get('/api/issue/CreateMyIssue', {
            params: {
                issueID: issueID,
                issueName: issueName,
                issueSummary: issueSummary,
                issuePriority: issuePriority,
                issueStatus: issueStatus,
                issueTimeRequirement: issueTimeRequirement,
                deadlinedate: deadlinedate,
                username: userid,
            }
        });
        router.push({pathname: '/myissues'});
    }

    if (auth == true) {
        return (
            <>
                <div style={{position: "sticky", top: 0, zIndex: 100}}>
                    <Mynav params={{username: userid}}/>
                </div>
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" style={{paddingTop: "2em"}}>
                    <h2>Create a new issue</h2>
                </Box>
                <Grid container spacing={0} style={{padding: "2em"}}>
                    <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                        <TextField style={{padding: "1em"}} id="issueName" fullWidth label="Name" placeholder="Issue Name" variant="standard" value={issueName} onChange={(e) => issueNameChange(e.target.value)} />
                    </Grid>
                    <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                        <TextField style={{padding: "1em"}} variant="standard" fullWidth label="Summary" placeholder="Issue Summary" multiline rows={4} value={issueSummary} onChange={(e) => issueSummaryChange(e.target.value)}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={6} lg={6}>
                        <Grid container spacing={0}>
                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                <InputLabel style={{padding: "1em"}} id="issuePriority">Issue Priority</InputLabel>
                            </Grid>
                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                <Select style={{margin: "1em"}} labelId="Issue Priority" id="issuePriority" value={issuePriority} label="Issue Priority" onChange={(e) => issuePriorityChange(e.target.value)}>
                                    <MenuItem value="Urgent">Urgent</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={12} sm={6} md={6} lg={6}>
                        <Grid container spacing={0}>
                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                <InputLabel style={{padding: "1em"}} id="issueStatus">Issue Status</InputLabel>
                            </Grid>
                            <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                                <Select style={{margin: "1em"}} labelId="Issue Status" id="issueStatus" value={issueStatus} label="Issue Status" onChange={(e) => issueStatusChange(e.target.value)}>
                                    <MenuItem value="Backlog">Backlog</MenuItem>
                                    <MenuItem value="WIP">WIP</MenuItem>
                                    <MenuItem value="Blocked">Blocked</MenuItem>
                                    <MenuItem value="Complete">Complete</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
                        <TextField type={"number"} style={{padding: "1em"}} fullWidth id="issueTimeRequirement" label="Estimated Time" placeholder="Estimated Time Required" variant="standard" value={issueTimeRequirement} onChange={(e) => issueTimeRequirementChange(e.target.value)} />
                    </Grid>
                    <Grid item={true} xs={6} sm={6} md={6} lg={6}>
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
                    <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                        <LoadingButton variant="contained" onClick={CreateIssue} style={{margin: "1em", padding: "1em"}}>Create Issue</LoadingButton>
                    </Grid>
                </Grid>
                <Footer params={{username: userid}} />
            </>
        )
    } else {
        return (
            <>
                <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center"}}>
                    <Grid item={true} xs={12}>
                        <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "90vh"}}>
                            <p>You must login in order to create an issue.</p>
                            <Button><Link href='/'>Login/Register</Link></Button>
                        </Box>
                    </Grid>
                </Grid>
            </>
        )
    }
}