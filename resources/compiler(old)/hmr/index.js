const querystring = require('querystring');
const overlayStyles = require('./overlay');

module.exports = {
    getClient() {
        const host = 'webpack-hot-middleware/client?';
        const quiery = querystring.stringify({
            path: '/__webpack_hmr',
            timeout: 2000,
            reload: true,
            overlayL: true,
            noInfo: true,
            overlayStyles: JSON.stringify(overlayStyles)
        });
        return `${host}${query}`;
    }
}