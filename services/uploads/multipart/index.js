'use strict';

import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

const pump = util.promisify(pipeline);

export default async (server) => server.post('/upload/files', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const parts = request.parts();

        for await (const part of parts) {
            if (part.file) {
                await pump(part.file, fs.createWriteStream(`public/${part.filename}`));
            } else {
                console.log({ field: part.fieldname, value: part.value });
            }
        }

        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                title: 'Файлы загружены, данные получены'
            });
    } catch (error) {
        throw new Error(error);
    }
});
