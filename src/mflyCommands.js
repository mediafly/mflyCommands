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
    return internalMethods_1.post('downloads/status', { ids: [id] });
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
    internalMethods_1.get('items', id).then(function (i) { return element.src = i.resourceUrl; });
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
function ddelete(func, data) {
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZW1wL2NvbW1hbmRzL2FjY291bnRJbmZvLmpzIiwidGVtcC9jb21tYW5kcy9hcHBGZWF0dXJlcy5qcyIsInRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwidGVtcC9jb21tYW5kcy9jb2xsZWN0aW9ucy5qcyIsInRlbXAvY29tbWFuZHMvY29tbWFuZFN1cHBvcnQuanMiLCJ0ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwidGVtcC9jb21tYW5kcy9kZXZpY2UuanMiLCJ0ZW1wL2NvbW1hbmRzL2Rvd25sb2FkZXIuanMiLCJ0ZW1wL2NvbW1hbmRzL2VtYmVkLmpzIiwidGVtcC9jb21tYW5kcy9maWx0ZXIuanMiLCJ0ZW1wL2NvbW1hbmRzL2ZvbGRlci5qcyIsInRlbXAvY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMuanMiLCJ0ZW1wL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mby5qcyIsInRlbXAvY29tbWFuZHMvaW50ZXJuYWxNZXRob2RzLmpzIiwidGVtcC9jb21tYW5kcy9pdGVtLmpzIiwidGVtcC9jb21tYW5kcy9sb2NhbEtleVZhbHVlU3RvcmFnZS5qcyIsInRlbXAvY29tbWFuZHMvbmF2aWdhdGlvbi5qcyIsInRlbXAvY29tbWFuZHMvbm90aWZpY2F0aW9uLmpzIiwidGVtcC9jb21tYW5kcy9vbmxpbmVTdGF0dXMuanMiLCJ0ZW1wL2NvbW1hbmRzL3Bvc3RBY3Rpb24uanMiLCJ0ZW1wL2NvbW1hbmRzL3Bvc3RFdmVudC5qcyIsInRlbXAvY29tbWFuZHMvc2VhcmNoLmpzIiwidGVtcC9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UuanMiLCJ0ZW1wL2NvbW1hbmRzL3N5c3RlbUluZm8uanMiLCJ0ZW1wL2NvbW1hbmRzL3VwbG9hZFVybC5qcyIsInRlbXAvbWZseUNvbW1hbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2FjY291bnQnKTtcclxufVxyXG5leHBvcnRzLmdldFVzZXJJbmZvID0gZ2V0VXNlckluZm87XHJcbmZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9hY2NvdW50L2xvZ291dCc7XHJcbn1cclxuZXhwb3J0cy5sb2dvdXQgPSBsb2dvdXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93U2V0dGluZ3MoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYXBwLXNldHRpbmdzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2V0dGluZ3MgPSBzaG93U2V0dGluZ3M7XHJcbmZ1bmN0aW9uIHNob3dVc2VyTWFuYWdlbWVudCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCd1c2VyLW1hbmFnZW1lbnQnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dVc2VyTWFuYWdlbWVudCA9IHNob3dVc2VyTWFuYWdlbWVudDtcclxuZnVuY3Rpb24gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ3NlY29uZC1zY3JlZW4nIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMgPSBzaG93U2Vjb25kU2NyZWVuT3B0aW9ucztcclxuZnVuY3Rpb24gZW1haWwoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsJywgeyBpZDogaWQgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWFpbCA9IGVtYWlsO1xyXG5mdW5jdGlvbiBjb21wb3NlRW1haWwob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvY29tcG9zZS1lbWFpbCcsIG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMuY29tcG9zZUVtYWlsID0gY29tcG9zZUVtYWlsO1xyXG5mdW5jdGlvbiBzaG93QW5ub3RhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ2Fubm90YXRpb25zJyB9KTtcclxufVxyXG5leHBvcnRzLnNob3dBbm5vdGF0aW9ucyA9IHNob3dBbm5vdGF0aW9ucztcclxuZnVuY3Rpb24gdGFrZUFuZEVtYWlsU2NyZWVuc2hvdCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsLXNjcmVlbnNob3QnKTtcclxufVxyXG5leHBvcnRzLnRha2VBbmRFbWFpbFNjcmVlbnNob3QgPSB0YWtlQW5kRW1haWxTY3JlZW5zaG90O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdzeW5jJyk7XHJcbn1cclxuZXhwb3J0cy5yZWZyZXNoID0gcmVmcmVzaDtcclxuZnVuY3Rpb24gZ2V0U3luY1N0YXR1cygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmMnLCAnc3RhdHVzJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jU3RhdHVzID0gZ2V0U3luY1N0YXR1cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnY29sbGVjdGlvbnMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb25zID0gZ2V0Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJjb2xsZWN0aW9ucy9cIiArIGlkLCAnaXRlbXMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb24gPSBnZXRDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBjcmVhdGVDb2xsZWN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb2xsZWN0aW9ucycsIHsgbmFtZTogbmFtZSB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNvbGxlY3Rpb24gPSBjcmVhdGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBhZGRJdGVtVG9Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXNcIiwgeyBpZHM6IFtpdGVtSWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkSXRlbVRvQ29sbGVjdGlvbiA9IGFkZEl0ZW1Ub0NvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbiA9IHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gZGVsZXRlQ29sbGVjdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmRlbGV0ZUNvbGxlY3Rpb24gPSBkZWxldGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW9yZGVySXRlbUluQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCwgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkICsgXCIvb3JkZXI/cG9zaXRpb249XCIgKyBwb3NpdGlvbik7XHJcbn1cclxuZXhwb3J0cy5yZW9yZGVySXRlbUluQ29sbGVjdGlvbiA9IHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW5hbWVDb2xsZWN0aW9uKGlkLCBuYW1lKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucHV0KFwiY29sbGVjdGlvbnMvXCIgKyBpZCwgeyBuYW1lOiBuYW1lIH0pO1xyXG59XHJcbmV4cG9ydHMucmVuYW1lQ29sbGVjdGlvbiA9IHJlbmFtZUNvbGxlY3Rpb247XHJcbi8vIFVJIE1ldGhvZHNcclxuZnVuY3Rpb24gc2hvd0NvbGxlY3Rpb25zKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2NvbGxlY3Rpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93Q29sbGVjdGlvbnMgPSBzaG93Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIHNob3dBZGRUb0NvbGxlY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYWRkLXRvLWNvbGxlY3Rpb24nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dBZGRUb0NvbGxlY3Rpb24gPSBzaG93QWRkVG9Db2xsZWN0aW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gaXNVbnN1cHBvcnRlZCh1cmwpIHtcclxuICAgIGlmICghZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciB1bnN1cHBvcnRlZFN0YXRlbWVudHMgPSBbXHJcbiAgICAgICAgJy9jb250cm9sLycsXHJcbiAgICAgICAgJy9kb3dubG9hZHMnLFxyXG4gICAgICAgICcvb25saW5lLXN0YXR1cycsXHJcbiAgICAgICAgJy9zeXN0ZW0vZ3BzJ1xyXG4gICAgXTtcclxuICAgIHJldHVybiB1bnN1cHBvcnRlZFN0YXRlbWVudHMuc29tZShmdW5jdGlvbiAoc3RhdGVtZW50KSB7IHJldHVybiB1cmwuaW5kZXhPZihzdGF0ZW1lbnQpID4gLTE7IH0pO1xyXG59XHJcbmV4cG9ydHMuaXNVbnN1cHBvcnRlZCA9IGlzVW5zdXBwb3J0ZWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93Q29udHJvbEJhcnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiAnY29udHJvbC1iYXInLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd0NvbnRyb2xCYXJzID0gc2hvd0NvbnRyb2xCYXJzO1xyXG5mdW5jdGlvbiBoaWRlQ29udHJvbEJhcnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogJ2NvbnRyb2wtYmFyJyxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udHJvbEJhcnMgPSBoaWRlQ29udHJvbEJhcnM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2ZWxvcG1lbnRQcmVmaXggPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XHJcbnZhciB3ZWJQcmVmaXggPSAnL2ludGVyYWN0aXZlLWFwaS92NS8nO1xyXG5leHBvcnRzLmRldmljZVR5cGVzID0ge1xyXG4gICAgZGV2ZWxvcG1lbnQ6ICdkZXZlbG9wbWVudCcsXHJcbiAgICBtb2JpbGU6ICdtb2JpbGUnLFxyXG4gICAgd2ViOiAnd2ViJyxcclxuICAgIGRlc2t0b3A6ICdkZXNrdG9wJ1xyXG59O1xyXG5mdW5jdGlvbiBpc1dpbmRvd3M4KCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIm1zaWVcIikgIT09IC0xKSB7XHJcbiAgICAgICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwid2Vidmlld1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNXaW5kb3dzOCA9IGlzV2luZG93czg7XHJcbmZ1bmN0aW9uIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSB7XHJcbiAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdDo4MDAwJykgPiAtMSk7XHJcbn1cclxuZXhwb3J0cy5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50ID0gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudDtcclxuZnVuY3Rpb24gZ2V0RGV2aWNlVHlwZSgpIHtcclxuICAgIGlmIChpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50KCkpIHtcclxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkZXZpY2VUeXBlQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNwbGl0KCc9JylbMF0udG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdkZXZpY2V0eXBlJzsgfSk7XHJcbiAgICAgICAgaWYgKGRldmljZVR5cGVDb29raWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlVHlwZUNvb2tpZVswXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGV2aWNlVHlwZXMubW9iaWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldERldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlO1xyXG5leHBvcnRzLmlzV2ViID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0RGV2aWNlVHlwZSgpID09PSBleHBvcnRzLmRldmljZVR5cGVzLndlYjsgfTtcclxuZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xyXG4gICAgdmFyIGRldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGRldmljZVR5cGUpIHtcclxuICAgICAgICBjYXNlIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBkZXZlbG9wbWVudFByZWZpeDtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gd2ViUHJlZml4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0UHJlZml4ID0gZ2V0UHJlZml4O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd0Rvd25sb2FkZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnZG93bmxvYWRzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93RG93bmxvYWRlciA9IHNob3dEb3dubG9hZGVyO1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGlkID8gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiZG93bmxvYWRzL1wiICsgaWQgKyBcIi9zdGF0dXNcIikgOiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2Rvd25sb2Fkcy9zdGF0dXMnKTtcclxufVxyXG5leHBvcnRzLmdldERvd25sb2FkU3RhdHVzID0gZ2V0RG93bmxvYWRTdGF0dXM7XHJcbmZ1bmN0aW9uIGFkZFRvRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2Rvd25sb2Fkcy9zdGF0dXMnLCB7IGlkczogW2lkXSB9KTtcclxufVxyXG5leHBvcnRzLmFkZFRvRG93bmxvYWRlciA9IGFkZFRvRG93bmxvYWRlcjtcclxuZnVuY3Rpb24gcmVtb3ZlRnJvbURvd25sb2FkZXIoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiZG93bmxvYWRzL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlRnJvbURvd25sb2FkZXIgPSByZW1vdmVGcm9tRG93bmxvYWRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbnZhciBpdGVtXzEgPSByZXF1aXJlKCcuL2l0ZW0nKTtcclxuZnVuY3Rpb24gZW1iZWQoZWxlbWVudCwgaWQsIHBhZ2UpIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyIHBhZ2VBcmcgPSBwYWdlID8gXCI/cGFnZT1cIiArIHBhZ2UgOiAnJztcclxuICAgICAgICBlbGVtZW50LmF0dHIoJ3NyYycsIGkucmVzb3VyY2VVcmwgKyBwYWdlQXJnKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1iZWQgPSBlbWJlZDtcclxuZnVuY3Rpb24gZW1iZWRJbWFnZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xyXG4gICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcGFyYW1zID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBvcHRpb25zLnBhZ2UgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnc2l6ZScsIHZhbHVlOiBvcHRpb25zLnNpemUgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnd2lkdGgnLCB2YWx1ZTogb3B0aW9ucy53aWR0aCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdoZWlnaHQnLCB2YWx1ZTogb3B0aW9ucy5oZWlnaHQgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4V2lkdGgnLCB2YWx1ZTogb3B0aW9ucy5tYXhXaWR0aCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhIZWlnaHQnLCB2YWx1ZTogb3B0aW9ucy5tYXhIZWlnaHQgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncm90YXRlJywgdmFsdWU6IG9wdGlvbnMucm90YXRlIH0sXHJcbiAgICAgICAgXS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEheC52YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCkudGhlbihmdW5jdGlvbiAoaSkgeyByZXR1cm4gZWxlbWVudC5zcmMgPSBpLnJlc291cmNlVXJsOyB9KTtcclxufVxyXG5leHBvcnRzLmVtYmVkSW1hZ2UgPSBlbWJlZEltYWdlO1xyXG5mdW5jdGlvbiBnZXREYXRhKGlkKSB7XHJcbiAgICByZXR1cm4gaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICByZXR1cm4gJC5nZXQoaS5yZXNvdXJjZVVybCkudGhlbihmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YTsgfSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmdldERhdGEgPSBnZXREYXRhO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gb2JqVG9TdHJpbmcob2JqKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBrZXkgKyAnOicgKyBvYmpba2V5XSArICcsJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXN1bHQuc2xpY2UoMCwgcmVzdWx0Lmxlbmd0aCAtIDEpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBmaWx0ZXIob2JqKSB7XHJcbiAgICB2YXIgRGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgb2Zmc2V0ID0gMDtcclxuICAgIHZhciBsaW1pdCA9IDEwMDtcclxuICAgIHZhciBnZXRQYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSBlbmNvZGVVUklDb21wb25lbnQob2JqVG9TdHJpbmcob2JqKSk7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcIml0ZW1zP2ZpbHRlcj1cIiArIGZpbHRlciArIFwiJm9mZnNldD1cIiArIG9mZnNldCArIFwiJmxpbWl0PVwiICsgbGltaXQpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IGxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICBEZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gbGltaXQ7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgRGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgZ2V0UGFnZSgpO1xyXG4gICAgcmV0dXJuIERlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGZpbHRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEZvbGRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCArIFwiL2l0ZW1zXCIpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Rm9sZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0R3BzQ29vcmRpbmF0ZXMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nLCAnZ3BzJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRHcHNDb29yZGluYXRlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEludGVyYWN0aXZlSW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2ludGVyYWN0aXZlJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRJbnRlcmFjdGl2ZUluZm87XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2aWNlID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxudmFyIGNvbW1hbmRTdXBwb3J0XzEgPSByZXF1aXJlKCcuL2NvbW1hbmRTdXBwb3J0Jyk7XHJcbmZ1bmN0aW9uIGdldChmdW5jLCBwYXJhbSwgZXhwZWN0SnNvbikge1xyXG4gICAgaWYgKHBhcmFtID09PSB2b2lkIDApIHsgcGFyYW0gPSBudWxsOyB9XHJcbiAgICBpZiAoZXhwZWN0SnNvbiA9PT0gdm9pZCAwKSB7IGV4cGVjdEpzb24gPSB0cnVlOyB9XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmMgKyAocGFyYW0gPT09IG51bGwgPyAnJyA6ICcvJyArIHBhcmFtKTtcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAvLyBDb250ZW50IHJldHJpZXZlZC4gVHJhbnNmb3JtIHRvIEpTT04gaWYgc3VwcG9zZWQgdG8uXHJcbiAgICAgICAgICAgIGlmIChleHBlY3RKc29uICYmIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKS5pbmRleE9mKFwidGV4dC9odG1sXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgd2FzIHNlbnQgYmFjayBhcyB0ZXh0L2h0bWwgSlNPTi5wYXJzZSBpdCB0byBhIEpTT04gb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAvLyBDb250ZW50IGNvdWxkIG5vdCBiZSByZXRyaWV2ZWQuIFJlamVjdCB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMuZ2V0ID0gZ2V0O1xyXG5mdW5jdGlvbiBwb3N0KGZ1bmMsIGRhdGEpIHtcclxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYztcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucG9zdCA9IHBvc3Q7XHJcbmZ1bmN0aW9uIGRkZWxldGUoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLmRkZWxldGUgPSBkZGVsZXRlO1xyXG5mdW5jdGlvbiBwdXQoZnVuYywgZGF0YSkge1xyXG4gICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLnB1dCA9IHB1dDtcclxuZnVuY3Rpb24gc2hvd1VJKG5hbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBwb3N0KCdjb250cm9sL3Nob3ctdWknLCB7XHJcbiAgICAgICAgdWk6IG5hbWUsXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd1VJID0gc2hvd1VJO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0SXRlbShpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCk7XHJcbn1cclxuZXhwb3J0cy5nZXRJdGVtID0gZ2V0SXRlbTtcclxuZnVuY3Rpb24gZ2V0Q3VycmVudEl0ZW0oKSB7XHJcbiAgICByZXR1cm4gZ2V0SXRlbSgnX19zZWxmX18nKTtcclxufVxyXG5leHBvcnRzLmdldEN1cnJlbnRJdGVtID0gZ2V0Q3VycmVudEl0ZW07XHJcbmZ1bmN0aW9uIGdldFNoYXJlKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkICsgJy9zaGFyZScpO1xyXG59XHJcbmV4cG9ydHMuZ2V0U2hhcmUgPSBnZXRTaGFyZTtcclxuZnVuY3Rpb24gZ2V0TGFzdFZpZXdlZENvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsICc/bGlzdD1sYXN0LXZpZXdlZCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0TGFzdFZpZXdlZENvbnRlbnQgPSBnZXRMYXN0Vmlld2VkQ29udGVudDtcclxuZnVuY3Rpb24gZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgJz9saXN0PXJlY2VudGx5LWNyZWF0ZWQnKTtcclxufVxyXG5leHBvcnRzLmdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQgPSBnZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICB2YXIgYWxsID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGtleSBzdGFydHN3aXRoIHByZWZpeFxyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxba2V5XSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFthbGwsIDIwMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcImluZm8/cHJlZml4PVwiICsgcHJlZml4KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRBbGxWYWx1ZXMoKSB7XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHZhciBhbGwgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIGFsbFtrZXldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQud2hlbihhbGwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaW5mbycpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldFZhbHVlcyhwcmVmaXgpIHtcclxuICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgICAvLyBHZXQgdmFsdWVzIHdpdGggc3BlY2lmaWVkIHByZWZpeFxyXG4gICAgICAgIHJldHVybiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZ2V0QWxsVmFsdWVzKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRWYWx1ZXMgPSBnZXRWYWx1ZXM7XHJcbmZ1bmN0aW9uIGdldFZhbHVlKGtleSkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFt2YWx1ZSwgMjAwXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZmQucmVqZWN0V2l0aCh0aGlzLCBbdmFsdWUsIDQwNF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mb1wiLCBrZXksIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFZhbHVlID0gZ2V0VmFsdWU7XHJcbmZ1bmN0aW9uIHB1dFZhbHVlKGtleSwgdmFsdWUpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFsnJywgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImluZm9cIiwgW3sga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9XSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wdXRWYWx1ZSA9IHB1dFZhbHVlO1xyXG5mdW5jdGlvbiBkZWxldGVLZXkoa2V5KSB7XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFsnJywgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImluZm8vXCIgKyBrZXkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVsZXRlS2V5ID0gZGVsZXRlS2V5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGl0ZW1fMSA9IHJlcXVpcmUoJy4vaXRlbScpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9iYWNrJztcclxufVxyXG5leHBvcnRzLmNsb3NlID0gY2xvc2U7XHJcbmZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvaXRlbXMvX19zZWxmX18vbmV4dCc7XHJcbn1cclxuZXhwb3J0cy5uZXh0ID0gbmV4dDtcclxuZnVuY3Rpb24gcHJldmlvdXMoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvaXRlbXMvX19zZWxmX18vcHJldmlvdXMnO1xyXG59XHJcbmV4cG9ydHMucHJldmlvdXMgPSBwcmV2aW91cztcclxuZnVuY3Rpb24gb3Blbkl0ZW0oaWQsIGJvb2ttYXJrKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSB7fTtcclxuICAgICAgICB2YXIgdXJsID0gaXRlbS51cmw7XHJcbiAgICAgICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICAgICAgcGFyYW1zWydyZXR1cm51cmwnXSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9va21hcmspIHtcclxuICAgICAgICAgICAgcGFyYW1zWydib29rbWFyayddID0gYm9va21hcms7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArICQucGFyYW0ocGFyYW1zKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgdXJsO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5vcGVuSXRlbSA9IG9wZW5JdGVtO1xyXG5leHBvcnRzLm9wZW4gPSBvcGVuSXRlbTtcclxuZnVuY3Rpb24gb3BlbkZvbGRlcihpZCkge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGl0ZW0udXJsO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5vcGVuRm9sZGVyID0gb3BlbkZvbGRlcjtcclxuZnVuY3Rpb24gZ290bygpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ2dvdG8gbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XHJcbn1cclxuZXhwb3J0cy5nb3RvID0gZ290bztcclxuZnVuY3Rpb24gYnJvd3NlKCkge1xyXG4gICAgY29uc29sZS5lcnJvcignYnJvd3NlIG1ldGhvZCBpcyBub3cgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBvcGVuSXRlbSBnb2luZyBmb3J3YXJkLicpO1xyXG59XHJcbmV4cG9ydHMuYnJvd3NlID0gYnJvd3NlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gYWRkTm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5hZGROb3RpZmljYXRpb24gPSBhZGROb3RpZmljYXRpb247XHJcbmZ1bmN0aW9uIHJlbW92ZU5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlTm90aWZpY2F0aW9uID0gcmVtb3ZlTm90aWZpY2F0aW9uO1xyXG5mdW5jdGlvbiBnZXROb3RpZmljYXRpb25TdGF0dXMoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Tm90aWZpY2F0aW9uU3RhdHVzID0gZ2V0Tm90aWZpY2F0aW9uU3RhdHVzO1xyXG5mdW5jdGlvbiBzaG93Tm90aWZpY2F0aW9uTWFuYWdlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdub3RpZmljYXRpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93Tm90aWZpY2F0aW9uTWFuYWdlciA9IHNob3dOb3RpZmljYXRpb25NYW5hZ2VyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0T25saW5lU3RhdHVzKGFyZ3VtZW50KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nLCAnb25saW5lLXN0YXR1cycpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0T25saW5lU3RhdHVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcG9zdEFjdGlvbihvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMucG9zdEFjdGlvbiA9IHBvc3RBY3Rpb247XHJcbmZ1bmN0aW9uIHBvc3RQYWdlVmlldyhpZCwgcGFnZSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2FjdGlvbnMnLCB7XHJcbiAgICAgICAgdHlwZTogJ2RvY3VtZW50JyxcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgcGFnZTogcGFnZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5wb3N0UGFnZVZpZXcgPSBwb3N0UGFnZVZpZXc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBwb3N0RXZlbnQoa2V5LCBwcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImV2ZW50c1wiLCB7IGtleToga2V5LCBwcm9wZXJ0aWVzOiBKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzKSB9KTtcclxufVxyXG5leHBvcnRzLnBvc3RFdmVudCA9IHBvc3RFdmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNlYXJjaCh0ZXJtLCBvZmZzZXQsIGxpbWl0KSB7XHJcbiAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxyXG4gICAgaWYgKGxpbWl0ID09PSB2b2lkIDApIHsgbGltaXQgPSAxMDA7IH1cclxuICAgIHZhciBkZmQxID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIG9iaiA9IHtcclxuICAgICAgICB0ZXJtOiB0ZXJtLFxyXG4gICAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICAgIGxpbWl0OiBsaW1pdFxyXG4gICAgfTtcclxuICAgIHZhciBnZXRQYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBxcyA9ICQucGFyYW0ob2JqKTtcclxuICAgICAgICBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zPycgKyBxcylcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgb2JqLmxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICBkZmQxLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5vZmZzZXQgKz0gb2JqLmxpbWl0O1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRmZDEucmVqZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgZ2V0UGFnZSgpO1xyXG4gICAgcmV0dXJuIGRmZDEucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMuc2VhcmNoID0gc2VhcmNoO1xyXG5mdW5jdGlvbiBzaG93U2VhcmNoKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ3NlYXJjaCcsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NlYXJjaCA9IHNob3dTZWFyY2g7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcInN5bmNlZGluZm8/cHJlZml4PVwiICsgcHJlZml4KTtcclxufVxyXG5mdW5jdGlvbiBnZXRBbGxWYWx1ZXMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jZWRpbmZvJyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0U3luY2VkVmFsdWVzKHByZWZpeCkge1xyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgIC8vIEdldCB2YWx1ZXMgd2l0aCBzcGVjaWZpZWQgcHJlZml4XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXRBbGxWYWx1ZXMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFN5bmNlZFZhbHVlcyA9IGdldFN5bmNlZFZhbHVlcztcclxuZnVuY3Rpb24gZ2V0U3luY2VkVmFsdWUoa2V5KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jZWRpbmZvJywga2V5LCBmYWxzZSk7XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jZWRWYWx1ZSA9IGdldFN5bmNlZFZhbHVlO1xyXG5mdW5jdGlvbiBzYXZlU3luY2VkVmFsdWUoa2V5LCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJzeW5jZWRpbmZvXCIsIFt7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfV0pO1xyXG59XHJcbmV4cG9ydHMuc2F2ZVN5bmNlZFZhbHVlID0gc2F2ZVN5bmNlZFZhbHVlO1xyXG5mdW5jdGlvbiBkZWxldGVTeW5jZWRLZXkoa2V5KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcInN5bmNlZGluZm9cIiwgW2tleV0pO1xyXG59XHJcbmV4cG9ydHMuZGVsZXRlU3luY2VkS2V5ID0gZGVsZXRlU3luY2VkS2V5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0U3lzdGVtSW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0U3lzdGVtSW5mbztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFVwbG9hZFVybChrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsIFwidXBsb2FkdXJsP2tleT1cIiArIGtleSk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRVcGxvYWRVcmw7XHJcbiIsIi8qKlxyXG4gKiAoYykgMjAxMy0yMDE2LCBNZWRpYWZseSwgSW5jLlxyXG4gKiBtZmx5Q29tbWFuZHMgaXMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugd2hpY2ggd3JhcHMgY29tbW9uIG1mbHkgY2FsbHMgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxyXG4gKiBCZWZvcmUgdXNlLCBwbGVhc2UgYmUgc3VyZSB0byBjYWxsIHNldFByZWZpeCBpZiB5b3UgYXJlIHdvcmtpbmcgb24gYSBkZXZlbG9wbWVudCBwbGF0Zm9ybSAoZS5nLlxyXG4gKiBhIGxvY2FsIHdlYnNlcnZlciBvbiBhIFBDKSBmb3IgZXhhbXBsZSwgaHR0cDovL2xvY2FsaG9zdDo4MDAwLyAuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVyYWN0aXZlSW5mb18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9pbnRlcmFjdGl2ZUluZm8nKTtcclxudmFyIHN5c3RlbUluZm9fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc3lzdGVtSW5mbycpO1xyXG52YXIgb25saW5lU3RhdHVzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL29ubGluZVN0YXR1cycpO1xyXG52YXIgdXBsb2FkVXJsXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3VwbG9hZFVybCcpO1xyXG52YXIgaXRlbSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvaXRlbScpO1xyXG52YXIgY29sbGVjdGlvbnMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NvbGxlY3Rpb25zJyk7XHJcbnZhciBmb2xkZXJfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZm9sZGVyJyk7XHJcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZmlsdGVyJyk7XHJcbnZhciBncHNDb29yZGluYXRlc18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9ncHNDb29yZGluYXRlcycpO1xyXG52YXIgc2VhcmNoXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3NlYXJjaCcpO1xyXG52YXIgbmF2aWdhdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9uYXZpZ2F0aW9uJyk7XHJcbnZhciBkb3dubG9hZGVyID0gcmVxdWlyZSgnLi9jb21tYW5kcy9kb3dubG9hZGVyJyk7XHJcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCcuL2NvbW1hbmRzL25vdGlmaWNhdGlvbicpO1xyXG52YXIgYWNjb3VudEluZm8gPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FjY291bnRJbmZvJyk7XHJcbnZhciBsb2NhbEtleVZhbHVlU3RvcmFnZSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbG9jYWxLZXlWYWx1ZVN0b3JhZ2UnKTtcclxudmFyIHN5bmNlZEtleVZhbHVlU3RvcmFnZSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc3luY2VkS2V5VmFsdWVTdG9yYWdlJyk7XHJcbnZhciBhcHBsaWNhdGlvblN5bmMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FwcGxpY2F0aW9uU3luYycpO1xyXG52YXIgbmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbmF2aWdhdGlvbicpO1xyXG52YXIgYXBwRmVhdHVyZXMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FwcEZlYXR1cmVzJyk7XHJcbnZhciBjb250cm9sc18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9jb250cm9scycpO1xyXG52YXIgZW1iZWRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZW1iZWQnKTtcclxudmFyIHBvc3RBY3Rpb25fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvcG9zdEFjdGlvbicpO1xyXG52YXIgcG9zdEV2ZW50XzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3Bvc3RFdmVudCcpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2RldmljZScpO1xyXG52YXIgbWZseUNvbW1hbmRzID0ge1xyXG4gICAgY2xvc2U6IG5hdmlnYXRpb25fMS5jbG9zZSxcclxuICAgIGdldEludGVyYWN0aXZlSW5mbzogaW50ZXJhY3RpdmVJbmZvXzEuZGVmYXVsdCxcclxuICAgIGdldFN5c3RlbUluZm86IHN5c3RlbUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0T25saW5lU3RhdHVzOiBvbmxpbmVTdGF0dXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0R3BzQ29vcmRpbmF0ZXM6IGdwc0Nvb3JkaW5hdGVzXzEuZGVmYXVsdCxcclxuICAgIGdldFVwbG9hZFVybDogdXBsb2FkVXJsXzEuZGVmYXVsdCxcclxuICAgIGdldEZvbGRlcjogZm9sZGVyXzEuZGVmYXVsdCxcclxuICAgIGZpbHRlcjogZmlsdGVyXzEuZGVmYXVsdCxcclxuICAgIHNlYXJjaDogc2VhcmNoXzEuc2VhcmNoLFxyXG4gICAgc2hvd1NlYXJjaDogc2VhcmNoXzEuc2hvd1NlYXJjaCxcclxuICAgIGhpZGVDb250cm9sQmFyczogY29udHJvbHNfMS5oaWRlQ29udHJvbEJhcnMsXHJcbiAgICBzaG93Q29udHJvbEJhcnM6IGNvbnRyb2xzXzEuc2hvd0NvbnRyb2xCYXJzLFxyXG4gICAgZW1iZWQ6IGVtYmVkXzEuZW1iZWQsXHJcbiAgICBlbWJlZEltYWdlOiBlbWJlZF8xLmVtYmVkSW1hZ2UsXHJcbiAgICBnZXREYXRhOiBlbWJlZF8xLmdldERhdGEsXHJcbiAgICBnZXREZXZpY2VUeXBlOiBkZXZpY2VfMS5nZXREZXZpY2VUeXBlLFxyXG4gICAgZ2V0UHJlZml4OiBkZXZpY2VfMS5nZXRQcmVmaXgsXHJcbiAgICBpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50OiBkZXZpY2VfMS5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50LFxyXG4gICAgaXNXaW5kb3dzODogZGV2aWNlXzEuaXNXaW5kb3dzOCxcclxuICAgIHBvc3RBY3Rpb246IHBvc3RBY3Rpb25fMS5wb3N0QWN0aW9uLFxyXG4gICAgcG9zdFBhZ2VWaWV3OiBwb3N0QWN0aW9uXzEucG9zdFBhZ2VWaWV3LFxyXG4gICAgcG9zdEV2ZW50OiBwb3N0RXZlbnRfMS5wb3N0RXZlbnRcclxufTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBpdGVtKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBjb2xsZWN0aW9ucyk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgZG93bmxvYWRlcik7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgbm90aWZpY2F0aW9uKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhY2NvdW50SW5mbyk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgbG9jYWxLZXlWYWx1ZVN0b3JhZ2UpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIHN5bmNlZEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgYXBwbGljYXRpb25TeW5jKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBuYXZpZ2F0aW9uKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBGZWF0dXJlcyk7XHJcbm1vZHVsZS5leHBvcnRzID0gbWZseUNvbW1hbmRzO1xyXG4iXX0=
