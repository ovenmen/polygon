'use strict';

export default {
    schema: {
        tags: ['article'],
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    title: { type: 'string' },
                }
            }
        }
    }
};
