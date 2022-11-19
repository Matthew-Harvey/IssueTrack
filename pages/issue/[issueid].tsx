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
    const [userid, setUserId] = useState("");
    const [IssueObj, setIssueObj] = useState(Object());
    const [viewable, setViewable] = useState({auth: null, permview: null})

    useEffect( () => {
      if(!issueid) {
        return;
      }
      const fetchAuth = async () => {
        if (getCookie('login_info') != undefined) {
            var strsplit = getCookie('login_info').toString().split(",");
            var username_cookie = strsplit[0];
            var id_cookiestrsplit = strsplit[1];
            const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
            const getIssue = await axios.get("/api/issue/GetIssueInfo", {params: {issueID: issueid}});
            const getUserTeams = await axios.get('/api/user/GetUserInfo', {params: {userid: userid}});
            if (getAuth.data.isAuth == true) {
                console.log(getIssue.data);
                setUserId(username_cookie);
                if (getIssue.data.isFound == false) {
                  setViewable({ auth: true, permview: false});
                } else {
                  if (getIssue.data.teamusername != "") {
                    console.log(getUserTeams.data);
                    // check team users
                    var userteams = getUserTeams.data.teams;
                    userteams = userteams.toString().split(",");
                    var doesmatch = false;
                    for (var count in userteams) {
                      if (userteams[count] == getIssue.data.teamusername) {
                        doesmatch = true;
                      }
                    }
                    if (doesmatch == true) {
                      console.log("user team matches issue team");
                      console.log(userteams, getIssue.data.teamusername);
                      setViewable({ auth: true, permview: true});
                    } else {
                      console.log("user team dont match issue team");
                      console.log(userteams, getIssue.data.teamusername);
                      setViewable({ auth: true, permview: false});
                    }
                  } else {
                    // individual issue - check if auth user is same as issue created user.
                    if (getIssue.data.username == userid) {
                      console.log("username matches issue");
                      console.log(getIssue.data.username, userid);
                      setViewable({ auth: true, permview: true});
                    } else {
                      console.log("username doesnt match issue");
                      console.log(getIssue.data.username, userid);
                      setViewable({ auth: true, permview: false});
                    }
                  }
                  setIssueObj(getIssue.data);
                }
            } else {
              setViewable({ auth: false, permview: null});
          }
        } else {
          setViewable({ auth: false, permview: null});
        }
      }
      fetchAuth();
    }, [issueid, userid]);

    console.log(viewable);
  
    if (viewable.auth == true && viewable.permview == true) {
      return (
        <>
            <div style={{position: "sticky", top: 0, zIndex: 100}}>
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
    } else if (viewable.permview == false) {
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
    } else if (viewable.auth == true && viewable.permview == false) {
      return (
        <>
            <div style={{position: "sticky", top: 0, zIndex: 100}}>
              <Mynav params={{username: userid}} />
            </div>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", alignItems: "center"}}>
              <Grid item={true} xs={12}>
                <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "90vh"}}>
                  <p>You are not authorised to view this issue or it does not exist.</p>
                </Box>
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
                <Box m="auto" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh"}}>
                    <CircularProgress />
                </Box>
              </Grid>
          </Grid>
        </>
      )
    }
}
