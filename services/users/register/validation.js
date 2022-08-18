'use strict';

const validation = {
    schema: {
        body: {
            type: 'object',
            required: ['login', 'password', 'role', 'name'],
            properties: {
                login: { type: 'string', minLength: 1 },
                password: { type: 'string', minLength: 1 },
                role: { type: 'string', minLength: 1 },
                name: { type: 'string', minLength: 1 },
                about: { type: 'string' }
            }
        }
    }
};

export default validation;
