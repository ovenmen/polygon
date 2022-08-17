'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from '@fastify/mongodb';
import env from 'dotenv';

const dbConnection = async (server) => {
    env.config();

    server.register(fastifyMongodb, {
        forceClose: true,
        url: process.env.DB_CONNECTION_URL
    });
};

export default fastifyPlugin(dbConnection);
