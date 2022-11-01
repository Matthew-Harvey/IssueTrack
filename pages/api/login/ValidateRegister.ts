import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "../Firebase";
import {addDoc, getDocs, collection, where, query} from "@firebase/firestore";
import bcrypt from "bcrypt";

export default async function ValidateRegister(req: NextApiRequest, res: NextApiResponse) {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    const confpassword = req.query.confpassword;
    const user_collection = collection(firestore, "users");
    var canAdd = true;
    var err = "";
    // password + confirm match
    if (confpassword !== password) {
        canAdd = false;
        err = err + " Passwords dont match."
    }
    if (canAdd === true) {
      const q = query(user_collection, where("name", "==", username));
      let snapshot = await getDocs(q);
      snapshot.forEach(docSnap => {
          canAdd = false;
          err = err + " Username already exists."
      });
    }
    if (canAdd === true) {
      const hash = bcrypt.hashSync(password, 10);
      await addDoc(collection(firestore, "users"), {name: username, pass: hash, email: email, status: "",}).then(function(docRef) { res.status(200).json({isAdded: true, id: docRef.id, error: ""});})
    } else {
      res.status(200).json({isAdded: false, id: "", error: err});
    }
}