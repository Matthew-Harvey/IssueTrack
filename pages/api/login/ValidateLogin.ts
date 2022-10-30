import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {getDocs, collection, query, where} from "@firebase/firestore";
import axios from "axios";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    const user_collection = collection(firestore, "users");
    const username = req.query.username;
    const password = req.query.password;
    var doesmatch = false;
    var idmatch = null;
    var pass = null;
    const q = query(user_collection, where("name", "==", username));
    let snapshot = await getDocs(q);
    snapshot.forEach(async docSnap => {
        var userdata = docSnap.data();
        if (userdata.name == username) {
            idmatch = docSnap.id;
            pass = userdata.pass;
        }
    });
    try {
        const getValid = await axios.get('https://issuetrack.vercel.app/api/login/checkPass', {
            params: {
            pass1: password,
            pass2: pass,
            }
        })
        if (getValid.data.result == true) {
            doesmatch = true;
        }
    } catch {
        const getValid = await axios.get('http://localhost:3000/api/login/checkPass', {
            params: {
            pass1: password,
            pass2: pass,
            }
        })
        if (getValid.data.result == true) {
            doesmatch = true;
        }
    }
    res.status(200).json({isFound: doesmatch, id: idmatch});
}