const config = {
    newnumber: 0,
    number: 1,
    bonusposibility: 50,
    bonusin: 70,
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
        "1":99,
        "2":99,
        "3":90,
        "4":90,
        "5":90,
        "6":90,
        "7":90,
        "8":90,
        "9":90,
        "10":70
    }
};

const GetCrash = async (request, reply) => {
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
                if (randomFloat(0.0, 100.0) < config['bonusin']) {
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
};

const GetBonusCrash = async (request, reply) =>{
    const data = request.body;
    let toearn = data['subtotal'] + data['bet'];

    if (toearn > config['pozo'] * config['rpt'] || randomFloat(0.0, 100.0) > config['bonusposibility']) {
        toearn = 0;
    }

    return reply.send({ bonusextra: data['bet'] });
};


function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    GetCrash,
    GetBonusCrash
}