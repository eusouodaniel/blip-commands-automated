const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const getContacts = async () => {
    const client = await blip.getConnection();
    
    const contacts = await client.sendCommand({
        id: uuidv4(),
        to: "postmaster@msging.net",
        method: 'get',
        uri: "/contexts?$take=20"
    });

    contacts.resource.items.forEach(async element => {
        await getContexts(element);
    });

    return 200;
}

const getContexts = async (element) => {
    const client = await blip.getConnection();

    const contexts = await client.sendCommand({
        id: uuidv4(),
        to: "postmaster@msging.net",
        method: 'get',
        uri: "/contexts/"+element
    });

    contexts.resource.items.forEach(async variable => {
        await deleteContexts(element, variable);
    });

    return 200;
}

const deleteContexts = async (element, variable) => {
    const client = await blip.getConnection();

    await client.sendCommand({
        id: uuidv4(),
        to: "postmaster@msging.net",
        method: 'delete',
        uri: "/contexts/"+element+"/"+variable
    });

    return 200;
}

module.exports = { getContacts };
