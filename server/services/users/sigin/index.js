'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.post('/api/users/sigin', { ...schema }, async function (request, reply) {
    try {
        const { body } = request;
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ login: body.login });

        if (user) {
            const isValidPassword = await bcrypt.compare(body.password, user.password);

            if (isValidPassword) {
                const token = server.jwt.sign({ ...body, id: user._id }, { expiresIn: '15m' });

                return reply
                    .code(STATUSES.OK)
                    .send({
                        success: true,
                        title: 'Успешный вход',
                        signDate: new Date(),
                        token
                    });
            }

            return reply
                .code(STATUSES.BAD_REQUEST)
                .send({
                    success: false,
                    error: 'Неверный логин или пароль'
                });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                error: 'Пользователь не найден'
            });
    } catch (error) {
        throw new Error(error);
    }
});
