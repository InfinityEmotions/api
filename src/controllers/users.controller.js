const getUser = async (request, reply) => {
    const client = await request.pg.connect();
    try {
        const { rows } = await client.query('SELECT * FROM users');

        var data = [];
        rows.forEach(item => {
            data.push({"name":item["firstname"], "surname":item["surname"], "email":item["email"]})
        });
        
        reply.send(data);
    } catch (err) {
        request.log.error(err);
        reply.send(err);
    } finally {
        client.release();
    }
};

const getTest = async (request, reply) => {

    reply.send({"test":"realizado"});
    // const client = await request.pg.connect();
    // try {
    //     const { rows } = await client.query('SELECT * FROM users');
    //     reply.send(rows);
    // } catch (err) {
    //     request.log.error(err);
    //     reply.send(err);
    // } finally {
    //     client.release();
    // }
};

module.exports = {
    getUser,
    getTest
};