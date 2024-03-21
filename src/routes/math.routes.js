const controller = require('../controllers/math.controller');

const route = [
    {
        url: '/crash',
        method: 'POST',
        handler: controller.GetCrash
    },
    {
        url: '/crash/bonus',
        method: 'POST',
        handler: controller.GetBonusCrash
    }

]

module.exports = route;