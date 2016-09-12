(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mflyCommands = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUserInfo() {
    return internalMethods_1.get('account');
}
exports.getUserInfo = getUserInfo;
function logout() {
    window.location.href = '/interactive-redirect/v5/account/logout';
}
exports.logout = logout;

},{"./internalMethods":14}],2:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function showSettings(x, y, width, height) {
    return internalMethods_1.showUI('app-settings', x, y, width, height);
}
exports.showSettings = showSettings;
function showUserManagement(x, y, width, height) {
    return internalMethods_1.showUI('user-management', x, y, width, height);
}
exports.showUserManagement = showUserManagement;
function showSecondScreenOptions() {
    return internalMethods_1.post('control/show-ui', { ui: 'second-screen' });
}
exports.showSecondScreenOptions = showSecondScreenOptions;
function email(id) {
    return internalMethods_1.post('control/email', { id: id });
}
exports.email = email;
function composeEmail(options) {
    return internalMethods_1.post('control/compose-email', options);
}
exports.composeEmail = composeEmail;
function showAnnotations() {
    return internalMethods_1.post('control/show-ui', { ui: 'annotations' });
}
exports.showAnnotations = showAnnotations;
function takeAndEmailScreenshot() {
    return internalMethods_1.post('control/email-screenshot');
}
exports.takeAndEmailScreenshot = takeAndEmailScreenshot;

},{"./internalMethods":14}],3:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function refresh() {
    return internalMethods_1.post('sync');
}
exports.refresh = refresh;
function getSyncStatus() {
    return internalMethods_1.get('sync', 'status');
}
exports.getSyncStatus = getSyncStatus;

},{"./internalMethods":14}],4:[function(require,module,exports){
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
    return internalMethods_1.put("collections/" + collectionId + "/items/" + itemId + "/order?position=" + position);
}
exports.reorderItemInCollection = reorderItemInCollection;
function renameCollection(id, name) {
    return internalMethods_1.put("collections/" + id, { name: name });
}
exports.renameCollection = renameCollection;
// UI Methods
function showCollections(x, y, width, height) {
    return internalMethods_1.showUI('collections', x, y, width, height);
}
exports.showCollections = showCollections;
function showAddToCollection(x, y, width, height) {
    return internalMethods_1.showUI('add-to-collection', x, y, width, height);
}
exports.showAddToCollection = showAddToCollection;

},{"./internalMethods":14}],5:[function(require,module,exports){
"use strict";
var device_1 = require('./device');
function isUnsupported(url) {
    if (!device_1.isWeb()) {
        return false;
    }
    var unsupportedStatements = [
        '/control/',
        '/downloads',
        '/online-status',
        '/system/gps'
    ];
    return unsupportedStatements.some(function (statement) { return url.indexOf(statement) > -1; });
}
exports.isUnsupported = isUnsupported;

},{"./device":7}],6:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function showControlBars() {
    return internalMethods_1.post('control/show-ui', {
        ui: 'control-bar',
        visible: true
    });
}
exports.showControlBars = showControlBars;
function hideControlBars(x, y, width, height) {
    return internalMethods_1.post('control/show-ui', {
        ui: 'control-bar',
        visible: false
    });
}
exports.hideControlBars = hideControlBars;

},{"./internalMethods":14}],7:[function(require,module,exports){
"use strict";
var is = require('is_js');
var developmentPrefix = 'http://localhost:8000/';
var webPrefix = '/interactive-api/v5/';
exports.deviceTypes = {
    development: 'development',
    mobile: 'mobile',
    web: 'web',
    desktop: 'desktop'
};
function isAndroid() {
    return is.android();
}
exports.isAndroid = isAndroid;
function isWindows8() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("msie") !== -1) {
        if (userAgent.indexOf("webview") !== -1) {
            return true;
        }
    }
    return false;
}
exports.isWindows8 = isWindows8;
function isLocalhostForDevelopment() {
    return (window.location.host.indexOf('localhost:8000') > -1);
}
exports.isLocalhostForDevelopment = isLocalhostForDevelopment;
function getDeviceType() {
    if (isLocalhostForDevelopment()) {
        return exports.deviceTypes.development;
    }
    else {
        var deviceTypeCookie = document.cookie.split(';').filter(function (c) { return c.split('=')[0].toLowerCase().trim() === 'devicetype'; });
        if (deviceTypeCookie.length > 0) {
            return deviceTypeCookie[0].split('=')[1];
        }
        else {
            return exports.deviceTypes.mobile;
        }
    }
}
exports.getDeviceType = getDeviceType;
exports.isWeb = function () { return getDeviceType() === exports.deviceTypes.web; };
function getPrefix() {
    var deviceType = getDeviceType();
    switch (deviceType) {
        case exports.deviceTypes.development:
            return developmentPrefix;
        default:
            return webPrefix;
    }
}
exports.getPrefix = getPrefix;

},{"is_js":27}],8:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function showDownloader(x, y, width, height) {
    return internalMethods_1.showUI('downloads', x, y, width, height);
}
exports.showDownloader = showDownloader;
function getDownloadStatus(id) {
    return id ? internalMethods_1.get("downloads/" + id + "/status") : internalMethods_1.get('downloads/status');
}
exports.getDownloadStatus = getDownloadStatus;
function addToDownloader(id) {
    return internalMethods_1.post('downloads', { ids: [id] });
}
exports.addToDownloader = addToDownloader;
function removeFromDownloader(id) {
    return internalMethods_1.ddelete("downloads/" + id);
}
exports.removeFromDownloader = removeFromDownloader;

},{"./internalMethods":14}],9:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
var item_1 = require('./item');
function embed(element, id, page) {
    item_1.getItem(id).then(function (i) {
        var pageArg = page ? "?page=" + page : '';
        element.attr('src', i.resourceUrl + pageArg);
    });
}
exports.embed = embed;
function embedImage(element, id, options) {
    var params = [];
    if (typeof options != 'undefined') {
        params = [
            { name: 'position', value: options.page },
            { name: 'size', value: options.size },
            { name: 'width', value: options.width },
            { name: 'height', value: options.height },
            { name: 'maxWidth', value: options.maxWidth },
            { name: 'maxHeight', value: options.maxHeight },
            { name: 'rotate', value: options.rotate },
        ].filter(function (x) {
            return !!x.value;
        });
    }
    internalMethods_1.get('items', id).then(function (i) {
        var url = i.resourceUrl;
        if (params.length > 0) {
            url += '?' + $.param(params);
        }
        element.attr('src', url);
    });
}
exports.embedImage = embedImage;
function getData(id) {
    return item_1.getItem(id).then(function (i) {
        return $.get(i.resourceUrl).then(function (data) { return data; });
    });
}
exports.getData = getData;

},{"./internalMethods":14,"./item":15}],10:[function(require,module,exports){
"use strict";
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
        return internalMethods_1.get("items?filter=" + filter + "&offset=" + offset + "&limit=" + limit)
            .done(function (data) {
            result = result.concat(data);
            if (data.length < limit) {
                Deferred.resolve(result);
            }
            else {
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

},{"./internalMethods":14}],11:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getFolder(id) {
    return internalMethods_1.get('items', id + "/items");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolder;

},{"./internalMethods":14}],12:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getGpsCoordinates() {
    return internalMethods_1.get('system', 'gps');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGpsCoordinates;

},{"./internalMethods":14}],13:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getInteractiveInfo() {
    return internalMethods_1.get('interactive');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInteractiveInfo;

},{"./internalMethods":14}],14:[function(require,module,exports){
"use strict";
var device = require('./device');
var commandSupport_1 = require('./commandSupport');
var device_1 = require('./device');
function get(func, param, expectJson) {
    if (param === void 0) { param = null; }
    if (expectJson === void 0) { expectJson = true; }
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
    if (device_1.isAndroid()) {
        var result = InteractivesInterface.post(url, JSON.stringify(data));
        deferred.resolveWith(this, [result.data, result.status]);
    }
    else {
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
    }
    return deferred.promise();
}
exports.post = post;
function ddelete(func, data) {
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (device_1.isAndroid()) {
        var result = InteractivesInterface.delete(url, JSON.stringify(data));
        deferred.resolveWith(this, [result.data, result.status]);
    }
    else {
        $.ajax({
            method: 'DELETE',
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
    }
    return deferred.promise();
}
exports.ddelete = ddelete;
function put(func, data) {
    if (data === void 0) { data = null; }
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (device_1.isAndroid()) {
        var result = InteractivesInterface.put(url, JSON.stringify(data));
        deferred.resolveWith(this, [JSON.parse(result).data, JSON.parse(result).status]);
    }
    else {
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
    }
    return deferred.promise();
}
exports.put = put;
function showUI(name, x, y, width, height) {
    return post('control/show-ui', {
        ui: name,
        position: {
            x: x,
            y: y,
            width: width,
            height: height
        }
    });
}
exports.showUI = showUI;

},{"./commandSupport":5,"./device":7}],15:[function(require,module,exports){
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
function getLastViewedContent() {
    return internalMethods_1.get('items', '?list=last-viewed');
}
exports.getLastViewedContent = getLastViewedContent;
function getRecentlyCreatedContent() {
    return internalMethods_1.get('items', '?list=recently-created');
}
exports.getRecentlyCreatedContent = getRecentlyCreatedContent;

},{"./internalMethods":14}],16:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
var device_1 = require('./device');
function getValuesWithPrefix(prefix) {
    if (device_1.isWeb()) {
        return $.Deferred(function (dfd) {
            var all = {};
            for (var key in localStorage) {
                // Check if key startswith prefix
                if (key.slice(0, prefix.length) == prefix) {
                    all[key] = localStorage.getItem(key);
                }
            }
            dfd.resolveWith(this, [all, 200]);
        });
    }
    else {
        return internalMethods_1.get("info?prefix=" + prefix);
    }
}
function getAllValues() {
    if (device_1.isWeb()) {
        var all = {};
        for (var key in localStorage) {
            all[key] = localStorage.getItem(key);
        }
        return $.when(all);
    }
    else {
        return internalMethods_1.get('info');
    }
}
function getValues(prefix) {
    if (prefix) {
        // Get values with specified prefix
        return getValuesWithPrefix(prefix);
    }
    else {
        return getAllValues();
    }
}
exports.getValues = getValues;
function getValue(key) {
    if (device_1.isWeb()) {
        return $.Deferred(function (dfd) {
            var value = localStorage.getItem(key);
            if (value) {
                dfd.resolveWith(this, [value, 200]);
            }
            else {
                dfd.rejectWith(this, [value, 404]);
            }
        });
    }
    else {
        return internalMethods_1.get("info", key, false);
    }
}
exports.getValue = getValue;
function putValue(key, value) {
    if (device_1.isWeb()) {
        return $.Deferred(function (dfd) {
            localStorage.setItem(key, value);
            dfd.resolveWith(this, ['', 200]);
        });
    }
    else {
        return internalMethods_1.post("info", [{ key: key, value: value }]);
    }
}
exports.putValue = putValue;
function deleteKey(key) {
    if (device_1.isWeb()) {
        return $.Deferred(function (dfd) {
            localStorage.removeItem(key);
            dfd.resolveWith(this, ['', 200]);
        });
    }
    else {
        return internalMethods_1.ddelete("info/" + key);
    }
}
exports.deleteKey = deleteKey;

},{"./device":7,"./internalMethods":14}],17:[function(require,module,exports){
"use strict";
var item_1 = require('./item');
var device_1 = require('./device');
function close() {
    window.location.href = '/interactive-redirect/v5/items/__self__/back';
}
exports.close = close;
function next() {
    window.location.href = '/interactive-redirect/v5/items/__self__/next';
}
exports.next = next;
function previous() {
    window.location.href = '/interactive-redirect/v5/items/__self__/previous';
}
exports.previous = previous;
function openItem(id, bookmark) {
    item_1.getItem(id).then(function (item) {
        var params = {};
        var url = item.url;
        if (device_1.isWeb()) {
            params['returnurl'] = window.location.href;
        }
        if (bookmark) {
            params['bookmark'] = bookmark;
        }
        url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
        window.location.href = window.location.protocol + "//" + window.location.host + url;
    });
}
exports.openItem = openItem;
exports.open = openItem;
function openFolder(id) {
    item_1.getItem(id).then(function (item) {
        window.location.href = item.url;
    });
}
exports.openFolder = openFolder;
function goto() {
    console.error('goto method is now deprecated. Please use openItem going forward.');
}
exports.goto = goto;
function browse() {
    console.error('browse method is now deprecated. Please use openItem going forward.');
}
exports.browse = browse;

},{"./device":7,"./item":15}],18:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function addNotification(id) {
    return internalMethods_1.post("notifications/" + id);
}
exports.addNotification = addNotification;
function removeNotification(id) {
    return internalMethods_1.ddelete("notifications/" + id);
}
exports.removeNotification = removeNotification;
function getNotificationStatus(id) {
    return internalMethods_1.get("notifications/" + id);
}
exports.getNotificationStatus = getNotificationStatus;
function showNotificationManager(x, y, width, height) {
    return internalMethods_1.showUI('notifications', x, y, width, height);
}
exports.showNotificationManager = showNotificationManager;

},{"./internalMethods":14}],19:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getOnlineStatus(argument) {
    return internalMethods_1.get('system', 'online-status');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOnlineStatus;

},{"./internalMethods":14}],20:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postAction(options) {
    return internalMethods_1.post('actions', options);
}
exports.postAction = postAction;
function postPageView(id, page) {
    return internalMethods_1.post('actions', {
        type: 'document',
        id: id,
        page: page
    });
}
exports.postPageView = postPageView;

},{"./internalMethods":14}],21:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postEvent(key, properties) {
    return internalMethods_1.post("events", { key: key, properties: JSON.stringify(properties) });
}
exports.postEvent = postEvent;

},{"./internalMethods":14}],22:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function search(term, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 100; }
    var dfd1 = $.Deferred();
    var result = [];
    var obj = {
        term: term,
        offset: offset,
        limit: limit
    };
    var getPage = function () {
        var qs = $.param(obj);
        internalMethods_1.get('items?' + qs)
            .done(function (data) {
            result = result.concat(data);
            if (data.length < obj.limit) {
                dfd1.resolve(result);
            }
            else {
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
exports.search = search;
function showSearch(x, y, width, height) {
    return internalMethods_1.showUI('search', x, y, width, height);
}
exports.showSearch = showSearch;

},{"./internalMethods":14}],23:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getValuesWithPrefix(prefix) {
    return internalMethods_1.get("syncedinfo?prefix=" + prefix);
}
function getAllValues() {
    return internalMethods_1.get('syncedinfo');
}
function getSyncedValues(prefix) {
    if (prefix) {
        // Get values with specified prefix
        return getValuesWithPrefix(prefix);
    }
    else {
        return getAllValues();
    }
}
exports.getSyncedValues = getSyncedValues;
function getSyncedValue(key) {
    return internalMethods_1.get('syncedinfo', key, false);
}
exports.getSyncedValue = getSyncedValue;
function saveSyncedValue(key, value) {
    return internalMethods_1.post("syncedinfo", [{ key: key, value: value }]);
}
exports.saveSyncedValue = saveSyncedValue;
function deleteSyncedKey(key) {
    return internalMethods_1.ddelete("syncedinfo", [key]);
}
exports.deleteSyncedKey = deleteSyncedKey;

},{"./internalMethods":14}],24:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.get('system');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":14}],25:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":14}],26:[function(require,module,exports){
/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) for example, http://localhost:8000/ .
 */
"use strict";
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
var navigation_1 = require('./commands/navigation');
var downloader = require('./commands/downloader');
var notification = require('./commands/notification');
var accountInfo = require('./commands/accountInfo');
var localKeyValueStorage = require('./commands/localKeyValueStorage');
var syncedKeyValueStorage = require('./commands/syncedKeyValueStorage');
var applicationSync = require('./commands/applicationSync');
var navigation = require('./commands/navigation');
var appFeatures = require('./commands/appFeatures');
var controls_1 = require('./commands/controls');
var embed_1 = require('./commands/embed');
var postAction_1 = require('./commands/postAction');
var postEvent_1 = require('./commands/postEvent');
var device_1 = require('./commands/device');
var mflyCommands = {
    close: navigation_1.close,
    getInteractiveInfo: interactiveInfo_1.default,
    getSystemInfo: systemInfo_1.default,
    getOnlineStatus: onlineStatus_1.default,
    getGpsCoordinates: gpsCoordinates_1.default,
    getUploadUrl: uploadUrl_1.default,
    getFolder: folder_1.default,
    filter: filter_1.default,
    search: search_1.search,
    showSearch: search_1.showSearch,
    hideControlBars: controls_1.hideControlBars,
    showControlBars: controls_1.showControlBars,
    embed: embed_1.embed,
    embedImage: embed_1.embedImage,
    getData: embed_1.getData,
    getDeviceType: device_1.getDeviceType,
    getPrefix: device_1.getPrefix,
    isLocalhostForDevelopment: device_1.isLocalhostForDevelopment,
    isWindows8: device_1.isWindows8,
    postAction: postAction_1.postAction,
    postPageView: postAction_1.postPageView,
    postEvent: postEvent_1.postEvent
};
$.extend(mflyCommands, item);
$.extend(mflyCommands, collections);
$.extend(mflyCommands, downloader);
$.extend(mflyCommands, notification);
$.extend(mflyCommands, accountInfo);
$.extend(mflyCommands, localKeyValueStorage);
$.extend(mflyCommands, syncedKeyValueStorage);
$.extend(mflyCommands, applicationSync);
$.extend(mflyCommands, navigation);
$.extend(mflyCommands, appFeatures);
module.exports = mflyCommands;

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/collections":4,"./commands/controls":6,"./commands/device":7,"./commands/downloader":8,"./commands/embed":9,"./commands/filter":10,"./commands/folder":11,"./commands/gpsCoordinates":12,"./commands/interactiveInfo":13,"./commands/item":15,"./commands/localKeyValueStorage":16,"./commands/navigation":17,"./commands/notification":18,"./commands/onlineStatus":19,"./commands/postAction":20,"./commands/postEvent":21,"./commands/search":22,"./commands/syncedKeyValueStorage":23,"./commands/systemInfo":24,"./commands/uploadUrl":25}],27:[function(require,module,exports){
(function (global){
// is.js 0.8.0
// Author: Aras Atasaygin

// AMD with global, Node, or global
;(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.is = factory());
        });
    } else if(typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.is = factory();
    }
} (this, function() {

    // Baseline
    /* -------------------------------------------------------------------------- */

    var root = this || global;
    var previousIs = root.is;

    // define 'is' object and current version
    var is = {};
    is.VERSION = '0.8.0';

    // define interfaces
    is.not = {};
    is.all = {};
    is.any = {};

    // cache some methods to call later on
    var toString = Object.prototype.toString;
    var arraySlice = Array.prototype.slice;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // helper function which reverses the sense of predicate result
    function not(func) {
        return function() {
            return !func.apply(null, arraySlice.call(arguments));
        };
    }

    // helper function which call predicate function per parameter and return true if all pass
    function all(func) {
        return function() {
            var parameters = arraySlice.call(arguments);
            var length = parameters.length;
            if(length === 1 && is.array(parameters[0])) {    // support array
                parameters = parameters[0];
                length = parameters.length;
            }
            for (var i = 0; i < length; i++) {
                if (!func.call(null, parameters[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // helper function which call predicate function per parameter and return true if any pass
    function any(func) {
        return function() {
            var parameters = arraySlice.call(arguments);
            var length = parameters.length;
            if(length === 1 && is.array(parameters[0])) {    // support array
                parameters = parameters[0];
                length = parameters.length;
            }
            for (var i = 0; i < length; i++) {
                if (func.call(null, parameters[i])) {
                    return true;
                }
            }
            return false;
        };
    }

    // Type checks
    /* -------------------------------------------------------------------------- */

    // is a given value Arguments?
    is.arguments = function(value) {    // fallback check is for IE
        return is.not.null(value) && (toString.call(value) === '[object Arguments]' || (typeof value === 'object' && 'callee' in value));
    };

    // is a given value Array?
    is.array = Array.isArray || function(value) {    // check native isArray first
        return toString.call(value) === '[object Array]';
    };

    // is a given value Boolean?
    is.boolean = function(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    };

    // is a given value Date Object?
    is.date = function(value) {
        return toString.call(value) === '[object Date]';
    };

    // is a given value Error object?
    is.error = function(value) {
        return toString.call(value) === '[object Error]';
    };

    // is a given value function?
    is.function = function(value) {    // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    };

    // is a given value NaN?
    is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself
        return value !== value;
    };

    // is a given value null?
    is.null = function(value) {
        return value === null;
    };

    // is a given value number?
    is.number = function(value) {
        return is.not.nan(value) && toString.call(value) === '[object Number]';
    };

    // is a given value object?
    is.object = function(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    };

    // is given value a pure JSON object?
    is.json = function(value) {
        return toString.call(value) === '[object Object]';
    };

    // is a given value RegExp?
    is.regexp = function(value) {
        return toString.call(value) === '[object RegExp]';
    };

    // are given values same type?
    // prevent NaN, Number same type check
    is.sameType = function(value1, value2) {
        if(is.nan(value1) || is.nan(value2)) {
            return is.nan(value1) === is.nan(value2);
        }
        return toString.call(value1) === toString.call(value2);
    };
    // sameType method does not support 'all' and 'any' interfaces
    is.sameType.api = ['not'];

    // is a given value String?
    is.string = function(value) {
        return toString.call(value) === '[object String]';
    };

    // is a given value Char?
    is.char = function(value) {
        return is.string(value) && value.length === 1;
    };

    // is a given value undefined?
    is.undefined = function(value) {
        return value === void 0;
    };

    // Presence checks
    /* -------------------------------------------------------------------------- */

    //is a given value empty? Objects, arrays, strings
    is.empty = function(value) {
        if(is.object(value)){
            var num = Object.getOwnPropertyNames(value).length;
            if(num === 0 || (num === 1 && is.array(value)) || (num === 2 && is.arguments(value))){
                return true;
            }
            return false;
        } else {
            return value === '';
        }
    };

    // is a given value existy?
    is.existy = function(value) {
        return value !== null && value !== undefined;
    };

    // is a given value truthy?
    is.truthy = function(value) {
        return is.existy(value) && value !== false && is.not.nan(value) && value !== "" && value !== 0;
    };

    // is a given value falsy?
    is.falsy = not(is.truthy);

    // is a given value space?
    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32
    is.space =  function(value) {
        if(is.char(value)) {
            var characterCode = value.charCodeAt(0);
            return (characterCode >  8 && characterCode < 14) || characterCode === 32;
        } else {
            return false;
        }
    };

    // Arithmetic checks
    /* -------------------------------------------------------------------------- */

    // are given values equal? supports numbers, strings, regexps, booleans
    // TODO: Add object and array support
    is.equal = function(value1, value2) {
        // check 0 and -0 equity with Infinity and -Infinity
        if(is.all.number(value1, value2)) {
            return value1 === value2 && 1 / value1 === 1 / value2;
        }
        // check regexps as strings too
        if(is.all.string(value1, value2) || is.all.regexp(value1, value2)) {
            return '' + value1 === '' + value2;
        }
        if(is.all.boolean(value1, value2)) {
            return value1 === value2;
        }
        return false;
    };
    // equal method does not support 'all' and 'any' interfaces
    is.equal.api = ['not'];

    // is a given number even?
    is.even = function(numb) {
        return is.number(numb) && numb % 2 === 0;
    };

    // is a given number odd?
    is.odd = function(numb) {
        return is.number(numb) && numb % 2 === 1;
    };

    // is a given number positive?
    is.positive = function(numb) {
        return is.number(numb) && numb > 0;
    };

    // is a given number negative?
    is.negative = function(numb) {
        return is.number(numb) && numb < 0;
    };

    // is a given number above minimum parameter?
    is.above = function(numb, min) {
        return is.all.number(numb, min) && numb > min;
    };
    // above method does not support 'all' and 'any' interfaces
    is.above.api = ['not'];

    // is a given number above maximum parameter?
    is.under = function(numb, max) {
        return is.all.number(numb, max) && numb < max;
    };
    // least method does not support 'all' and 'any' interfaces
    is.under.api = ['not'];

    // is a given number within minimum and maximum parameters?
    is.within = function(numb, min, max) {
        return is.all.number(numb, min, max) && numb > min && numb < max;
    };
    // within method does not support 'all' and 'any' interfaces
    is.within.api = ['not'];

    // is a given number decimal?
    is.decimal = function(numb) {
        return is.number(numb) && numb % 1 !== 0;
    };

    // is a given number integer?
    is.integer = function(numb) {
        return is.number(numb) && numb % 1 === 0;
    };

    // is a given number finite?
    is.finite = isFinite || function(numb) {
        return numb !== Infinity && numb !== -Infinity && is.not.nan(numb);
    };

    // is a given number infinite?
    is.infinite = not(is.finite);

    // Regexp checks
    /* -------------------------------------------------------------------------- */
    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook
    // Scott Gonzalez: Email address validation

    // eppPhone match extensible provisioning protocol format
    // nanpPhone match north american number plan format
    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year
    // time match hours, minutes, and seconds, 24-hour clock
    var regexps = {
        url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
        alphaNumeric: /^[A-Za-z0-9]+$/,
        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
        dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
        nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
        hexadecimal: /^[0-9a-fA-F]+$/,
        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
        ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
    };

    // create regexp checks methods from 'regexp' object
    for(var regexp in regexps) {
        if(regexps.hasOwnProperty(regexp)) {
            regexpCheck(regexp, regexps);
        }
    }

    function regexpCheck(regexp, regexps) {
        is[regexp] = function(value) {
            return regexps[regexp].test(value);
        };
    }

    // String checks
    /* -------------------------------------------------------------------------- */

    // is a given string include parameter substring?
    is.include = function(str, substr) {
        return str.indexOf(substr) > -1;
    };
    // include method does not support 'all' and 'any' interfaces
    is.include.api = ['not'];

    // is a given string all uppercase?
    is.upperCase = function(str) {
        return is.string(str) && str === str.toUpperCase();
    };

    // is a given string all lowercase?
    is.lowerCase = function(str) {
        return is.string(str) && str === str.toLowerCase();
    };

    // is string start with a given startWith parameter?
    is.startWith = function(str, startWith) {
        return is.string(str) && str.indexOf(startWith) === 0;
    };
    // startWith method does not support 'all' and 'any' interfaces
    is.startWith.api = ['not'];

    // is string end with a given endWith parameter?
    is.endWith = function(str, endWith) {
        return is.string(str) && str.indexOf(endWith) > -1 && str.indexOf(endWith) === str.length -  endWith.length;
    };
    // endWith method does not support 'all' and 'any' interfaces
    is.endWith.api = ['not'];

    // is a given string or sentence capitalized?
    is.capitalized = function(str) {
        if(is.not.string(str)) {
            return false;
        }
        var words = str.split(' ');
        var capitalized = [];
        for(var i = 0; i < words.length; i++) {
            capitalized.push(words[i][0] === words[i][0].toUpperCase());
        }
        return is.all.truthy.apply(null, capitalized);
    };

    // is a given string palindrome?
    is.palindrome = function(str) {
        return is.string(str) && str == str.split('').reverse().join('');
    };

    // Time checks
    /* -------------------------------------------------------------------------- */

    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    // is a given date indicate today?
    is.today = function(obj) {
        var now = new Date();
        var todayString = now.toDateString();
        return is.date(obj) && obj.toDateString() === todayString;
    };

    // is a given date indicate yesterday?
    is.yesterday = function(obj) {
        var now = new Date();
        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return is.date(obj) && obj.toDateString() === yesterdayString;
    };

    // is a given date indicate tomorrow?
    is.tomorrow = function(obj) {
        var now = new Date();
        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();
        return is.date(obj) && obj.toDateString() === tomorrowString;
    };

    // is a given date past?
    is.past = function(obj) {
        var now = new Date();
        return is.date(obj) && obj.getTime() < now.getTime();
    };

    // is a given date future?
    is.future = not(is.past);

    // is a given dates day equal given dayString parameter?
    is.day = function(obj, dayString) {
        return is.date(obj) && dayString.toLowerCase() === days[obj.getDay()];
    };
    // day method does not support 'all' and 'any' interfaces
    is.day.api = ['not'];

    // is a given dates month equal given monthString parameter?
    is.month = function(obj, monthString) {
        return is.date(obj) && monthString.toLowerCase() === months[obj.getMonth()];
    };
    // month method does not support 'all' and 'any' interfaces
    is.month.api = ['not'];

    // is a given dates year equal given year parameter?
    is.year = function(obj, year) {
        return is.date(obj) && is.number(year) && year === obj.getFullYear();
    };
    // year method does not support 'all' and 'any' interfaces
    is.year.api = ['not'];

    // is the given year a leap year?
    is.leapYear = function(year) {
        return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };

    // is a given date weekend?
    // 6: Saturday, 0: Sunday
    is.weekend = function(obj) {
        return is.date(obj) && (obj.getDay() === 6 || obj.getDay() === 0);
    };

    // is a given date weekday?
    is.weekday = not(is.weekend);

    // is date within given range?
    is.inDateRange = function(obj, startObj, endObj) {
        if(is.not.date(obj) || is.not.date(startObj) || is.not.date(endObj)) {
            return false;
        }
        var givenDate = obj.getTime();
        var start = startObj.getTime();
        var end = endObj.getTime();
        return givenDate > start && givenDate < end;
    };
    // inDateRange method does not support 'all' and 'any' interfaces
    is.inDateRange.api = ['not'];

    // is a given date in last week range?
    is.inLastWeek = function(obj) {
        return is.inDateRange(obj, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());
    };

    // is a given date in last month range?
    is.inLastMonth = function(obj) {
        return is.inDateRange(obj, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());
    };

    // is a given date in last year range?
    is.inLastYear = function(obj) {
        return is.inDateRange(obj, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
    };

    // is a given date in next week range?
    is.inNextWeek = function(obj) {
        return is.inDateRange(obj, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));
    };

    // is a given date in next month range?
    is.inNextMonth = function(obj) {
        return is.inDateRange(obj, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));
    };

    // is a given date in next year range?
    is.inNextYear = function(obj) {
        return is.inDateRange(obj, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    };

    // is a given date in the parameter quarter?
    is.quarterOfYear = function(obj, quarterNumber) {
        return is.date(obj) && is.number(quarterNumber) && quarterNumber === Math.floor((obj.getMonth() + 3) / 3);
    };
    // quarterOfYear method does not support 'all' and 'any' interfaces
    is.quarterOfYear.api = ['not'];

    // is a given date in daylight saving time?
    is.dayLightSavingTime = function(obj) {
        var january = new Date(obj.getFullYear(), 0, 1);
        var july = new Date(obj.getFullYear(), 6, 1);
        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
        return obj.getTimezoneOffset() < stdTimezoneOffset;
    };

    // Environment checks
    /* -------------------------------------------------------------------------- */

    // check if library is used as a Node.js module
    if(typeof window !== 'undefined') {

        // store navigator properties to use later
        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        // is current browser chrome?
        is.chrome = function() {
            return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);
        };
        // chrome method does not support 'all' and 'any' interfaces
        is.chrome.api = ['not'];

        // is current browser firefox?
        is.firefox = function() {
            return /firefox/i.test(userAgent);
        };
        // firefox method does not support 'all' and 'any' interfaces
        is.firefox.api = ['not'];

        // is current browser edge?
        is.edge = function() {
            return /edge/i.test(userAgent);
        };
        // edge method does not support 'all' and 'any' interfaces
        is.edge.api = ['not'];

        // is current browser internet explorer?
        // parameter is optional
        is.ie = function(version) {
            if(!version) {
                return /msie/i.test(userAgent) || "ActiveXObject" in window;
            }
            if(version >= 11) {
                return "ActiveXObject" in window;
            }
            return new RegExp('msie ' + version).test(userAgent);
        };
        // ie method does not support 'all' and 'any' interfaces
        is.ie.api = ['not'];

        // is current browser opera?
        is.opera = function() {
            return /^Opera\//.test(userAgent) || // Opera 12 and older versions
                /\x20OPR\//.test(userAgent); // Opera 15+
        };
        // opera method does not support 'all' and 'any' interfaces
        is.opera.api = ['not'];

        // is current browser safari?
        is.safari = function() {
            return /safari/i.test(userAgent) && /apple computer/i.test(vendor);
        };
        // safari method does not support 'all' and 'any' interfaces
        is.safari.api = ['not'];

        // is current device ios?
        is.ios = function() {
            return is.iphone() || is.ipad() || is.ipod();
        };
        // ios method does not support 'all' and 'any' interfaces
        is.ios.api = ['not'];

        // is current device iphone?
        is.iphone = function() {
            return /iphone/i.test(userAgent);
        };
        // iphone method does not support 'all' and 'any' interfaces
        is.iphone.api = ['not'];

        // is current device ipad?
        is.ipad = function() {
            return /ipad/i.test(userAgent);
        };
        // ipad method does not support 'all' and 'any' interfaces
        is.ipad.api = ['not'];

        // is current device ipod?
        is.ipod = function() {
            return /ipod/i.test(userAgent);
        };
        // ipod method does not support 'all' and 'any' interfaces
        is.ipod.api = ['not'];

        // is current device android?
        is.android = function() {
            return /android/i.test(userAgent);
        };
        // android method does not support 'all' and 'any' interfaces
        is.android.api = ['not'];

        // is current device android phone?
        is.androidPhone = function() {
            return /android/i.test(userAgent) && /mobile/i.test(userAgent);
        };
        // androidPhone method does not support 'all' and 'any' interfaces
        is.androidPhone.api = ['not'];

        // is current device android tablet?
        is.androidTablet = function() {
            return /android/i.test(userAgent) && !/mobile/i.test(userAgent);
        };
        // androidTablet method does not support 'all' and 'any' interfaces
        is.androidTablet.api = ['not'];

        // is current device blackberry?
        is.blackberry = function() {
            return /blackberry/i.test(userAgent) || /BB10/i.test(userAgent);
        };
        // blackberry method does not support 'all' and 'any' interfaces
        is.blackberry.api = ['not'];

        // is current device desktop?
        is.desktop = function() {
            return is.not.mobile() && is.not.tablet();
        };
        // desktop method does not support 'all' and 'any' interfaces
        is.desktop.api = ['not'];

        // is current operating system linux?
        is.linux = function() {
            return /linux/i.test(appVersion);
        };
        // linux method does not support 'all' and 'any' interfaces
        is.linux.api = ['not'];

        // is current operating system mac?
        is.mac = function() {
            return /mac/i.test(appVersion);
        };
        // mac method does not support 'all' and 'any' interfaces
        is.mac.api = ['not'];

        // is current operating system windows?
        is.windows = function() {
            return /win/i.test(appVersion);
        };
        // windows method does not support 'all' and 'any' interfaces
        is.windows.api = ['not'];

        // is current device windows phone?
        is.windowsPhone = function() {
            return is.windows() && /phone/i.test(userAgent);
        };
        // windowsPhone method does not support 'all' and 'any' interfaces
        is.windowsPhone.api = ['not'];

        // is current device windows tablet?
        is.windowsTablet = function() {
            return is.windows() && is.not.windowsPhone() && /touch/i.test(userAgent);
        };
        // windowsTablet method does not support 'all' and 'any' interfaces
        is.windowsTablet.api = ['not'];

        // is current device mobile?
        is.mobile = function() {
            return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();
        };
        // mobile method does not support 'all' and 'any' interfaces
        is.mobile.api = ['not'];

        // is current device tablet?
        is.tablet = function() {
            return is.ipad() || is.androidTablet() || is.windowsTablet();
        };
        // tablet method does not support 'all' and 'any' interfaces
        is.tablet.api = ['not'];

        // is current state online?
        is.online = function() {
            return navigator.onLine;
        };
        // online method does not support 'all' and 'any' interfaces
        is.online.api = ['not'];

        // is current state offline?
        is.offline = not(is.online);
        // offline method does not support 'all' and 'any' interfaces
        is.offline.api = ['not'];

        // is current device supports touch?
        is.touchDevice = function() {
            return 'ontouchstart' in window ||'DocumentTouch' in window && document instanceof DocumentTouch;
        };
        // touchDevice method does not support 'all' and 'any' interfaces
        is.touchDevice.api = ['not'];
    }

    // Object checks
    /* -------------------------------------------------------------------------- */

    // has a given object got parameterized count property?
    is.propertyCount = function(obj, count) {
        if(!is.object(obj) || !is.number(count)) {
            return false;
        }
        if(Object.keys) {
            return Object.keys(obj).length === count;
        }
        var properties = [],
            property;
        for(property in obj) {
            if (hasOwnProperty.call(obj, property)) {
                properties.push(property);
            }
        }
        return properties.length === count;
    };
    // propertyCount method does not support 'all' and 'any' interfaces
    is.propertyCount.api = ['not'];

    // is given object has parameterized property?
    is.propertyDefined = function(obj, property) {
        return is.object(obj) && is.string(property) && property in obj;
    };
    // propertyDefined method does not support 'all' and 'any' interfaces
    is.propertyDefined.api = ['not'];

    // is a given object window?
    // setInterval method is only available for window object
    is.windowObject = function(obj) {
        return typeof obj === 'object' && 'setInterval' in obj;
    };

    // is a given object a DOM node?
    is.domNode = function(obj) {
        return is.object(obj) && obj.nodeType > 0;
    };

    // Array checks
    /* -------------------------------------------------------------------------- */

    // is a given item in an array?
    is.inArray = function(val, arr){
        if(is.not.array(arr)) {
            return false;
        }
        for(var i = 0; i < arr.length; i++) {
            if (arr[i] === val) return true;
        }
        return false;
    };
    // inArray method does not support 'all' and 'any' interfaces
    is.inArray.api = ['not'];

    // is a given array sorted?
    is.sorted = function(arr) {
        if(is.not.array(arr)) {
            return false;
        }
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] > arr[i + 1]) return false;
        }
        return true;
    };

    // API
    // Set 'not', 'all' and 'any' interfaces to methods based on their api property
    /* -------------------------------------------------------------------------- */

    function setInterfaces() {
        var options = is;
        for(var option in options) {
            if(hasOwnProperty.call(options, option) && is.function(options[option])) {
                var interfaces = options[option].api || ['not', 'all', 'any'];
                for (var i = 0; i < interfaces.length; i++) {
                    if(interfaces[i] === 'not') {
                        is.not[option] = not(is[option]);
                    }
                    if(interfaces[i] === 'all') {
                        is.all[option] = all(is[option]);
                    }
                    if(interfaces[i] === 'any') {
                        is.any[option] = any(is[option]);
                    }
                }
            }
        }
    }
    setInterfaces();

    // Configuration methods
    // Intentionally added after setInterfaces function
    /* -------------------------------------------------------------------------- */

    // set optional regexps to methods if you think they suck
    is.setRegexp = function(regexp, regexpName) {
        for(var r in regexps) {
            if(hasOwnProperty.call(regexps, r) && (regexpName === r)) {
                regexps[r] = regexp;
            }
        }
    };

    // change namespace of library to prevent name collisions
    // var preferredName = is.setNamespace();
    // preferredName.odd(3);
    // => true
    is.setNamespace = function() {
        root.is = previousIs;
        return this;
    };

    return is;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudGVtcC9jb21tYW5kcy9hY2NvdW50SW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2FwcEZlYXR1cmVzLmpzIiwiLnRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwiLnRlbXAvY29tbWFuZHMvY29sbGVjdGlvbnMuanMiLCIudGVtcC9jb21tYW5kcy9jb21tYW5kU3VwcG9ydC5qcyIsIi50ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwiLnRlbXAvY29tbWFuZHMvZGV2aWNlLmpzIiwiLnRlbXAvY29tbWFuZHMvZG93bmxvYWRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2VtYmVkLmpzIiwiLnRlbXAvY29tbWFuZHMvZmlsdGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZm9sZGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMuanMiLCIudGVtcC9jb21tYW5kcy9pbnRlcmFjdGl2ZUluZm8uanMiLCIudGVtcC9jb21tYW5kcy9pbnRlcm5hbE1ldGhvZHMuanMiLCIudGVtcC9jb21tYW5kcy9pdGVtLmpzIiwiLnRlbXAvY29tbWFuZHMvbG9jYWxLZXlWYWx1ZVN0b3JhZ2UuanMiLCIudGVtcC9jb21tYW5kcy9uYXZpZ2F0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvbm90aWZpY2F0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvb25saW5lU3RhdHVzLmpzIiwiLnRlbXAvY29tbWFuZHMvcG9zdEFjdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL3Bvc3RFdmVudC5qcyIsIi50ZW1wL2NvbW1hbmRzL3NlYXJjaC5qcyIsIi50ZW1wL2NvbW1hbmRzL3N5bmNlZEtleVZhbHVlU3RvcmFnZS5qcyIsIi50ZW1wL2NvbW1hbmRzL3N5c3RlbUluZm8uanMiLCIudGVtcC9jb21tYW5kcy91cGxvYWRVcmwuanMiLCIudGVtcC9tZmx5Q29tbWFuZHMuanMiLCJub2RlX21vZHVsZXMvaXNfanMvaXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2FjY291bnQnKTtcclxufVxyXG5leHBvcnRzLmdldFVzZXJJbmZvID0gZ2V0VXNlckluZm87XHJcbmZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9hY2NvdW50L2xvZ291dCc7XHJcbn1cclxuZXhwb3J0cy5sb2dvdXQgPSBsb2dvdXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93U2V0dGluZ3MoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYXBwLXNldHRpbmdzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2V0dGluZ3MgPSBzaG93U2V0dGluZ3M7XHJcbmZ1bmN0aW9uIHNob3dVc2VyTWFuYWdlbWVudCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCd1c2VyLW1hbmFnZW1lbnQnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dVc2VyTWFuYWdlbWVudCA9IHNob3dVc2VyTWFuYWdlbWVudDtcclxuZnVuY3Rpb24gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ3NlY29uZC1zY3JlZW4nIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMgPSBzaG93U2Vjb25kU2NyZWVuT3B0aW9ucztcclxuZnVuY3Rpb24gZW1haWwoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsJywgeyBpZDogaWQgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWFpbCA9IGVtYWlsO1xyXG5mdW5jdGlvbiBjb21wb3NlRW1haWwob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvY29tcG9zZS1lbWFpbCcsIG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMuY29tcG9zZUVtYWlsID0gY29tcG9zZUVtYWlsO1xyXG5mdW5jdGlvbiBzaG93QW5ub3RhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ2Fubm90YXRpb25zJyB9KTtcclxufVxyXG5leHBvcnRzLnNob3dBbm5vdGF0aW9ucyA9IHNob3dBbm5vdGF0aW9ucztcclxuZnVuY3Rpb24gdGFrZUFuZEVtYWlsU2NyZWVuc2hvdCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsLXNjcmVlbnNob3QnKTtcclxufVxyXG5leHBvcnRzLnRha2VBbmRFbWFpbFNjcmVlbnNob3QgPSB0YWtlQW5kRW1haWxTY3JlZW5zaG90O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdzeW5jJyk7XHJcbn1cclxuZXhwb3J0cy5yZWZyZXNoID0gcmVmcmVzaDtcclxuZnVuY3Rpb24gZ2V0U3luY1N0YXR1cygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmMnLCAnc3RhdHVzJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jU3RhdHVzID0gZ2V0U3luY1N0YXR1cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnY29sbGVjdGlvbnMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb25zID0gZ2V0Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJjb2xsZWN0aW9ucy9cIiArIGlkLCAnaXRlbXMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb24gPSBnZXRDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBjcmVhdGVDb2xsZWN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb2xsZWN0aW9ucycsIHsgbmFtZTogbmFtZSB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNvbGxlY3Rpb24gPSBjcmVhdGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBhZGRJdGVtVG9Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXNcIiwgeyBpZHM6IFtpdGVtSWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkSXRlbVRvQ29sbGVjdGlvbiA9IGFkZEl0ZW1Ub0NvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbiA9IHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gZGVsZXRlQ29sbGVjdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmRlbGV0ZUNvbGxlY3Rpb24gPSBkZWxldGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW9yZGVySXRlbUluQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCwgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkICsgXCIvb3JkZXI/cG9zaXRpb249XCIgKyBwb3NpdGlvbik7XHJcbn1cclxuZXhwb3J0cy5yZW9yZGVySXRlbUluQ29sbGVjdGlvbiA9IHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW5hbWVDb2xsZWN0aW9uKGlkLCBuYW1lKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucHV0KFwiY29sbGVjdGlvbnMvXCIgKyBpZCwgeyBuYW1lOiBuYW1lIH0pO1xyXG59XHJcbmV4cG9ydHMucmVuYW1lQ29sbGVjdGlvbiA9IHJlbmFtZUNvbGxlY3Rpb247XHJcbi8vIFVJIE1ldGhvZHNcclxuZnVuY3Rpb24gc2hvd0NvbGxlY3Rpb25zKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2NvbGxlY3Rpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93Q29sbGVjdGlvbnMgPSBzaG93Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIHNob3dBZGRUb0NvbGxlY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYWRkLXRvLWNvbGxlY3Rpb24nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dBZGRUb0NvbGxlY3Rpb24gPSBzaG93QWRkVG9Db2xsZWN0aW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gaXNVbnN1cHBvcnRlZCh1cmwpIHtcclxuICAgIGlmICghZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciB1bnN1cHBvcnRlZFN0YXRlbWVudHMgPSBbXHJcbiAgICAgICAgJy9jb250cm9sLycsXHJcbiAgICAgICAgJy9kb3dubG9hZHMnLFxyXG4gICAgICAgICcvb25saW5lLXN0YXR1cycsXHJcbiAgICAgICAgJy9zeXN0ZW0vZ3BzJ1xyXG4gICAgXTtcclxuICAgIHJldHVybiB1bnN1cHBvcnRlZFN0YXRlbWVudHMuc29tZShmdW5jdGlvbiAoc3RhdGVtZW50KSB7IHJldHVybiB1cmwuaW5kZXhPZihzdGF0ZW1lbnQpID4gLTE7IH0pO1xyXG59XHJcbmV4cG9ydHMuaXNVbnN1cHBvcnRlZCA9IGlzVW5zdXBwb3J0ZWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93Q29udHJvbEJhcnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiAnY29udHJvbC1iYXInLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd0NvbnRyb2xCYXJzID0gc2hvd0NvbnRyb2xCYXJzO1xyXG5mdW5jdGlvbiBoaWRlQ29udHJvbEJhcnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogJ2NvbnRyb2wtYmFyJyxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udHJvbEJhcnMgPSBoaWRlQ29udHJvbEJhcnM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaXMgPSByZXF1aXJlKCdpc19qcycpO1xyXG52YXIgZGV2ZWxvcG1lbnRQcmVmaXggPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XHJcbnZhciB3ZWJQcmVmaXggPSAnL2ludGVyYWN0aXZlLWFwaS92NS8nO1xyXG5leHBvcnRzLmRldmljZVR5cGVzID0ge1xyXG4gICAgZGV2ZWxvcG1lbnQ6ICdkZXZlbG9wbWVudCcsXHJcbiAgICBtb2JpbGU6ICdtb2JpbGUnLFxyXG4gICAgd2ViOiAnd2ViJyxcclxuICAgIGRlc2t0b3A6ICdkZXNrdG9wJ1xyXG59O1xyXG5mdW5jdGlvbiBpc0FuZHJvaWQoKSB7XHJcbiAgICByZXR1cm4gaXMuYW5kcm9pZCgpO1xyXG59XHJcbmV4cG9ydHMuaXNBbmRyb2lkID0gaXNBbmRyb2lkO1xyXG5mdW5jdGlvbiBpc1dpbmRvd3M4KCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIm1zaWVcIikgIT09IC0xKSB7XHJcbiAgICAgICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwid2Vidmlld1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNXaW5kb3dzOCA9IGlzV2luZG93czg7XHJcbmZ1bmN0aW9uIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSB7XHJcbiAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdDo4MDAwJykgPiAtMSk7XHJcbn1cclxuZXhwb3J0cy5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50ID0gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudDtcclxuZnVuY3Rpb24gZ2V0RGV2aWNlVHlwZSgpIHtcclxuICAgIGlmIChpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50KCkpIHtcclxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkZXZpY2VUeXBlQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNwbGl0KCc9JylbMF0udG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdkZXZpY2V0eXBlJzsgfSk7XHJcbiAgICAgICAgaWYgKGRldmljZVR5cGVDb29raWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlVHlwZUNvb2tpZVswXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGV2aWNlVHlwZXMubW9iaWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldERldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlO1xyXG5leHBvcnRzLmlzV2ViID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0RGV2aWNlVHlwZSgpID09PSBleHBvcnRzLmRldmljZVR5cGVzLndlYjsgfTtcclxuZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xyXG4gICAgdmFyIGRldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGRldmljZVR5cGUpIHtcclxuICAgICAgICBjYXNlIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBkZXZlbG9wbWVudFByZWZpeDtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gd2ViUHJlZml4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0UHJlZml4ID0gZ2V0UHJlZml4O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd0Rvd25sb2FkZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnZG93bmxvYWRzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93RG93bmxvYWRlciA9IHNob3dEb3dubG9hZGVyO1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGlkID8gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiZG93bmxvYWRzL1wiICsgaWQgKyBcIi9zdGF0dXNcIikgOiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2Rvd25sb2Fkcy9zdGF0dXMnKTtcclxufVxyXG5leHBvcnRzLmdldERvd25sb2FkU3RhdHVzID0gZ2V0RG93bmxvYWRTdGF0dXM7XHJcbmZ1bmN0aW9uIGFkZFRvRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2Rvd25sb2FkcycsIHsgaWRzOiBbaWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkVG9Eb3dubG9hZGVyID0gYWRkVG9Eb3dubG9hZGVyO1xyXG5mdW5jdGlvbiByZW1vdmVGcm9tRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJkb3dubG9hZHMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVGcm9tRG93bmxvYWRlciA9IHJlbW92ZUZyb21Eb3dubG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxudmFyIGl0ZW1fMSA9IHJlcXVpcmUoJy4vaXRlbScpO1xyXG5mdW5jdGlvbiBlbWJlZChlbGVtZW50LCBpZCwgcGFnZSkge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgcGFnZUFyZyA9IHBhZ2UgPyBcIj9wYWdlPVwiICsgcGFnZSA6ICcnO1xyXG4gICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgaS5yZXNvdXJjZVVybCArIHBhZ2VBcmcpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWJlZCA9IGVtYmVkO1xyXG5mdW5jdGlvbiBlbWJlZEltYWdlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IG9wdGlvbnMucGFnZSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdzaXplJywgdmFsdWU6IG9wdGlvbnMuc2l6ZSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd3aWR0aCcsIHZhbHVlOiBvcHRpb25zLndpZHRoIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2hlaWdodCcsIHZhbHVlOiBvcHRpb25zLmhlaWdodCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhXaWR0aCcsIHZhbHVlOiBvcHRpb25zLm1heFdpZHRoIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heEhlaWdodCcsIHZhbHVlOiBvcHRpb25zLm1heEhlaWdodCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdyb3RhdGUnLCB2YWx1ZTogb3B0aW9ucy5yb3RhdGUgfSxcclxuICAgICAgICBdLmZpbHRlcihmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF4LnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IGkucmVzb3VyY2VVcmw7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgdXJsKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1iZWRJbWFnZSA9IGVtYmVkSW1hZ2U7XHJcbmZ1bmN0aW9uIGdldERhdGEoaWQpIHtcclxuICAgIHJldHVybiBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHJldHVybiAkLmdldChpLnJlc291cmNlVXJsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhOyB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBvYmpUb1N0cmluZyhvYmopIHtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGtleSArICc6JyArIG9ialtrZXldICsgJywnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5zbGljZSgwLCByZXN1bHQubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIGZpbHRlcihvYmopIHtcclxuICAgIHZhciBEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBvZmZzZXQgPSAwO1xyXG4gICAgdmFyIGxpbWl0ID0gMTAwO1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGZpbHRlciA9IGVuY29kZVVSSUNvbXBvbmVudChvYmpUb1N0cmluZyhvYmopKTtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaXRlbXM/ZmlsdGVyPVwiICsgZmlsdGVyICsgXCImb2Zmc2V0PVwiICsgb2Zmc2V0ICsgXCImbGltaXQ9XCIgKyBsaW1pdClcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIERlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldCArPSBsaW1pdDtcclxuICAgICAgICAgICAgICAgIGdldFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBEZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gRGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZmlsdGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0Rm9sZGVyKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkICsgXCIvaXRlbXNcIik7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRGb2xkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRHcHNDb29yZGluYXRlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdncHMnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEdwc0Nvb3JkaW5hdGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0SW50ZXJhY3RpdmVJbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaW50ZXJhY3RpdmUnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEludGVyYWN0aXZlSW5mbztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBkZXZpY2UgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG52YXIgY29tbWFuZFN1cHBvcnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZFN1cHBvcnQnKTtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gZ2V0KGZ1bmMsIHBhcmFtLCBleHBlY3RKc29uKSB7XHJcbiAgICBpZiAocGFyYW0gPT09IHZvaWQgMCkgeyBwYXJhbSA9IG51bGw7IH1cclxuICAgIGlmIChleHBlY3RKc29uID09PSB2b2lkIDApIHsgZXhwZWN0SnNvbiA9IHRydWU7IH1cclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYyArIChwYXJhbSA9PT0gbnVsbCA/ICcnIDogJy8nICsgcGFyYW0pO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgcmV0cmlldmVkLiBUcmFuc2Zvcm0gdG8gSlNPTiBpZiBzdXBwb3NlZCB0by5cclxuICAgICAgICAgICAgaWYgKGV4cGVjdEpzb24gJiYgcmVxdWVzdCAmJiByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpLmluZGV4T2YoXCJ0ZXh0L2h0bWxcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3YXMgc2VudCBiYWNrIGFzIHRleHQvaHRtbCBKU09OLnBhcnNlIGl0IHRvIGEgSlNPTiBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgY291bGQgbm90IGJlIHJldHJpZXZlZC4gUmVqZWN0IHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5nZXQgPSBnZXQ7XHJcbmZ1bmN0aW9uIHBvc3QoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNBbmRyb2lkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdC5kYXRhLCByZXN1bHQuc3RhdHVzXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucG9zdCA9IHBvc3Q7XHJcbmZ1bmN0aW9uIGRkZWxldGUoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNBbmRyb2lkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLmRlbGV0ZSh1cmwsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0LmRhdGEsIHJlc3VsdC5zdGF0dXNdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLmRkZWxldGUgPSBkZGVsZXRlO1xyXG5mdW5jdGlvbiBwdXQoZnVuYywgZGF0YSkge1xyXG4gICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNBbmRyb2lkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLnB1dCh1cmwsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbSlNPTi5wYXJzZShyZXN1bHQpLmRhdGEsIEpTT04ucGFyc2UocmVzdWx0KS5zdGF0dXNdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucHV0ID0gcHV0O1xyXG5mdW5jdGlvbiBzaG93VUkobmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogbmFtZSxcclxuICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93VUkgPSBzaG93VUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRJdGVtKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkKTtcclxufVxyXG5leHBvcnRzLmdldEl0ZW0gPSBnZXRJdGVtO1xyXG5mdW5jdGlvbiBnZXRDdXJyZW50SXRlbSgpIHtcclxuICAgIHJldHVybiBnZXRJdGVtKCdfX3NlbGZfXycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q3VycmVudEl0ZW0gPSBnZXRDdXJyZW50SXRlbTtcclxuZnVuY3Rpb24gZ2V0U2hhcmUoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQgKyAnL3NoYXJlJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTaGFyZSA9IGdldFNoYXJlO1xyXG5mdW5jdGlvbiBnZXRMYXN0Vmlld2VkQ29udGVudCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgJz9saXN0PWxhc3Qtdmlld2VkJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRMYXN0Vmlld2VkQ29udGVudCA9IGdldExhc3RWaWV3ZWRDb250ZW50O1xyXG5mdW5jdGlvbiBnZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9cmVjZW50bHktY3JlYXRlZCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudCA9IGdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGwgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0c3dpdGggcHJlZml4XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFtrZXldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW2FsbCwgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgdmFyIGFsbCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuKGFsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpbmZvJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0VmFsdWVzKHByZWZpeCkge1xyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgIC8vIEdldCB2YWx1ZXMgd2l0aCBzcGVjaWZpZWQgcHJlZml4XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXRBbGxWYWx1ZXMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFZhbHVlcyA9IGdldFZhbHVlcztcclxuZnVuY3Rpb24gZ2V0VmFsdWUoa2V5KSB7XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW3ZhbHVlLCAyMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRmZC5yZWplY3RXaXRoKHRoaXMsIFt2YWx1ZSwgNDA0XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpbmZvXCIsIGtleSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0VmFsdWUgPSBnZXRWYWx1ZTtcclxuZnVuY3Rpb24gcHV0VmFsdWUoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiaW5mb1wiLCBbeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH1dKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnB1dFZhbHVlID0gcHV0VmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZUtleShrZXkpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiaW5mby9cIiArIGtleSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWxldGVLZXkgPSBkZWxldGVLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbmZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL2JhY2snO1xyXG59XHJcbmV4cG9ydHMuY2xvc2UgPSBjbG9zZTtcclxuZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9uZXh0JztcclxufVxyXG5leHBvcnRzLm5leHQgPSBuZXh0O1xyXG5mdW5jdGlvbiBwcmV2aW91cygpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9wcmV2aW91cyc7XHJcbn1cclxuZXhwb3J0cy5wcmV2aW91cyA9IHByZXZpb3VzO1xyXG5mdW5jdGlvbiBvcGVuSXRlbShpZCwgYm9va21hcmspIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciB1cmwgPSBpdGVtLnVybDtcclxuICAgICAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ3JldHVybnVybCddID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rbWFyaykge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ2Jvb2ttYXJrJ10gPSBib29rbWFyaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgJC5wYXJhbShwYXJhbXMpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5JdGVtID0gb3Blbkl0ZW07XHJcbmV4cG9ydHMub3BlbiA9IG9wZW5JdGVtO1xyXG5mdW5jdGlvbiBvcGVuRm9sZGVyKGlkKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXRlbS51cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5Gb2xkZXIgPSBvcGVuRm9sZGVyO1xyXG5mdW5jdGlvbiBnb3RvKCkge1xyXG4gICAgY29uc29sZS5lcnJvcignZ290byBtZXRob2QgaXMgbm93IGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugb3Blbkl0ZW0gZ29pbmcgZm9yd2FyZC4nKTtcclxufVxyXG5leHBvcnRzLmdvdG8gPSBnb3RvO1xyXG5mdW5jdGlvbiBicm93c2UoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdicm93c2UgbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XHJcbn1cclxuZXhwb3J0cy5icm93c2UgPSBicm93c2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBhZGROb3RpZmljYXRpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwibm90aWZpY2F0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmFkZE5vdGlmaWNhdGlvbiA9IGFkZE5vdGlmaWNhdGlvbjtcclxuZnVuY3Rpb24gcmVtb3ZlTm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVOb3RpZmljYXRpb24gPSByZW1vdmVOb3RpZmljYXRpb247XHJcbmZ1bmN0aW9uIGdldE5vdGlmaWNhdGlvblN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5nZXROb3RpZmljYXRpb25TdGF0dXMgPSBnZXROb3RpZmljYXRpb25TdGF0dXM7XHJcbmZ1bmN0aW9uIHNob3dOb3RpZmljYXRpb25NYW5hZ2VyKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ25vdGlmaWNhdGlvbnMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dOb3RpZmljYXRpb25NYW5hZ2VyID0gc2hvd05vdGlmaWNhdGlvbk1hbmFnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRPbmxpbmVTdGF0dXMoYXJndW1lbnQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdvbmxpbmUtc3RhdHVzJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRPbmxpbmVTdGF0dXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBwb3N0QWN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdhY3Rpb25zJywgb3B0aW9ucyk7XHJcbn1cclxuZXhwb3J0cy5wb3N0QWN0aW9uID0gcG9zdEFjdGlvbjtcclxuZnVuY3Rpb24gcG9zdFBhZ2VWaWV3KGlkLCBwYWdlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIHtcclxuICAgICAgICB0eXBlOiAnZG9jdW1lbnQnLFxyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICBwYWdlOiBwYWdlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnBvc3RQYWdlVmlldyA9IHBvc3RQYWdlVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHBvc3RFdmVudChrZXksIHByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiZXZlbnRzXCIsIHsga2V5OiBrZXksIHByb3BlcnRpZXM6IEpTT04uc3RyaW5naWZ5KHByb3BlcnRpZXMpIH0pO1xyXG59XHJcbmV4cG9ydHMucG9zdEV2ZW50ID0gcG9zdEV2ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2VhcmNoKHRlcm0sIG9mZnNldCwgbGltaXQpIHtcclxuICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSAwOyB9XHJcbiAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDEwMDsgfVxyXG4gICAgdmFyIGRmZDEgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgIHRlcm06IHRlcm0sXHJcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgICAgbGltaXQ6IGxpbWl0XHJcbiAgICB9O1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHFzID0gJC5wYXJhbShvYmopO1xyXG4gICAgICAgIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXM/JyArIHFzKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBvYmoubGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGRmZDEucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLm9mZnNldCArPSBvYmoubGltaXQ7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGZkMS5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gZGZkMS5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5zZWFyY2ggPSBzZWFyY2g7XHJcbmZ1bmN0aW9uIHNob3dTZWFyY2goeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnc2VhcmNoJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2VhcmNoID0gc2hvd1NlYXJjaDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwic3luY2VkaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nKTtcclxufVxyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZXMocHJlZml4KSB7XHJcbiAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgLy8gR2V0IHZhbHVlcyB3aXRoIHNwZWNpZmllZCBwcmVmaXhcclxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0U3luY2VkVmFsdWVzID0gZ2V0U3luY2VkVmFsdWVzO1xyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZShrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nLCBrZXksIGZhbHNlKTtcclxufVxyXG5leHBvcnRzLmdldFN5bmNlZFZhbHVlID0gZ2V0U3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIHNhdmVTeW5jZWRWYWx1ZShrZXksIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcInN5bmNlZGluZm9cIiwgW3sga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9XSk7XHJcbn1cclxuZXhwb3J0cy5zYXZlU3luY2VkVmFsdWUgPSBzYXZlU3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZVN5bmNlZEtleShrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwic3luY2VkaW5mb1wiLCBba2V5XSk7XHJcbn1cclxuZXhwb3J0cy5kZWxldGVTeW5jZWRLZXkgPSBkZWxldGVTeW5jZWRLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRTeXN0ZW1JbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRTeXN0ZW1JbmZvO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VXBsb2FkVXJsKGtleSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgXCJ1cGxvYWR1cmw/a2V5PVwiICsga2V5KTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVwbG9hZFVybDtcclxuIiwiLyoqXHJcbiAqIChjKSAyMDEzLTIwMTYsIE1lZGlhZmx5LCBJbmMuXHJcbiAqIG1mbHlDb21tYW5kcyBpcyBhIHNpbmdsZXRvbiBpbnN0YW5jZSB3aGljaCB3cmFwcyBjb21tb24gbWZseSBjYWxscyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXHJcbiAqIEJlZm9yZSB1c2UsIHBsZWFzZSBiZSBzdXJlIHRvIGNhbGwgc2V0UHJlZml4IGlmIHlvdSBhcmUgd29ya2luZyBvbiBhIGRldmVsb3BtZW50IHBsYXRmb3JtIChlLmcuXHJcbiAqIGEgbG9jYWwgd2Vic2VydmVyIG9uIGEgUEMpIGZvciBleGFtcGxlLCBodHRwOi8vbG9jYWxob3N0OjgwMDAvIC5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJhY3RpdmVJbmZvXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mbycpO1xyXG52YXIgc3lzdGVtSW5mb18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeXN0ZW1JbmZvJyk7XHJcbnZhciBvbmxpbmVTdGF0dXNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvb25saW5lU3RhdHVzJyk7XHJcbnZhciB1cGxvYWRVcmxfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvdXBsb2FkVXJsJyk7XHJcbnZhciBpdGVtID0gcmVxdWlyZSgnLi9jb21tYW5kcy9pdGVtJyk7XHJcbnZhciBjb2xsZWN0aW9ucyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvY29sbGVjdGlvbnMnKTtcclxudmFyIGZvbGRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9mb2xkZXInKTtcclxudmFyIGZpbHRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9maWx0ZXInKTtcclxudmFyIGdwc0Nvb3JkaW5hdGVzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2dwc0Nvb3JkaW5hdGVzJyk7XHJcbnZhciBzZWFyY2hfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc2VhcmNoJyk7XHJcbnZhciBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL25hdmlnYXRpb24nKTtcclxudmFyIGRvd25sb2FkZXIgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2Rvd25sb2FkZXInKTtcclxudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbm90aWZpY2F0aW9uJyk7XHJcbnZhciBhY2NvdW50SW5mbyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYWNjb3VudEluZm8nKTtcclxudmFyIGxvY2FsS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9sb2NhbEtleVZhbHVlU3RvcmFnZScpO1xyXG52YXIgc3luY2VkS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UnKTtcclxudmFyIGFwcGxpY2F0aW9uU3luYyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwbGljYXRpb25TeW5jJyk7XHJcbnZhciBuYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9jb21tYW5kcy9uYXZpZ2F0aW9uJyk7XHJcbnZhciBhcHBGZWF0dXJlcyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwRmVhdHVyZXMnKTtcclxudmFyIGNvbnRyb2xzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NvbnRyb2xzJyk7XHJcbnZhciBlbWJlZF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9lbWJlZCcpO1xyXG52YXIgcG9zdEFjdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9wb3N0QWN0aW9uJyk7XHJcbnZhciBwb3N0RXZlbnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvcG9zdEV2ZW50Jyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZGV2aWNlJyk7XHJcbnZhciBtZmx5Q29tbWFuZHMgPSB7XHJcbiAgICBjbG9zZTogbmF2aWdhdGlvbl8xLmNsb3NlLFxyXG4gICAgZ2V0SW50ZXJhY3RpdmVJbmZvOiBpbnRlcmFjdGl2ZUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0U3lzdGVtSW5mbzogc3lzdGVtSW5mb18xLmRlZmF1bHQsXHJcbiAgICBnZXRPbmxpbmVTdGF0dXM6IG9ubGluZVN0YXR1c18xLmRlZmF1bHQsXHJcbiAgICBnZXRHcHNDb29yZGluYXRlczogZ3BzQ29vcmRpbmF0ZXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0VXBsb2FkVXJsOiB1cGxvYWRVcmxfMS5kZWZhdWx0LFxyXG4gICAgZ2V0Rm9sZGVyOiBmb2xkZXJfMS5kZWZhdWx0LFxyXG4gICAgZmlsdGVyOiBmaWx0ZXJfMS5kZWZhdWx0LFxyXG4gICAgc2VhcmNoOiBzZWFyY2hfMS5zZWFyY2gsXHJcbiAgICBzaG93U2VhcmNoOiBzZWFyY2hfMS5zaG93U2VhcmNoLFxyXG4gICAgaGlkZUNvbnRyb2xCYXJzOiBjb250cm9sc18xLmhpZGVDb250cm9sQmFycyxcclxuICAgIHNob3dDb250cm9sQmFyczogY29udHJvbHNfMS5zaG93Q29udHJvbEJhcnMsXHJcbiAgICBlbWJlZDogZW1iZWRfMS5lbWJlZCxcclxuICAgIGVtYmVkSW1hZ2U6IGVtYmVkXzEuZW1iZWRJbWFnZSxcclxuICAgIGdldERhdGE6IGVtYmVkXzEuZ2V0RGF0YSxcclxuICAgIGdldERldmljZVR5cGU6IGRldmljZV8xLmdldERldmljZVR5cGUsXHJcbiAgICBnZXRQcmVmaXg6IGRldmljZV8xLmdldFByZWZpeCxcclxuICAgIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQ6IGRldmljZV8xLmlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQsXHJcbiAgICBpc1dpbmRvd3M4OiBkZXZpY2VfMS5pc1dpbmRvd3M4LFxyXG4gICAgcG9zdEFjdGlvbjogcG9zdEFjdGlvbl8xLnBvc3RBY3Rpb24sXHJcbiAgICBwb3N0UGFnZVZpZXc6IHBvc3RBY3Rpb25fMS5wb3N0UGFnZVZpZXcsXHJcbiAgICBwb3N0RXZlbnQ6IHBvc3RFdmVudF8xLnBvc3RFdmVudFxyXG59O1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGl0ZW0pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGNvbGxlY3Rpb25zKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBub3RpZmljYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFjY291bnRJbmZvKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgc3luY2VkS2V5VmFsdWVTdG9yYWdlKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBsaWNhdGlvblN5bmMpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcEZlYXR1cmVzKTtcclxubW9kdWxlLmV4cG9ydHMgPSBtZmx5Q29tbWFuZHM7XHJcbiIsIi8vIGlzLmpzIDAuOC4wXG4vLyBBdXRob3I6IEFyYXMgQXRhc2F5Z2luXG5cbi8vIEFNRCB3aXRoIGdsb2JhbCwgTm9kZSwgb3IgZ2xvYmFsXG47KGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBBbHNvIGNyZWF0ZSBhIGdsb2JhbCBpbiBjYXNlIHNvbWUgc2NyaXB0c1xuICAgICAgICAgICAgLy8gdGhhdCBhcmUgbG9hZGVkIHN0aWxsIGFyZSBsb29raW5nIGZvclxuICAgICAgICAgICAgLy8gYSBnbG9iYWwgZXZlbiB3aGVuIGFuIEFNRCBsb2FkZXIgaXMgaW4gdXNlLlxuICAgICAgICAgICAgcmV0dXJuIChyb290LmlzID0gZmFjdG9yeSgpKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LmlzID0gZmFjdG9yeSgpO1xuICAgIH1cbn0gKHRoaXMsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gQmFzZWxpbmVcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgdmFyIHJvb3QgPSB0aGlzIHx8IGdsb2JhbDtcbiAgICB2YXIgcHJldmlvdXNJcyA9IHJvb3QuaXM7XG5cbiAgICAvLyBkZWZpbmUgJ2lzJyBvYmplY3QgYW5kIGN1cnJlbnQgdmVyc2lvblxuICAgIHZhciBpcyA9IHt9O1xuICAgIGlzLlZFUlNJT04gPSAnMC44LjAnO1xuXG4gICAgLy8gZGVmaW5lIGludGVyZmFjZXNcbiAgICBpcy5ub3QgPSB7fTtcbiAgICBpcy5hbGwgPSB7fTtcbiAgICBpcy5hbnkgPSB7fTtcblxuICAgIC8vIGNhY2hlIHNvbWUgbWV0aG9kcyB0byBjYWxsIGxhdGVyIG9uXG4gICAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICB2YXIgYXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIHdoaWNoIHJldmVyc2VzIHRoZSBzZW5zZSBvZiBwcmVkaWNhdGUgcmVzdWx0XG4gICAgZnVuY3Rpb24gbm90KGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICFmdW5jLmFwcGx5KG51bGwsIGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gd2hpY2ggY2FsbCBwcmVkaWNhdGUgZnVuY3Rpb24gcGVyIHBhcmFtZXRlciBhbmQgcmV0dXJuIHRydWUgaWYgYWxsIHBhc3NcbiAgICBmdW5jdGlvbiBhbGwoZnVuYykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHBhcmFtZXRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgaWYobGVuZ3RoID09PSAxICYmIGlzLmFycmF5KHBhcmFtZXRlcnNbMF0pKSB7ICAgIC8vIHN1cHBvcnQgYXJyYXlcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVyc1swXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBwYXJhbWV0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZ1bmMuY2FsbChudWxsLCBwYXJhbWV0ZXJzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gaGVscGVyIGZ1bmN0aW9uIHdoaWNoIGNhbGwgcHJlZGljYXRlIGZ1bmN0aW9uIHBlciBwYXJhbWV0ZXIgYW5kIHJldHVybiB0cnVlIGlmIGFueSBwYXNzXG4gICAgZnVuY3Rpb24gYW55KGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBhcnJheVNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBwYXJhbWV0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmKGxlbmd0aCA9PT0gMSAmJiBpcy5hcnJheShwYXJhbWV0ZXJzWzBdKSkgeyAgICAvLyBzdXBwb3J0IGFycmF5XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnNbMF07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcGFyYW1ldGVycy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmMuY2FsbChudWxsLCBwYXJhbWV0ZXJzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gVHlwZSBjaGVja3NcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBBcmd1bWVudHM/XG4gICAgaXMuYXJndW1lbnRzID0gZnVuY3Rpb24odmFsdWUpIHsgICAgLy8gZmFsbGJhY2sgY2hlY2sgaXMgZm9yIElFXG4gICAgICAgIHJldHVybiBpcy5ub3QubnVsbCh2YWx1ZSkgJiYgKHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcmd1bWVudHNdJyB8fCAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAnY2FsbGVlJyBpbiB2YWx1ZSkpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIHZhbHVlIEFycmF5P1xuICAgIGlzLmFycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkgeyAgICAvLyBjaGVjayBuYXRpdmUgaXNBcnJheSBmaXJzdFxuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gdmFsdWUgQm9vbGVhbj9cbiAgICBpcy5ib29sZWFuID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIHZhbHVlIERhdGUgT2JqZWN0P1xuICAgIGlzLmRhdGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IERhdGVdJztcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBFcnJvciBvYmplY3Q/XG4gICAgaXMuZXJyb3IgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEVycm9yXSc7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gdmFsdWUgZnVuY3Rpb24/XG4gICAgaXMuZnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkgeyAgICAvLyBmYWxsYmFjayBjaGVjayBpcyBmb3IgSUVcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBOYU4/XG4gICAgaXMubmFuID0gZnVuY3Rpb24odmFsdWUpIHsgICAgLy8gTmFOIGlzIG51bWJlciA6KSBBbHNvIGl0IGlzIHRoZSBvbmx5IHZhbHVlIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZlxuICAgICAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIHZhbHVlIG51bGw/XG4gICAgaXMubnVsbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBudW1iZXI/XG4gICAgaXMubnVtYmVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGlzLm5vdC5uYW4odmFsdWUpICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBOdW1iZXJdJztcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBvYmplY3Q/XG4gICAgaXMub2JqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhdmFsdWU7XG4gICAgfTtcblxuICAgIC8vIGlzIGdpdmVuIHZhbHVlIGEgcHVyZSBKU09OIG9iamVjdD9cbiAgICBpcy5qc29uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJztcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBSZWdFeHA/XG4gICAgaXMucmVnZXhwID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbiAgICB9O1xuXG4gICAgLy8gYXJlIGdpdmVuIHZhbHVlcyBzYW1lIHR5cGU/XG4gICAgLy8gcHJldmVudCBOYU4sIE51bWJlciBzYW1lIHR5cGUgY2hlY2tcbiAgICBpcy5zYW1lVHlwZSA9IGZ1bmN0aW9uKHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgICAgIGlmKGlzLm5hbih2YWx1ZTEpIHx8IGlzLm5hbih2YWx1ZTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXMubmFuKHZhbHVlMSkgPT09IGlzLm5hbih2YWx1ZTIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlMSkgPT09IHRvU3RyaW5nLmNhbGwodmFsdWUyKTtcbiAgICB9O1xuICAgIC8vIHNhbWVUeXBlIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgaXMuc2FtZVR5cGUuYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gdmFsdWUgU3RyaW5nP1xuICAgIGlzLnN0cmluZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gdmFsdWUgQ2hhcj9cbiAgICBpcy5jaGFyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGlzLnN0cmluZyh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAxO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIHZhbHVlIHVuZGVmaW5lZD9cbiAgICBpcy51bmRlZmluZWQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgLy8gUHJlc2VuY2UgY2hlY2tzXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8vaXMgYSBnaXZlbiB2YWx1ZSBlbXB0eT8gT2JqZWN0cywgYXJyYXlzLCBzdHJpbmdzXG4gICAgaXMuZW1wdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZihpcy5vYmplY3QodmFsdWUpKXtcbiAgICAgICAgICAgIHZhciBudW0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkubGVuZ3RoO1xuICAgICAgICAgICAgaWYobnVtID09PSAwIHx8IChudW0gPT09IDEgJiYgaXMuYXJyYXkodmFsdWUpKSB8fCAobnVtID09PSAyICYmIGlzLmFyZ3VtZW50cyh2YWx1ZSkpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gJyc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBleGlzdHk/XG4gICAgaXMuZXhpc3R5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gdmFsdWUgdHJ1dGh5P1xuICAgIGlzLnRydXRoeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpcy5leGlzdHkodmFsdWUpICYmIHZhbHVlICE9PSBmYWxzZSAmJiBpcy5ub3QubmFuKHZhbHVlKSAmJiB2YWx1ZSAhPT0gXCJcIiAmJiB2YWx1ZSAhPT0gMDtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBmYWxzeT9cbiAgICBpcy5mYWxzeSA9IG5vdChpcy50cnV0aHkpO1xuXG4gICAgLy8gaXMgYSBnaXZlbiB2YWx1ZSBzcGFjZT9cbiAgICAvLyBob3JpemFudGFsIHRhYjogOSwgbGluZSBmZWVkOiAxMCwgdmVydGljYWwgdGFiOiAxMSwgZm9ybSBmZWVkOiAxMiwgY2FycmlhZ2UgcmV0dXJuOiAxMywgc3BhY2U6IDMyXG4gICAgaXMuc3BhY2UgPSAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYoaXMuY2hhcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJDb2RlID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIHJldHVybiAoY2hhcmFjdGVyQ29kZSA+ICA4ICYmIGNoYXJhY3RlckNvZGUgPCAxNCkgfHwgY2hhcmFjdGVyQ29kZSA9PT0gMzI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQXJpdGhtZXRpYyBjaGVja3NcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLy8gYXJlIGdpdmVuIHZhbHVlcyBlcXVhbD8gc3VwcG9ydHMgbnVtYmVycywgc3RyaW5ncywgcmVnZXhwcywgYm9vbGVhbnNcbiAgICAvLyBUT0RPOiBBZGQgb2JqZWN0IGFuZCBhcnJheSBzdXBwb3J0XG4gICAgaXMuZXF1YWwgPSBmdW5jdGlvbih2YWx1ZTEsIHZhbHVlMikge1xuICAgICAgICAvLyBjaGVjayAwIGFuZCAtMCBlcXVpdHkgd2l0aCBJbmZpbml0eSBhbmQgLUluZmluaXR5XG4gICAgICAgIGlmKGlzLmFsbC5udW1iZXIodmFsdWUxLCB2YWx1ZTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxID09PSB2YWx1ZTIgJiYgMSAvIHZhbHVlMSA9PT0gMSAvIHZhbHVlMjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayByZWdleHBzIGFzIHN0cmluZ3MgdG9vXG4gICAgICAgIGlmKGlzLmFsbC5zdHJpbmcodmFsdWUxLCB2YWx1ZTIpIHx8IGlzLmFsbC5yZWdleHAodmFsdWUxLCB2YWx1ZTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gJycgKyB2YWx1ZTEgPT09ICcnICsgdmFsdWUyO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzLmFsbC5ib29sZWFuKHZhbHVlMSwgdmFsdWUyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMSA9PT0gdmFsdWUyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8vIGVxdWFsIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgaXMuZXF1YWwuYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gbnVtYmVyIGV2ZW4/XG4gICAgaXMuZXZlbiA9IGZ1bmN0aW9uKG51bWIpIHtcbiAgICAgICAgcmV0dXJuIGlzLm51bWJlcihudW1iKSAmJiBudW1iICUgMiA9PT0gMDtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiBudW1iZXIgb2RkP1xuICAgIGlzLm9kZCA9IGZ1bmN0aW9uKG51bWIpIHtcbiAgICAgICAgcmV0dXJuIGlzLm51bWJlcihudW1iKSAmJiBudW1iICUgMiA9PT0gMTtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiBudW1iZXIgcG9zaXRpdmU/XG4gICAgaXMucG9zaXRpdmUgPSBmdW5jdGlvbihudW1iKSB7XG4gICAgICAgIHJldHVybiBpcy5udW1iZXIobnVtYikgJiYgbnVtYiA+IDA7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gbnVtYmVyIG5lZ2F0aXZlP1xuICAgIGlzLm5lZ2F0aXZlID0gZnVuY3Rpb24obnVtYikge1xuICAgICAgICByZXR1cm4gaXMubnVtYmVyKG51bWIpICYmIG51bWIgPCAwO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIG51bWJlciBhYm92ZSBtaW5pbXVtIHBhcmFtZXRlcj9cbiAgICBpcy5hYm92ZSA9IGZ1bmN0aW9uKG51bWIsIG1pbikge1xuICAgICAgICByZXR1cm4gaXMuYWxsLm51bWJlcihudW1iLCBtaW4pICYmIG51bWIgPiBtaW47XG4gICAgfTtcbiAgICAvLyBhYm92ZSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLmFib3ZlLmFwaSA9IFsnbm90J107XG5cbiAgICAvLyBpcyBhIGdpdmVuIG51bWJlciBhYm92ZSBtYXhpbXVtIHBhcmFtZXRlcj9cbiAgICBpcy51bmRlciA9IGZ1bmN0aW9uKG51bWIsIG1heCkge1xuICAgICAgICByZXR1cm4gaXMuYWxsLm51bWJlcihudW1iLCBtYXgpICYmIG51bWIgPCBtYXg7XG4gICAgfTtcbiAgICAvLyBsZWFzdCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLnVuZGVyLmFwaSA9IFsnbm90J107XG5cbiAgICAvLyBpcyBhIGdpdmVuIG51bWJlciB3aXRoaW4gbWluaW11bSBhbmQgbWF4aW11bSBwYXJhbWV0ZXJzP1xuICAgIGlzLndpdGhpbiA9IGZ1bmN0aW9uKG51bWIsIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBpcy5hbGwubnVtYmVyKG51bWIsIG1pbiwgbWF4KSAmJiBudW1iID4gbWluICYmIG51bWIgPCBtYXg7XG4gICAgfTtcbiAgICAvLyB3aXRoaW4gbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICBpcy53aXRoaW4uYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gbnVtYmVyIGRlY2ltYWw/XG4gICAgaXMuZGVjaW1hbCA9IGZ1bmN0aW9uKG51bWIpIHtcbiAgICAgICAgcmV0dXJuIGlzLm51bWJlcihudW1iKSAmJiBudW1iICUgMSAhPT0gMDtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiBudW1iZXIgaW50ZWdlcj9cbiAgICBpcy5pbnRlZ2VyID0gZnVuY3Rpb24obnVtYikge1xuICAgICAgICByZXR1cm4gaXMubnVtYmVyKG51bWIpICYmIG51bWIgJSAxID09PSAwO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIG51bWJlciBmaW5pdGU/XG4gICAgaXMuZmluaXRlID0gaXNGaW5pdGUgfHwgZnVuY3Rpb24obnVtYikge1xuICAgICAgICByZXR1cm4gbnVtYiAhPT0gSW5maW5pdHkgJiYgbnVtYiAhPT0gLUluZmluaXR5ICYmIGlzLm5vdC5uYW4obnVtYik7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gbnVtYmVyIGluZmluaXRlP1xuICAgIGlzLmluZmluaXRlID0gbm90KGlzLmZpbml0ZSk7XG5cbiAgICAvLyBSZWdleHAgY2hlY2tzXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgICAvLyBTdGV2ZW4gTGV2aXRoYW4sIEphbiBHb3l2YWVydHM6IFJlZ3VsYXIgRXhwcmVzc2lvbnMgQ29va2Jvb2tcbiAgICAvLyBTY290dCBHb256YWxlejogRW1haWwgYWRkcmVzcyB2YWxpZGF0aW9uXG5cbiAgICAvLyBlcHBQaG9uZSBtYXRjaCBleHRlbnNpYmxlIHByb3Zpc2lvbmluZyBwcm90b2NvbCBmb3JtYXRcbiAgICAvLyBuYW5wUGhvbmUgbWF0Y2ggbm9ydGggYW1lcmljYW4gbnVtYmVyIHBsYW4gZm9ybWF0XG4gICAgLy8gZGF0ZVN0cmluZyBtYXRjaCBtL2QveXkgYW5kIG1tL2RkL3l5eXksIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBvbmUgb3IgdHdvIGRpZ2l0cyBmb3IgdGhlIGRheSBhbmQgbW9udGgsIGFuZCB0d28gb3IgZm91ciBkaWdpdHMgZm9yIHRoZSB5ZWFyXG4gICAgLy8gdGltZSBtYXRjaCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMsIDI0LWhvdXIgY2xvY2tcbiAgICB2YXIgcmVnZXhwcyA9IHtcbiAgICAgICAgdXJsOiAvXig/Oig/Omh0dHBzP3xmdHApOlxcL1xcLyk/KD86KD8hKD86MTB8MTI3KSg/OlxcLlxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXC4yNTR8MTkyXFwuMTY4KSg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSooPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH0pKSkoPzo6XFxkezIsNX0pPyg/OlxcL1xcUyopPyQvaSxcbiAgICAgICAgZW1haWw6IC9eKCgoW2Etel18XFxkfFshI1xcJCUmJ1xcKlxcK1xcLVxcLz1cXD9cXF5fYHtcXHx9fl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKyhcXC4oW2Etel18XFxkfFshI1xcJCUmJ1xcKlxcK1xcLVxcLz1cXD9cXF5fYHtcXHx9fl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKykqKXwoKFxceDIyKSgoKChcXHgyMHxcXHgwOSkqKFxceDBkXFx4MGEpKT8oXFx4MjB8XFx4MDkpKyk/KChbXFx4MDEtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZcXHg3Zl18XFx4MjF8W1xceDIzLVxceDViXXxbXFx4NWQtXFx4N2VdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoXFxcXChbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGQtXFx4N2ZdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpKSooKChcXHgyMHxcXHgwOSkqKFxceDBkXFx4MGEpKT8oXFx4MjB8XFx4MDkpKyk/KFxceDIyKSkpQCgoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKihbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSlcXC4pKygoW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCgoW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKihbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKSQvaSxcbiAgICAgICAgY3JlZGl0Q2FyZDogL14oPzooNFswLTldezEyfSg/OlswLTldezN9KT8pfCg1WzEtNV1bMC05XXsxNH0pfCg2KD86MDExfDVbMC05XXsyfSlbMC05XXsxMn0pfCgzWzQ3XVswLTldezEzfSl8KDMoPzowWzAtNV18WzY4XVswLTldKVswLTldezExfSl8KCg/OjIxMzF8MTgwMHwzNVswLTldezN9KVswLTldezExfSkpJC8sXG4gICAgICAgIGFscGhhTnVtZXJpYzogL15bQS1aYS16MC05XSskLyxcbiAgICAgICAgdGltZVN0cmluZzogL14oMlswLTNdfFswMV0/WzAtOV0pOihbMC01XT9bMC05XSk6KFswLTVdP1swLTldKSQvLFxuICAgICAgICBkYXRlU3RyaW5nOiAvXigxWzAtMl18MD9bMS05XSlcXC8oM1swMV18WzEyXVswLTldfDA/WzEtOV0pXFwvKD86WzAtOV17Mn0pP1swLTldezJ9JC8sXG4gICAgICAgIHVzWmlwQ29kZTogL15bMC05XXs1fSg/Oi1bMC05XXs0fSk/JC8sXG4gICAgICAgIGNhUG9zdGFsQ29kZTogL14oPyEuKltERklPUVVdKVtBLVZYWV1bMC05XVtBLVpdXFxzP1swLTldW0EtWl1bMC05XSQvLFxuICAgICAgICB1a1Bvc3RDb2RlOiAvXltBLVpdezEsMn1bMC05UkNITlFdWzAtOUEtWl0/XFxzP1swLTldW0FCRC1ISkxOUC1VVy1aXXsyfSR8XltBLVpdezJ9LT9bMC05XXs0fSQvLFxuICAgICAgICBuYW5wUGhvbmU6IC9eXFwoPyhbMC05XXszfSlcXCk/Wy0uIF0/KFswLTldezN9KVstLiBdPyhbMC05XXs0fSkkLyxcbiAgICAgICAgZXBwUGhvbmU6IC9eXFwrWzAtOV17MSwzfVxcLlswLTldezQsMTR9KD86eC4rKT8kLyxcbiAgICAgICAgc29jaWFsU2VjdXJpdHlOdW1iZXI6IC9eKD8hMDAwfDY2NilbMC04XVswLTldezJ9LSg/ITAwKVswLTldezJ9LSg/ITAwMDApWzAtOV17NH0kLyxcbiAgICAgICAgYWZmaXJtYXRpdmU6IC9eKD86MXx0KD86cnVlKT98eSg/OmVzKT98b2soPzpheSk/KSQvLFxuICAgICAgICBoZXhhZGVjaW1hbDogL15bMC05YS1mQS1GXSskLyxcbiAgICAgICAgaGV4Q29sb3I6IC9eIz8oWzAtOWEtZkEtRl17M318WzAtOWEtZkEtRl17Nn0pJC8sXG4gICAgICAgIGlwdjQ6IC9eKD86KD86XFxkfFsxLTldXFxkfDFcXGR7Mn18MlswLTRdXFxkfDI1WzAtNV0pXFwuKXszfSg/OlxcZHxbMS05XVxcZHwxXFxkezJ9fDJbMC00XVxcZHwyNVswLTVdKSQvLFxuICAgICAgICBpcHY2OiAvXigoW2EtekEtWl18W2EtekEtWl1bYS16QS1aMC05XFwtXSpbYS16QS1aMC05XSlcXC4pKihbQS1aYS16XXxbQS1aYS16XVtBLVphLXowLTlcXC1dKltBLVphLXowLTldKSR8XlxccyooKChbMC05QS1GYS1mXXsxLDR9Oil7N30oWzAtOUEtRmEtZl17MSw0fXw6KSl8KChbMC05QS1GYS1mXXsxLDR9Oil7Nn0oOlswLTlBLUZhLWZdezEsNH18KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pfDopKXwoKFswLTlBLUZhLWZdezEsNH06KXs1fSgoKDpbMC05QS1GYS1mXXsxLDR9KXsxLDJ9KXw6KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pfDopKXwoKFswLTlBLUZhLWZdezEsNH06KXs0fSgoKDpbMC05QS1GYS1mXXsxLDR9KXsxLDN9KXwoKDpbMC05QS1GYS1mXXsxLDR9KT86KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pKXw6KSl8KChbMC05QS1GYS1mXXsxLDR9Oil7M30oKCg6WzAtOUEtRmEtZl17MSw0fSl7MSw0fSl8KCg6WzAtOUEtRmEtZl17MSw0fSl7MCwyfTooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKXwoKFswLTlBLUZhLWZdezEsNH06KXsyfSgoKDpbMC05QS1GYS1mXXsxLDR9KXsxLDV9KXwoKDpbMC05QS1GYS1mXXsxLDR9KXswLDN9OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCgoWzAtOUEtRmEtZl17MSw0fTopezF9KCgoOlswLTlBLUZhLWZdezEsNH0pezEsNn0pfCgoOlswLTlBLUZhLWZdezEsNH0pezAsNH06KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pKXw6KSl8KDooKCg6WzAtOUEtRmEtZl17MSw0fSl7MSw3fSl8KCg6WzAtOUEtRmEtZl17MSw0fSl7MCw1fTooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKSkoJS4rKT9cXHMqJC8sXG4gICAgICAgIGlwOiAvXigoWzAtOV18WzEtOV1bMC05XXwxWzAtOV17Mn18MlswLTRdWzAtOV18MjVbMC01XSlcXC4pezN9KFswLTldfFsxLTldWzAtOV18MVswLTldezJ9fDJbMC00XVswLTldfDI1WzAtNV0pJHxeKChbYS16QS1aXXxbYS16QS1aXVthLXpBLVowLTlcXC1dKlthLXpBLVowLTldKVxcLikqKFtBLVphLXpdfFtBLVphLXpdW0EtWmEtejAtOVxcLV0qW0EtWmEtejAtOV0pJHxeXFxzKigoKFswLTlBLUZhLWZdezEsNH06KXs3fShbMC05QS1GYS1mXXsxLDR9fDopKXwoKFswLTlBLUZhLWZdezEsNH06KXs2fSg6WzAtOUEtRmEtZl17MSw0fXwoKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSl8OikpfCgoWzAtOUEtRmEtZl17MSw0fTopezV9KCgoOlswLTlBLUZhLWZdezEsNH0pezEsMn0pfDooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSl8OikpfCgoWzAtOUEtRmEtZl17MSw0fTopezR9KCgoOlswLTlBLUZhLWZdezEsNH0pezEsM30pfCgoOlswLTlBLUZhLWZdezEsNH0pPzooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKXwoKFswLTlBLUZhLWZdezEsNH06KXszfSgoKDpbMC05QS1GYS1mXXsxLDR9KXsxLDR9KXwoKDpbMC05QS1GYS1mXXsxLDR9KXswLDJ9OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpfCgoWzAtOUEtRmEtZl17MSw0fTopezJ9KCgoOlswLTlBLUZhLWZdezEsNH0pezEsNX0pfCgoOlswLTlBLUZhLWZdezEsNH0pezAsM306KCgyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkoXFwuKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKSl7M30pKXw6KSl8KChbMC05QS1GYS1mXXsxLDR9Oil7MX0oKCg6WzAtOUEtRmEtZl17MSw0fSl7MSw2fSl8KCg6WzAtOUEtRmEtZl17MSw0fSl7MCw0fTooKDI1WzAtNV18MlswLTRdXFxkfDFcXGRcXGR8WzEtOV0/XFxkKShcXC4oMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKXszfSkpfDopKXwoOigoKDpbMC05QS1GYS1mXXsxLDR9KXsxLDd9KXwoKDpbMC05QS1GYS1mXXsxLDR9KXswLDV9OigoMjVbMC01XXwyWzAtNF1cXGR8MVxcZFxcZHxbMS05XT9cXGQpKFxcLigyNVswLTVdfDJbMC00XVxcZHwxXFxkXFxkfFsxLTldP1xcZCkpezN9KSl8OikpKSglLispP1xccyokL1xuICAgIH07XG5cbiAgICAvLyBjcmVhdGUgcmVnZXhwIGNoZWNrcyBtZXRob2RzIGZyb20gJ3JlZ2V4cCcgb2JqZWN0XG4gICAgZm9yKHZhciByZWdleHAgaW4gcmVnZXhwcykge1xuICAgICAgICBpZihyZWdleHBzLmhhc093blByb3BlcnR5KHJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHJlZ2V4cENoZWNrKHJlZ2V4cCwgcmVnZXhwcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdleHBDaGVjayhyZWdleHAsIHJlZ2V4cHMpIHtcbiAgICAgICAgaXNbcmVnZXhwXSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVnZXhwc1tyZWdleHBdLnRlc3QodmFsdWUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIFN0cmluZyBjaGVja3NcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLy8gaXMgYSBnaXZlbiBzdHJpbmcgaW5jbHVkZSBwYXJhbWV0ZXIgc3Vic3RyaW5nP1xuICAgIGlzLmluY2x1ZGUgPSBmdW5jdGlvbihzdHIsIHN1YnN0cikge1xuICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyKSA+IC0xO1xuICAgIH07XG4gICAgLy8gaW5jbHVkZSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLmluY2x1ZGUuYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gc3RyaW5nIGFsbCB1cHBlcmNhc2U/XG4gICAgaXMudXBwZXJDYXNlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIHJldHVybiBpcy5zdHJpbmcoc3RyKSAmJiBzdHIgPT09IHN0ci50b1VwcGVyQ2FzZSgpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIHN0cmluZyBhbGwgbG93ZXJjYXNlP1xuICAgIGlzLmxvd2VyQ2FzZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICByZXR1cm4gaXMuc3RyaW5nKHN0cikgJiYgc3RyID09PSBzdHIudG9Mb3dlckNhc2UoKTtcbiAgICB9O1xuXG4gICAgLy8gaXMgc3RyaW5nIHN0YXJ0IHdpdGggYSBnaXZlbiBzdGFydFdpdGggcGFyYW1ldGVyP1xuICAgIGlzLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKHN0ciwgc3RhcnRXaXRoKSB7XG4gICAgICAgIHJldHVybiBpcy5zdHJpbmcoc3RyKSAmJiBzdHIuaW5kZXhPZihzdGFydFdpdGgpID09PSAwO1xuICAgIH07XG4gICAgLy8gc3RhcnRXaXRoIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgaXMuc3RhcnRXaXRoLmFwaSA9IFsnbm90J107XG5cbiAgICAvLyBpcyBzdHJpbmcgZW5kIHdpdGggYSBnaXZlbiBlbmRXaXRoIHBhcmFtZXRlcj9cbiAgICBpcy5lbmRXaXRoID0gZnVuY3Rpb24oc3RyLCBlbmRXaXRoKSB7XG4gICAgICAgIHJldHVybiBpcy5zdHJpbmcoc3RyKSAmJiBzdHIuaW5kZXhPZihlbmRXaXRoKSA+IC0xICYmIHN0ci5pbmRleE9mKGVuZFdpdGgpID09PSBzdHIubGVuZ3RoIC0gIGVuZFdpdGgubGVuZ3RoO1xuICAgIH07XG4gICAgLy8gZW5kV2l0aCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLmVuZFdpdGguYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gc3RyaW5nIG9yIHNlbnRlbmNlIGNhcGl0YWxpemVkP1xuICAgIGlzLmNhcGl0YWxpemVkID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIGlmKGlzLm5vdC5zdHJpbmcoc3RyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3b3JkcyA9IHN0ci5zcGxpdCgnICcpO1xuICAgICAgICB2YXIgY2FwaXRhbGl6ZWQgPSBbXTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjYXBpdGFsaXplZC5wdXNoKHdvcmRzW2ldWzBdID09PSB3b3Jkc1tpXVswXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXMuYWxsLnRydXRoeS5hcHBseShudWxsLCBjYXBpdGFsaXplZCk7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gc3RyaW5nIHBhbGluZHJvbWU/XG4gICAgaXMucGFsaW5kcm9tZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICByZXR1cm4gaXMuc3RyaW5nKHN0cikgJiYgc3RyID09IHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICAgIH07XG5cbiAgICAvLyBUaW1lIGNoZWNrc1xuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICB2YXIgZGF5cyA9IFsnc3VuZGF5JywgJ21vbmRheScsICd0dWVzZGF5JywgJ3dlZG5lc2RheScsICd0aHVyc2RheScsICdmcmlkYXknLCAnc2F0dXJkYXknXTtcbiAgICB2YXIgbW9udGhzID0gWydqYW51YXJ5JywgJ2ZlYnJ1YXJ5JywgJ21hcmNoJywgJ2FwcmlsJywgJ21heScsICdqdW5lJywgJ2p1bHknLCAnYXVndXN0JywgJ3NlcHRlbWJlcicsICdvY3RvYmVyJywgJ25vdmVtYmVyJywgJ2RlY2VtYmVyJ107XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW5kaWNhdGUgdG9kYXk/XG4gICAgaXMudG9kYXkgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciB0b2RheVN0cmluZyA9IG5vdy50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiBvYmoudG9EYXRlU3RyaW5nKCkgPT09IHRvZGF5U3RyaW5nO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW5kaWNhdGUgeWVzdGVyZGF5P1xuICAgIGlzLnllc3RlcmRheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHllc3RlcmRheVN0cmluZyA9IG5ldyBEYXRlKG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgLSAxKSkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBpcy5kYXRlKG9iaikgJiYgb2JqLnRvRGF0ZVN0cmluZygpID09PSB5ZXN0ZXJkYXlTdHJpbmc7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gZGF0ZSBpbmRpY2F0ZSB0b21vcnJvdz9cbiAgICBpcy50b21vcnJvdyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHRvbW9ycm93U3RyaW5nID0gbmV3IERhdGUobm93LnNldERhdGUobm93LmdldERhdGUoKSArIDEpKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiBvYmoudG9EYXRlU3RyaW5nKCkgPT09IHRvbW9ycm93U3RyaW5nO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgcGFzdD9cbiAgICBpcy5wYXN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gaXMuZGF0ZShvYmopICYmIG9iai5nZXRUaW1lKCkgPCBub3cuZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgZnV0dXJlP1xuICAgIGlzLmZ1dHVyZSA9IG5vdChpcy5wYXN0KTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gZGF0ZXMgZGF5IGVxdWFsIGdpdmVuIGRheVN0cmluZyBwYXJhbWV0ZXI/XG4gICAgaXMuZGF5ID0gZnVuY3Rpb24ob2JqLCBkYXlTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiBkYXlTdHJpbmcudG9Mb3dlckNhc2UoKSA9PT0gZGF5c1tvYmouZ2V0RGF5KCldO1xuICAgIH07XG4gICAgLy8gZGF5IG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgaXMuZGF5LmFwaSA9IFsnbm90J107XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGVzIG1vbnRoIGVxdWFsIGdpdmVuIG1vbnRoU3RyaW5nIHBhcmFtZXRlcj9cbiAgICBpcy5tb250aCA9IGZ1bmN0aW9uKG9iaiwgbW9udGhTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiBtb250aFN0cmluZy50b0xvd2VyQ2FzZSgpID09PSBtb250aHNbb2JqLmdldE1vbnRoKCldO1xuICAgIH07XG4gICAgLy8gbW9udGggbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICBpcy5tb250aC5hcGkgPSBbJ25vdCddO1xuXG4gICAgLy8gaXMgYSBnaXZlbiBkYXRlcyB5ZWFyIGVxdWFsIGdpdmVuIHllYXIgcGFyYW1ldGVyP1xuICAgIGlzLnllYXIgPSBmdW5jdGlvbihvYmosIHllYXIpIHtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiBpcy5udW1iZXIoeWVhcikgJiYgeWVhciA9PT0gb2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgfTtcbiAgICAvLyB5ZWFyIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgaXMueWVhci5hcGkgPSBbJ25vdCddO1xuXG4gICAgLy8gaXMgdGhlIGdpdmVuIHllYXIgYSBsZWFwIHllYXI/XG4gICAgaXMubGVhcFllYXIgPSBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIHJldHVybiBpcy5udW1iZXIoeWVhcikgJiYgKCh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKSB8fCB5ZWFyICUgNDAwID09PSAwKTtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiBkYXRlIHdlZWtlbmQ/XG4gICAgLy8gNjogU2F0dXJkYXksIDA6IFN1bmRheVxuICAgIGlzLndlZWtlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiAob2JqLmdldERheSgpID09PSA2IHx8IG9iai5nZXREYXkoKSA9PT0gMCk7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gZGF0ZSB3ZWVrZGF5P1xuICAgIGlzLndlZWtkYXkgPSBub3QoaXMud2Vla2VuZCk7XG5cbiAgICAvLyBpcyBkYXRlIHdpdGhpbiBnaXZlbiByYW5nZT9cbiAgICBpcy5pbkRhdGVSYW5nZSA9IGZ1bmN0aW9uKG9iaiwgc3RhcnRPYmosIGVuZE9iaikge1xuICAgICAgICBpZihpcy5ub3QuZGF0ZShvYmopIHx8IGlzLm5vdC5kYXRlKHN0YXJ0T2JqKSB8fCBpcy5ub3QuZGF0ZShlbmRPYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdpdmVuRGF0ZSA9IG9iai5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBzdGFydCA9IHN0YXJ0T2JqLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGVuZCA9IGVuZE9iai5nZXRUaW1lKCk7XG4gICAgICAgIHJldHVybiBnaXZlbkRhdGUgPiBzdGFydCAmJiBnaXZlbkRhdGUgPCBlbmQ7XG4gICAgfTtcbiAgICAvLyBpbkRhdGVSYW5nZSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLmluRGF0ZVJhbmdlLmFwaSA9IFsnbm90J107XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW4gbGFzdCB3ZWVrIHJhbmdlP1xuICAgIGlzLmluTGFzdFdlZWsgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmluRGF0ZVJhbmdlKG9iaiwgbmV3IERhdGUobmV3IERhdGUoKS5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpIC0gNykpLCBuZXcgRGF0ZSgpKTtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiBkYXRlIGluIGxhc3QgbW9udGggcmFuZ2U/XG4gICAgaXMuaW5MYXN0TW9udGggPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmluRGF0ZVJhbmdlKG9iaiwgbmV3IERhdGUobmV3IERhdGUoKS5zZXRNb250aChuZXcgRGF0ZSgpLmdldE1vbnRoKCkgLSAxKSksIG5ldyBEYXRlKCkpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW4gbGFzdCB5ZWFyIHJhbmdlP1xuICAgIGlzLmluTGFzdFllYXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmluRGF0ZVJhbmdlKG9iaiwgbmV3IERhdGUobmV3IERhdGUoKS5zZXRGdWxsWWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSAxKSksIG5ldyBEYXRlKCkpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW4gbmV4dCB3ZWVrIHJhbmdlP1xuICAgIGlzLmluTmV4dFdlZWsgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmluRGF0ZVJhbmdlKG9iaiwgbmV3IERhdGUoKSwgbmV3IERhdGUobmV3IERhdGUoKS5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsgNykpKTtcbiAgICB9O1xuXG4gICAgLy8gaXMgYSBnaXZlbiBkYXRlIGluIG5leHQgbW9udGggcmFuZ2U/XG4gICAgaXMuaW5OZXh0TW9udGggPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmluRGF0ZVJhbmdlKG9iaiwgbmV3IERhdGUoKSwgbmV3IERhdGUobmV3IERhdGUoKS5zZXRNb250aChuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKSkpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW4gbmV4dCB5ZWFyIHJhbmdlP1xuICAgIGlzLmluTmV4dFllYXIgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIGlzLmluRGF0ZVJhbmdlKG9iaiwgbmV3IERhdGUoKSwgbmV3IERhdGUobmV3IERhdGUoKS5zZXRGdWxsWWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAxKSkpO1xuICAgIH07XG5cbiAgICAvLyBpcyBhIGdpdmVuIGRhdGUgaW4gdGhlIHBhcmFtZXRlciBxdWFydGVyP1xuICAgIGlzLnF1YXJ0ZXJPZlllYXIgPSBmdW5jdGlvbihvYmosIHF1YXJ0ZXJOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGlzLmRhdGUob2JqKSAmJiBpcy5udW1iZXIocXVhcnRlck51bWJlcikgJiYgcXVhcnRlck51bWJlciA9PT0gTWF0aC5mbG9vcigob2JqLmdldE1vbnRoKCkgKyAzKSAvIDMpO1xuICAgIH07XG4gICAgLy8gcXVhcnRlck9mWWVhciBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLnF1YXJ0ZXJPZlllYXIuYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gZGF0ZSBpbiBkYXlsaWdodCBzYXZpbmcgdGltZT9cbiAgICBpcy5kYXlMaWdodFNhdmluZ1RpbWUgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIGphbnVhcnkgPSBuZXcgRGF0ZShvYmouZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gICAgICAgIHZhciBqdWx5ID0gbmV3IERhdGUob2JqLmdldEZ1bGxZZWFyKCksIDYsIDEpO1xuICAgICAgICB2YXIgc3RkVGltZXpvbmVPZmZzZXQgPSBNYXRoLm1heChqYW51YXJ5LmdldFRpbWV6b25lT2Zmc2V0KCksIGp1bHkuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XG4gICAgICAgIHJldHVybiBvYmouZ2V0VGltZXpvbmVPZmZzZXQoKSA8IHN0ZFRpbWV6b25lT2Zmc2V0O1xuICAgIH07XG5cbiAgICAvLyBFbnZpcm9ubWVudCBjaGVja3NcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gICAgLy8gY2hlY2sgaWYgbGlicmFyeSBpcyB1c2VkIGFzIGEgTm9kZS5qcyBtb2R1bGVcbiAgICBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIC8vIHN0b3JlIG5hdmlnYXRvciBwcm9wZXJ0aWVzIHRvIHVzZSBsYXRlclxuICAgICAgICB2YXIgdXNlckFnZW50ID0gJ25hdmlnYXRvcicgaW4gd2luZG93ICYmICd1c2VyQWdlbnQnIGluIG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkgfHwgJyc7XG4gICAgICAgIHZhciB2ZW5kb3IgPSAnbmF2aWdhdG9yJyBpbiB3aW5kb3cgJiYgJ3ZlbmRvcicgaW4gbmF2aWdhdG9yICYmIG5hdmlnYXRvci52ZW5kb3IudG9Mb3dlckNhc2UoKSB8fCAnJztcbiAgICAgICAgdmFyIGFwcFZlcnNpb24gPSAnbmF2aWdhdG9yJyBpbiB3aW5kb3cgJiYgJ2FwcFZlcnNpb24nIGluIG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuYXBwVmVyc2lvbi50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgYnJvd3NlciBjaHJvbWU/XG4gICAgICAgIGlzLmNocm9tZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9jaHJvbWV8Y2hyb21pdW0vaS50ZXN0KHVzZXJBZ2VudCkgJiYgL2dvb2dsZSBpbmMvLnRlc3QodmVuZG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gY2hyb21lIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLmNocm9tZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgYnJvd3NlciBmaXJlZm94P1xuICAgICAgICBpcy5maXJlZm94ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL2ZpcmVmb3gvaS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGZpcmVmb3ggbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuZmlyZWZveC5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgYnJvd3NlciBlZGdlP1xuICAgICAgICBpcy5lZGdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL2VkZ2UvaS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGVkZ2UgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuZWRnZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgYnJvd3NlciBpbnRlcm5ldCBleHBsb3Jlcj9cbiAgICAgICAgLy8gcGFyYW1ldGVyIGlzIG9wdGlvbmFsXG4gICAgICAgIGlzLmllID0gZnVuY3Rpb24odmVyc2lvbikge1xuICAgICAgICAgICAgaWYoIXZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gL21zaWUvaS50ZXN0KHVzZXJBZ2VudCkgfHwgXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodmVyc2lvbiA+PSAxMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnbXNpZSAnICsgdmVyc2lvbikudGVzdCh1c2VyQWdlbnQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBpZSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy5pZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgYnJvd3NlciBvcGVyYT9cbiAgICAgICAgaXMub3BlcmEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvXk9wZXJhXFwvLy50ZXN0KHVzZXJBZ2VudCkgfHwgLy8gT3BlcmEgMTIgYW5kIG9sZGVyIHZlcnNpb25zXG4gICAgICAgICAgICAgICAgL1xceDIwT1BSXFwvLy50ZXN0KHVzZXJBZ2VudCk7IC8vIE9wZXJhIDE1K1xuICAgICAgICB9O1xuICAgICAgICAvLyBvcGVyYSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy5vcGVyYS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgYnJvd3NlciBzYWZhcmk/XG4gICAgICAgIGlzLnNhZmFyaSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9zYWZhcmkvaS50ZXN0KHVzZXJBZ2VudCkgJiYgL2FwcGxlIGNvbXB1dGVyL2kudGVzdCh2ZW5kb3IpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBzYWZhcmkgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuc2FmYXJpLmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBkZXZpY2UgaW9zP1xuICAgICAgICBpcy5pb3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpcy5pcGhvbmUoKSB8fCBpcy5pcGFkKCkgfHwgaXMuaXBvZCgpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBpb3MgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuaW9zLmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBkZXZpY2UgaXBob25lP1xuICAgICAgICBpcy5pcGhvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvaXBob25lL2kudGVzdCh1c2VyQWdlbnQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBpcGhvbmUgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuaXBob25lLmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBkZXZpY2UgaXBhZD9cbiAgICAgICAgaXMuaXBhZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9pcGFkL2kudGVzdCh1c2VyQWdlbnQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBpcGFkIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLmlwYWQuYXBpID0gWydub3QnXTtcblxuICAgICAgICAvLyBpcyBjdXJyZW50IGRldmljZSBpcG9kP1xuICAgICAgICBpcy5pcG9kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL2lwb2QvaS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGlwb2QgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuaXBvZC5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgZGV2aWNlIGFuZHJvaWQ/XG4gICAgICAgIGlzLmFuZHJvaWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvYW5kcm9pZC9pLnRlc3QodXNlckFnZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gYW5kcm9pZCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy5hbmRyb2lkLmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBkZXZpY2UgYW5kcm9pZCBwaG9uZT9cbiAgICAgICAgaXMuYW5kcm9pZFBob25lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL2FuZHJvaWQvaS50ZXN0KHVzZXJBZ2VudCkgJiYgL21vYmlsZS9pLnRlc3QodXNlckFnZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gYW5kcm9pZFBob25lIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLmFuZHJvaWRQaG9uZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgZGV2aWNlIGFuZHJvaWQgdGFibGV0P1xuICAgICAgICBpcy5hbmRyb2lkVGFibGV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gL2FuZHJvaWQvaS50ZXN0KHVzZXJBZ2VudCkgJiYgIS9tb2JpbGUvaS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGFuZHJvaWRUYWJsZXQgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuYW5kcm9pZFRhYmxldC5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgZGV2aWNlIGJsYWNrYmVycnk/XG4gICAgICAgIGlzLmJsYWNrYmVycnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvYmxhY2tiZXJyeS9pLnRlc3QodXNlckFnZW50KSB8fCAvQkIxMC9pLnRlc3QodXNlckFnZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gYmxhY2tiZXJyeSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy5ibGFja2JlcnJ5LmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBkZXZpY2UgZGVza3RvcD9cbiAgICAgICAgaXMuZGVza3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlzLm5vdC5tb2JpbGUoKSAmJiBpcy5ub3QudGFibGV0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGRlc2t0b3AgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMuZGVza3RvcC5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgb3BlcmF0aW5nIHN5c3RlbSBsaW51eD9cbiAgICAgICAgaXMubGludXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvbGludXgvaS50ZXN0KGFwcFZlcnNpb24pO1xuICAgICAgICB9O1xuICAgICAgICAvLyBsaW51eCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy5saW51eC5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgb3BlcmF0aW5nIHN5c3RlbSBtYWM/XG4gICAgICAgIGlzLm1hYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIC9tYWMvaS50ZXN0KGFwcFZlcnNpb24pO1xuICAgICAgICB9O1xuICAgICAgICAvLyBtYWMgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMubWFjLmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBvcGVyYXRpbmcgc3lzdGVtIHdpbmRvd3M/XG4gICAgICAgIGlzLndpbmRvd3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAvd2luL2kudGVzdChhcHBWZXJzaW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gd2luZG93cyBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy53aW5kb3dzLmFwaSA9IFsnbm90J107XG5cbiAgICAgICAgLy8gaXMgY3VycmVudCBkZXZpY2Ugd2luZG93cyBwaG9uZT9cbiAgICAgICAgaXMud2luZG93c1Bob25lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaXMud2luZG93cygpICYmIC9waG9uZS9pLnRlc3QodXNlckFnZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gd2luZG93c1Bob25lIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLndpbmRvd3NQaG9uZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgZGV2aWNlIHdpbmRvd3MgdGFibGV0P1xuICAgICAgICBpcy53aW5kb3dzVGFibGV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaXMud2luZG93cygpICYmIGlzLm5vdC53aW5kb3dzUGhvbmUoKSAmJiAvdG91Y2gvaS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHdpbmRvd3NUYWJsZXQgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMud2luZG93c1RhYmxldC5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgZGV2aWNlIG1vYmlsZT9cbiAgICAgICAgaXMubW9iaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaXMuaXBob25lKCkgfHwgaXMuaXBvZCgpIHx8IGlzLmFuZHJvaWRQaG9uZSgpIHx8IGlzLmJsYWNrYmVycnkoKSB8fCBpcy53aW5kb3dzUGhvbmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbW9iaWxlIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLm1vYmlsZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgZGV2aWNlIHRhYmxldD9cbiAgICAgICAgaXMudGFibGV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaXMuaXBhZCgpIHx8IGlzLmFuZHJvaWRUYWJsZXQoKSB8fCBpcy53aW5kb3dzVGFibGV0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHRhYmxldCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgICAgICBpcy50YWJsZXQuYXBpID0gWydub3QnXTtcblxuICAgICAgICAvLyBpcyBjdXJyZW50IHN0YXRlIG9ubGluZT9cbiAgICAgICAgaXMub25saW5lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm9uTGluZTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gb25saW5lIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLm9ubGluZS5hcGkgPSBbJ25vdCddO1xuXG4gICAgICAgIC8vIGlzIGN1cnJlbnQgc3RhdGUgb2ZmbGluZT9cbiAgICAgICAgaXMub2ZmbGluZSA9IG5vdChpcy5vbmxpbmUpO1xuICAgICAgICAvLyBvZmZsaW5lIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0ICdhbGwnIGFuZCAnYW55JyBpbnRlcmZhY2VzXG4gICAgICAgIGlzLm9mZmxpbmUuYXBpID0gWydub3QnXTtcblxuICAgICAgICAvLyBpcyBjdXJyZW50IGRldmljZSBzdXBwb3J0cyB0b3VjaD9cbiAgICAgICAgaXMudG91Y2hEZXZpY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwnRG9jdW1lbnRUb3VjaCcgaW4gd2luZG93ICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaDtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gdG91Y2hEZXZpY2UgbWV0aG9kIGRvZXMgbm90IHN1cHBvcnQgJ2FsbCcgYW5kICdhbnknIGludGVyZmFjZXNcbiAgICAgICAgaXMudG91Y2hEZXZpY2UuYXBpID0gWydub3QnXTtcbiAgICB9XG5cbiAgICAvLyBPYmplY3QgY2hlY2tzXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8vIGhhcyBhIGdpdmVuIG9iamVjdCBnb3QgcGFyYW1ldGVyaXplZCBjb3VudCBwcm9wZXJ0eT9cbiAgICBpcy5wcm9wZXJ0eUNvdW50ID0gZnVuY3Rpb24ob2JqLCBjb3VudCkge1xuICAgICAgICBpZighaXMub2JqZWN0KG9iaikgfHwgIWlzLm51bWJlcihjb3VudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihPYmplY3Qua2V5cykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSBjb3VudDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IFtdLFxuICAgICAgICAgICAgcHJvcGVydHk7XG4gICAgICAgIGZvcihwcm9wZXJ0eSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcGVydGllcy5sZW5ndGggPT09IGNvdW50O1xuICAgIH07XG4gICAgLy8gcHJvcGVydHlDb3VudCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLnByb3BlcnR5Q291bnQuYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGdpdmVuIG9iamVjdCBoYXMgcGFyYW1ldGVyaXplZCBwcm9wZXJ0eT9cbiAgICBpcy5wcm9wZXJ0eURlZmluZWQgPSBmdW5jdGlvbihvYmosIHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBpcy5vYmplY3Qob2JqKSAmJiBpcy5zdHJpbmcocHJvcGVydHkpICYmIHByb3BlcnR5IGluIG9iajtcbiAgICB9O1xuICAgIC8vIHByb3BlcnR5RGVmaW5lZCBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLnByb3BlcnR5RGVmaW5lZC5hcGkgPSBbJ25vdCddO1xuXG4gICAgLy8gaXMgYSBnaXZlbiBvYmplY3Qgd2luZG93P1xuICAgIC8vIHNldEludGVydmFsIG1ldGhvZCBpcyBvbmx5IGF2YWlsYWJsZSBmb3Igd2luZG93IG9iamVjdFxuICAgIGlzLndpbmRvd09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ3NldEludGVydmFsJyBpbiBvYmo7XG4gICAgfTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gb2JqZWN0IGEgRE9NIG5vZGU/XG4gICAgaXMuZG9tTm9kZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gaXMub2JqZWN0KG9iaikgJiYgb2JqLm5vZGVUeXBlID4gMDtcbiAgICB9O1xuXG4gICAgLy8gQXJyYXkgY2hlY2tzXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIC8vIGlzIGEgZ2l2ZW4gaXRlbSBpbiBhbiBhcnJheT9cbiAgICBpcy5pbkFycmF5ID0gZnVuY3Rpb24odmFsLCBhcnIpe1xuICAgICAgICBpZihpcy5ub3QuYXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPT09IHZhbCkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLy8gaW5BcnJheSBtZXRob2QgZG9lcyBub3Qgc3VwcG9ydCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlc1xuICAgIGlzLmluQXJyYXkuYXBpID0gWydub3QnXTtcblxuICAgIC8vIGlzIGEgZ2l2ZW4gYXJyYXkgc29ydGVkP1xuICAgIGlzLnNvcnRlZCA9IGZ1bmN0aW9uKGFycikge1xuICAgICAgICBpZihpcy5ub3QuYXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGFycltpXSA+IGFycltpICsgMV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLy8gQVBJXG4gICAgLy8gU2V0ICdub3QnLCAnYWxsJyBhbmQgJ2FueScgaW50ZXJmYWNlcyB0byBtZXRob2RzIGJhc2VkIG9uIHRoZWlyIGFwaSBwcm9wZXJ0eVxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICBmdW5jdGlvbiBzZXRJbnRlcmZhY2VzKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGlzO1xuICAgICAgICBmb3IodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZihoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIG9wdGlvbikgJiYgaXMuZnVuY3Rpb24ob3B0aW9uc1tvcHRpb25dKSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcmZhY2VzID0gb3B0aW9uc1tvcHRpb25dLmFwaSB8fCBbJ25vdCcsICdhbGwnLCAnYW55J107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcmZhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGludGVyZmFjZXNbaV0gPT09ICdub3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcy5ub3Rbb3B0aW9uXSA9IG5vdChpc1tvcHRpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihpbnRlcmZhY2VzW2ldID09PSAnYWxsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXMuYWxsW29wdGlvbl0gPSBhbGwoaXNbb3B0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoaW50ZXJmYWNlc1tpXSA9PT0gJ2FueScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzLmFueVtvcHRpb25dID0gYW55KGlzW29wdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldEludGVyZmFjZXMoKTtcblxuICAgIC8vIENvbmZpZ3VyYXRpb24gbWV0aG9kc1xuICAgIC8vIEludGVudGlvbmFsbHkgYWRkZWQgYWZ0ZXIgc2V0SW50ZXJmYWNlcyBmdW5jdGlvblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvLyBzZXQgb3B0aW9uYWwgcmVnZXhwcyB0byBtZXRob2RzIGlmIHlvdSB0aGluayB0aGV5IHN1Y2tcbiAgICBpcy5zZXRSZWdleHAgPSBmdW5jdGlvbihyZWdleHAsIHJlZ2V4cE5hbWUpIHtcbiAgICAgICAgZm9yKHZhciByIGluIHJlZ2V4cHMpIHtcbiAgICAgICAgICAgIGlmKGhhc093blByb3BlcnR5LmNhbGwocmVnZXhwcywgcikgJiYgKHJlZ2V4cE5hbWUgPT09IHIpKSB7XG4gICAgICAgICAgICAgICAgcmVnZXhwc1tyXSA9IHJlZ2V4cDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBjaGFuZ2UgbmFtZXNwYWNlIG9mIGxpYnJhcnkgdG8gcHJldmVudCBuYW1lIGNvbGxpc2lvbnNcbiAgICAvLyB2YXIgcHJlZmVycmVkTmFtZSA9IGlzLnNldE5hbWVzcGFjZSgpO1xuICAgIC8vIHByZWZlcnJlZE5hbWUub2RkKDMpO1xuICAgIC8vID0+IHRydWVcbiAgICBpcy5zZXROYW1lc3BhY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcm9vdC5pcyA9IHByZXZpb3VzSXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gaXM7XG59KSk7XG4iXX0=
