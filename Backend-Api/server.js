// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import Cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1252072",
  key: "a8443ec647825c12a907",
  secret: "86a9e86cd5d21ab03c64",
  cluster: "ap2",
  useTLS: true,
});

// middleware -> To get a Api response in JSON fomat!
app.use(express.json());

// For security purposes ("Very Important!").
app.use(Cors());
// app.use((req, res, next) => {
//     res.setHeader("Allow-Control-Allow-Origin", "*");
//     res.setHeader("Allow-Control-Allow-Headers", "*");
//     next();
// })

// DB config
const connectionUrl =
  "";
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB Connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log(change);

        // After console.logging(change), here we use "change" -> properties!
        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", { 
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error Triggering the Pusher")
        }
    });
})

// api routes
app.get("/messages/sync", (req, res) => {

  // To get a Document in DB!
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  // To create a Document in DB!
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New Messages created: \n ${data}`);
    }
  });
});

// listener
app.listen(port, () => {
  console.log(`Listening on the localhost:${port}`);
});
