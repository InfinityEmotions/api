// Importación de módulos necesarios utilizando CommonJS
const fastify = require('fastify')({ logger: true });
//const fastifyCors = require('fastify-cors');
//const { MongoClient } = require('mongodb');

// Conexión a MongoDB
//const mongoClient = new MongoClient("mongodb://localhost:27017/");
//let db, collection;

// mongoClient.connect().then(client => {
//     db = client.db('usuarios');
//     collection = db.collection('usuarios');
// }).catch(err => console.error(err));

// // Configuración de CORS
// fastify.register(fastifyCors, { 
//     // Opciones de CORS aquí si es necesario
// });

// Configuraciones de la aplicación
const config = {
    newnumber: 0,
    number: 1,
    bonusposibility: 50,
    bonusin: 50,
    pozo: 1000,
    rpt: 0.9,
    multiplier: {
        "1":1,
        "2":1.125,
        "3":1.286,
        "4":1.5,
        "5":1.8,
        "6":2.25,
        "7":3,
        "8":4.5,
        "9":9,
        "10":18
    },
    posibility:{
        "1":95,
        "2":90,
        "3":80,
        "4":60,
        "5":50,
        "6":40,
        "7":30,
        "8":30,
        "9":20,
        "10":20
    }
};

// Rutas
fastify.get('/', async (request, reply) => {
    return "Infinity";
});

fastify.get('/lotto', async (request, reply) => {
    const data = { newnumber: config.newnumber, number: config.number };
    return data;
});

fastify.post('/lotto', async (request, reply) => {
    const data = request.body;
    config.newnumber = data.newnumber;
    config.number = data.number;
    return 'Seteo correcto';
});


fastify.post('/crash', async (request, reply) => {
    try {
        const data = request.body;
        if (data['step'] == 1) {
            config['pozo'] += data['bet'];
        }

        let toearn = config['multiplier'][data['step'].toString()] * data['bet'];
        let bonus = false;
        let bonusin = false;

        if (data['bonusamount'] === 0) {
            if ((data['step'] > 2 && data['step'] < 6 && randomFloat(0.0, 100.0) < config['bonusposibility']) || data['step'] === 5) {
                bonus = true;
                if (random.float(0, 100) < config['bonusin']) {
                    bonusin = true;
                }
            }
        }

        if (!bonusin) {
            const pos = randomFloat(0.0, 100.0); // Reactiva esta línea para el cálculo real
            if (toearn > config['pozo'] * config['rpt'] || pos > config['posibility'][data['step'].toString()]) {
                toearn = 0;
            }
        }

        let nextEarn = 0;
        if (data['step'] < 10) {
            nextEarn = config['multiplier'][(data['step'] + 1).toString()] * data['bet'];
        }

        return reply.send({ earn: toearn, nextEarn: nextEarn, bonus: bonus, bonusin: bonusin });
    } catch (ex) {
        return reply.code(500).send({ error: ex.message });
    }
});

// Ruta /crash/bonus adaptada para Fastify
fastify.post('/crash/bonus', async (request, reply) => {
    const data = request.body;
    let toearn = data['subtotal'] + data['bet'];

    if (toearn > config['pozo'] * config['rpt'] || random.float(0, 100) > config['bonusposibility']) {
        toearn = 0;
    }

    return reply.send({ bonusextra: toearn });
});


function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Iniciar servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
