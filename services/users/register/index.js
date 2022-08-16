'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';
import serialize from './serialize.js';

const register = async (instance) => instance.post('/users/register', { ...serialize, ...validation}, async function (request, reply) {
    try {
        const { body } = request;
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ login: body.login });

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
        await users.insertOne({ ...body, password: hasedPassword });

        return reply
            .code(STATUSES.CREATED)
            .send({
                success: true,
                title: "Пользователь создан"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default register;
