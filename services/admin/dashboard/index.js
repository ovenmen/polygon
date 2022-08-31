'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/admin', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        return reply
            .code(STATUSES.NOT_FOUND)
            .view("/templates/index.art", {
                title: "Dashboard",
                header: "Dashboard"
            });
    } catch (error) {
        throw new Error(error);
    }
});
