import Mynav from './comps/Mynav';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from '@mui/material';

export default function home() {
    const [isAuth, setAuth] = useState(false);
    const [username, setUsername] = useState("");

    useEffect( () => {
        const fetchAuth = async () => {
            if (getCookie('login_info') != undefined) {
                var strsplit = getCookie('login_info').toString().split(",");
                var username_cookie = strsplit[0];
                var id_cookiestrsplit = strsplit[1];
                const getAuth = await axios.get("/api/Auth", {params: {id: id_cookiestrsplit, user: username_cookie}});
                if (getAuth.data.isAuth == true) {
                    setAuth(getAuth.data.isAuth);
                    setUsername(getAuth.data.name);
                }
            }
        }
        fetchAuth();
    }, [isAuth, username]);

    if (isAuth == true) {
        return (
            <>
                <Mynav params={{username: username}}/>
                <p>YOU ARE LOGGED IN AS {username}</p>
            </>
        )
    } else {
        return (
            <>
                <p>YOU ARE NOT LOGGED IN.</p>
                <Link href='/'>Login/Register</Link>
            </>
        )
    }
}