'use strict';

const validation = {
    schema: {
        file: {
            type: 'object',
            properties: {
                encoding: { type: 'string' },
                filename: { type: 'string' },
                limit: { type: 'boolean' },
                mimetype: { type: 'string' }
            }
        }
    }
};

export default validation;
