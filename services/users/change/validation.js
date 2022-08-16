'use strict';

const validation = {
    schema: {
        body: {
            type: 'object',
            required: ['login', 'password'],
            properties: {
                login: { type: 'string', minLength: 1 },
                password: { type: 'string', minLength: 1 },
                role: { type: 'string', minLength: 1 }
            }
        }
    }
};

export default validation;
