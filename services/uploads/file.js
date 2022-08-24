'use strict';

import { STATUSES } from '../../constants.js';
import { setUploadPath } from '../../plugins/multer-support.js';

const upload = setUploadPath('files');

const uploadFile = async (instance) => instance.post('/upload/file', { preHandler: upload.single('file'), onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                title: `Файл ${request.file.originalname} загружен`
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default uploadFile;
