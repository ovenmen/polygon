'use strict';

export default {
    schema: {
        tags: ['post'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    post: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            title: { type: 'string' },
                            content: { type: 'string' },
                            user: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        login: { type: 'string' },
                                        role: { type: 'string' }
                                    }
                                }
                            },
                            createdDate: { type: 'string' },
                            modifiedDate: { type: 'string' }
                        }
                    }
                },
                
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
