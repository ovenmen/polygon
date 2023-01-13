'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from '@fastify/mongodb';

const dbConnection = async (server) => {
    await server.register(fastifyMongodb, {
        forceClose: true,
        url: process.env.DB_CONNECTION_URL
    });    
};

export default fastifyPlugin(dbConnection);
