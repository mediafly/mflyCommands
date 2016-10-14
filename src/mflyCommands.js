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
function deleteCollection(id, shared) {
    if (shared === void 0) { shared = false; }
    return internalMethods_1.ddelete("collections/" + id + "?shared=" + shared);
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
var developmentPrefix = 'http://localhost:8000/';
var webPrefix = '/interactive-api/v5/';
exports.deviceTypes = {
    development: 'development',
    mobile: 'mobile',
    web: 'web',
    desktop: 'desktop'
};
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

},{}],8:[function(require,module,exports){
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
function InteractivesInterfaceIsDefined() {
    return typeof InteractivesInterface !== 'undefined';
}
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
    if (InteractivesInterfaceIsDefined()) {
        var result = InteractivesInterface.post(url, JSON.stringify(data));
        var resultJSON = JSON.parse(result);
        deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
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
    if (InteractivesInterfaceIsDefined()) {
        var result = InteractivesInterface.delete(url, JSON.stringify(data));
        var resultJSON = JSON.parse(result);
        deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
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
    if (InteractivesInterfaceIsDefined()) {
        var result = InteractivesInterface.put(url, JSON.stringify(data));
        var resultJSON = JSON.parse(result);
        deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
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

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/collections":4,"./commands/controls":6,"./commands/device":7,"./commands/downloader":8,"./commands/embed":9,"./commands/filter":10,"./commands/folder":11,"./commands/gpsCoordinates":12,"./commands/interactiveInfo":13,"./commands/item":15,"./commands/localKeyValueStorage":16,"./commands/navigation":17,"./commands/notification":18,"./commands/onlineStatus":19,"./commands/postAction":20,"./commands/postEvent":21,"./commands/search":22,"./commands/syncedKeyValueStorage":23,"./commands/systemInfo":24,"./commands/uploadUrl":25}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudGVtcC9jb21tYW5kcy9hY2NvdW50SW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2FwcEZlYXR1cmVzLmpzIiwiLnRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwiLnRlbXAvY29tbWFuZHMvY29sbGVjdGlvbnMuanMiLCIudGVtcC9jb21tYW5kcy9jb21tYW5kU3VwcG9ydC5qcyIsIi50ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwiLnRlbXAvY29tbWFuZHMvZGV2aWNlLmpzIiwiLnRlbXAvY29tbWFuZHMvZG93bmxvYWRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2VtYmVkLmpzIiwiLnRlbXAvY29tbWFuZHMvZmlsdGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZm9sZGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMuanMiLCIudGVtcC9jb21tYW5kcy9pbnRlcmFjdGl2ZUluZm8uanMiLCIudGVtcC9jb21tYW5kcy9pbnRlcm5hbE1ldGhvZHMuanMiLCIudGVtcC9jb21tYW5kcy9pdGVtLmpzIiwiLnRlbXAvY29tbWFuZHMvbG9jYWxLZXlWYWx1ZVN0b3JhZ2UuanMiLCIudGVtcC9jb21tYW5kcy9uYXZpZ2F0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvbm90aWZpY2F0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvb25saW5lU3RhdHVzLmpzIiwiLnRlbXAvY29tbWFuZHMvcG9zdEFjdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL3Bvc3RFdmVudC5qcyIsIi50ZW1wL2NvbW1hbmRzL3NlYXJjaC5qcyIsIi50ZW1wL2NvbW1hbmRzL3N5bmNlZEtleVZhbHVlU3RvcmFnZS5qcyIsIi50ZW1wL2NvbW1hbmRzL3N5c3RlbUluZm8uanMiLCIudGVtcC9jb21tYW5kcy91cGxvYWRVcmwuanMiLCIudGVtcC9tZmx5Q29tbWFuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdhY2NvdW50Jyk7XHJcbn1cclxuZXhwb3J0cy5nZXRVc2VySW5mbyA9IGdldFVzZXJJbmZvO1xyXG5mdW5jdGlvbiBsb2dvdXQoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvYWNjb3VudC9sb2dvdXQnO1xyXG59XHJcbmV4cG9ydHMubG9nb3V0ID0gbG9nb3V0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd1NldHRpbmdzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2FwcC1zZXR0aW5ncycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NldHRpbmdzID0gc2hvd1NldHRpbmdzO1xyXG5mdW5jdGlvbiBzaG93VXNlck1hbmFnZW1lbnQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgndXNlci1tYW5hZ2VtZW50JywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93VXNlck1hbmFnZW1lbnQgPSBzaG93VXNlck1hbmFnZW1lbnQ7XHJcbmZ1bmN0aW9uIHNob3dTZWNvbmRTY3JlZW5PcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHsgdWk6ICdzZWNvbmQtc2NyZWVuJyB9KTtcclxufVxyXG5leHBvcnRzLnNob3dTZWNvbmRTY3JlZW5PcHRpb25zID0gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnM7XHJcbmZ1bmN0aW9uIGVtYWlsKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9lbWFpbCcsIHsgaWQ6IGlkIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1haWwgPSBlbWFpbDtcclxuZnVuY3Rpb24gY29tcG9zZUVtYWlsKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2NvbXBvc2UtZW1haWwnLCBvcHRpb25zKTtcclxufVxyXG5leHBvcnRzLmNvbXBvc2VFbWFpbCA9IGNvbXBvc2VFbWFpbDtcclxuZnVuY3Rpb24gc2hvd0Fubm90YXRpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHsgdWk6ICdhbm5vdGF0aW9ucycgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93QW5ub3RhdGlvbnMgPSBzaG93QW5ub3RhdGlvbnM7XHJcbmZ1bmN0aW9uIHRha2VBbmRFbWFpbFNjcmVlbnNob3QoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9lbWFpbC1zY3JlZW5zaG90Jyk7XHJcbn1cclxuZXhwb3J0cy50YWtlQW5kRW1haWxTY3JlZW5zaG90ID0gdGFrZUFuZEVtYWlsU2NyZWVuc2hvdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnc3luYycpO1xyXG59XHJcbmV4cG9ydHMucmVmcmVzaCA9IHJlZnJlc2g7XHJcbmZ1bmN0aW9uIGdldFN5bmNTdGF0dXMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jJywgJ3N0YXR1cycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0U3luY1N0YXR1cyA9IGdldFN5bmNTdGF0dXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9ucygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2NvbGxlY3Rpb25zJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRDb2xsZWN0aW9ucyA9IGdldENvbGxlY3Rpb25zO1xyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiY29sbGVjdGlvbnMvXCIgKyBpZCwgJ2l0ZW1zJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRDb2xsZWN0aW9uID0gZ2V0Q29sbGVjdGlvbjtcclxuZnVuY3Rpb24gY3JlYXRlQ29sbGVjdGlvbihuYW1lKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29sbGVjdGlvbnMnLCB7IG5hbWU6IG5hbWUgfSk7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVDb2xsZWN0aW9uID0gY3JlYXRlQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gYWRkSXRlbVRvQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zXCIsIHsgaWRzOiBbaXRlbUlkXSB9KTtcclxufVxyXG5leHBvcnRzLmFkZEl0ZW1Ub0NvbGxlY3Rpb24gPSBhZGRJdGVtVG9Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb24oY29sbGVjdGlvbklkLCBpdGVtSWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiY29sbGVjdGlvbnMvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9pdGVtcy9cIiArIGl0ZW1JZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb24gPSByZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIGRlbGV0ZUNvbGxlY3Rpb24oaWQsIHNoYXJlZCkge1xyXG4gICAgaWYgKHNoYXJlZCA9PT0gdm9pZCAwKSB7IHNoYXJlZCA9IGZhbHNlOyB9XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImNvbGxlY3Rpb25zL1wiICsgaWQgKyBcIj9zaGFyZWQ9XCIgKyBzaGFyZWQpO1xyXG59XHJcbmV4cG9ydHMuZGVsZXRlQ29sbGVjdGlvbiA9IGRlbGV0ZUNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkLCBwb3NpdGlvbikge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnB1dChcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXMvXCIgKyBpdGVtSWQgKyBcIi9vcmRlcj9wb3NpdGlvbj1cIiArIHBvc2l0aW9uKTtcclxufVxyXG5leHBvcnRzLnJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uID0gcmVvcmRlckl0ZW1JbkNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlbmFtZUNvbGxlY3Rpb24oaWQsIG5hbWUpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGlkLCB7IG5hbWU6IG5hbWUgfSk7XHJcbn1cclxuZXhwb3J0cy5yZW5hbWVDb2xsZWN0aW9uID0gcmVuYW1lQ29sbGVjdGlvbjtcclxuLy8gVUkgTWV0aG9kc1xyXG5mdW5jdGlvbiBzaG93Q29sbGVjdGlvbnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnY29sbGVjdGlvbnMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dDb2xsZWN0aW9ucyA9IHNob3dDb2xsZWN0aW9ucztcclxuZnVuY3Rpb24gc2hvd0FkZFRvQ29sbGVjdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdhZGQtdG8tY29sbGVjdGlvbicsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd0FkZFRvQ29sbGVjdGlvbiA9IHNob3dBZGRUb0NvbGxlY3Rpb247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBpc1Vuc3VwcG9ydGVkKHVybCkge1xyXG4gICAgaWYgKCFkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHVuc3VwcG9ydGVkU3RhdGVtZW50cyA9IFtcclxuICAgICAgICAnL2NvbnRyb2wvJyxcclxuICAgICAgICAnL2Rvd25sb2FkcycsXHJcbiAgICAgICAgJy9vbmxpbmUtc3RhdHVzJyxcclxuICAgICAgICAnL3N5c3RlbS9ncHMnXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHVuc3VwcG9ydGVkU3RhdGVtZW50cy5zb21lKGZ1bmN0aW9uIChzdGF0ZW1lbnQpIHsgcmV0dXJuIHVybC5pbmRleE9mKHN0YXRlbWVudCkgPiAtMTsgfSk7XHJcbn1cclxuZXhwb3J0cy5pc1Vuc3VwcG9ydGVkID0gaXNVbnN1cHBvcnRlZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNob3dDb250cm9sQmFycygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7XHJcbiAgICAgICAgdWk6ICdjb250cm9sLWJhcicsXHJcbiAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93Q29udHJvbEJhcnMgPSBzaG93Q29udHJvbEJhcnM7XHJcbmZ1bmN0aW9uIGhpZGVDb250cm9sQmFycyh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiAnY29udHJvbC1iYXInLFxyXG4gICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmhpZGVDb250cm9sQmFycyA9IGhpZGVDb250cm9sQmFycztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBkZXZlbG9wbWVudFByZWZpeCA9ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvJztcclxudmFyIHdlYlByZWZpeCA9ICcvaW50ZXJhY3RpdmUtYXBpL3Y1Lyc7XHJcbmV4cG9ydHMuZGV2aWNlVHlwZXMgPSB7XHJcbiAgICBkZXZlbG9wbWVudDogJ2RldmVsb3BtZW50JyxcclxuICAgIG1vYmlsZTogJ21vYmlsZScsXHJcbiAgICB3ZWI6ICd3ZWInLFxyXG4gICAgZGVza3RvcDogJ2Rlc2t0b3AnXHJcbn07XHJcbmZ1bmN0aW9uIGlzV2luZG93czgoKSB7XHJcbiAgICB2YXIgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwibXNpZVwiKSAhPT0gLTEpIHtcclxuICAgICAgICBpZiAodXNlckFnZW50LmluZGV4T2YoXCJ3ZWJ2aWV3XCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0cy5pc1dpbmRvd3M4ID0gaXNXaW5kb3dzODtcclxuZnVuY3Rpb24gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudCgpIHtcclxuICAgIHJldHVybiAod2luZG93LmxvY2F0aW9uLmhvc3QuaW5kZXhPZignbG9jYWxob3N0OjgwMDAnKSA+IC0xKTtcclxufVxyXG5leHBvcnRzLmlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQgPSBpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50O1xyXG5mdW5jdGlvbiBnZXREZXZpY2VUeXBlKCkge1xyXG4gICAgaWYgKGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSkge1xyXG4gICAgICAgIHJldHVybiBleHBvcnRzLmRldmljZVR5cGVzLmRldmVsb3BtZW50O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGRldmljZVR5cGVDb29raWUgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKS5maWx0ZXIoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc3BsaXQoJz0nKVswXS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PT0gJ2RldmljZXR5cGUnOyB9KTtcclxuICAgICAgICBpZiAoZGV2aWNlVHlwZUNvb2tpZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZXZpY2VUeXBlQ29va2llWzBdLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5tb2JpbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0RGV2aWNlVHlwZSA9IGdldERldmljZVR5cGU7XHJcbmV4cG9ydHMuaXNXZWIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXREZXZpY2VUeXBlKCkgPT09IGV4cG9ydHMuZGV2aWNlVHlwZXMud2ViOyB9O1xyXG5mdW5jdGlvbiBnZXRQcmVmaXgoKSB7XHJcbiAgICB2YXIgZGV2aWNlVHlwZSA9IGdldERldmljZVR5cGUoKTtcclxuICAgIHN3aXRjaCAoZGV2aWNlVHlwZSkge1xyXG4gICAgICAgIGNhc2UgZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDpcclxuICAgICAgICAgICAgcmV0dXJuIGRldmVsb3BtZW50UHJlZml4O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiB3ZWJQcmVmaXg7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRQcmVmaXggPSBnZXRQcmVmaXg7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93RG93bmxvYWRlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdkb3dubG9hZHMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dEb3dubG9hZGVyID0gc2hvd0Rvd25sb2FkZXI7XHJcbmZ1bmN0aW9uIGdldERvd25sb2FkU3RhdHVzKGlkKSB7XHJcbiAgICByZXR1cm4gaWQgPyBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJkb3dubG9hZHMvXCIgKyBpZCArIFwiL3N0YXR1c1wiKSA6IGludGVybmFsTWV0aG9kc18xLmdldCgnZG93bmxvYWRzL3N0YXR1cycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0RG93bmxvYWRTdGF0dXMgPSBnZXREb3dubG9hZFN0YXR1cztcclxuZnVuY3Rpb24gYWRkVG9Eb3dubG9hZGVyKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnZG93bmxvYWRzJywgeyBpZHM6IFtpZF0gfSk7XHJcbn1cclxuZXhwb3J0cy5hZGRUb0Rvd25sb2FkZXIgPSBhZGRUb0Rvd25sb2FkZXI7XHJcbmZ1bmN0aW9uIHJlbW92ZUZyb21Eb3dubG9hZGVyKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImRvd25sb2Fkcy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUZyb21Eb3dubG9hZGVyID0gcmVtb3ZlRnJvbURvd25sb2FkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XHJcbmZ1bmN0aW9uIGVtYmVkKGVsZW1lbnQsIGlkLCBwYWdlKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHZhciBwYWdlQXJnID0gcGFnZSA/IFwiP3BhZ2U9XCIgKyBwYWdlIDogJyc7XHJcbiAgICAgICAgZWxlbWVudC5hdHRyKCdzcmMnLCBpLnJlc291cmNlVXJsICsgcGFnZUFyZyk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmVtYmVkID0gZW1iZWQ7XHJcbmZ1bmN0aW9uIGVtYmVkSW1hZ2UoZWxlbWVudCwgaWQsIG9wdGlvbnMpIHtcclxuICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHBhcmFtcyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiAncG9zaXRpb24nLCB2YWx1ZTogb3B0aW9ucy5wYWdlIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3NpemUnLCB2YWx1ZTogb3B0aW9ucy5zaXplIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3dpZHRoJywgdmFsdWU6IG9wdGlvbnMud2lkdGggfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnaGVpZ2h0JywgdmFsdWU6IG9wdGlvbnMuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heFdpZHRoJywgdmFsdWU6IG9wdGlvbnMubWF4V2lkdGggfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4SGVpZ2h0JywgdmFsdWU6IG9wdGlvbnMubWF4SGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3JvdGF0ZScsIHZhbHVlOiBvcHRpb25zLnJvdGF0ZSB9LFxyXG4gICAgICAgIF0uZmlsdGVyKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIXgudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgdXJsID0gaS5yZXNvdXJjZVVybDtcclxuICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdXJsICs9ICc/JyArICQucGFyYW0ocGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudC5hdHRyKCdzcmMnLCB1cmwpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWJlZEltYWdlID0gZW1iZWRJbWFnZTtcclxuZnVuY3Rpb24gZ2V0RGF0YShpZCkge1xyXG4gICAgcmV0dXJuIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgcmV0dXJuICQuZ2V0KGkucmVzb3VyY2VVcmwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5nZXREYXRhID0gZ2V0RGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIG9ialRvU3RyaW5nKG9iaikge1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0ga2V5ICsgJzonICsgb2JqW2tleV0gKyAnLCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnNsaWNlKDAsIHJlc3VsdC5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZnVuY3Rpb24gZmlsdGVyKG9iaikge1xyXG4gICAgdmFyIERlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICB2YXIgbGltaXQgPSAxMDA7XHJcbiAgICB2YXIgZ2V0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZmlsdGVyID0gZW5jb2RlVVJJQ29tcG9uZW50KG9ialRvU3RyaW5nKG9iaikpO1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpdGVtcz9maWx0ZXI9XCIgKyBmaWx0ZXIgKyBcIiZvZmZzZXQ9XCIgKyBvZmZzZXQgKyBcIiZsaW1pdD1cIiArIGxpbWl0KVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBsaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgRGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGxpbWl0O1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIERlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGdldFBhZ2UoKTtcclxuICAgIHJldHVybiBEZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBmaWx0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRGb2xkZXIoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQgKyBcIi9pdGVtc1wiKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEZvbGRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEdwc0Nvb3JkaW5hdGVzKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgJ2dwcycpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0R3BzQ29vcmRpbmF0ZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRJbnRlcmFjdGl2ZUluZm8oKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpbnRlcmFjdGl2ZScpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0SW50ZXJhY3RpdmVJbmZvO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbnZhciBjb21tYW5kU3VwcG9ydF8xID0gcmVxdWlyZSgnLi9jb21tYW5kU3VwcG9ydCcpO1xyXG5mdW5jdGlvbiBJbnRlcmFjdGl2ZXNJbnRlcmZhY2VJc0RlZmluZWQoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIEludGVyYWN0aXZlc0ludGVyZmFjZSAhPT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuZnVuY3Rpb24gZ2V0KGZ1bmMsIHBhcmFtLCBleHBlY3RKc29uKSB7XHJcbiAgICBpZiAocGFyYW0gPT09IHZvaWQgMCkgeyBwYXJhbSA9IG51bGw7IH1cclxuICAgIGlmIChleHBlY3RKc29uID09PSB2b2lkIDApIHsgZXhwZWN0SnNvbiA9IHRydWU7IH1cclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYyArIChwYXJhbSA9PT0gbnVsbCA/ICcnIDogJy8nICsgcGFyYW0pO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgcmV0cmlldmVkLiBUcmFuc2Zvcm0gdG8gSlNPTiBpZiBzdXBwb3NlZCB0by5cclxuICAgICAgICAgICAgaWYgKGV4cGVjdEpzb24gJiYgcmVxdWVzdCAmJiByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpLmluZGV4T2YoXCJ0ZXh0L2h0bWxcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3YXMgc2VudCBiYWNrIGFzIHRleHQvaHRtbCBKU09OLnBhcnNlIGl0IHRvIGEgSlNPTiBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgY291bGQgbm90IGJlIHJldHJpZXZlZC4gUmVqZWN0IHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5nZXQgPSBnZXQ7XHJcbmZ1bmN0aW9uIHBvc3QoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdEpTT04gPSBKU09OLnBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5wb3N0ID0gcG9zdDtcclxuZnVuY3Rpb24gZGRlbGV0ZShmdW5jLCBkYXRhKSB7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgIGlmIChJbnRlcmFjdGl2ZXNJbnRlcmZhY2VJc0RlZmluZWQoKSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBJbnRlcmFjdGl2ZXNJbnRlcmZhY2UuZGVsZXRlKHVybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHZhciByZXN1bHRKU09OID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRKU09OLmRhdGEsIHJlc3VsdEpTT04uc3RhdHVzXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5kZGVsZXRlID0gZGRlbGV0ZTtcclxuZnVuY3Rpb24gcHV0KGZ1bmMsIGRhdGEpIHtcclxuICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cclxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYztcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IEludGVyYWN0aXZlc0ludGVyZmFjZS5wdXQodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdEpTT04gPSBKU09OLnBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucHV0ID0gcHV0O1xyXG5mdW5jdGlvbiBzaG93VUkobmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogbmFtZSxcclxuICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93VUkgPSBzaG93VUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRJdGVtKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkKTtcclxufVxyXG5leHBvcnRzLmdldEl0ZW0gPSBnZXRJdGVtO1xyXG5mdW5jdGlvbiBnZXRDdXJyZW50SXRlbSgpIHtcclxuICAgIHJldHVybiBnZXRJdGVtKCdfX3NlbGZfXycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q3VycmVudEl0ZW0gPSBnZXRDdXJyZW50SXRlbTtcclxuZnVuY3Rpb24gZ2V0U2hhcmUoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQgKyAnL3NoYXJlJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTaGFyZSA9IGdldFNoYXJlO1xyXG5mdW5jdGlvbiBnZXRMYXN0Vmlld2VkQ29udGVudCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgJz9saXN0PWxhc3Qtdmlld2VkJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRMYXN0Vmlld2VkQ29udGVudCA9IGdldExhc3RWaWV3ZWRDb250ZW50O1xyXG5mdW5jdGlvbiBnZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9cmVjZW50bHktY3JlYXRlZCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudCA9IGdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGwgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0c3dpdGggcHJlZml4XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFtrZXldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW2FsbCwgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgdmFyIGFsbCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuKGFsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpbmZvJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0VmFsdWVzKHByZWZpeCkge1xyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgIC8vIEdldCB2YWx1ZXMgd2l0aCBzcGVjaWZpZWQgcHJlZml4XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXRBbGxWYWx1ZXMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFZhbHVlcyA9IGdldFZhbHVlcztcclxuZnVuY3Rpb24gZ2V0VmFsdWUoa2V5KSB7XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW3ZhbHVlLCAyMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRmZC5yZWplY3RXaXRoKHRoaXMsIFt2YWx1ZSwgNDA0XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpbmZvXCIsIGtleSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0VmFsdWUgPSBnZXRWYWx1ZTtcclxuZnVuY3Rpb24gcHV0VmFsdWUoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiaW5mb1wiLCBbeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH1dKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnB1dFZhbHVlID0gcHV0VmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZUtleShrZXkpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiaW5mby9cIiArIGtleSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWxldGVLZXkgPSBkZWxldGVLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbmZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL2JhY2snO1xyXG59XHJcbmV4cG9ydHMuY2xvc2UgPSBjbG9zZTtcclxuZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9uZXh0JztcclxufVxyXG5leHBvcnRzLm5leHQgPSBuZXh0O1xyXG5mdW5jdGlvbiBwcmV2aW91cygpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9wcmV2aW91cyc7XHJcbn1cclxuZXhwb3J0cy5wcmV2aW91cyA9IHByZXZpb3VzO1xyXG5mdW5jdGlvbiBvcGVuSXRlbShpZCwgYm9va21hcmspIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciB1cmwgPSBpdGVtLnVybDtcclxuICAgICAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ3JldHVybnVybCddID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rbWFyaykge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ2Jvb2ttYXJrJ10gPSBib29rbWFyaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgJC5wYXJhbShwYXJhbXMpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5JdGVtID0gb3Blbkl0ZW07XHJcbmV4cG9ydHMub3BlbiA9IG9wZW5JdGVtO1xyXG5mdW5jdGlvbiBvcGVuRm9sZGVyKGlkKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXRlbS51cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5Gb2xkZXIgPSBvcGVuRm9sZGVyO1xyXG5mdW5jdGlvbiBnb3RvKCkge1xyXG4gICAgY29uc29sZS5lcnJvcignZ290byBtZXRob2QgaXMgbm93IGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugb3Blbkl0ZW0gZ29pbmcgZm9yd2FyZC4nKTtcclxufVxyXG5leHBvcnRzLmdvdG8gPSBnb3RvO1xyXG5mdW5jdGlvbiBicm93c2UoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdicm93c2UgbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XHJcbn1cclxuZXhwb3J0cy5icm93c2UgPSBicm93c2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBhZGROb3RpZmljYXRpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwibm90aWZpY2F0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmFkZE5vdGlmaWNhdGlvbiA9IGFkZE5vdGlmaWNhdGlvbjtcclxuZnVuY3Rpb24gcmVtb3ZlTm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVOb3RpZmljYXRpb24gPSByZW1vdmVOb3RpZmljYXRpb247XHJcbmZ1bmN0aW9uIGdldE5vdGlmaWNhdGlvblN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5nZXROb3RpZmljYXRpb25TdGF0dXMgPSBnZXROb3RpZmljYXRpb25TdGF0dXM7XHJcbmZ1bmN0aW9uIHNob3dOb3RpZmljYXRpb25NYW5hZ2VyKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ25vdGlmaWNhdGlvbnMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dOb3RpZmljYXRpb25NYW5hZ2VyID0gc2hvd05vdGlmaWNhdGlvbk1hbmFnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRPbmxpbmVTdGF0dXMoYXJndW1lbnQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdvbmxpbmUtc3RhdHVzJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRPbmxpbmVTdGF0dXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBwb3N0QWN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdhY3Rpb25zJywgb3B0aW9ucyk7XHJcbn1cclxuZXhwb3J0cy5wb3N0QWN0aW9uID0gcG9zdEFjdGlvbjtcclxuZnVuY3Rpb24gcG9zdFBhZ2VWaWV3KGlkLCBwYWdlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIHtcclxuICAgICAgICB0eXBlOiAnZG9jdW1lbnQnLFxyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICBwYWdlOiBwYWdlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnBvc3RQYWdlVmlldyA9IHBvc3RQYWdlVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHBvc3RFdmVudChrZXksIHByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiZXZlbnRzXCIsIHsga2V5OiBrZXksIHByb3BlcnRpZXM6IEpTT04uc3RyaW5naWZ5KHByb3BlcnRpZXMpIH0pO1xyXG59XHJcbmV4cG9ydHMucG9zdEV2ZW50ID0gcG9zdEV2ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2VhcmNoKHRlcm0sIG9mZnNldCwgbGltaXQpIHtcclxuICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSAwOyB9XHJcbiAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDEwMDsgfVxyXG4gICAgdmFyIGRmZDEgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgIHRlcm06IHRlcm0sXHJcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgICAgbGltaXQ6IGxpbWl0XHJcbiAgICB9O1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHFzID0gJC5wYXJhbShvYmopO1xyXG4gICAgICAgIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXM/JyArIHFzKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBvYmoubGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGRmZDEucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLm9mZnNldCArPSBvYmoubGltaXQ7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGZkMS5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gZGZkMS5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5zZWFyY2ggPSBzZWFyY2g7XHJcbmZ1bmN0aW9uIHNob3dTZWFyY2goeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnc2VhcmNoJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2VhcmNoID0gc2hvd1NlYXJjaDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwic3luY2VkaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nKTtcclxufVxyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZXMocHJlZml4KSB7XHJcbiAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgLy8gR2V0IHZhbHVlcyB3aXRoIHNwZWNpZmllZCBwcmVmaXhcclxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0U3luY2VkVmFsdWVzID0gZ2V0U3luY2VkVmFsdWVzO1xyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZShrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nLCBrZXksIGZhbHNlKTtcclxufVxyXG5leHBvcnRzLmdldFN5bmNlZFZhbHVlID0gZ2V0U3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIHNhdmVTeW5jZWRWYWx1ZShrZXksIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcInN5bmNlZGluZm9cIiwgW3sga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9XSk7XHJcbn1cclxuZXhwb3J0cy5zYXZlU3luY2VkVmFsdWUgPSBzYXZlU3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZVN5bmNlZEtleShrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwic3luY2VkaW5mb1wiLCBba2V5XSk7XHJcbn1cclxuZXhwb3J0cy5kZWxldGVTeW5jZWRLZXkgPSBkZWxldGVTeW5jZWRLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRTeXN0ZW1JbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRTeXN0ZW1JbmZvO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VXBsb2FkVXJsKGtleSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgXCJ1cGxvYWR1cmw/a2V5PVwiICsga2V5KTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVwbG9hZFVybDtcclxuIiwiLyoqXHJcbiAqIChjKSAyMDEzLTIwMTYsIE1lZGlhZmx5LCBJbmMuXHJcbiAqIG1mbHlDb21tYW5kcyBpcyBhIHNpbmdsZXRvbiBpbnN0YW5jZSB3aGljaCB3cmFwcyBjb21tb24gbWZseSBjYWxscyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXHJcbiAqIEJlZm9yZSB1c2UsIHBsZWFzZSBiZSBzdXJlIHRvIGNhbGwgc2V0UHJlZml4IGlmIHlvdSBhcmUgd29ya2luZyBvbiBhIGRldmVsb3BtZW50IHBsYXRmb3JtIChlLmcuXHJcbiAqIGEgbG9jYWwgd2Vic2VydmVyIG9uIGEgUEMpIGZvciBleGFtcGxlLCBodHRwOi8vbG9jYWxob3N0OjgwMDAvIC5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJhY3RpdmVJbmZvXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mbycpO1xyXG52YXIgc3lzdGVtSW5mb18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeXN0ZW1JbmZvJyk7XHJcbnZhciBvbmxpbmVTdGF0dXNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvb25saW5lU3RhdHVzJyk7XHJcbnZhciB1cGxvYWRVcmxfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvdXBsb2FkVXJsJyk7XHJcbnZhciBpdGVtID0gcmVxdWlyZSgnLi9jb21tYW5kcy9pdGVtJyk7XHJcbnZhciBjb2xsZWN0aW9ucyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvY29sbGVjdGlvbnMnKTtcclxudmFyIGZvbGRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9mb2xkZXInKTtcclxudmFyIGZpbHRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9maWx0ZXInKTtcclxudmFyIGdwc0Nvb3JkaW5hdGVzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2dwc0Nvb3JkaW5hdGVzJyk7XHJcbnZhciBzZWFyY2hfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc2VhcmNoJyk7XHJcbnZhciBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL25hdmlnYXRpb24nKTtcclxudmFyIGRvd25sb2FkZXIgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2Rvd25sb2FkZXInKTtcclxudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbm90aWZpY2F0aW9uJyk7XHJcbnZhciBhY2NvdW50SW5mbyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYWNjb3VudEluZm8nKTtcclxudmFyIGxvY2FsS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9sb2NhbEtleVZhbHVlU3RvcmFnZScpO1xyXG52YXIgc3luY2VkS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UnKTtcclxudmFyIGFwcGxpY2F0aW9uU3luYyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwbGljYXRpb25TeW5jJyk7XHJcbnZhciBuYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9jb21tYW5kcy9uYXZpZ2F0aW9uJyk7XHJcbnZhciBhcHBGZWF0dXJlcyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwRmVhdHVyZXMnKTtcclxudmFyIGNvbnRyb2xzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NvbnRyb2xzJyk7XHJcbnZhciBlbWJlZF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9lbWJlZCcpO1xyXG52YXIgcG9zdEFjdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9wb3N0QWN0aW9uJyk7XHJcbnZhciBwb3N0RXZlbnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvcG9zdEV2ZW50Jyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZGV2aWNlJyk7XHJcbnZhciBtZmx5Q29tbWFuZHMgPSB7XHJcbiAgICBjbG9zZTogbmF2aWdhdGlvbl8xLmNsb3NlLFxyXG4gICAgZ2V0SW50ZXJhY3RpdmVJbmZvOiBpbnRlcmFjdGl2ZUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0U3lzdGVtSW5mbzogc3lzdGVtSW5mb18xLmRlZmF1bHQsXHJcbiAgICBnZXRPbmxpbmVTdGF0dXM6IG9ubGluZVN0YXR1c18xLmRlZmF1bHQsXHJcbiAgICBnZXRHcHNDb29yZGluYXRlczogZ3BzQ29vcmRpbmF0ZXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0VXBsb2FkVXJsOiB1cGxvYWRVcmxfMS5kZWZhdWx0LFxyXG4gICAgZ2V0Rm9sZGVyOiBmb2xkZXJfMS5kZWZhdWx0LFxyXG4gICAgZmlsdGVyOiBmaWx0ZXJfMS5kZWZhdWx0LFxyXG4gICAgc2VhcmNoOiBzZWFyY2hfMS5zZWFyY2gsXHJcbiAgICBzaG93U2VhcmNoOiBzZWFyY2hfMS5zaG93U2VhcmNoLFxyXG4gICAgaGlkZUNvbnRyb2xCYXJzOiBjb250cm9sc18xLmhpZGVDb250cm9sQmFycyxcclxuICAgIHNob3dDb250cm9sQmFyczogY29udHJvbHNfMS5zaG93Q29udHJvbEJhcnMsXHJcbiAgICBlbWJlZDogZW1iZWRfMS5lbWJlZCxcclxuICAgIGVtYmVkSW1hZ2U6IGVtYmVkXzEuZW1iZWRJbWFnZSxcclxuICAgIGdldERhdGE6IGVtYmVkXzEuZ2V0RGF0YSxcclxuICAgIGdldERldmljZVR5cGU6IGRldmljZV8xLmdldERldmljZVR5cGUsXHJcbiAgICBnZXRQcmVmaXg6IGRldmljZV8xLmdldFByZWZpeCxcclxuICAgIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQ6IGRldmljZV8xLmlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQsXHJcbiAgICBpc1dpbmRvd3M4OiBkZXZpY2VfMS5pc1dpbmRvd3M4LFxyXG4gICAgcG9zdEFjdGlvbjogcG9zdEFjdGlvbl8xLnBvc3RBY3Rpb24sXHJcbiAgICBwb3N0UGFnZVZpZXc6IHBvc3RBY3Rpb25fMS5wb3N0UGFnZVZpZXcsXHJcbiAgICBwb3N0RXZlbnQ6IHBvc3RFdmVudF8xLnBvc3RFdmVudFxyXG59O1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGl0ZW0pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGNvbGxlY3Rpb25zKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBub3RpZmljYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFjY291bnRJbmZvKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgc3luY2VkS2V5VmFsdWVTdG9yYWdlKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBsaWNhdGlvblN5bmMpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcEZlYXR1cmVzKTtcclxubW9kdWxlLmV4cG9ydHMgPSBtZmx5Q29tbWFuZHM7XHJcbiJdfQ==
