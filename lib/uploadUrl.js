var getData = require('./internalMethods').getData

module.exports = (key) => getData('system', `uploadurl?key=${key}`)
