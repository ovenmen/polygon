'use strict';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

export default async (server) => server.get('/api/media', { ...schema }, async function (request, reply) {
    try {
        const media = this.mongo.db.collection('media');
        const allMedia = await media.find({}).toArray();
        const count = await media.count();
        const isHaveMedia = count !== 0;

        if (isHaveMedia) {
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    media: allMedia,
                    count
                });
        }

        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                error: 'Файлы не найдены'
            });
    } catch (error) {
        throw new Error(error);
    }
});
