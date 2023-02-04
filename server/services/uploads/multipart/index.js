'use strict';

import { createWriteStream, readFileSync } from 'fs';
import util from 'util';
import { pipeline } from 'stream';

import { STATUSES } from '../../../constants.js';
import schema from './schema.js';

const pump = util.promisify(pipeline);

function base64Encode(file) {
    const base64encode = readFileSync(file, { encoding: 'base64' });

    return `data:image/jpeg;base64,${base64encode}`;
}

export default async (server) => server.post('/api/upload/files', { ...schema, onRequest: [server.authenticate] }, async function (request, reply) {
    try {
        const parts = request.parts();
        const media = this.mongo.db.collection('media');
        let fileName = '';

        for await (const part of parts) {
            if (part.file) {
                fileName = part.filename;
                await pump(part.file, createWriteStream(`server/public/${fileName}`));
                // await media.insertOne({ fileName, url: base64Encode(`server/public/${fileName}`), createdDate: new Date() });
                await media.insertOne({ fileName, url: `public/${fileName}`, createdDate: new Date() });
            } else {
                console.log({ field: part.fieldname, value: part.value });
            }
        }

        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                file: {
                    url: fileName && base64Encode(`server/public/${fileName}`)
                }
            });
    } catch (error) {
        throw new Error(error);
    }
});
