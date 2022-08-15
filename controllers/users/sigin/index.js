'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';

const sigin = async (instance) => instance.post('/sigin', validation, async function (request, reply) {
    try {
        const { body } = request;
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ user: body.user });

        if (!user) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .send({
                    success: false,
                    title: "Пользователь не найден"
                });
        }

        const validPassword = await bcrypt.compare(body.password, user.password);
        const token = instance.jwt.sign({ ...body });

        if (validPassword) {
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: "Успешный вход",
                    token
                })
                .redirect(302, '/');
        }

        return reply
            .code(STATUSES.UNAUTHARIZED)
            .send({
                success: false,
                title: "Неверный логин или пароль"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default sigin;
