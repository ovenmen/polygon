'use strict';

export default {
    schema: {
        tags: ['user'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    user: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            login: { type: 'string', format: 'email' },
                            name: { type: 'string', format: 'password' },
                            role: { type: 'string', pattern: 'admin|editor' },
                            createdDate: { type: 'string', format: 'date-time' },
                            modifiedDate: { type: 'string', format: 'date-time' },
                            about: { type: 'string' },
                            avatar: { type: 'string' }
                        }
                    }
                }
            },
            404: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    error: { type: 'string' }
                }
            }
        }
    }
};
