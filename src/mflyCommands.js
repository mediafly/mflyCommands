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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZW1wL2NvbW1hbmRzL2FjY291bnRJbmZvLmpzIiwidGVtcC9jb21tYW5kcy9hcHBGZWF0dXJlcy5qcyIsInRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwidGVtcC9jb21tYW5kcy9jb2xsZWN0aW9ucy5qcyIsInRlbXAvY29tbWFuZHMvY29tbWFuZFN1cHBvcnQuanMiLCJ0ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwidGVtcC9jb21tYW5kcy9kZXZpY2UuanMiLCJ0ZW1wL2NvbW1hbmRzL2Rvd25sb2FkZXIuanMiLCJ0ZW1wL2NvbW1hbmRzL2VtYmVkLmpzIiwidGVtcC9jb21tYW5kcy9maWx0ZXIuanMiLCJ0ZW1wL2NvbW1hbmRzL2ZvbGRlci5qcyIsInRlbXAvY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMuanMiLCJ0ZW1wL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mby5qcyIsInRlbXAvY29tbWFuZHMvaW50ZXJuYWxNZXRob2RzLmpzIiwidGVtcC9jb21tYW5kcy9pdGVtLmpzIiwidGVtcC9jb21tYW5kcy9sb2NhbEtleVZhbHVlU3RvcmFnZS5qcyIsInRlbXAvY29tbWFuZHMvbmF2aWdhdGlvbi5qcyIsInRlbXAvY29tbWFuZHMvbm90aWZpY2F0aW9uLmpzIiwidGVtcC9jb21tYW5kcy9vbmxpbmVTdGF0dXMuanMiLCJ0ZW1wL2NvbW1hbmRzL3Bvc3RBY3Rpb24uanMiLCJ0ZW1wL2NvbW1hbmRzL3Bvc3RFdmVudC5qcyIsInRlbXAvY29tbWFuZHMvc2VhcmNoLmpzIiwidGVtcC9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UuanMiLCJ0ZW1wL2NvbW1hbmRzL3N5c3RlbUluZm8uanMiLCJ0ZW1wL2NvbW1hbmRzL3VwbG9hZFVybC5qcyIsInRlbXAvbWZseUNvbW1hbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2FjY291bnQnKTtcclxufVxyXG5leHBvcnRzLmdldFVzZXJJbmZvID0gZ2V0VXNlckluZm87XHJcbmZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9hY2NvdW50L2xvZ291dCc7XHJcbn1cclxuZXhwb3J0cy5sb2dvdXQgPSBsb2dvdXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93U2V0dGluZ3MoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYXBwLXNldHRpbmdzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2V0dGluZ3MgPSBzaG93U2V0dGluZ3M7XHJcbmZ1bmN0aW9uIHNob3dVc2VyTWFuYWdlbWVudCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCd1c2VyLW1hbmFnZW1lbnQnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dVc2VyTWFuYWdlbWVudCA9IHNob3dVc2VyTWFuYWdlbWVudDtcclxuZnVuY3Rpb24gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ3NlY29uZC1zY3JlZW4nIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NlY29uZFNjcmVlbk9wdGlvbnMgPSBzaG93U2Vjb25kU2NyZWVuT3B0aW9ucztcclxuZnVuY3Rpb24gZW1haWwoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsJywgeyBpZDogaWQgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWFpbCA9IGVtYWlsO1xyXG5mdW5jdGlvbiBjb21wb3NlRW1haWwob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvY29tcG9zZS1lbWFpbCcsIG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMuY29tcG9zZUVtYWlsID0gY29tcG9zZUVtYWlsO1xyXG5mdW5jdGlvbiBzaG93QW5ub3RhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywgeyB1aTogJ2Fubm90YXRpb25zJyB9KTtcclxufVxyXG5leHBvcnRzLnNob3dBbm5vdGF0aW9ucyA9IHNob3dBbm5vdGF0aW9ucztcclxuZnVuY3Rpb24gdGFrZUFuZEVtYWlsU2NyZWVuc2hvdCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsLXNjcmVlbnNob3QnKTtcclxufVxyXG5leHBvcnRzLnRha2VBbmRFbWFpbFNjcmVlbnNob3QgPSB0YWtlQW5kRW1haWxTY3JlZW5zaG90O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdzeW5jJyk7XHJcbn1cclxuZXhwb3J0cy5yZWZyZXNoID0gcmVmcmVzaDtcclxuZnVuY3Rpb24gZ2V0U3luY1N0YXR1cygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmMnLCAnc3RhdHVzJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jU3RhdHVzID0gZ2V0U3luY1N0YXR1cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnY29sbGVjdGlvbnMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb25zID0gZ2V0Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJjb2xsZWN0aW9ucy9cIiArIGlkLCAnaXRlbXMnKTtcclxufVxyXG5leHBvcnRzLmdldENvbGxlY3Rpb24gPSBnZXRDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBjcmVhdGVDb2xsZWN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb2xsZWN0aW9ucycsIHsgbmFtZTogbmFtZSB9KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNvbGxlY3Rpb24gPSBjcmVhdGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBhZGRJdGVtVG9Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXNcIiwgeyBpZHM6IFtpdGVtSWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkSXRlbVRvQ29sbGVjdGlvbiA9IGFkZEl0ZW1Ub0NvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbiA9IHJlbW92ZUl0ZW1Gcm9tQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gZGVsZXRlQ29sbGVjdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmRlbGV0ZUNvbGxlY3Rpb24gPSBkZWxldGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW9yZGVySXRlbUluQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCwgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkICsgXCIvb3JkZXI/cG9zaXRpb249XCIgKyBwb3NpdGlvbik7XHJcbn1cclxuZXhwb3J0cy5yZW9yZGVySXRlbUluQ29sbGVjdGlvbiA9IHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW5hbWVDb2xsZWN0aW9uKGlkLCBuYW1lKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucHV0KFwiY29sbGVjdGlvbnMvXCIgKyBpZCwgeyBuYW1lOiBuYW1lIH0pO1xyXG59XHJcbmV4cG9ydHMucmVuYW1lQ29sbGVjdGlvbiA9IHJlbmFtZUNvbGxlY3Rpb247XHJcbi8vIFVJIE1ldGhvZHNcclxuZnVuY3Rpb24gc2hvd0NvbGxlY3Rpb25zKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2NvbGxlY3Rpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93Q29sbGVjdGlvbnMgPSBzaG93Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIHNob3dBZGRUb0NvbGxlY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYWRkLXRvLWNvbGxlY3Rpb24nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dBZGRUb0NvbGxlY3Rpb24gPSBzaG93QWRkVG9Db2xsZWN0aW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gaXNVbnN1cHBvcnRlZCh1cmwpIHtcclxuICAgIGlmICghZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciB1bnN1cHBvcnRlZFN0YXRlbWVudHMgPSBbXHJcbiAgICAgICAgJy9jb250cm9sLycsXHJcbiAgICAgICAgJy9kb3dubG9hZHMnLFxyXG4gICAgICAgICcvb25saW5lLXN0YXR1cycsXHJcbiAgICAgICAgJy9zeXN0ZW0vZ3BzJ1xyXG4gICAgXTtcclxuICAgIHJldHVybiB1bnN1cHBvcnRlZFN0YXRlbWVudHMuc29tZShmdW5jdGlvbiAoc3RhdGVtZW50KSB7IHJldHVybiB1cmwuaW5kZXhPZihzdGF0ZW1lbnQpID4gLTE7IH0pO1xyXG59XHJcbmV4cG9ydHMuaXNVbnN1cHBvcnRlZCA9IGlzVW5zdXBwb3J0ZWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93Q29udHJvbEJhcnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiAnY29udHJvbC1iYXInLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd0NvbnRyb2xCYXJzID0gc2hvd0NvbnRyb2xCYXJzO1xyXG5mdW5jdGlvbiBoaWRlQ29udHJvbEJhcnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogJ2NvbnRyb2wtYmFyJyxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udHJvbEJhcnMgPSBoaWRlQ29udHJvbEJhcnM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2ZWxvcG1lbnRQcmVmaXggPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XHJcbnZhciB3ZWJQcmVmaXggPSAnL2ludGVyYWN0aXZlLWFwaS92NS8nO1xyXG5leHBvcnRzLmRldmljZVR5cGVzID0ge1xyXG4gICAgZGV2ZWxvcG1lbnQ6ICdkZXZlbG9wbWVudCcsXHJcbiAgICBtb2JpbGU6ICdtb2JpbGUnLFxyXG4gICAgd2ViOiAnd2ViJyxcclxuICAgIGRlc2t0b3A6ICdkZXNrdG9wJ1xyXG59O1xyXG5mdW5jdGlvbiBpc1dpbmRvd3M4KCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIm1zaWVcIikgIT09IC0xKSB7XHJcbiAgICAgICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwid2Vidmlld1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNXaW5kb3dzOCA9IGlzV2luZG93czg7XHJcbmZ1bmN0aW9uIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSB7XHJcbiAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdDo4MDAwJykgPiAtMSk7XHJcbn1cclxuZXhwb3J0cy5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50ID0gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudDtcclxuZnVuY3Rpb24gZ2V0RGV2aWNlVHlwZSgpIHtcclxuICAgIGlmIChpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50KCkpIHtcclxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkZXZpY2VUeXBlQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNwbGl0KCc9JylbMF0udG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdkZXZpY2V0eXBlJzsgfSk7XHJcbiAgICAgICAgaWYgKGRldmljZVR5cGVDb29raWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlVHlwZUNvb2tpZVswXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGV2aWNlVHlwZXMubW9iaWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldERldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlO1xyXG5leHBvcnRzLmlzV2ViID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0RGV2aWNlVHlwZSgpID09PSBleHBvcnRzLmRldmljZVR5cGVzLndlYjsgfTtcclxuZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xyXG4gICAgdmFyIGRldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGRldmljZVR5cGUpIHtcclxuICAgICAgICBjYXNlIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBkZXZlbG9wbWVudFByZWZpeDtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gd2ViUHJlZml4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0UHJlZml4ID0gZ2V0UHJlZml4O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd0Rvd25sb2FkZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnZG93bmxvYWRzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93RG93bmxvYWRlciA9IHNob3dEb3dubG9hZGVyO1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGlkID8gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiZG93bmxvYWRzL1wiICsgaWQgKyBcIi9zdGF0dXNcIikgOiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2Rvd25sb2Fkcy9zdGF0dXMnKTtcclxufVxyXG5leHBvcnRzLmdldERvd25sb2FkU3RhdHVzID0gZ2V0RG93bmxvYWRTdGF0dXM7XHJcbmZ1bmN0aW9uIGFkZFRvRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2Rvd25sb2FkcycsIHsgaWRzOiBbaWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkVG9Eb3dubG9hZGVyID0gYWRkVG9Eb3dubG9hZGVyO1xyXG5mdW5jdGlvbiByZW1vdmVGcm9tRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJkb3dubG9hZHMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVGcm9tRG93bmxvYWRlciA9IHJlbW92ZUZyb21Eb3dubG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxudmFyIGl0ZW1fMSA9IHJlcXVpcmUoJy4vaXRlbScpO1xyXG5mdW5jdGlvbiBlbWJlZChlbGVtZW50LCBpZCwgcGFnZSkge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgcGFnZUFyZyA9IHBhZ2UgPyBcIj9wYWdlPVwiICsgcGFnZSA6ICcnO1xyXG4gICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgaS5yZXNvdXJjZVVybCArIHBhZ2VBcmcpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWJlZCA9IGVtYmVkO1xyXG5mdW5jdGlvbiBlbWJlZEltYWdlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IG9wdGlvbnMucGFnZSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdzaXplJywgdmFsdWU6IG9wdGlvbnMuc2l6ZSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd3aWR0aCcsIHZhbHVlOiBvcHRpb25zLndpZHRoIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2hlaWdodCcsIHZhbHVlOiBvcHRpb25zLmhlaWdodCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhXaWR0aCcsIHZhbHVlOiBvcHRpb25zLm1heFdpZHRoIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heEhlaWdodCcsIHZhbHVlOiBvcHRpb25zLm1heEhlaWdodCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdyb3RhdGUnLCB2YWx1ZTogb3B0aW9ucy5yb3RhdGUgfSxcclxuICAgICAgICBdLmZpbHRlcihmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF4LnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IGkucmVzb3VyY2VVcmw7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgdXJsKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1iZWRJbWFnZSA9IGVtYmVkSW1hZ2U7XHJcbmZ1bmN0aW9uIGdldERhdGEoaWQpIHtcclxuICAgIHJldHVybiBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHJldHVybiAkLmdldChpLnJlc291cmNlVXJsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhOyB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBvYmpUb1N0cmluZyhvYmopIHtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGtleSArICc6JyArIG9ialtrZXldICsgJywnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5zbGljZSgwLCByZXN1bHQubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIGZpbHRlcihvYmopIHtcclxuICAgIHZhciBEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBvZmZzZXQgPSAwO1xyXG4gICAgdmFyIGxpbWl0ID0gMTAwO1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGZpbHRlciA9IGVuY29kZVVSSUNvbXBvbmVudChvYmpUb1N0cmluZyhvYmopKTtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaXRlbXM/ZmlsdGVyPVwiICsgZmlsdGVyICsgXCImb2Zmc2V0PVwiICsgb2Zmc2V0ICsgXCImbGltaXQ9XCIgKyBsaW1pdClcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIERlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldCArPSBsaW1pdDtcclxuICAgICAgICAgICAgICAgIGdldFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBEZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gRGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZmlsdGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0Rm9sZGVyKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkICsgXCIvaXRlbXNcIik7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRGb2xkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRHcHNDb29yZGluYXRlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdncHMnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEdwc0Nvb3JkaW5hdGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0SW50ZXJhY3RpdmVJbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaW50ZXJhY3RpdmUnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEludGVyYWN0aXZlSW5mbztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBkZXZpY2UgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG52YXIgY29tbWFuZFN1cHBvcnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZFN1cHBvcnQnKTtcclxuZnVuY3Rpb24gZ2V0KGZ1bmMsIHBhcmFtLCBleHBlY3RKc29uKSB7XHJcbiAgICBpZiAocGFyYW0gPT09IHZvaWQgMCkgeyBwYXJhbSA9IG51bGw7IH1cclxuICAgIGlmIChleHBlY3RKc29uID09PSB2b2lkIDApIHsgZXhwZWN0SnNvbiA9IHRydWU7IH1cclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYyArIChwYXJhbSA9PT0gbnVsbCA/ICcnIDogJy8nICsgcGFyYW0pO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgcmV0cmlldmVkLiBUcmFuc2Zvcm0gdG8gSlNPTiBpZiBzdXBwb3NlZCB0by5cclxuICAgICAgICAgICAgaWYgKGV4cGVjdEpzb24gJiYgcmVxdWVzdCAmJiByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpLmluZGV4T2YoXCJ0ZXh0L2h0bWxcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3YXMgc2VudCBiYWNrIGFzIHRleHQvaHRtbCBKU09OLnBhcnNlIGl0IHRvIGEgSlNPTiBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgY291bGQgbm90IGJlIHJldHJpZXZlZC4gUmVqZWN0IHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5nZXQgPSBnZXQ7XHJcbmZ1bmN0aW9uIHBvc3QoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5wb3N0ID0gcG9zdDtcclxuZnVuY3Rpb24gZGRlbGV0ZShmdW5jLCBkYXRhKSB7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMuZGRlbGV0ZSA9IGRkZWxldGU7XHJcbmZ1bmN0aW9uIHB1dChmdW5jLCBkYXRhKSB7XHJcbiAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucHV0ID0gcHV0O1xyXG5mdW5jdGlvbiBzaG93VUkobmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogbmFtZSxcclxuICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93VUkgPSBzaG93VUk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRJdGVtKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkKTtcclxufVxyXG5leHBvcnRzLmdldEl0ZW0gPSBnZXRJdGVtO1xyXG5mdW5jdGlvbiBnZXRDdXJyZW50SXRlbSgpIHtcclxuICAgIHJldHVybiBnZXRJdGVtKCdfX3NlbGZfXycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q3VycmVudEl0ZW0gPSBnZXRDdXJyZW50SXRlbTtcclxuZnVuY3Rpb24gZ2V0U2hhcmUoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQgKyAnL3NoYXJlJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRTaGFyZSA9IGdldFNoYXJlO1xyXG5mdW5jdGlvbiBnZXRMYXN0Vmlld2VkQ29udGVudCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgJz9saXN0PWxhc3Qtdmlld2VkJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRMYXN0Vmlld2VkQ29udGVudCA9IGdldExhc3RWaWV3ZWRDb250ZW50O1xyXG5mdW5jdGlvbiBnZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9cmVjZW50bHktY3JlYXRlZCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudCA9IGdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGwgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0c3dpdGggcHJlZml4XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5LnNsaWNlKDAsIHByZWZpeC5sZW5ndGgpID09IHByZWZpeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFtrZXldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW2FsbCwgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgdmFyIGFsbCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuKGFsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpbmZvJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0VmFsdWVzKHByZWZpeCkge1xyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgIC8vIEdldCB2YWx1ZXMgd2l0aCBzcGVjaWZpZWQgcHJlZml4XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXRBbGxWYWx1ZXMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFZhbHVlcyA9IGdldFZhbHVlcztcclxuZnVuY3Rpb24gZ2V0VmFsdWUoa2V5KSB7XHJcbiAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW3ZhbHVlLCAyMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRmZC5yZWplY3RXaXRoKHRoaXMsIFt2YWx1ZSwgNDA0XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpbmZvXCIsIGtleSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0VmFsdWUgPSBnZXRWYWx1ZTtcclxuZnVuY3Rpb24gcHV0VmFsdWUoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKGRldmljZV8xLmlzV2ViKCkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiaW5mb1wiLCBbeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH1dKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnB1dFZhbHVlID0gcHV0VmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZUtleShrZXkpIHtcclxuICAgIGlmIChkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiaW5mby9cIiArIGtleSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWxldGVLZXkgPSBkZWxldGVLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbmZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL2JhY2snO1xyXG59XHJcbmV4cG9ydHMuY2xvc2UgPSBjbG9zZTtcclxuZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9uZXh0JztcclxufVxyXG5leHBvcnRzLm5leHQgPSBuZXh0O1xyXG5mdW5jdGlvbiBwcmV2aW91cygpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9wcmV2aW91cyc7XHJcbn1cclxuZXhwb3J0cy5wcmV2aW91cyA9IHByZXZpb3VzO1xyXG5mdW5jdGlvbiBvcGVuSXRlbShpZCwgYm9va21hcmspIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciB1cmwgPSBpdGVtLnVybDtcclxuICAgICAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ3JldHVybnVybCddID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rbWFyaykge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ2Jvb2ttYXJrJ10gPSBib29rbWFyaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgJC5wYXJhbShwYXJhbXMpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5JdGVtID0gb3Blbkl0ZW07XHJcbmV4cG9ydHMub3BlbiA9IG9wZW5JdGVtO1xyXG5mdW5jdGlvbiBvcGVuRm9sZGVyKGlkKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXRlbS51cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5Gb2xkZXIgPSBvcGVuRm9sZGVyO1xyXG5mdW5jdGlvbiBnb3RvKCkge1xyXG4gICAgY29uc29sZS5lcnJvcignZ290byBtZXRob2QgaXMgbm93IGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugb3Blbkl0ZW0gZ29pbmcgZm9yd2FyZC4nKTtcclxufVxyXG5leHBvcnRzLmdvdG8gPSBnb3RvO1xyXG5mdW5jdGlvbiBicm93c2UoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdicm93c2UgbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XHJcbn1cclxuZXhwb3J0cy5icm93c2UgPSBicm93c2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBhZGROb3RpZmljYXRpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwibm90aWZpY2F0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmFkZE5vdGlmaWNhdGlvbiA9IGFkZE5vdGlmaWNhdGlvbjtcclxuZnVuY3Rpb24gcmVtb3ZlTm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVOb3RpZmljYXRpb24gPSByZW1vdmVOb3RpZmljYXRpb247XHJcbmZ1bmN0aW9uIGdldE5vdGlmaWNhdGlvblN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5nZXROb3RpZmljYXRpb25TdGF0dXMgPSBnZXROb3RpZmljYXRpb25TdGF0dXM7XHJcbmZ1bmN0aW9uIHNob3dOb3RpZmljYXRpb25NYW5hZ2VyKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ25vdGlmaWNhdGlvbnMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dOb3RpZmljYXRpb25NYW5hZ2VyID0gc2hvd05vdGlmaWNhdGlvbk1hbmFnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRPbmxpbmVTdGF0dXMoYXJndW1lbnQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdvbmxpbmUtc3RhdHVzJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRPbmxpbmVTdGF0dXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBwb3N0QWN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdhY3Rpb25zJywgb3B0aW9ucyk7XHJcbn1cclxuZXhwb3J0cy5wb3N0QWN0aW9uID0gcG9zdEFjdGlvbjtcclxuZnVuY3Rpb24gcG9zdFBhZ2VWaWV3KGlkLCBwYWdlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIHtcclxuICAgICAgICB0eXBlOiAnZG9jdW1lbnQnLFxyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICBwYWdlOiBwYWdlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnBvc3RQYWdlVmlldyA9IHBvc3RQYWdlVmlldztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHBvc3RFdmVudChrZXksIHByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiZXZlbnRzXCIsIHsga2V5OiBrZXksIHByb3BlcnRpZXM6IEpTT04uc3RyaW5naWZ5KHByb3BlcnRpZXMpIH0pO1xyXG59XHJcbmV4cG9ydHMucG9zdEV2ZW50ID0gcG9zdEV2ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2VhcmNoKHRlcm0sIG9mZnNldCwgbGltaXQpIHtcclxuICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSAwOyB9XHJcbiAgICBpZiAobGltaXQgPT09IHZvaWQgMCkgeyBsaW1pdCA9IDEwMDsgfVxyXG4gICAgdmFyIGRmZDEgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgIHRlcm06IHRlcm0sXHJcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgICAgbGltaXQ6IGxpbWl0XHJcbiAgICB9O1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHFzID0gJC5wYXJhbShvYmopO1xyXG4gICAgICAgIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXM/JyArIHFzKVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBvYmoubGltaXQpIHtcclxuICAgICAgICAgICAgICAgIGRmZDEucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2JqLm9mZnNldCArPSBvYmoubGltaXQ7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGZkMS5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gZGZkMS5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5zZWFyY2ggPSBzZWFyY2g7XHJcbmZ1bmN0aW9uIHNob3dTZWFyY2goeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnc2VhcmNoJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2VhcmNoID0gc2hvd1NlYXJjaDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwic3luY2VkaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xyXG59XHJcbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nKTtcclxufVxyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZXMocHJlZml4KSB7XHJcbiAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgLy8gR2V0IHZhbHVlcyB3aXRoIHNwZWNpZmllZCBwcmVmaXhcclxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0U3luY2VkVmFsdWVzID0gZ2V0U3luY2VkVmFsdWVzO1xyXG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZShrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5bmNlZGluZm8nLCBrZXksIGZhbHNlKTtcclxufVxyXG5leHBvcnRzLmdldFN5bmNlZFZhbHVlID0gZ2V0U3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIHNhdmVTeW5jZWRWYWx1ZShrZXksIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcInN5bmNlZGluZm9cIiwgW3sga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9XSk7XHJcbn1cclxuZXhwb3J0cy5zYXZlU3luY2VkVmFsdWUgPSBzYXZlU3luY2VkVmFsdWU7XHJcbmZ1bmN0aW9uIGRlbGV0ZVN5bmNlZEtleShrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwic3luY2VkaW5mb1wiLCBba2V5XSk7XHJcbn1cclxuZXhwb3J0cy5kZWxldGVTeW5jZWRLZXkgPSBkZWxldGVTeW5jZWRLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRTeXN0ZW1JbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRTeXN0ZW1JbmZvO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VXBsb2FkVXJsKGtleSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgXCJ1cGxvYWR1cmw/a2V5PVwiICsga2V5KTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVwbG9hZFVybDtcclxuIiwiLyoqXHJcbiAqIChjKSAyMDEzLTIwMTYsIE1lZGlhZmx5LCBJbmMuXHJcbiAqIG1mbHlDb21tYW5kcyBpcyBhIHNpbmdsZXRvbiBpbnN0YW5jZSB3aGljaCB3cmFwcyBjb21tb24gbWZseSBjYWxscyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXHJcbiAqIEJlZm9yZSB1c2UsIHBsZWFzZSBiZSBzdXJlIHRvIGNhbGwgc2V0UHJlZml4IGlmIHlvdSBhcmUgd29ya2luZyBvbiBhIGRldmVsb3BtZW50IHBsYXRmb3JtIChlLmcuXHJcbiAqIGEgbG9jYWwgd2Vic2VydmVyIG9uIGEgUEMpIGZvciBleGFtcGxlLCBodHRwOi8vbG9jYWxob3N0OjgwMDAvIC5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJhY3RpdmVJbmZvXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mbycpO1xyXG52YXIgc3lzdGVtSW5mb18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeXN0ZW1JbmZvJyk7XHJcbnZhciBvbmxpbmVTdGF0dXNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvb25saW5lU3RhdHVzJyk7XHJcbnZhciB1cGxvYWRVcmxfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvdXBsb2FkVXJsJyk7XHJcbnZhciBpdGVtID0gcmVxdWlyZSgnLi9jb21tYW5kcy9pdGVtJyk7XHJcbnZhciBjb2xsZWN0aW9ucyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvY29sbGVjdGlvbnMnKTtcclxudmFyIGZvbGRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9mb2xkZXInKTtcclxudmFyIGZpbHRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9maWx0ZXInKTtcclxudmFyIGdwc0Nvb3JkaW5hdGVzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2dwc0Nvb3JkaW5hdGVzJyk7XHJcbnZhciBzZWFyY2hfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc2VhcmNoJyk7XHJcbnZhciBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL25hdmlnYXRpb24nKTtcclxudmFyIGRvd25sb2FkZXIgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2Rvd25sb2FkZXInKTtcclxudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbm90aWZpY2F0aW9uJyk7XHJcbnZhciBhY2NvdW50SW5mbyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYWNjb3VudEluZm8nKTtcclxudmFyIGxvY2FsS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9sb2NhbEtleVZhbHVlU3RvcmFnZScpO1xyXG52YXIgc3luY2VkS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UnKTtcclxudmFyIGFwcGxpY2F0aW9uU3luYyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwbGljYXRpb25TeW5jJyk7XHJcbnZhciBuYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9jb21tYW5kcy9uYXZpZ2F0aW9uJyk7XHJcbnZhciBhcHBGZWF0dXJlcyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwRmVhdHVyZXMnKTtcclxudmFyIGNvbnRyb2xzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NvbnRyb2xzJyk7XHJcbnZhciBlbWJlZF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9lbWJlZCcpO1xyXG52YXIgcG9zdEFjdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9wb3N0QWN0aW9uJyk7XHJcbnZhciBwb3N0RXZlbnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvcG9zdEV2ZW50Jyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZGV2aWNlJyk7XHJcbnZhciBtZmx5Q29tbWFuZHMgPSB7XHJcbiAgICBjbG9zZTogbmF2aWdhdGlvbl8xLmNsb3NlLFxyXG4gICAgZ2V0SW50ZXJhY3RpdmVJbmZvOiBpbnRlcmFjdGl2ZUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0U3lzdGVtSW5mbzogc3lzdGVtSW5mb18xLmRlZmF1bHQsXHJcbiAgICBnZXRPbmxpbmVTdGF0dXM6IG9ubGluZVN0YXR1c18xLmRlZmF1bHQsXHJcbiAgICBnZXRHcHNDb29yZGluYXRlczogZ3BzQ29vcmRpbmF0ZXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0VXBsb2FkVXJsOiB1cGxvYWRVcmxfMS5kZWZhdWx0LFxyXG4gICAgZ2V0Rm9sZGVyOiBmb2xkZXJfMS5kZWZhdWx0LFxyXG4gICAgZmlsdGVyOiBmaWx0ZXJfMS5kZWZhdWx0LFxyXG4gICAgc2VhcmNoOiBzZWFyY2hfMS5zZWFyY2gsXHJcbiAgICBzaG93U2VhcmNoOiBzZWFyY2hfMS5zaG93U2VhcmNoLFxyXG4gICAgaGlkZUNvbnRyb2xCYXJzOiBjb250cm9sc18xLmhpZGVDb250cm9sQmFycyxcclxuICAgIHNob3dDb250cm9sQmFyczogY29udHJvbHNfMS5zaG93Q29udHJvbEJhcnMsXHJcbiAgICBlbWJlZDogZW1iZWRfMS5lbWJlZCxcclxuICAgIGVtYmVkSW1hZ2U6IGVtYmVkXzEuZW1iZWRJbWFnZSxcclxuICAgIGdldERhdGE6IGVtYmVkXzEuZ2V0RGF0YSxcclxuICAgIGdldERldmljZVR5cGU6IGRldmljZV8xLmdldERldmljZVR5cGUsXHJcbiAgICBnZXRQcmVmaXg6IGRldmljZV8xLmdldFByZWZpeCxcclxuICAgIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQ6IGRldmljZV8xLmlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQsXHJcbiAgICBpc1dpbmRvd3M4OiBkZXZpY2VfMS5pc1dpbmRvd3M4LFxyXG4gICAgcG9zdEFjdGlvbjogcG9zdEFjdGlvbl8xLnBvc3RBY3Rpb24sXHJcbiAgICBwb3N0UGFnZVZpZXc6IHBvc3RBY3Rpb25fMS5wb3N0UGFnZVZpZXcsXHJcbiAgICBwb3N0RXZlbnQ6IHBvc3RFdmVudF8xLnBvc3RFdmVudFxyXG59O1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGl0ZW0pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGNvbGxlY3Rpb25zKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBub3RpZmljYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFjY291bnRJbmZvKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgc3luY2VkS2V5VmFsdWVTdG9yYWdlKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBsaWNhdGlvblN5bmMpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcEZlYXR1cmVzKTtcclxubW9kdWxlLmV4cG9ydHMgPSBtZmx5Q29tbWFuZHM7XHJcbiJdfQ==
