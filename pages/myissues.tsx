/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Mynav from "./comps/Mynav";
import Footer from "./comps/Footer";
import Link from "next/link";

export const getServerSideProps = async (ctx) => {
  const cookie = getCookie('login_info', ctx);
  var strsplit = cookie.toString().split(",");
  var username_cookie = strsplit[0];
  var id_cookiestrsplit = strsplit[1];
  const getAuth = await axios.get(process.env.BASEURL + "api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
  const issues = await axios.get(process.env.BASEURL + "/api/issue/GetMyIssues", {params: {userid: username_cookie}});
  return { props: {auth: getAuth.data.isAuth, userid: username_cookie, issues: issues.data}};
}

export default function MyIssues({ auth, userid, issues}) {

    const [BacklogIssues, setBacklogIssues] = useState(new Array());
    const [WIPIssues, setWIPIssues] = useState(new Array());
    const [BlockedIssues, setBlockedIssues] = useState(new Array());
    const [ClosedIssues, setClosedIssues] = useState(new Array());
    const [CompleteIssues, setCompleteIssues] = useState(new Array());

    const basic_issue_url = "/issue/";
    const issueid = (issues.issueID).split(",");
    const isFound = (issues.isFound).split(",");
    const issueName = (issues.issueName).split(",");
    const issueSummary = (issues.issueSummary).split(",");
    const issuePriority = (issues.issuePriority).split(",");
    const issueStatus = (issues.issueStatus).split(",");
    const issueTimeRequirement = (issues.issueTimeRequirement).split(",");
    const deadlinedate = (issues.deadlinedate).split(",");
    const username = (issues.username).split(",");
    const lastupdated_date = (issues.lastupdated_date).split(",");
    var count = 0;
    
    useEffect(() => {
      for (var issueID in issueid) {
        const arr = [issueid[count], isFound[count], issueName[count], issueSummary[count],
            issuePriority[count], issueStatus[count], issueTimeRequirement[count],
            deadlinedate[count], username[count], lastupdated_date[count]];

        console.log(arr);

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
    }, [])

    if (auth == true) {
      return (
        <>
            <div style={{position: "sticky", top: 0, zIndex: 100}}>
              <Mynav params={{username: userid}} />
            </div>
            <h4 style={{padding: "2em"}}>My Issues.</h4>
            <Button style={{padding: "1em", margin: "1em"}} href="/create-myissue" variant='contained'>Create Issue</Button>
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
                    <h3>Blocked</h3>
                    {BlockedIssues.map((issue, _key) => {
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
                    <h3>Closed</h3>
                    {ClosedIssues.map((issue, _key) => {
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
                    <h3>Complete</h3>
                    {CompleteIssues.map((issue, _key) => {
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
            </Grid>
            <Footer params={{username: userid}} />
        </>
      )
    } else {
      return (
        <>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
              <Grid item={true} xs={12}>
                <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "90vh"}}>
                  <p>You are not authorised to view this issue or it does not exist.</p>
                </Box>
              </Grid>
            </Grid>
        </>
      )
    }
}
