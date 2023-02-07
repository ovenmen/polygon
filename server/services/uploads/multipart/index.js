'use strict';

import { createWriteStream } from 'fs';
import util from 'util';
import { pipeline } from 'stream';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

const pump = util.promisify(pipeline);

export default async (server) => server.post('/api/upload/files', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const parts = request.parts();
        const media = this.mongo.db.collection('media');
        const files = [];

        for await (const part of parts) {
            if (part.file) {
                const fileName = part.filename;
                const mimeType = part.mimetype;
                const file = {
                    fileName,
                    mimeType,
                    url: `public/${fileName}`,
                    createdDate: new Date()
                };

                files.push(file);

                await pump(part.file, createWriteStream(`server/public/${fileName}`));
                await media.insertOne(file);
            } else {
                console.log({ field: part.fieldname, value: part.value });
            }
        }

        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                files
            });
    } catch (error) {
        throw new Error(error);
    }
});
