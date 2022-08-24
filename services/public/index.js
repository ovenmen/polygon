'use strict';

import { STATUSES } from '../../constants.js';

const publicResources = async (instance) => instance.get('/public', async function (request, reply) {
    try {
        return reply
            .code(STATUSES.OK)
            .send({
                success: true
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default publicResources;
