var $ = require('jquery')
var device = require('./device')
var getData = require('./internalMethods').getData

module.exports = function () {
	if (device.getDeviceType() === device.deviceTypes.web || device.getDeviceType() === device.deviceTypes.development) {
		return getData('interactive', null)
	} else {
		return $.getJSON('mflyManifest.json')
	}
}