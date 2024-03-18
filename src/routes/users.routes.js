const controller = require('../controllers/users.controller');

const routes = [
    {
        url: '/app/users',
        method: 'GET',
        handler: controller.getUser
    },
    {
        url: '/app/test',
        method: 'GET',
        handler: controller.getTest
    },
];

module.exports = routes;