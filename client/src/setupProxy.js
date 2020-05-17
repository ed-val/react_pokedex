const proxy = require('http-proxy-middleware');

// if you change this file you MUST RESTART SERVER

module.exports = function(app) {
    app.use(proxy(['/api/', '/auth/google'], { target: 'http://localhost:5000' }));
};
// this file is searched by CRA so theres no need to import it anywhere
