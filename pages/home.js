import { useRouter } from 'next/router';
import Mynav from './comps/Mynav';
import Cookies from 'js-cookie';

export default function home() {
    const router = useRouter()
    const user = router.query;
    console.log(user, "user info");
    var login_status = false;
    if (user) {
        console.log(Cookies.get('login_info'));
        // split username,docid
    } else {
        login_status = true;
    }
    console.log(login_status, "login status");
    return (
        <>
            <Mynav />
            <p>{user.username}</p>
            <p>{user.pass}</p>
            <p>{login_status}</p>
        </>
    )
}
