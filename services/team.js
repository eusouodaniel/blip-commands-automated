const uuidv4 = require('uuid/v4');
const axios = require('axios');
const blip = require('./blip');
require("dotenv/config");

const setMembers = async (element) => {
    element.forEach(async email => {
        await axios({
            method: 'POST',
            url: process.env.COMMANDS_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTHORIZATION_KEY_RECIPIENT
            }, 
            data: {
                'id': uuidv4(),
                'method': 'set',
                'to': 'postmaster@portal.blip.ai',
                'uri': '/auth-permissions',
                'type': 'application/vnd.iris.portal.guest-user+json',
                'resource': {
                    'applicationName': process.env.APPLICATION_NAME_RECIPIENT,
                    'returnUrl': `https://portal.blip.ai/application/detail/${process.env.APPLICATION_SHORT_NAME_RECIPIENT}/home`,
                    'shortName': process.env.APPLICATION_SHORT_NAME_RECIPIENT,
                    'userCulture': 'en',
                    'userEmail': email,
                    'userFullName': email,
                    'permissions': getPermissions()
                }
            }
        });
    });

    return 200;
}

const getPermissions = () => {
    return [
        {
            'id': 'team',
            'permissionAction': 3,
            'permissionClaim': 112
        },
        {
            'id': 'payments',
            'permissionAction': 3,
            'permissionClaim': 101
        },
        {
            'id': 'ai-providers',
            'permissionAction': 3,
            'permissionClaim': 102
        },
        {
            'id': 'ai-model',
            'permissionAction': 3,
            'permissionClaim': 103
        },
        {
            'id': 'ai-enhancement',
            'permissionAction': 3,
            'permissionClaim': 104
        },
        {
            'id': 'channels',
            'permissionAction': 3,
            'permissionClaim': 105
        },
        {
            'id': 'desk',
            'permissionAction': 3,
            'permissionClaim': 106
        },
        {
            'id': 'users',
            'permissionAction': 3,
            'permissionClaim': 107
        },
        {
            'id': 'scheduler',
            'permissionAction': 3,
            'permissionClaim': 108
        },
        {
            'id': 'config-basicConfigurations',
            'permissionAction': 3,
            'permissionClaim': 109
        },
        {
            'id': 'config-connectionInformation',
            'permissionAction': 3,
            'permissionClaim': 110
        },
        {
            'id': 'resources',
            'permissionAction': 3,
            'permissionClaim': 111
        },
        {
            'id': 'logMessages',
            'permissionAction': 3,
            'permissionClaim': 113
        },
        {
            'id': 'builder',
            'permissionAction': 3,
            'permissionClaim': 114
        },
        {
            'id': 'analysis',
            'permissionAction': 3,
            'permissionClaim': 115
        }
    ];
}

module.exports = { getPermissions, setMembers };


   