'use strict';

import {
    dbConnection,
    authenticate,
    cookieSupport,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport,
    swagger
} from './plugins/index.js';

import {
    getUsers,
    register,
    sigin,
    deleteUser,
    changeUser,
    getPosts,
    getPost,
    createPost,
    changePost,
    deletePost,
    uploadFile
} from './services/index.js';

const plugins = [
    dbConnection,
    cookieSupport,
    authenticate,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport,
    swagger
];

const routes = {
    users: [
        getUsers,
        register,
        sigin,
        deleteUser,
        changeUser
    ],
    posts: [
        getPosts,
        getPost,
        createPost,
        changePost,
        deletePost,
    ],
    uploads: [
        uploadFile
    ]
};

export default async (server, opts) => {
    // Plugins
    plugins.forEach(plugin => {
        server.register(plugin);
    });
   
    // Users
    routes.users.forEach(route => {
        server.register(route);
    });
    
    // Posts
    routes.posts.forEach(route => {
        server.register(route);
    });

    // Upload
    routes.uploads.forEach(route => {
        server.register(route);
    });
};
