import { NextApiRequest, NextApiResponse } from "next";
import {firestore} from "./Firebase";
import {addDoc, getDocs, collection, where, query} from "@firebase/firestore";

export default async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
    const username = req.query.username;
    const password = req.query.password;
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
          var userdata = docSnap.data();
          if (userdata.name === username) {
              canAdd = false;
              err = err + " Username already exists."
          }
      });
    }
    if (canAdd === true) {
        await addDoc(collection(firestore, "users"), {
            name: username,
            pass: password,
        }).then(function(docRef) {
          res.status(200).json({isAdded: true, id: docRef.id, error: ""});
      })
    } else {
      res.status(200).json({isAdded: false, id: "", error: err});
    }
}