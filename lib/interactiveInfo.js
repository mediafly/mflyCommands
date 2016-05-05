var $ = require('jquery')
var device = require('./device')
var getData = require('./internalMethods').getData

module.exports = function () {
	if (device.getDeviceType() === device.deviceTypes.web || device.getDeviceType() === device.deviceTypes.development) {
		return $.Deferred(function (dfd) {
			getData('interactive', null, dfd)
		})
	} else {
		return $.getJSON('mflyManifest.json')
	}
}