let configs = require("./config.json");
const {
    Api,
    TelegramClient
} = require("telegram");
const {
    StringSession
} = require("telegram/sessions");

const apiId = configs.APIID;
const apiHash = configs.APIHASH;
let session_token = configs.SESSION
const stringSession = new StringSession(session_token);

const client = new TelegramClient(stringSession, apiId, apiHash, {});

(async function run() {
    await client.connect();
    let myArgs = process.argv.slice(2);

    const result = await client.invoke(
        new Api.messages.SendMessage({
            peer: myArgs[0],
            message: myArgs[1],
            randomId: BigInt("-4156887774564"),
            noWebpage: true
        })
    );
    return console.log(result);
})();