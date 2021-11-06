let configs = require("./config.json");
const fs = require('fs')

const {
    Api,
    TelegramClient
} = require("telegram");
const {
    StringSession
} = require("telegram/sessions");
const input = require("input");

const apiId = configs.APIID;
const apiHash = configs.APIHASH;
let session_token = configs.SESSION
const stringSession = new StringSession(session_token);

const client = new TelegramClient(stringSession, apiId, apiHash, {});

(async function start() {
    try {
        await client.start({
            phoneNumber: async () => await input.text("Please enter your number: "),
            phoneCode: async () => await input.text("Please enter the code you received: "),
            onError: (err) => console.log(err),
        });

        let data = {
            APIID: configs.APIID,
            APIHASH: configs.APIHASH,
            SESSION: client.session.save()
        };

        await fs.writeFileSync("./config.json", JSON.stringify(data));
        return console.log("You should now be connected.");
    } catch (err) {
        console.error(err)
    }
})();