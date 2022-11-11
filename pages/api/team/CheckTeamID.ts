import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, collection, query, where} from "@firebase/firestore";

export default async function CheckTeamID(req: NextApiRequest, res: NextApiResponse) {
    const teamid = req.query.teamid;
    const teams_collection = collection(firestore, "teams");
    const q = query(teams_collection, where("teamid", "==", teamid));
    var isFound = false;
    var foundid = "";
    let snapshot = await getDocs(q);
    snapshot.forEach(async docSnap => {
        var userdata = docSnap.data();
        foundid = userdata.id;
        isFound = true;
    });
    res.status(200).json({isFound: isFound, teamID: foundid});
}
