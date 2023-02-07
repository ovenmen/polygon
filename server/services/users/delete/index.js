'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.delete('/api/users/:id', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ _id: id });
        const isSuperAdmin = user.roles.find(role => role === 'superAdmin');
        const isCurrentUser = request.session.user.id === user._id.toString();

        if (isCurrentUser) {
            return reply
                .code(STATUSES.BAD_REQUEST)
                .send({
                    success: false,
                    error: 'Текущего пользователя удать нельзя'
                });
        }

        if (isSuperAdmin) {
            return reply
                .code(STATUSES.BAD_REQUEST)
                .send({
                    success: false,
                    error: 'Пользователя с правами супер-админ удалить нельзя'
                });
        }
        
        if (user) {
            await users.findOneAndDelete({ _id: id });

            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: 'Пользователь удален'
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
