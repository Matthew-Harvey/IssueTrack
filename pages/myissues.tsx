import { Box, Button, Card, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Mynav from "./comps/Mynav";
import Footer from "./comps/Footer";

export default function MyIssues() {
    const [isAuth, setAuth] = useState(null);
    const [userid, setUserId] = useState("");
    const [BacklogIssues, setBacklogIssues] = useState(Array());
    const [WIPIssues, setWIPIssues] = useState(Array());
    const [BlockedIssues, setBlockedIssues] = useState(Array());
    const [ClosedIssues, setClosedIssues] = useState(Array());
    const [CompleteIssues, setCompleteIssues] = useState(Array());

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
                const getMyIssues = await axios.get("/api/issue/GetMyIssues", {params: {userid: userid}});
                const issueid = (getMyIssues.data.issueID).split(",");
                const isFound = (getMyIssues.data.isFound).split(",");
                const issueName = (getMyIssues.data.issueName).split(",");
                const issueSummary = (getMyIssues.data.issueSummary).split(",");
                const issuePriority = (getMyIssues.data.issuePriority).split(",");
                const issueStatus = (getMyIssues.data.issueStatus).split(",");
                const issueTimeRequirement = (getMyIssues.data.issueTimeRequirement).split(",");
                const deadlinedate = (getMyIssues.data.deadlinedate).split(",");
                const assignval = (getMyIssues.data.assignval).split(",");
                const teamusername = (getMyIssues.data.teamusername).split(",");
                const username = (getMyIssues.data.username).split(",");
                const lastupdated = (getMyIssues.data.lastupdated).split(",");
                const lastupdated_date = (getMyIssues.data.lastupdated_date).split(",");
                var count = 0;
                for (var issueID in issueid) {
                    const arr = [issueid[count], isFound[count], issueName[count], issueSummary[count],
                        issuePriority[count], issueStatus[count], issueTimeRequirement[count],
                        deadlinedate[count], assignval[count], teamusername[count],
                        username[count], lastupdated[count], lastupdated_date[count]];
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
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", padding: "1em"}}>
                <h4>My Issues - these include all personal issues and those created by you for other teams.</h4>
                <Grid item={true} xs={12}>
                    <h3>Backlog</h3>
                    {BacklogIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12}>
                    <h3>WIP</h3>
                    {WIPIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12}>
                    <h3>Blocked</h3>
                    {BlockedIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12}>
                    <h3>Closed</h3>
                    {ClosedIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
                                    </Card>
                                </Grid>
                            </>
                        )
                    })}
              </Grid>
              <Grid item={true} xs={12}>
                    <h3>Complete</h3>
                    {CompleteIssues.map((issue, _key) => {
                        return (
                            <>
                                <Grid item={true} key={_key} xs={6} sm={6} md={4} lg={3} style={{padding: "1em", justifyContent: "center", textAlign: "center"}}>
                                    <Card variant="outlined" style={{padding: "1em"}}>
                                        <h3 style={{color: "black", padding: "1em"}}>{issue[2]}</h3>
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
                <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                  <p>You are not authorised to view this issue or it does not exist.</p>
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
