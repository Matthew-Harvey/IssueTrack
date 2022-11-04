import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {addDoc, collection} from "@firebase/firestore";
import moment from "moment";

export default async function CreateTeam(req: NextApiRequest, res: NextApiResponse) {
    const teamname = req.query.teamname;
    const teamid = req.query.teamid;
    const teammembers = req.query.members;
    const userid = req.query.userid;
    const teams_collection = collection(firestore, "teams");
    try {
      await addDoc(teams_collection, {name: teamname, id: teamid, members: {teammembers}, created: moment().format("DD-MM-YYYY hh:mm:ss"), creator: userid}).then(function(docRef) { 
        res.status(200).json({isAdded: true, id: docRef.id, error: ""});
      })
    } catch(e) {
      await addDoc(teams_collection, {name: teamname, id: teamid, members: {teammembers}, created: moment().format("DD-MM-YYYY hh:mm:ss"), creator: userid}).then(function(docRef) { 
        res.status(200).json({isAdded: false, id: docRef.id, error: e});
      })
    }
}
