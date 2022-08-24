'use strict';

import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';

import { STATUSES } from '../../constants.js';

const pump = util.promisify(pipeline);

const uploadFile = async (instance) => instance.post('/upload/image', async function (request, reply) {
    try {
        const data = await request.file();
        console.log(
            data.file, // stream
            data.fields, // other parsed parts
            data.fieldname,
            data.filename,
            data.encoding,
            data.mimetype
        );
        await pump(data.file, fs.createWriteStream(`uploads/${data.filename}`));

        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                title: `Изображение ${data.filename} загружено`
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default uploadFile;
