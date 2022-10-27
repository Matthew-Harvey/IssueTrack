import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "./Firebase";
import { doc, getDoc } from "@firebase/firestore";

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
    const username = '' + req.query.user;
    const docid = '' + req.query.id;
    var isAuth = false;
    const docRef = doc(firestore, "users", docid);
    let snapinfo = await getDoc(docRef);
    if (snapinfo.exists() && snapinfo.data().name == username) {
        isAuth = true;
    }
    res.status(200).json({isAuth: isAuth, name: username});
}