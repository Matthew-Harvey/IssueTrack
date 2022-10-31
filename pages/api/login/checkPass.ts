import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    const plain = req.query.pass1;
    const hash = req.query.pass2;
    await bcrypt.compare(plain, hash, function(err, result) {
        res.status(200).json({result: result});
    });
}