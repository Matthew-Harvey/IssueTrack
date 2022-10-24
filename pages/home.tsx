import Mynav from './comps/Mynav';
import {firestore} from "./api/Firebase";
import { doc, getDoc } from "@firebase/firestore";
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from "next";
import Button from '@mui/material/Button';

export default function home() {
    const checkRequest = async(e) => {
        e.preventDefault();
        const login_status = await checkAuth();
        const username = login_status[0];
        const isAuth = login_status[1];
        console.log(username, isAuth);
        if (isAuth == true) {
            // allow action
        } else {
            // reject action
        }
    }
    return (
        <>
            <Mynav />
            <Button style={{margin: "3em", backgroundColor: "grey"}} variant="contained" size="large" onClick={checkRequest}>Check Login</Button>
        </>
    )
}

const checkAuth = async function () {
    const loginarr = [];
    var username_cookie = "";
    if (getCookie('login_info') != undefined) {
        var strsplit = getCookie('login_info').toString().split(",");
        var username_cookie = strsplit[0];
        const id_cookiestrsplit = strsplit[1];
        const docRef = doc(firestore, "users", id_cookiestrsplit);
        let snapinfo = await getDoc(docRef);
        if (snapinfo.exists() && snapinfo.data().name == username_cookie) {
            loginarr.push(true);
        }
    }
    if (loginarr.length > 0) {
        return [username_cookie, true]
    } else {
        return [username_cookie, false];
    }
}


const processToken =  async function (token, req: NextApiRequest, res: NextApiResponse) {
    console.log(getCookie('login_info', {res, req}));
    const getAuth = await fetch("http://localhost:3000/api/Auth", {method: "GET", body: JSON.stringify(token), headers: { "Content-Type": "application/json"}});
    const AuthData = await getAuth.json();
    console.log(AuthData, "IN SERVER SIDE PROPS");
    return AuthData;
}