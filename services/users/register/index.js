'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.post('/users/register', { ...schema }, async function (request, reply) {
    try {
        const { body } = request;
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ login: body.login });
        const createdDate = new Date();

        if (user) {
            return reply
                .code(STATUSES.BAD_REQUEST)
                .send({
                    success: false,
                    title: "Пользователь уже существует"
                });
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(body.password, salt);

        await users.insertOne({ ...body, password: hasedPassword, createdDate });

        return reply
            .code(STATUSES.CREATED)
            .send({
                success: true,
                createdDate,
                title: "Пользователь создан"
            });
    } catch (error) {
        throw new Error(error);
    }
});
