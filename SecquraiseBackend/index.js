import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const firebaseConfig = {
  apiKey: "AIzaSyDcoLxE7DOtTEGuquQ9wXyHtzSJgnC1HkA",
  authDomain: "secquraise-932cd.firebaseapp.com",
  databaseURL: "https://secquraise-932cd-default-rtdb.firebaseio.com",
  projectId: "secquraise-932cd",
  storageBucket: "secquraise-932cd.appspot.com",
  messagingSenderId: "660540507672",
  appId: "1:660540507672:web:2effc111dcc1873e9c656d",
};

// Initialize Firebase
const appfirebase = initializeApp(firebaseConfig);

app.get("/getData", (req, res) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.send(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(5000, () => console.log("app is running"));
