(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mflyCommands = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
*  Base64 encode / decode.
*  Needed for Windows 8 support.
*  http://www.webtoolkit.info/
*
**/

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function _utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
        } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
        }
    }
    return utftext;
}
function _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = 0;
    var c1 = 0;
    var c2 = 0;
    var c3 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
        }
    }
    return string;
}
function encode(input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}
exports.encode = encode;
function decode(input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = _utf8_decode(output);
    return output;
}
exports.decode = decode;

},{}],2:[function(require,module,exports){
"use strict";

var item_1 = require('./item');
var device_1 = require('./device');
function close() {
    item_1.getCurrentItem().then(function (data) {
        var url = data.backUrl;
        if (device_1.isWeb() && !!sessionStorage['viewerInteractiveContext']) {
            var interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext']);
            if (interactiveContext.type === 'collection') {
                url += '?collection=' + interactiveContext.id;
            }
            if (interactiveContext.type === 'search') {
                url += '?term=' + interactiveContext.term;
            }
        }
        window.location.href = url;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = close;

},{"./device":3,"./item":9}],3:[function(require,module,exports){
"use strict";

var developmentPrefix = 'http://localhost:8000/';
var webPrefix = '/interactive-api/v5/';
var mobilePrefix = 'mfly://';
exports.deviceTypes = {
    development: 'development',
    mobile: 'mobile',
    web: 'web',
    desktop: 'desktop'
};
exports.isWindows8 = function () {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("msie") !== -1) {
        if (userAgent.indexOf("webview") !== -1) {
            return true;
        }
    }
    return false;
};
function isLocalhostForDevelopment() {
    if (exports.isWindows8()) {
        return false;
    } else {
        return window.location.host.indexOf('localhost:8000') > -1;
    }
}
function getDeviceType() {
    if (isLocalhostForDevelopment()) {
        return exports.deviceTypes.development;
    } else {
        var deviceTypeCookie = document.cookie.split(';').filter(function (c) {
            return c.split('=')[0].toLowerCase().trim() === 'devicetype';
        });
        if (deviceTypeCookie.length > 0) {
            return deviceTypeCookie[0].split('=')[1];
        } else {
            return exports.deviceTypes.mobile;
        }
    }
}
exports.getDeviceType = getDeviceType;
exports.isWeb = function () {
    return getDeviceType() === exports.deviceTypes.web;
};
function getPrefix() {
    var deviceType = getDeviceType();
    switch (deviceType) {
        case exports.deviceTypes.development:
            return developmentPrefix;
        case exports.deviceTypes.web:
        case exports.deviceTypes.desktop:
            return webPrefix;
        default:
            return mobilePrefix;
    }
}
exports.getPrefix = getPrefix;

},{}],4:[function(require,module,exports){
(function (global){
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var internalMethods_1 = require('./internalMethods');
function objToString(obj) {
    var result = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += key + ':' + obj[key] + ',';
        }
    }
    result.slice(0, result.length - 1);
    return result;
}
function filter(obj) {
    var Deferred = $.Deferred();
    var result = [];
    var offset = 0;
    var limit = 100;
    var getPage = function () {
        var filter = encodeURIComponent(objToString(obj));
        return internalMethods_1.getData("items?filter=" + filter + "&offset=" + offset + "&limit=" + limit, null).done(function (data) {
            result = result.concat(data);
            if (data.length < limit) {
                Deferred.resolve(result);
            } else {
                offset += limit;
                getPage();
            }
        }).fail(function () {
            Deferred.reject();
        });
    };
    getPage();
    return Deferred.promise();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filter;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./internalMethods":8}],5:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getFolder(id) {
    return internalMethods_1.getData('items', id + "/items");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolder;

},{"./internalMethods":8}],6:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getGpsCoordinates() {
    return internalMethods_1.getData('system', 'gps');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGpsCoordinates;

},{"./internalMethods":8}],7:[function(require,module,exports){
(function (global){
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var device_1 = require('./device');
var internalMethods_1 = require('./internalMethods');
function getInteractiveInfo() {
    if (device_1.getDeviceType() === device_1.deviceTypes.web || device_1.getDeviceType() === device_1.deviceTypes.development) {
        return internalMethods_1.getData('interactive', null);
    } else {
        return $.getJSON('mflyManifest.json');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInteractiveInfo;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./device":3,"./internalMethods":8}],8:[function(require,module,exports){
(function (global){
"use strict";

var device = require('./device');
var utils_1 = require('./utils');
var Base64_1 = require('./Base64');
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
function _transformUrl(url) {
    /**
     * Required for Windows8 support.
     */
    if (device.isWindows8()) {
        var port = location.port;
        return "http://localhost:" + port + "/device.windows8.data.ajax?url__VB64__=" + Base64_1.encode(url) + "&newCall=" + utils_1.guid();
    } else {
        return url;
    }
}
function getData(func, param, expectJson) {
    if (expectJson === void 0) {
        expectJson = true;
    }
    var prefix = device.getPrefix();
    var url = _transformUrl(prefix + func + (param === null ? "" : "/" + param));
    var deferred = $.Deferred();
    $.ajax({
        url: url,
        success: function (data, textStatus, request) {
            // Content retrieved. Transform to JSON if supposed to.
            if (expectJson && request && request.getResponseHeader("Content-Type").indexOf("text/html") > -1) {
                // This was sent back as text/html JSON.parse it to a JSON object.
                data = JSON.parse(data);
            }
            // Resolve the promise.
            deferred.resolveWith(this, [data, request.status]);
        },
        error: function (data, status, request) {
            // Content could not be retrieved. Reject the promise.
            if (device.isWeb() && data.status === 401) {
                // Viewer does not have an authenticated session. Take user to Viewer root.
                sessionStorage.setItem('returnUrl', window.location.href);
                window.location.replace(data.responseJSON.returnUrl);
            }
            deferred.reject(this, [request, data.status]);
        }
    });
    return deferred.promise();
}
exports.getData = getData;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Base64":1,"./device":3,"./utils":14}],9:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getItem(id) {
    return internalMethods_1.getData('items', id);
}
exports.getItem = getItem;
function getCurrentItem() {
    return getItem('__self__');
}
exports.getCurrentItem = getCurrentItem;
function getShare(id) {
    return internalMethods_1.getData('items', id + '/share');
}
exports.getShare = getShare;
function getLastViewed() {
    return internalMethods_1.getData('items', '?list=last-viewed');
}
exports.getLastViewed = getLastViewed;
function getRecentlyCreated() {
    return internalMethods_1.getData('items', '?list=recently-created');
}
exports.getRecentlyCreated = getRecentlyCreated;

},{"./internalMethods":8}],10:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getOnlineStatus(argument) {
    return internalMethods_1.getData('online-status', null);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOnlineStatus;

},{"./internalMethods":8}],11:[function(require,module,exports){
(function (global){
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var internalMethods_1 = require('./internalMethods');
function search(term, offset, limit) {
    if (offset === void 0) {
        offset = 0;
    }
    if (limit === void 0) {
        limit = 100;
    }
    var dfd1 = $.Deferred();
    var result = [];
    var obj = {
        term: term,
        offset: offset,
        limit: limit
    };
    var getPage = function () {
        var qs = $.param(obj);
        internalMethods_1.getData('items?' + qs, null).done(function (data) {
            result = result.concat(data);
            if (data.length < obj.limit) {
                dfd1.resolve(result);
            } else {
                obj.offset += obj.limit;
                getPage();
            }
        }).fail(function () {
            dfd1.reject();
        });
    };
    getPage();
    return dfd1.promise();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = search;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./internalMethods":8}],12:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.getData('system', null);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":8}],13:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.getData('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":8}],14:[function(require,module,exports){
"use strict";

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
exports.guid = guid;

},{}],15:[function(require,module,exports){
/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */
"use strict";

var interactiveInfo_1 = require('./commands/interactiveInfo');
var systemInfo_1 = require('./commands/systemInfo');
var onlineStatus_1 = require('./commands/onlineStatus');
var uploadUrl_1 = require('./commands/uploadUrl');
var item_1 = require('./commands/item');
var folder_1 = require('./commands/folder');
var filter_1 = require('./commands/filter');
var gpsCoordinates_1 = require('./commands/gpsCoordinates');
var search_1 = require('./commands/search');
var close_1 = require('./commands/close');
var mflyCommands = {
    close: close_1.default,
    getInteractiveInfo: interactiveInfo_1.default,
    getSystemInfo: systemInfo_1.default,
    getOnlineStatus: onlineStatus_1.default,
    getGpsCoordinates: gpsCoordinates_1.default,
    getUploadUrl: uploadUrl_1.default,
    getCurrentItem: item_1.getCurrentItem,
    getItem: item_1.getItem,
    getShare: item_1.getShare,
    getFolder: folder_1.default,
    filter: filter_1.default,
    search: search_1.default,
    getLastViewed: item_1.getLastViewed,
    getRecentlyCreated: item_1.getRecentlyCreated
};
module.exports = mflyCommands;

},{"./commands/close":2,"./commands/filter":4,"./commands/folder":5,"./commands/gpsCoordinates":6,"./commands/interactiveInfo":7,"./commands/item":9,"./commands/onlineStatus":10,"./commands/search":11,"./commands/systemInfo":12,"./commands/uploadUrl":13}]},{},[15])(15)
});