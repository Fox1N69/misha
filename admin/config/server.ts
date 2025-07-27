export default ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    allowedHosts: ['mishakolesnikov.com', 'localhost'],
    app: {
        keys: env.array('APP_KEYS'),
    },
    proxy: true,
});
