const fastify = require('fastify')({ logger: true });
const userRoutes = require('../src/routes/users.routes');
const conn = require('../src/utils/connection');

fastify.register(conn);

fastify.addHook('preHandler', async (request, reply) => {
  request.pg = fastify.pg;
});

userRoutes.forEach(route => {
    fastify.route(route);
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});