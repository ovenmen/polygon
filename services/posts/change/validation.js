'use strict';

const validation = {
    schema: {
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string', minLength: 1 }
            }
        }
    }
};

export default validation;
