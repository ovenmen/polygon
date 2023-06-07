'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.post('/api/articles', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const { body } = request;
        const posts = this.mongo.db.collection('articles');

        await posts.insertOne({ ...body, user: new this.mongo.ObjectId(request.user.id), createdDate: new Date() });
    
        return reply
            .code(STATUSES.CREATED)
            .send({
                success: true,
                title: 'Пост создан'
            });
    } catch (error) {
        throw new Error(error);
    }
});
