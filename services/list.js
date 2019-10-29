const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const getLists = async _ => {
    const client = await blip.getConnection();

    var data = await client.sendCommand({  
        id: uuidv4(),
        to: 'postmaster@broadcast.msging.net',
        method: 'get',
        uri: '/lists'
    });
    data.resource.items.forEach(element => {
        const list = await createList(element);

        const members = await getMembersByList(element);
        await setMember(members, list);
    });
};

const createList = async(data) => {
    await axios({
        method: 'POST',
        url: process.env.COMMANDS_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTHORIZATION_KEY_RECIPIENT
        }, 
        data: {
            "id": uuidv4(),
            "method": "set",
            "uri": '/lists',
            "type": "application/vnd.iris.distribution-list+json",
            "resource": data
        }
    });

    return data;
};

const getMembersByList = async (data) => {
    const client = await blip.getConnection();
    const members = data.forEach(async element => {
        await client.sendCommand({
            id: uuidv4(),
            to: "postmaster@broadcast.msging.net",
            method: 'get',
            uri: `/lists/${element}/recipients`
        });
    });

    return members;
};

const setMember = async (data, element) => {
    data.resource.items.forEach(async identity => {
        const test = await axios({
            method: 'POST',
            url: process.env.COMMANDS_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY_RECIPIENT
            }, 
            data: {
                "id": uuidv4(),
                "method": "set",
                "uri": `/lists/${element}/recipients`,
                "type": "application/vnd.lime.identity",
                "resource": identity
            }
        });
    });
};

module.exports = { getLists }