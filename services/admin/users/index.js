'use strict';

import { STATUSES } from '../../../constants.js';
// import schema from './schema.js';

export default async (server) => server.get('/admin/users', async function (request, reply) {
    try {
        return reply
            .code(STATUSES.NOT_FOUND)
            .view("/templates/users.art", {
                title: "Users",
                header: "Users"
            });
    } catch (error) {
        throw new Error(error);
    }
});
