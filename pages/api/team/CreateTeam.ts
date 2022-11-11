import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {updateDoc, doc, addDoc, getDocs, collection, query, where} from "@firebase/firestore";
import moment from "moment";

export default async function CreateTeam(req: NextApiRequest, res: NextApiResponse) {
  const teamname = req.query.teamname;
  const teamid = req.query.teamid;
  var stringteammembers = req.query.members;
  const userid = req.query.userid;
  const teamoverview = req.query.overview;
  const teams_collection = collection(firestore, "teams");
  const users_collection = collection(firestore, "users");
  var teammembers = stringteammembers.toString().split(",");
  for (var user of teammembers) {
    var q = query(users_collection, where("name", "==", user));
    let snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
        var userdata = docSnap.data();
        if (userdata.teams == "") {
          updateDoc(doc(firestore, "users", docSnap.id), {teams: userdata.teams + teamid});
        } else {
          updateDoc(doc(firestore, "users", docSnap.id), {teams: userdata.teams + "," + teamid});
        }
    });
  }
  try {
    await addDoc(teams_collection, {name: teamname, id: teamid, members: stringteammembers, created: moment().format("DD-MM-YYYY hh:mm:ss"), creator: userid, overview: teamoverview}).then(function(docRef) { 
      res.status(200).json({isAdded: true, id: docRef.id, error: ""});
    })
  } catch(e) {
    res.status(200).json({isAdded: false, id: "", error: e});
  }
}
