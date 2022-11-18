'use strict';

import bcrypt from 'bcrypt';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.patch('/api/users/:id', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const id = this.mongo.ObjectId(request.params.id);
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ _id: id });

        if (user) {
            const isLoginBusy = await users.findOne({ login: body.login });
            const modifiedDate = new Date();

            if (isLoginBusy) {
                return reply
                    .code(STATUSES.BAD_REQUEST)
                    .send({
                        success: false,
                        error: 'Логин уже занят'
                    });
            }

            if(body.password) {
                const salt = await bcrypt.genSalt(10);
                const hasedPassword = await bcrypt.hash(body.password, salt);

                await users.findOneAndUpdate({ _id: id }, { $set: { ...body, password: hasedPassword, modifiedDate } });
            }

            await users.findOneAndUpdate({ _id: id }, { $set: { ...body, modifiedDate } });
    
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    modifiedDate,
                    title: 'Пользователь изменен'
                });
        }

        return reply
            .code(STATUSES.BAD_REQUEST)
            .send({
                success: false,
                error: 'Пользователь не существует'
            });
    } catch (error) {
        throw new Error(error);
    }
});
