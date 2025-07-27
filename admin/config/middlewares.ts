export default [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::cors',
        config: {
            origin: ['http://localhost:3000', 'https://mikhailkolesnikov.com'],
            credentials: true,
        },
    },
    'strapi::security',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
