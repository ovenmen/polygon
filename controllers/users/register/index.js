'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';

const register = async (instance) => instance.post('/register', validation, async function (request, reply) {
    try {
        const { body } = request;
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ user: body.user });
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(body.password, salt);

        if (user) {
            return reply
                .code(STATUSES.OK)
                .send({
                    success: false,
                    title: "Пользователь уже существует"
                });
        }

        await users.insertOne({ user: body.user, password: hasedPassword });

        return reply
            .code(STATUSES.CREATED)
            .send({
                success: true,
                title: "Пользователь успешно зарегистрирован"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default register;
