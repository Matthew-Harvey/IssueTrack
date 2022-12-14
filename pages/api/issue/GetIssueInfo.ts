import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, collection, query, where} from "@firebase/firestore";

export default async function GetIssueInfo(req: NextApiRequest, res: NextApiResponse) {
    var issueID = req.query.issueID;
    issueID = issueID.toString();
    issueID = issueID.replace(/\'/g, "");

    const issues_collection = collection(firestore, "issues");

    var isFound = false;
    var issueName = "";
    var issueSummary = "";
    var issuePriority = "";
    var issueStatus = "";
    var issueTimeRequirement = "";
    var deadlinedate = "";
    var teamusername = "";
    var username = "";
    var lastupdated_date = "";

    const q = query(issues_collection, where("issueID", "==", issueID));
    let snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
        var issuedata = docSnap.data();
        isFound = true;
        issueID = issuedata.issueID;
        issueName = issuedata.issueName;
        issueSummary = issuedata.issueSummary;
        issuePriority = issuedata.issuePriority;
        issueStatus = issuedata.issueStatus;
        issueTimeRequirement = issuedata.issueTimeRequirement;
        deadlinedate = issuedata.deadlinedate;
        teamusername = issuedata.teamusername;
        username = issuedata.username;
        lastupdated_date = issuedata.lastupdated_date
    });

    res.status(200).json({isFound: isFound, issueID: issueID, issueName: issueName, issueSummary: issueSummary, issuePriority: issuePriority, issueStatus: issueStatus, 
        issueTimeRequirement: issueTimeRequirement, deadlinedate: deadlinedate, teamusername: teamusername, username: username, lastupdated_date: lastupdated_date,
    });
}