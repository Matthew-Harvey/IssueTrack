import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {addDoc, collection} from "@firebase/firestore";
import moment from "moment";

export default async function CreateTeam(req: NextApiRequest, res: NextApiResponse) {
    const issueID = req.query.issueID;
    const issueName = req.query.issueName;
    const issueSummary = req.query.issueSummary;
    const issuePriority = req.query.issuePriority;
    const issueStatus = req.query.issueStatus;
    const issueTimeRequirement = req.query.issueTimeRequirement;
    const deadlinedate = req.query.deadlinedate;
    const assignval = req.query.assignval;
    const teamusername = req.query.teamusername;
    const username = req.query.username;
    
    const issues_collection = collection(firestore, "issues");

    try {
      await addDoc(issues_collection, {
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
        lastupdated: username,
        lastupdated_date: moment().format("DD-MM-YYYY hh:mm:ss")
        }).then(function(docRef) { 
          res.status(200).json({isAdded: true, id: docRef.id, error: ""});
      })
    } catch(e) {
      res.status(200).json({isAdded: false, id: "", error: e});
    }
}
