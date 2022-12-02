import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function setcookie(req: NextApiRequest, res: NextApiResponse) {
    const value = req.query.value;
    setCookie('login_info', value, {req, res});
    res.status(200).json({message: "cookie created"});
}