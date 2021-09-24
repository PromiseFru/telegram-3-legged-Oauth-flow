require("dotenv").config();

const path = require('path')

var express = require("express");

let bot_token = process.env.BOT_TOKEN

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const {
    TelegramClient
} = require("telegram");
const {
    StringSession
} = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = process.env.APIID;
const apiHash = process.env.APIHASH;
const stringSession = new StringSession(""); // fill this later with the value from session.save()

(async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () =>
            await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again
    await client.sendMessage("me", {
        message: "Hello!"
    });
})();

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


// app.listen(3000, console.log("Server running"));