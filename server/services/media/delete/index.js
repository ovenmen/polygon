'use strict';

import { unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async (server) => server.delete('/api/media/:id', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const id = this.mongo.ObjectId(request.params.id);
        const media = this.mongo.db.collection('media');
        const file = await media.findOne({ _id: id });

        if (file) {
            const path = join(__dirname, '../../../public', file.fileName);

            if (existsSync(path)) {
                await unlinkSync(path);
            }

            await media.findOneAndDelete({ _id: id });
            
            return reply
                .code(STATUSES.OK)
                .send({
                    success: true,
                    title: 'Файл удален'
                });
        }
        
        return reply
            .code(STATUSES.NOT_FOUND)
            .send({
                success: false,
                error: 'Файл не найден'
            });
    } catch (error) {
        throw new Error(error);
    }
});
