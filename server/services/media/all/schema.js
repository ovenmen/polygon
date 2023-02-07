'use strict';

export default {
    schema: {
        tags: ['media'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    count: { type: 'number' },
                    media: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                fileName: { type: 'string' },
                                url: { type: 'string' },
                                mimeType: { type: 'string' },
                                createdDate: { type: 'string', format: 'date-time' }
                            }
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
