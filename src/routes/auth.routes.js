const controller = require('../controllers/auth.controller');

const routes = [
    {
        url: '/signup',
        method: 'POST',
        handler: controller.Login
    }

];

module.exports = routes;