'use strict';

export default {
    schema: {
        tags: ['upload'],
        file: {
            type: 'object',
            properties: {
                encoding: { type: 'string' },
                filename: { type: 'string' },
                limit: { type: 'boolean' },
                mimetype: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' },
                    files: {
                        type: 'array',
                        items: {
                            fileName: { type: 'string' },
                            url: { type: 'string' },
                            mimeType: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
};
