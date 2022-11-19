import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, collection, query, where} from "@firebase/firestore";

export default async function GetTeamIssues(req: NextApiRequest, res: NextApiResponse) {
    var teamid = req.query.teamid;

    const issues_collection = collection(firestore, "issues");

    var issueID = "";
    var isFound = "";
    var issueName = "";
    var issueSummary = "";
    var issuePriority = "";
    var issueStatus = "";
    var issueTimeRequirement = "";
    var deadlinedate = "";
    var assignval = "";
    var teamusername = "";
    var username = "";
    var lastupdated = "";
    var lastupdated_date = "";

    try {
        const q = query(issues_collection, where("teamusername", "==", teamid));
        let snapshot = await getDocs(q);
        snapshot.forEach(docSnap => {
            var issuedata = docSnap.data();
            if (isFound == "") {
                isFound = "true";
            } else {
                isFound = isFound + "," + "true";
            }
            if (issueID == "") {
                issueID = issuedata.issueID;
            } else {
                issueID = issueID + "," + issuedata.issueID;
            }
            if (issueName == "") {
                issueName = issuedata.issueName;
            } else {
                issueName = issueName + "," + issuedata.issueName;
            }
            if (issueSummary == "") {
                issueSummary = issuedata.issueSummary;
            } else {
                issueSummary = issueSummary + "," + issuedata.issueSummary;
            }
            if (issuePriority == "") {
                issuePriority = issuedata.issuePriority;
            } else {
                issuePriority = issuePriority + "," + issuedata.issuePriority;
            }
            if (issueStatus == "") {
                issueStatus = issuedata.issueStatus;
            } else {
                issueStatus = issueStatus + "," + issuedata.issueStatus;
            }
            if (issueTimeRequirement == "") {
                issueTimeRequirement = issuedata.issueTimeRequirement;
            } else {
                issueTimeRequirement = issueTimeRequirement + "," + issuedata.issueTimeRequirement;
            }
            if (deadlinedate == "") {
                deadlinedate = issuedata.deadlinedate;
            } else {
                deadlinedate = deadlinedate + "," + issuedata.deadlinedate;
            }
            if (assignval == "") {
                assignval = issuedata.assignval;
            } else {
                assignval = assignval + "," + issuedata.assignval;
            }
            if (teamusername == "") {
                teamusername = issuedata.teamusername;
            } else {
                teamusername = teamusername + "," + issuedata.teamusername;
            }
            if (username == "") {
                username = issuedata.username;
            } else {
                username = username + "," + issuedata.username;
            }
            if (lastupdated == "") {
                lastupdated = issuedata.lastupdated;
            } else {
                lastupdated = lastupdated + "," + issuedata.lastupdated;
            }
            if (lastupdated_date == "") {
                lastupdated_date = issuedata.lastupdated_date;
            } else {
                lastupdated_date = lastupdated_date + "," + issuedata.lastupdated_date;
            }
        });

        res.status(200).json({isFound: isFound, issueID: issueID, issueName: issueName, issueSummary: issueSummary, issuePriority: issuePriority, issueStatus: issueStatus, 
            issueTimeRequirement: issueTimeRequirement, deadlinedate: deadlinedate, assignval: assignval, teamusername: teamusername, username: username, lastupdated: lastupdated,
            lastupdated_date: lastupdated_date,
        });
    } catch {
        res.status(200).json({isFound: isFound, issueID: issueID, issueName: issueName, issueSummary: issueSummary, issuePriority: issuePriority, issueStatus: issueStatus, 
            issueTimeRequirement: issueTimeRequirement, deadlinedate: deadlinedate, assignval: assignval, teamusername: teamusername, username: username, lastupdated: lastupdated,
            lastupdated_date: lastupdated_date,
        });
    }
}