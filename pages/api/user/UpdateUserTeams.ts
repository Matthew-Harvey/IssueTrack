import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, updateDoc, collection, query, where, doc} from "@firebase/firestore";

export default async function UpdateUserInfo(req: NextApiRequest, res: NextApiResponse) {
    var userid = req.query.id;
    var userteams = req.query.teams;
    const q = query(collection(firestore, "users"), where("name", "==", userid));
    let snapshot = await getDocs(q);
    snapshot.forEach(async docSnap => {
        var userdata = docSnap.data();
        if (userdata.name === userid) {
            await updateDoc(doc(firestore, "users", docSnap.id), {teams: userteams});
        }
    });
    res.status(200).json({message: "Updated Changes"});
}