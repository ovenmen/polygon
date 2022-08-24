'use strict';

import { STATUSES } from '../../constants.js';
import { setUploadPath } from '../../plugins/multer-support.js';

const upload = setUploadPath('images');

const uploadImage = async (instance) => instance.post('/upload/image', { preHandler: upload.single('image'), onRequest: [instance.authenticate] }, async function (request, reply) {
    try {
        return reply
            .code(STATUSES.OK)
            .send({
                success: true,
                title: `Изображение ${request.file.originalname} загружено`
            });
    } catch (error) {
        throw new Error(error);
    }
});

export default uploadImage;
