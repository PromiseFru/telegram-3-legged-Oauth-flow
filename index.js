require("dotenv").config();

var express = require("express");
const input = require("input")

const app = express();

const {
    TelegramClient,
    Api
} = require("telegram");
const {
    StringSession
} = require("telegram/sessions");

const apiId = process.env.APIID;
const apiHash = process.env.APIHASH;
let session_token = ""
const stringSession = new StringSession(session_token);

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

// start oauth
app.get("/start", async (req, res, next) => {
    await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        phoneCode: async () =>
            await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");

    session_token = client.session.save();
    return res.status(200).json(client.session.save())
});

// oauth callback
app.get("/revoke", async (req, res, next) => {
    await client.connect(); // This assumes you have already authenticated with .start()

    const result = await client.invoke(new Api.auth.LogOut({}));
    return res.status(200).json(result)
})

app.listen(3000, console.log("Server running"));