const fastifyPlugin = require('fastify-plugin');

async function dbConnector(fastify, options) {
    fastify.register(require('@fastify/postgres'), {
      connectionString: 'postgresql://postgres:infinity@localhost/infinity'
    });
}

module.exports = fastifyPlugin(dbConnector);
