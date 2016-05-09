(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mflyCommands = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./device":4,"./item":11}],2:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getCollections() {
    return internalMethods_1.get('collections');
}
exports.getCollections = getCollections;
function getCollection(id) {
    return internalMethods_1.get("collections/" + id, 'items');
}
exports.getCollection = getCollection;
function createCollection(name) {
    return internalMethods_1.post('collections', { name: name });
}
exports.createCollection = createCollection;
function addItemToCollection(collectionId, itemId) {
    return internalMethods_1.post("collections/" + collectionId + "/items", { ids: [itemId] });
}
exports.addItemToCollection = addItemToCollection;
function removeItemFromCollection(collectionId, itemId) {
    return internalMethods_1.ddelete("collections/" + collectionId + "/items/" + itemId);
}
exports.removeItemFromCollection = removeItemFromCollection;
function deleteCollection(id) {
    return internalMethods_1.ddelete("collections/" + id);
}
exports.deleteCollection = deleteCollection;
function reorderItemInCollection(collectionId, itemId, position) {
    return internalMethods_1.put("collections/" + collectionId + "/items/" + itemId + "/reorder?position=" + position);
}
exports.reorderItemInCollection = reorderItemInCollection;
function renameCollection(id, name) {
    return internalMethods_1.put("collections/" + id, { name: name });
}
exports.renameCollection = renameCollection;

},{"./internalMethods":10}],3:[function(require,module,exports){
"use strict";

var device_1 = require('./device');
function isUnsupported(url) {
    if (!device_1.isWeb()) {
        return false;
    }
    var unsupportedStatements = ['/interactive-api/v5/control/show-ui'];
    return unsupportedStatements.some(function (statement) {
        return url === statement;
    });
}
exports.isUnsupported = isUnsupported;

},{"./device":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function showDownloader(x, y, width, height) {
    return internalMethods_1.post('control/show-ui', {
        ui: 'downloads',
        position: {
            x: x,
            y: y,
            width: width,
            height: height
        }
    });
}
exports.showDownloader = showDownloader;

},{"./internalMethods":10}],6:[function(require,module,exports){
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
        return internalMethods_1.get("items?filter=" + filter + "&offset=" + offset + "&limit=" + limit).done(function (data) {
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
},{"./internalMethods":10}],7:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getFolder(id) {
    return internalMethods_1.get('items', id + "/items");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolder;

},{"./internalMethods":10}],8:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getGpsCoordinates() {
    return internalMethods_1.get('system', 'gps');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGpsCoordinates;

},{"./internalMethods":10}],9:[function(require,module,exports){
(function (global){
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var device_1 = require('./device');
var internalMethods_1 = require('./internalMethods');
function getInteractiveInfo() {
    if (device_1.getDeviceType() === device_1.deviceTypes.web || device_1.getDeviceType() === device_1.deviceTypes.development) {
        return internalMethods_1.get('interactive');
    } else {
        return $.getJSON('mflyManifest.json');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInteractiveInfo;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./device":4,"./internalMethods":10}],10:[function(require,module,exports){
(function (global){
"use strict";

var device = require('./device');
var commandSupport_1 = require('./commandSupport');
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
function get(func, param, expectJson) {
    if (param === void 0) {
        param = null;
    }
    if (expectJson === void 0) {
        expectJson = true;
    }
    var prefix = device.getPrefix();
    var url = prefix + func + (param === null ? '' : '/' + param);
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
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
exports.get = get;
function post(func, data) {
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    $.ajax({
        method: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        success: function (data, textStatus, request) {
            deferred.resolveWith(this, [data, request.status]);
        },
        error: function (data, status, request) {
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
exports.post = post;
function ddelete(func) {
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    $.ajax({
        method: 'DELETE',
        url: url,
        success: function (data, textStatus, request) {
            deferred.resolveWith(this, [data, request.status]);
        },
        error: function (data, status, request) {
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
exports.ddelete = ddelete;
function put(func, data) {
    if (data === void 0) {
        data = null;
    }
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    $.ajax({
        method: 'PUT',
        data: data,
        url: url,
        success: function (data, textStatus, request) {
            deferred.resolveWith(this, [data, request.status]);
        },
        error: function (data, status, request) {
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
exports.put = put;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./commandSupport":3,"./device":4}],11:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getItem(id) {
    return internalMethods_1.get('items', id);
}
exports.getItem = getItem;
function getCurrentItem() {
    return getItem('__self__');
}
exports.getCurrentItem = getCurrentItem;
function getShare(id) {
    return internalMethods_1.get('items', id + '/share');
}
exports.getShare = getShare;
function getLastViewed() {
    return internalMethods_1.get('items', '?list=last-viewed');
}
exports.getLastViewed = getLastViewed;
function getRecentlyCreated() {
    return internalMethods_1.get('items', '?list=recently-created');
}
exports.getRecentlyCreated = getRecentlyCreated;

},{"./internalMethods":10}],12:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getOnlineStatus(argument) {
    return internalMethods_1.get('online-status');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOnlineStatus;

},{"./internalMethods":10}],13:[function(require,module,exports){
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
        internalMethods_1.get('items?' + qs).done(function (data) {
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
},{"./internalMethods":10}],14:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.get('system');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":10}],15:[function(require,module,exports){
"use strict";

var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":10}],16:[function(require,module,exports){
(function (global){
/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */
"use strict";

var jquery_1 = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var interactiveInfo_1 = require('./commands/interactiveInfo');
var systemInfo_1 = require('./commands/systemInfo');
var onlineStatus_1 = require('./commands/onlineStatus');
var uploadUrl_1 = require('./commands/uploadUrl');
var item = require('./commands/item');
var collections = require('./commands/collections');
var folder_1 = require('./commands/folder');
var filter_1 = require('./commands/filter');
var gpsCoordinates_1 = require('./commands/gpsCoordinates');
var search_1 = require('./commands/search');
var close_1 = require('./commands/close');
var downloader = require('./commands/downloader');
var mflyCommands = {
    close: close_1.default,
    getInteractiveInfo: interactiveInfo_1.default,
    getSystemInfo: systemInfo_1.default,
    getOnlineStatus: onlineStatus_1.default,
    getGpsCoordinates: gpsCoordinates_1.default,
    getUploadUrl: uploadUrl_1.default,
    getFolder: folder_1.default,
    filter: filter_1.default,
    search: search_1.default
};
jquery_1.extend(mflyCommands, item);
jquery_1.extend(mflyCommands, collections);
jquery_1.extend(mflyCommands, downloader);
module.exports = mflyCommands;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./commands/close":1,"./commands/collections":2,"./commands/downloader":5,"./commands/filter":6,"./commands/folder":7,"./commands/gpsCoordinates":8,"./commands/interactiveInfo":9,"./commands/item":11,"./commands/onlineStatus":12,"./commands/search":13,"./commands/systemInfo":14,"./commands/uploadUrl":15}]},{},[16])(16)
});