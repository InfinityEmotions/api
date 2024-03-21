const fastify = require('fastify')({ logger: true });
const userRoutes = require('../src/routes/users.routes');
const authRoutes = require('../src/routes/auth.routes');
const mathRoutes = require('../src/routes/math.routes');
const conn = require('../src/utils/connection');

fastify.register(conn);
fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
});

fastify.addHook('preHandler', async (request, reply) => {
  request.pg = fastify.pg;
  request.jwt = fastify.jwt;
});

fastify.register(async (app, options) =>{    
    userRoutes.forEach(route => {
        app.route(route);
    });
    
    authRoutes.forEach(route => {
        app.route(route);
    });

    mathRoutes.forEach(route => {
        app.route(route);
    });
}, {prefix:'/app'});


fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});