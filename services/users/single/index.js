'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/users/:id', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ _id: id });

        if (user) {
            return reply
                .code(STATUSES.OK)
                .send({
                    success: false,
                    user
                });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                title: "Пользователь не найден"
            });
    } catch (error) {
        throw new Error(error);
    }
});
