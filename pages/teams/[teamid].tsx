import { Box, Button, Card, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Mynav from "../comps/Mynav";
import Footer from "../comps/Footer";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TeamIssues() {

    const router = useRouter();
    const { teamid } = router.query;

    const [isAuth, setAuth] = useState(null);
    const [userid, setUserId] = useState("");
    const [BacklogIssues, setBacklogIssues] = useState(new Array());
    const [WIPIssues, setWIPIssues] = useState(new Array());
    const [BlockedIssues, setBlockedIssues] = useState(new Array());
    const [ClosedIssues, setClosedIssues] = useState(new Array());
    const [CompleteIssues, setCompleteIssues] = useState(new Array());

    const basic_issue_url = "/issue/";
    const basic_create_team_issue_url = "/create-teamissue?teamid=" + teamid;

    useEffect( () => {
      const fetchAuth = async () => {
        if (getCookie('login_info') != undefined) {
            var strsplit = getCookie('login_info').toString().split(",");
            var username_cookie = strsplit[0];
            var id_cookiestrsplit = strsplit[1];
            const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
            if (getAuth.data.isAuth == true) {
                setAuth(getAuth.data.isAuth);
                setUserId(username_cookie);
                const getMyIssues = await axios.get("/api/issue/GetTeamIssues", {params: {teamid: teamid}});
                const issueid = (getMyIssues.data.issueID).split(",");
                const isFound = (getMyIssues.data.isFound).split(",");
                const issueName = (getMyIssues.data.issueName).split(",");
                const issueSummary = (getMyIssues.data.issueSummary).split(",");
                const issuePriority = (getMyIssues.data.issuePriority).split(",");
                const issueStatus = (getMyIssues.data.issueStatus).split(",");
                const issueTimeRequirement = (getMyIssues.data.issueTimeRequirement).split(",");
                const deadlinedate = (getMyIssues.data.deadlinedate).split(",");
                const lastupdated_date = (getMyIssues.data.lastupdated_date).split(",");
                var count = 0;
                for (var issueID in issueid) {
                    const arr = [issueid[count], isFound[count], issueName[count], issueSummary[count],
                        issuePriority[count], issueStatus[count], issueTimeRequirement[count],
                        deadlinedate[count], lastupdated_date[count]];
                    if (issueStatus[count] == "WIP") {
                      setWIPIssues(WIPIssues => [...WIPIssues, arr]);
                    } else if (issueStatus[count] == "Blocked") {
                      setBlockedIssues(BlockedIssues => [...BlockedIssues, arr]);
                    } else if (issueStatus[count] == "Closed") {
                      setClosedIssues(ClosedIssues => [...ClosedIssues, arr]);
                    } else if (issueStatus[count] == "Complete") {
                      setCompleteIssues(CompleteIssues => [...CompleteIssues, arr]);
                    } else if (issueStatus[count] == "Backlog") {
                      setBacklogIssues(BacklogIssues => [...BacklogIssues, arr]);
                    }
                    count++;
                };

            } else {
              setAuth(getAuth.data.isAuth);
          }
        } else {
          setAuth(false);
        }
      }
      fetchAuth();
    }, [isAuth]);

    if (isAuth == true) {
      return (
        <>
            <div style={{position: "sticky", top: 0, zIndex: 100}}>
              <Mynav params={{username: userid}} />
            </div>
            <h4 style={{padding: "2em"}}>Team Issues.</h4>
            <Button style={{padding: "1em", margin: "1em"}} href={basic_create_team_issue_url} variant='contained'>Create Issue</Button>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", padding: "1em"}}>
                <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                    <h3>Backlog</h3>
                    {BacklogIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={12} sm={12} md={12} lg={12} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                        <Link href={basic_issue_url + issue[0]}>
                                          <Button style={{margin: "1em"}} variant='contained'>View Issue</Button>
                                        </Link>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                    <h3>WIP</h3>
                    {WIPIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={12} sm={12} md={12} lg={12} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                        <Link href={basic_issue_url + issue[0]}>View Issue</Link>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                    <h3>Blocked</h3>
                    {BlockedIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={12} sm={12} md={12} lg={12} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                        <Link href={basic_issue_url + issue[0]}>View Issue</Link>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                    <h3>Closed</h3>
                    {ClosedIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={12} sm={12} md={12} lg={12} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                        <Link href={basic_issue_url + issue[0]}>View Issue</Link>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12} sm={6} md={4} lg={3}>
                    <h3>Complete</h3>
                    {CompleteIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={12} sm={12} md={12} lg={12} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                        <Link href={basic_issue_url + issue[0]}>View Issue</Link>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
            </Grid>
            <Footer params={{username: userid}} />
        </>
      )
    } else if (isAuth == false) {
      return (
        <>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
              <Grid item={true} xs={12}>
                <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "90vh"}}>
                  <p>You are not authorised to view this team or it does not exist.</p>
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
