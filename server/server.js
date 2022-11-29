'use strict';

import env from 'dotenv';

import {
    dbConnection,
    authenticate,
    cookieSupport,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport,
    swagger,
    sessionSupport
} from './plugins/index.js';

import {
    getArticles,
    getArticle,
    changeArticle,
    deleteArticle,
    createArticle
} from './services/articles/index.js';

import {
    registerUser,
    siginUser,
    getUser,
    getUsers,
    changeUser,
    deleteUser
} from './services/users/index.js';

import {
    uploadMultipart
} from './services/uploads/index.js';

env.config({ path: '.env' });

const plugins = [
    dbConnection,
    cookieSupport,
    authenticate,
    corsSupport,
    helmetProtection,
    multipartSupport,
    staticSupport,
    swagger,
    sessionSupport
];

const publicRoutes = [
    getArticles,
    getArticle,
    getUsers,
    getUser,
    registerUser,
    siginUser
];

const protectedRoutes = [
    changeArticle,
    deleteArticle,
    createArticle,
    changeUser,
    deleteUser,
    uploadMultipart
];

export default async (server, opts) => {
    // Plugins
    plugins.forEach(plugin => {
        server.register(plugin);
    });
   
    // Public routes
    publicRoutes.forEach(route => {
        server.register(route);
    });
    
    // Protected routes
    protectedRoutes.forEach(route => {
        server.register(route);
    });
};
