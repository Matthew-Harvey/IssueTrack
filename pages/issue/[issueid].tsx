import { Box, Grid } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import Mynav from "../comps/Mynav";
import Footer from "../comps/Footer";

export const getServerSideProps = async (ctx) => {
  const issueid = ctx.params.issueid;
  const cookie = getCookie('login_info', ctx);
  var strsplit = cookie.toString().split(",");
  var username_cookie = strsplit[0];
  var id_cookiestrsplit = strsplit[1];
  const getAuth = await axios.get(process.env.BASEURL.toString() + "api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
  const getIssue = await axios.get(process.env.BASEURL.toString() + "api/issue/GetIssueInfo", {params: {issueID: issueid}});
  const getUserTeams = await axios.get(process.env.BASEURL.toString() + 'api/user/GetUserInfo', {params: {userid: username_cookie}});
  var canview = false;
  if (getAuth.data.isAuth == true && getIssue.data.isFound == true){
    var userteams = getUserTeams.data.teams.toString().split(",");
    var foundteam = false;
    if (userteams == getIssue.data.teamusername) {
      foundteam = true;
    }
    for (var team in userteams){
      if (getIssue.data.teamusername == team) {
        foundteam = true;
      }
    }
    if (foundteam == true){
      canview = true;
    }
  }
  return { props: {canview: canview, issue: getIssue.data, userid: username_cookie}};
}

export default function Ticket({canview, issue, userid}) {
    if (canview == true) {
      return (
        <>
            <div style={{position: "sticky", top: 0, zIndex: 100}}>
              <Mynav params={{username: userid}} />
            </div>
            <Grid container spacing={0} style={{justifyContent: "center", textAlign: "center", padding: "1em"}}>
              <Grid item={true} xs={12}>
                <h2>{issue.issueName}</h2>
                <p>Created by {issue.lastupdated} at {issue.lastupdated_date}</p>
                <h4>Summary: {issue.issueSummary}</h4>
                <p>Priority: {issue.issuePriority}</p>
                <p>Status: {issue.issueStatus}</p>
                <p>Estimated Time: {issue.issueTimeRequirement}</p>
                <p>Deadline: {issue.deadlinedate}</p>
              </Grid>
              <br />
              <Grid item={true} xs={12}>
                <h3>History</h3>
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
