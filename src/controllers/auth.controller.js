const Login = async (request, reply) => {
    const client = await request.pg.connect();
    try {
        const { rows } = await client.query(`select * from public.user_validate(${request.body.username}, ${request.body.password})`);
        const data = {"iduser":rows[0]["idusuario"], "result":rows[0]["resultado"]}
        if(data.result){
            const token = request.jwt.sign({ data });
            reply.code(200).send({ token });
        }else{
            
            reply.code(401).send({ "message": "Incorrect login" });
        }
    } catch (err) {
        request.log.error(err);
        reply.send(err);
    } finally {
        client.release();
    }
};

module.exports = {
    Login
};