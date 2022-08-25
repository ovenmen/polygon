'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/users', { ...schema }, async function (request, reply) {
    try {
        const users = this.mongo.db.collection('users');
        const allUsers = await users.find({}).toArray();
        const count = await users.count();
        const isHaveUsers = count !== 0;

        if (isHaveUsers) {
            return reply
                .code(STATUSES.OK)
                .send({ users: allUsers, count });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                title: "Нет пользователей"
            });
    } catch (error) {
        throw new Error(error);
    }
});
