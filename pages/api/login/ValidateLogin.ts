import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, collection, query, where} from "@firebase/firestore";
import bcrypt from "bcrypt";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    const user_collection = collection(firestore, "users");
    var username = req.query.username;
    const password = req.query.password;
    var idmatch = null;
    var pass = null;
    const q = query(user_collection, where("name", "==", username));
    let snapshot = await getDocs(q);
    snapshot.forEach(async docSnap => {
        var userdata = docSnap.data();
        idmatch = docSnap.id;
        pass = userdata.pass;
    });
    await bcrypt.compare(password, pass, function(err, result) {
        if (result == true) {
            res.status(200).json({isFound: true, id: idmatch});
        } else {
            res.status(200).json({isFound: false, id: idmatch});
        }
    });
}