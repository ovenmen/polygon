'use strict';

const validation = {
    schema: {
        body: {
            type: 'object',
            required: ['user', 'password'],
            properties: {
                user: { type: 'string', minLength: 1 },
                password: { type: 'string', minLength: 1 }
            }
        }
    }
};

export default validation;
