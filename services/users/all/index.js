'use strict';

import { STATUSES } from '../../../constants.js';

const getUsers = async (instance) => instance.get('/users', async function (request, reply) {
    try {
        const users = this.mongo.db.collection('users');
        const allUsers = await users.find({}).toArray();
        const isEmpty = await users.count() === 0;

        if (isEmpty) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .send({
                    success: false,
                    title: "Нет пользователей"
                });
        }

        return reply.send(allUsers);
    } catch (error) {
        throw new Error(error);
    }
});

export default getUsers;
