import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "./Firebase";
import { doc, getDoc } from "@firebase/firestore";
import { getCookie } from 'cookies-next';

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
    const loginarr = [];
    const token = JSON.parse(req.body);
    console.log(getCookie('login_info', {res, req}));
    if (getCookie('login_info', {res, req}) != undefined) {
        var strsplit = getCookie('login_info', {res, req}).toString().split(",");
        const username_cookie = strsplit[0];
        const id_cookiestrsplit = strsplit[1];
        const docRef = doc(firestore, "users", id_cookiestrsplit);
        let snapinfo = await getDoc(docRef);
        if (snapinfo.exists() && snapinfo.data().name == username_cookie) {
            loginarr.push(true);
        }
    }
    var login_status = null;
    if (loginarr.length > 0) {
        login_status = true;
    } else {
        login_status = false;
    }
    res.status(200).json({AuthStatus: login_status, token: token});
}