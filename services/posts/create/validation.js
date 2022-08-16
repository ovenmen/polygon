'use strict';

const validation = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'user'],
            properties: {
                title: { type: 'string', minLength: 1 },
                user: { type: 'string', minLength: 1 }
            }
        }
    }
};

export default validation;
