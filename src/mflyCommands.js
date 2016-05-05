(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mflyCommands = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var developmentPrefix = 'http://localhost:8000/';
var webPrefix = '/interactive-api/v5/';
var mobilePrefix = 'mfly://';
var deviceTypes = {
	development: 'development',
	mobile: 'mobile',
	web: 'web',
	desktop: 'desktop'
};

var isWindows8 = function isWindows8() {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf("msie") !== -1) {
		if (userAgent.indexOf("webview") !== -1) {
			return true;
		}
	}
	return false;
};

function isLocalhostForDevelopment() {
	if (isWindows8()) {
		return false;
	} else {
		return window.location.host.indexOf('localhost:8000') > -1;
	}
}

function getDeviceType() {
	if (isLocalhostForDevelopment()) {
		return deviceTypes.development;
	} else {
		var deviceTypeCookie = document.cookie.split(';').find(function (c) {
			return c.split('=')[0].toLowerCase().trim() === 'devicetype';
		});

		if (deviceTypeCookie) {
			return deviceTypeCookie.split('=')[1];
		} else {
			return deviceTypes.mobile;
		}
	}
}

var isWeb = function isWeb() {
	return getDeviceType() === deviceTypes.web;
};

exports.getPrefix = function () {
	var deviceType = getDeviceType();
	switch (deviceType) {
		case deviceTypes.development:
			return developmentPrefix;
		case deviceTypes.web:
		case deviceTypes.desktop:
			return webPrefix;
		default:
			return mobilePrefix;
	}
};

exports.deviceTypes = deviceTypes;
exports.isWindows8 = isWindows8;
exports.isWeb = isWeb;
exports.getDeviceType = getDeviceType;

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var device = require('./device');
var getData = require('./internalMethods').getData;

exports.interactiveInfo = function () {
	if (device.getDeviceType() === device.deviceTypes.web || device.getDeviceType() === device.deviceTypes.development) {
		return $.Deferred(function (dfd) {
			getData('interactive', null, dfd);
		});
	} else {
		return $.getJSON('mflyManifest.json');
	}
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./device":1,"./internalMethods":3}],3:[function(require,module,exports){
(function (global){
'use strict';

var device = require('./device');
var guid = require('./utils').guid;
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function _transformUrl(url) {
    /**
     * Required for Windows8 support.
     */
    if (device.isWindows8()) {
        var port = location.port;
        return "http://localhost:" + port + "/device.windows8.data.ajax?url__VB64__=" + Base64.encode(url) + "&newCall=" + guid();
    } else {
        return url;
    }
}

exports.getData = function _internalGetData(func, param, dfd) {
    var expectJson = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

    var prefix = device.getPrefix();
    var url = _transformUrl(prefix + func + (param === null ? "" : "/" + param));

    $.ajax({
        url: url,
        success: function success(data, textStatus, request) {
            // Content retrieved. Transform to JSON if supposed to.
            if (expectJson && request && request.getResponseHeader("Content-Type").indexOf("text/html") > -1) {
                // This was sent back as text/html JSON.parse it to a JSON object.
                data = JSON.parse(data);
            }

            // Resolve the promise.
            dfd.resolveWith(this, [data, request.status]);
        },
        error: function error(data, status, request) {
            // Content could not be retrieved. Reject the promise.
            if (device.isWeb() && data.status === 401) {
                // Viewer does not have an authenticated session. Take user to Viewer root.
                sessionStorage.returnUrl = window.location.href;
                window.location.replace(data.responseJSON.returnUrl);
            }

            dfd.reject(this, [request, data.status]);
        }
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./device":1,"./utils":5}],4:[function(require,module,exports){
'use strict';

/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */

module.exports = {
  getInteractiveInfo: require('./interactiveInfo').interactiveInfo
};

},{"./interactiveInfo":2}],5:[function(require,module,exports){
'use strict';

exports.guid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

},{}]},{},[4])(4)
});