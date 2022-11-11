import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, updateDoc, collection, query, where, doc} from "@firebase/firestore";

export default async function UpdateUserInfo(req: NextApiRequest, res: NextApiResponse) {
    var userid = req.query.userid;
    var teamid = req.query.teamid;
    const q = query(collection(firestore, "users"), where("name", "==", userid));
    let snapshot = await getDocs(q);
    snapshot.forEach(async docSnap => {
        var userdata = docSnap.data();
        if (userdata.teams == "") {
            await updateDoc(doc(firestore, "users", docSnap.id), {teams: teamid});
        } else {
            await updateDoc(doc(firestore, "users", docSnap.id), {teams: userdata.teams + "," + teamid});
        }
    });
    res.status(200).json({message: "Updated Changes"});
}