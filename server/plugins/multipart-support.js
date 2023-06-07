'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyMultipart from '@fastify/multipart';

const multipartSupport = async (server) => {
    await server.register(fastifyMultipart, {
        limits: {
        //     fieldNameSize: 100, // Max field name size in bytes
        //     fieldSize: 100,     // Max field value size in bytes
        //     fields: 10,         // Max number of non-file fields
        //     fileSize: 1000000,  // For multipart forms, the max file size in bytes
            files: 5,           // Max number of file fields
        //     headerPairs: 2000   // Max number of header key=>value pairs
        }
    });
};

export default fastifyPlugin(multipartSupport);
