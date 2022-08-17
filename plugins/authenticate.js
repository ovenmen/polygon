'use strict';

import fastifyPlugin from "fastify-plugin";
import jwt from '@fastify/jwt';

const authenticate = async (server) => {
    server.register(jwt, {
        secret: process.env.SECRET
    });
    
    return server.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
};

export default fastifyPlugin(authenticate);
