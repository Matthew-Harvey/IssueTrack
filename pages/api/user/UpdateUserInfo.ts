import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, updateDoc, collection, query, where, doc} from "@firebase/firestore";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    var userid = req.query.id;
    var useremail = req.query.email;
    var userstatus = req.query.status;
    const q = query(collection(firestore, "users"), where("name", "==", userid));
    let snapshot = await getDocs(q);

    var testitems = "";
    var MYUSERINFO = "";

    snapshot.forEach(async docSnap => {
        var userdata = docSnap.data();
        testitems = userdata.name;
        if (userdata.name === userid) {
            MYUSERINFO = "RUNS HERE";
            await updateDoc(doc(firestore, "users", docSnap.id), {name: userid, pass: userdata.pass, email: useremail, status: userstatus});
        }
    });
    res.status(200).json({message: "Updated Changes"});
}