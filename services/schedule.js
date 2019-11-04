const uuidv4 = require('uuid/v4');
const blip = require('./blip');
require("dotenv/config");

const getBySchedule = async (id) => {
    const client = await blip.getConnection();

    var data = await client.sendCommand({  
        id: uuidv4(),
        to: 'postmaster@scheduler.msging.net',
        method: 'get',
        uri: '/schedules/'+id
    });

    return data;
};

module.exports = { getBySchedule }