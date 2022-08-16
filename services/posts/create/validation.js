'use strict';

const validation = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: { type: 'string', minLength: 1 },
                content: { type: 'string'},
                user: { type: 'string' }
            }
        }
    }
};

export default validation;
