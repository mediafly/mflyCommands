/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */

module.exports = {
	getInteractiveInfo: require('./interactiveInfo'),
	getSystemInfo: require('./systemInfo'),
	getOnlineStatus: require('./onlineStatus'),
	getGpsCoordinates: require('./gpsCoordinates'),
	getUploadUrl: require('./uploadUrl'),
	getCurrentItem: require('./item').getCurrent,
	getItem: require('./item').get,
	getShare: require('./share'),
	getFolder: require('./folder'),
	// showControlBars: require('./controlBars')

}