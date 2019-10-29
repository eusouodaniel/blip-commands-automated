const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const getAllAttendants = async () => {
    const client = await blip.getConnection();
    
    const attendants = await client.sendCommand({
        id: uuidv4(),
        to: "postmaster@desk.msging.net",
        method: 'get',
        uri: "/attendants"
    });
    attendants.resource.items.forEach(async element => {
        await setAttendants(element);
    });
    return 200;
}

const setAttendants = async (element) => {
    const attendant = await axios({
        method: 'POST',
        url: process.env.COMMANDS_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTHORIZATION_KEY_RECIPIENT
        }, 
        data: {
            id: uuidv4(),
            to: "postmaster@desk.msging.net",
            method: "set",
            uri: "/attendants",
            type: "application/vnd.iris.desk.attendant+json",
            resource: {
                identity: element["identity"],
                teams: element["teams"]
            }
        }
    });

    return attendant;
}

module.exports = { getAllAttendants };
