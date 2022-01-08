const pwaConfig = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = pwaConfig({
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development'
  }
})
