import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, collection, query, where} from "@firebase/firestore";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    var { userid } = req.query;
    userid = userid.toString();
    userid = userid.replace(/\'/g, "");
    const user_collection = collection(firestore, "users");

    var isFound = false;
    var userEmail = "";
    var userStatus = "";

    const q = query(user_collection, where("name", "==", userid));
    let snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
        var userdata = docSnap.data();
        if (userdata.name === userid) {
            isFound = true;
            userEmail = userdata.email;
            userStatus = userdata.status;
        }
    });
    res.status(200).json({isFound: isFound, username: userid, email: userEmail, status: userStatus});
}