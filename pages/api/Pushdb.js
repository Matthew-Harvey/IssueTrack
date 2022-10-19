// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {addDoc, collection} from "@firebase/firestore";
import {firestore} from "/Firebase";

export default function handler(req, res) {
    const user = req.body;
    addDoc(collection(firestore, "users"), {
        name: user.username,
        pass: user.pass,
    });
    res.status(200).json({ message: "added to db" });
}