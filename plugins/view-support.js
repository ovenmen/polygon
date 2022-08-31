'use strict';

import fastifyPlugin from "fastify-plugin";
import fastifyView from '@fastify/view';
import artTemplate from 'art-template';

const viewSupport = async (server) => {
    server.register(fastifyView, {
        engine: {
            'art-template': artTemplate
        },
    });
};

export default fastifyPlugin(viewSupport);
