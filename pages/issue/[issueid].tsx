import { Box, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Mynav from "../comps/Mynav";
import { useRouter } from "next/router";
import Footer from "../comps/Footer";

export default function Ticket() {
    const router = useRouter();
    const { issueid } = router.query;

    const [isAuth, setAuth] = useState(null);
    const [userid, setUserId] = useState("");
    const [canView, setcanView] = useState(null);
    const [IssueObj, setIssueObj] = useState(Object());

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
            } else {
              setAuth(getAuth.data.isAuth);
          }
        } else {
          setAuth(false);
        }
      }
      fetchAuth();
    }, [isAuth]);
  
    useEffect( () => {
      if(!issueid) {
        return;
      }
      // ADDITIONAL AUTH TO SEE IF PART OF TEAM THAT CAN VIEW TICKET OR INDIVIDUAL.
      // Get info of issue with id passed
      const getIssueInfo = async () => {
        const getIssue = await axios.get("/api/issue/GetIssueInfo", {params: {issueID: issueid}});
        if (getIssue.data.isFound == false) {
          setcanView(false);
        } else {
          if (getIssue.data.assignval == true) {
            // check team users
            const getUserTeams = await axios.get('/api/user/GetUserInfo?userid=' + userid);
            var userteams = getUserTeams.data.teams;
            userteams = userteams.toString().split();
            var doesmatch = false;
            for (var team in userteams) {
              if (team == getIssue.data.teamusername) {
                doesmatch = true;
              }
            }
            if (doesmatch == true) {
              setcanView(true);
            } else {
              setcanView(false);
            }
          } else {
            // individual issue - check if auth user is same as issue created user.
            if (getIssue.data.username != userid) {
              setcanView(false);
            } else {
              setcanView(true);
            }
          }
          setIssueObj(getIssue.data);
        }
      }
      getIssueInfo();
    }, [issueid, canView]);
  
    if (isAuth == true && canView == true) {
      return (
        <>
            <div style={{position: "sticky"}}>
              <Mynav params={{username: userid}} />
            </div>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", padding: "1em"}}>
              <Grid item={true} xs={12}>
                <h2>{IssueObj.issueName}</h2>
                <p>Created by {IssueObj.lastupdated} at {IssueObj.lastupdated_date}</p>
                <h4>Summary: {IssueObj.issueSummary}</h4>
                <p>Priority: {IssueObj.issuePriority}</p>
                <p>Status: {IssueObj.issueStatus}</p>
                <p>Estimated Time: {IssueObj.issueTimeRequirement}</p>
                <p>Deadline: {IssueObj.deadlinedate}</p>
              </Grid>
              <br />
              <Grid item={true} xs={12}>
                <h3>History</h3>
              </Grid>
            </Grid>
            <Footer params={{username: userid}} />
        </>
      )
    } else if (isAuth == false || canView == false) {
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
