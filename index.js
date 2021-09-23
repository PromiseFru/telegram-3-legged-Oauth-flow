require("dotenv").config();

const path = require('path')

var express = require("express");

let bot_token = process.env.BOT_TOKEN

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// let token = "";

// // start oauth
// app.get("/start", (req, res, next) => {
//     const url = `https://oauth.telegram.org/auth?bot_id=${bot_token}&origin=http://localhost:3000&embed=1&request_access=write`;

//     return res.status(200).json(url)
// });

// // oauth callback
// app.get("/callback", async (req, res, next) => {
//     token;

//     return res.status(200).json(token);
// });

// // get users profile
// app.get("/user", async (req, res, next) => {
//     let profile;

//     return res.status(200).json(profile);
// })


app.listen(3000, console.log("Server running"));