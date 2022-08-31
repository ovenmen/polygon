'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/admin/sigin', { ...schema }, async function (request, reply) {
    try {
        return reply
            .code(STATUSES.OK)
            .view("/templates/sigin.art", {
                title: "Sigin",
                header: "Sigin in admin panel"
            });
    } catch (error) {
        throw new Error(error);
    }
});
