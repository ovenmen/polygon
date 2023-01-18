'use strict';

export default {
    schema: {
        tags: ['article'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    article: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            header: { type: 'string', minLength: 1 },
                            shortDescription: { type: 'string' },
                            fullDescription: { type: 'string' },
                            content: { type: 'array' },
                            category: { type: 'string' },
                            tags: { type: 'array' },
                            createdDate: { type: 'string', format: 'date-time' },
                            modifiedDate: { type: 'string', format: 'date-time' },
                            user: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        login: { type: 'string', format: 'email' },
                                        role: { type: 'string', pattern: 'admin|editor' },
                                        name: { type: 'string' },
                                        about: { type: 'string' },
                                        avatar: { type: 'string', format: 'url' }
                                    }
                                }
                            }
                        }
                    }
                },
                
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
