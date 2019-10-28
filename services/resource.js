const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const deleteResource = async _ => {
    const resources = getResources();
    resources.data.resource.items.forEach(async (element) => {
        await axios({
            method: 'POST',
            url: process.env.COMMANDS_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY_SENDER
            },
            data: {  
                "id": uuidv4(),
                "method": "delete",
                "uri": "/resources/"+element
            }
        });
    });

    return true;
}

const getByResource = async _ => {
    const resources = await getResources();
    resources.data.resource.items.forEach(async (element) => {
        var itemResource = await axios({
            method: 'POST',
            url: process.env.COMMANDS_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY_SENDER
            }, 
            data: {
                "id": uuidv4(),
                "method": "get",
                "uri": "/resources/"+element
            }
        });
        await setResource(element, itemResource.data.resource)
    });

    return true;
}

const getResources = async _ => {
    const resources = await axios({
        method: 'POST',
        url: process.env.COMMANDS_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTHORIZATION_KEY_SENDER
        }, 
        data: {
            "id": uuidv4(),
            "method": "get",
            "uri": "/resources"
        }
    });

    return resources;
};

const setResource = async (element, resource) => {
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
            "uri": "/resources/"+element,
            "type": "text/plain",
            "resource": resource
        }
    });

    return true;
}

module.exports = { deleteResource, getByResource, getResources, setResource };
