const websocket_transport = require('lime-transport-websocket');
const blip_sdk = require('blip-sdk');
require("dotenv/config");

const getConnection = async () => {
    const client = new blip_sdk.ClientBuilder()
        .withIdentifier(process.env.IDENTIFIER)
        .withAccessKey(process.env.ACCESS_KEY)
        .withTransportFactory(() => new websocket_transport())
        .build();
    await client.connect();

    return client;
}

module.exports = { getConnection };
