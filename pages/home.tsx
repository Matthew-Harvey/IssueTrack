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
        console.log(login_status);
        if (login_status == true) {
            return (
                <>
                    <Mynav />
                    <p>USRENAME GOES HERE</p>
                    <p>LOGGED IN!</p>
                </>
            )
        } else {
            return (
                <>
                    <Mynav />
                    <p>Not Logged in</p>
                </>
            )
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
    const loginarr = []
    if (getCookie('login_info') != undefined) {
        var strsplit = getCookie('login_info').toString().split(",");
        const username_cookie = strsplit[0];
        const id_cookiestrsplit = strsplit[1];
        const docRef = doc(firestore, "users", id_cookiestrsplit);
        let snapinfo = await getDoc(docRef);
        if (snapinfo.exists() && snapinfo.data().name == username_cookie) {
            loginarr.push(true);
        }
    }
    if (loginarr.length > 0) {
        return true
    } else {
        return false;
    }
}


const processToken =  async function (token, req: NextApiRequest, res: NextApiResponse) {
    console.log(getCookie('login_info', {res, req}));
    const getAuth = await fetch("http://localhost:3000/api/Auth", {method: "GET", body: JSON.stringify(token), headers: { "Content-Type": "application/json"}});
    const AuthData = await getAuth.json();
    console.log(AuthData, "IN SERVER SIDE PROPS");
    return AuthData;
}