const express = require('express');
const attendant = require('./services/attendant');
const contact = require('./services/contact');
const resource = require('./services/resource');
const team = require('./services/team');

const server = express();

server.get('/attendants', (req, res) => {
    const attendants = attendant.getAllAttendants();

    return res.json(attendants);
});

server.get('/contacts', (req, res) => {
    const contacts = contact.getContacts();

    return res.json(contacts);
});

server.get('/delete-resources', (req, res) => {
    const resources = resource.deleteResource();

    return res.json(resources);
});

server.get('/resources', (req, res) => {
    const resources = resource.getByResource();

    return res.json(resources);
});

server.get('/teams', (req, res) => {
    const emails = ['email1@blip.ai', 'email12@blip.ai'];
    const teams = team.setMembers(emails);

    return res.json(teams);
});


server.listen(3333);
