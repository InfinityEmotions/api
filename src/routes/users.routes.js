const controller = require('../controllers/users.controller');

const routes = [
    {
        url: '/users',
        method: 'GET',
        handler: controller.getUser
    },
    {
        url: '/test',
        method: 'GET',
        handler: controller.getTest
    },
];

module.exports = routes;