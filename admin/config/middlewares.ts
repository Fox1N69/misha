export default [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::cors',
        config: {
            origin: ['http://mishakolesnikov.com', 'http://localhost:3000'],
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
