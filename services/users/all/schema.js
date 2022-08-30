'use strict';

export default {
    schema: {
        tags: ['user'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    count: { type: 'number' },
                    users: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                login: { type: 'string', format: 'email' },
                                name: { type: 'string' },
                                role: { type: 'string', pattern: 'admin|editor' },
                                createdDate: { type: 'string', format: 'date-time' },
                                modifiedDate: { type: 'string', format: 'date-time' },
                                about: { type: 'string' },
                                avatar: { type: 'string', format: 'url' }
                            }
                        }
                    }
                }
            },
            404: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' }
                }
            }
        }
    }
};
