const proxy = require('http-proxy-middleware');

// Proxies requests prepended with /api to localhost:4000
module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:4000' }));
};