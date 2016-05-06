var developmentPrefix = 'http://localhost:8000/'
var webPrefix = '/interactive-api/v5/'
var mobilePrefix = 'mfly://'
export var deviceTypes = {
	development: 'development',
	mobile: 'mobile',
	web: 'web',
	desktop: 'desktop'
}

export var isWindows8 = function () {
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

export function getDeviceType() {
	if (isLocalhostForDevelopment()) {
		return deviceTypes.development
	} else {
		var deviceTypeCookie = document.cookie.split(';').filter(c => c.split('=')[0].toLowerCase().trim() === 'devicetype')

		if (deviceTypeCookie.length > 0) {
			return deviceTypeCookie[0].split('=')[1]
		} else {
			return deviceTypes.mobile
		}
	}
}

export var isWeb = () => getDeviceType() === deviceTypes.web

export function getPrefix() {
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