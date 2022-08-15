'use strict';

import { STATUSES } from '../../../constants.js';

const deleteUser = async (instance) => instance.delete('/users/:id', { onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const users = this.mongo.db.collection('users');
        const user = await users.findOne({ _id: id });
        
        if (!user) {
            return reply
                .code(STATUSES.NOT_FOUND)
                .send({
                    success: false,
                    title: "Пользователь не найден"
                });
        }

        await users.findOneAndDelete({ _id: id });

        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                title: "Пользователь удален"
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default deleteUser;
