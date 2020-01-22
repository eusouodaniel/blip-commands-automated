const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const getContacts = async _ => {
    const client = await blip.getConnection();

    var data = await client.sendCommand({  
        id: uuidv4(),
        method: 'get',
        uri: '/contacts'
    });

    await setContact(data.resource.items);
    
};

const setContact = async (element) => {
    element.forEach(async function (value) {
        console.log(value);
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
                "uri": "/contacts",
                "type": "application/vnd.lime.contact+json",
                resource: {
                    name: value.name,
                    identity: value.identity,
                    city: value.city,
                    email: value.email,
                    phoneNumber: value.phoneNumber,
                    culture: value.culture,
                    source: value.source,
                    extras: value.extras
                }
            }
        });
    });
};

module.exports = { getContacts }