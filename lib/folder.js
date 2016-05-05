var getData = require('./internalMethods').getData

module.exports = (id) => getData('items', `${id}/items`)