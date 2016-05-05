var developmentPrefix = 'http://localhost:8000/'
var webPrefix = '/interactive-api/v5/'
var mobilePrefix = 'mfly://'
var deviceTypes = {
	development: 'development',
	mobile: 'mobile',
	web: 'web',
	desktop: 'desktop'
}

var isWindows8 = function () {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf("msie") !== -1) {
		if (userAgent.indexOf("webview") !== -1) {
			return true
		}
	}
	return false
}

function isLocalhostForDevelopment () {
	if (isWindows8()) {
		return false
	} else {
		return (window.location.host.indexOf('localhost:8000') > -1)
	}
}

function getDeviceType() {
	if (isLocalhostForDevelopment()) {
		return deviceTypes.development
	} else {
		var deviceTypeCookie = document.cookie.split(';')
			.find(c => c.split('=')[0].toLowerCase().trim() === 'devicetype')

		if (deviceTypeCookie) {
			return deviceTypeCookie.split('=')[1]
		} else {
			return deviceTypes.mobile
		}
	}
}

var isWeb = () => getDeviceType() === deviceTypes.web

exports.getPrefix = function() {
	var deviceType = getDeviceType()
	switch (deviceType) {
		case deviceTypes.development:
			return developmentPrefix
		case deviceTypes.web:
		case deviceTypes.desktop:
			return webPrefix
		default:
			return mobilePrefix
	}
}

exports.deviceTypes = deviceTypes
exports.isWindows8 = isWindows8
exports.isWeb = isWeb
exports.getDeviceType = getDeviceType