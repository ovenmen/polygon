'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.post('/users/sigin', { ...schema }, async function (request, reply) {
    try {
        const { body } = request;
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ login: body.login });

        if (user) {
            const isValidPassword = await bcrypt.compare(body.password, user.password);

            if (isValidPassword) {
                return reply
                    .code(STATUSES.OK)
                    .send({
                        success: true,
                        title: "Успешный вход",
                        token: server.jwt.sign({ ...body, id: user._id })
                    })
                    .redirect('/admin');
            }

            return reply
                .code(STATUSES.BAD_REQUEST)
                .send({
                    success: false,
                    title: "Неверный логин или пароль"
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
