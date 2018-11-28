const _cconfig = {
    app: {
        port: 5000
    },
    session: {
        secret: 'supersecret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 86400 }
    },
    serverapi: {
        host: 'localhost',
        port: 1337
    },
    nexmo: {
        apiKey: 'ea2183df',
        apiSecret: '7nOLbqXN2xfKwm1q'
    }
};

module.exports = _cconfig;