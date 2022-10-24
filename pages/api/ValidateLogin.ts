import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "./Firebase";
import {getDocs, collection} from "@firebase/firestore";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    const username = req.query.username;
    const user_collection = collection(firestore, "users");
    const password = req.query.password;
    var doesmatch = false;
    var idmatch = "";
    let snapshot = await getDocs(user_collection);
    snapshot.forEach(docSnap => {
        var userdata = docSnap.data();
        if (userdata.name === username && userdata.pass === password) {
            doesmatch = true;
            idmatch = docSnap.id;
        }
    });
    res.status(200).json({isFound: doesmatch, id: idmatch});
}