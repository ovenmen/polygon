'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import validation from './validation.js';
import serialize from './serialize.js';

const changeUser = async (instance) => instance.patch('/users/:id', { ...validation, ...serialize, onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const id = this.mongo.ObjectId(request.params.id);
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ _id: id });

        if (user) {
            const isLoginBusy = await users.findOne({ login: body.login }).count() !== 0;

            if (isLoginBusy) {
                return reply
                    .code(STATUSES.BAD_REQUEST)
                    .send({
                        success: false,
                        title: "Логин уже занят"
                    });
            }

            const salt = await bcrypt.genSalt(10);
            const hasedPassword = await bcrypt.hash(body.password, salt);

            await users.findOneAndUpdate({ _id: id }, { $set: { ...body, password: hasedPassword, date: new Date() } });
    
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: "Пользователь изменен"
                });
        }

        return reply
            .code(STATUSES.BAD_REQUEST)
            .send({
                success: false,
                title: "Пользователь не существует"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default changeUser;
