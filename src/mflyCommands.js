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
exports.isDesktop = function () { return getDeviceType() === exports.deviceTypes.desktop; };
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
var item_1 = require('./item');
function embed(element, id, page) {
    item_1.getItem(id).then(function (i) {
        var pageArg = page ? "?page=" + page : '';
        getResource(i.resourceUrl + pageArg).then(function () {
            return element.attr('src', i.resourceUrl + pageArg);
        });
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
    item_1.getItem(id).then(function (i) {
        var url = i.resourceUrl;
        if (params.length > 0) {
            url += '?' + $.param(params);
        }
        getResource(url).then(function () {
            return element.attr('src', url);
        });
    });
}
exports.embedImage = embedImage;
function getResource(url) {
    return $.get(url).then(function (data, textStatus, request) {
        // Check for retry.
        // iOS returns 202. Due to system limitations, Android returns 200 + blank response body
        if (request.status === 202 || (request.status == 200 && !request.responseText)) {
            // Suggested delay amount is set in the Retry-After header on iOS. Default to 3 seconds if not found.
            var delayFor = parseInt(request.getResponseHeader("Retry-After")) || 3;
            var deferred = $.Deferred();
            setTimeout(function () {
                getResource(url).then(function (data) { return deferred.resolve(data); });
            }, delayFor * 1000);
            return deferred.promise();
        }
        else {
            // Content retrieved. Resolve the promise.
            return data;
        }
    });
}
function getData(id) {
    return item_1.getItem(id).then(function (i) {
        return getResource(i.resourceUrl);
    });
}
exports.getData = getData;

},{"./item":15}],10:[function(require,module,exports){
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
var useLocalStorage = device_1.isWeb() || device_1.isDesktop();
function getValuesWithPrefix(prefix) {
    if (useLocalStorage) {
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
    if (useLocalStorage) {
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
    if (!key) {
        throw 'Invalid key provided';
    }
    if (useLocalStorage) {
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
    if (!key) {
        throw 'Invalid key provided';
    }
    if (useLocalStorage) {
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
    if (!key) {
        throw 'Invalid key provided';
    }
    if (useLocalStorage) {
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
        if (device_1.isWeb() || device_1.isDesktop()) {
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
var utils_1 = require('./utils');
function openWindow(url) {
    return window.open(url, "InteractivesWindow" + utils_1.guid());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = openWindow;

},{"./utils":27}],21:[function(require,module,exports){
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

},{"./internalMethods":14}],22:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postEvent(key, properties) {
    return internalMethods_1.post("events", { key: key, properties: JSON.stringify(properties) });
}
exports.postEvent = postEvent;

},{"./internalMethods":14}],23:[function(require,module,exports){
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

},{"./internalMethods":14}],24:[function(require,module,exports){
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
    if (!key) {
        throw 'Invalid key provided';
    }
    return internalMethods_1.get('syncedinfo', key, false);
}
exports.getSyncedValue = getSyncedValue;
function putSyncedValue(key, value) {
    if (!key) {
        throw 'Invalid key provided';
    }
    return internalMethods_1.post("syncedinfo", [{ key: key, value: value }]);
}
exports.putSyncedValue = putSyncedValue;
function deleteSyncedKey(key) {
    if (!key) {
        throw 'Invalid key provided';
    }
    return internalMethods_1.ddelete("syncedinfo", [key]);
}
exports.deleteSyncedKey = deleteSyncedKey;

},{"./internalMethods":14}],25:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.get('system');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":14}],26:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":14}],27:[function(require,module,exports){
"use strict";
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
exports.guid = guid;

},{}],28:[function(require,module,exports){
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
var openWindow_1 = require('./commands/openWindow');
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
    openWindow: openWindow_1.default,
    postAction: postAction_1.postAction,
    postPageView: postAction_1.postPageView,
    postEvent: postEvent_1.postEvent,
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

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/collections":4,"./commands/controls":6,"./commands/device":7,"./commands/downloader":8,"./commands/embed":9,"./commands/filter":10,"./commands/folder":11,"./commands/gpsCoordinates":12,"./commands/interactiveInfo":13,"./commands/item":15,"./commands/localKeyValueStorage":16,"./commands/navigation":17,"./commands/notification":18,"./commands/onlineStatus":19,"./commands/openWindow":20,"./commands/postAction":21,"./commands/postEvent":22,"./commands/search":23,"./commands/syncedKeyValueStorage":24,"./commands/systemInfo":25,"./commands/uploadUrl":26}]},{},[28])(28)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudGVtcC9jb21tYW5kcy9hY2NvdW50SW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2FwcEZlYXR1cmVzLmpzIiwiLnRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwiLnRlbXAvY29tbWFuZHMvY29sbGVjdGlvbnMuanMiLCIudGVtcC9jb21tYW5kcy9jb21tYW5kU3VwcG9ydC5qcyIsIi50ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwiLnRlbXAvY29tbWFuZHMvZGV2aWNlLmpzIiwiLnRlbXAvY29tbWFuZHMvZG93bmxvYWRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2VtYmVkLmpzIiwiLnRlbXAvY29tbWFuZHMvZmlsdGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZm9sZGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMuanMiLCIudGVtcC9jb21tYW5kcy9pbnRlcmFjdGl2ZUluZm8uanMiLCIudGVtcC9jb21tYW5kcy9pbnRlcm5hbE1ldGhvZHMuanMiLCIudGVtcC9jb21tYW5kcy9pdGVtLmpzIiwiLnRlbXAvY29tbWFuZHMvbG9jYWxLZXlWYWx1ZVN0b3JhZ2UuanMiLCIudGVtcC9jb21tYW5kcy9uYXZpZ2F0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvbm90aWZpY2F0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvb25saW5lU3RhdHVzLmpzIiwiLnRlbXAvY29tbWFuZHMvb3BlbldpbmRvdy5qcyIsIi50ZW1wL2NvbW1hbmRzL3Bvc3RBY3Rpb24uanMiLCIudGVtcC9jb21tYW5kcy9wb3N0RXZlbnQuanMiLCIudGVtcC9jb21tYW5kcy9zZWFyY2guanMiLCIudGVtcC9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UuanMiLCIudGVtcC9jb21tYW5kcy9zeXN0ZW1JbmZvLmpzIiwiLnRlbXAvY29tbWFuZHMvdXBsb2FkVXJsLmpzIiwiLnRlbXAvY29tbWFuZHMvdXRpbHMuanMiLCIudGVtcC9tZmx5Q29tbWFuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnYWNjb3VudCcpO1xufVxuZXhwb3J0cy5nZXRVc2VySW5mbyA9IGdldFVzZXJJbmZvO1xuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9hY2NvdW50L2xvZ291dCc7XG59XG5leHBvcnRzLmxvZ291dCA9IGxvZ291dDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcbmZ1bmN0aW9uIHNob3dTZXR0aW5ncyh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYXBwLXNldHRpbmdzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XG59XG5leHBvcnRzLnNob3dTZXR0aW5ncyA9IHNob3dTZXR0aW5ncztcbmZ1bmN0aW9uIHNob3dVc2VyTWFuYWdlbWVudCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgndXNlci1tYW5hZ2VtZW50JywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XG59XG5leHBvcnRzLnNob3dVc2VyTWFuYWdlbWVudCA9IHNob3dVc2VyTWFuYWdlbWVudDtcbmZ1bmN0aW9uIHNob3dTZWNvbmRTY3JlZW5PcHRpb25zKCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7IHVpOiAnc2Vjb25kLXNjcmVlbicgfSk7XG59XG5leHBvcnRzLnNob3dTZWNvbmRTY3JlZW5PcHRpb25zID0gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnM7XG5mdW5jdGlvbiBlbWFpbChpZCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsJywgeyBpZDogaWQgfSk7XG59XG5leHBvcnRzLmVtYWlsID0gZW1haWw7XG5mdW5jdGlvbiBjb21wb3NlRW1haWwob3B0aW9ucykge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2NvbXBvc2UtZW1haWwnLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuY29tcG9zZUVtYWlsID0gY29tcG9zZUVtYWlsO1xuZnVuY3Rpb24gc2hvd0Fubm90YXRpb25zKCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7IHVpOiAnYW5ub3RhdGlvbnMnIH0pO1xufVxuZXhwb3J0cy5zaG93QW5ub3RhdGlvbnMgPSBzaG93QW5ub3RhdGlvbnM7XG5mdW5jdGlvbiB0YWtlQW5kRW1haWxTY3JlZW5zaG90KCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2VtYWlsLXNjcmVlbnNob3QnKTtcbn1cbmV4cG9ydHMudGFrZUFuZEVtYWlsU2NyZWVuc2hvdCA9IHRha2VBbmRFbWFpbFNjcmVlbnNob3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XG5mdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdzeW5jJyk7XG59XG5leHBvcnRzLnJlZnJlc2ggPSByZWZyZXNoO1xuZnVuY3Rpb24gZ2V0U3luY1N0YXR1cygpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jJywgJ3N0YXR1cycpO1xufVxuZXhwb3J0cy5nZXRTeW5jU3RhdHVzID0gZ2V0U3luY1N0YXR1cztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb25zKCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2NvbGxlY3Rpb25zJyk7XG59XG5leHBvcnRzLmdldENvbGxlY3Rpb25zID0gZ2V0Q29sbGVjdGlvbnM7XG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9uKGlkKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcImNvbGxlY3Rpb25zL1wiICsgaWQsICdpdGVtcycpO1xufVxuZXhwb3J0cy5nZXRDb2xsZWN0aW9uID0gZ2V0Q29sbGVjdGlvbjtcbmZ1bmN0aW9uIGNyZWF0ZUNvbGxlY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb2xsZWN0aW9ucycsIHsgbmFtZTogbmFtZSB9KTtcbn1cbmV4cG9ydHMuY3JlYXRlQ29sbGVjdGlvbiA9IGNyZWF0ZUNvbGxlY3Rpb247XG5mdW5jdGlvbiBhZGRJdGVtVG9Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zXCIsIHsgaWRzOiBbaXRlbUlkXSB9KTtcbn1cbmV4cG9ydHMuYWRkSXRlbVRvQ29sbGVjdGlvbiA9IGFkZEl0ZW1Ub0NvbGxlY3Rpb247XG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb24oY29sbGVjdGlvbklkLCBpdGVtSWQpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXMvXCIgKyBpdGVtSWQpO1xufVxuZXhwb3J0cy5yZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb24gPSByZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb247XG5mdW5jdGlvbiBkZWxldGVDb2xsZWN0aW9uKGlkLCBzaGFyZWQpIHtcbiAgICBpZiAoc2hhcmVkID09PSB2b2lkIDApIHsgc2hhcmVkID0gZmFsc2U7IH1cbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImNvbGxlY3Rpb25zL1wiICsgaWQgKyBcIj9zaGFyZWQ9XCIgKyBzaGFyZWQpO1xufVxuZXhwb3J0cy5kZWxldGVDb2xsZWN0aW9uID0gZGVsZXRlQ29sbGVjdGlvbjtcbmZ1bmN0aW9uIHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkLCBwb3NpdGlvbikge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkICsgXCIvb3JkZXI/cG9zaXRpb249XCIgKyBwb3NpdGlvbik7XG59XG5leHBvcnRzLnJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uID0gcmVvcmRlckl0ZW1JbkNvbGxlY3Rpb247XG5mdW5jdGlvbiByZW5hbWVDb2xsZWN0aW9uKGlkLCBuYW1lKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnB1dChcImNvbGxlY3Rpb25zL1wiICsgaWQsIHsgbmFtZTogbmFtZSB9KTtcbn1cbmV4cG9ydHMucmVuYW1lQ29sbGVjdGlvbiA9IHJlbmFtZUNvbGxlY3Rpb247XG4vLyBVSSBNZXRob2RzXG5mdW5jdGlvbiBzaG93Q29sbGVjdGlvbnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2NvbGxlY3Rpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XG59XG5leHBvcnRzLnNob3dDb2xsZWN0aW9ucyA9IHNob3dDb2xsZWN0aW9ucztcbmZ1bmN0aW9uIHNob3dBZGRUb0NvbGxlY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2FkZC10by1jb2xsZWN0aW9uJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XG59XG5leHBvcnRzLnNob3dBZGRUb0NvbGxlY3Rpb24gPSBzaG93QWRkVG9Db2xsZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xuZnVuY3Rpb24gaXNVbnN1cHBvcnRlZCh1cmwpIHtcbiAgICBpZiAoIWRldmljZV8xLmlzV2ViKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdW5zdXBwb3J0ZWRTdGF0ZW1lbnRzID0gW1xuICAgICAgICAnL2NvbnRyb2wvJyxcbiAgICAgICAgJy9kb3dubG9hZHMnLFxuICAgICAgICAnL29ubGluZS1zdGF0dXMnLFxuICAgICAgICAnL3N5c3RlbS9ncHMnXG4gICAgXTtcbiAgICByZXR1cm4gdW5zdXBwb3J0ZWRTdGF0ZW1lbnRzLnNvbWUoZnVuY3Rpb24gKHN0YXRlbWVudCkgeyByZXR1cm4gdXJsLmluZGV4T2Yoc3RhdGVtZW50KSA+IC0xOyB9KTtcbn1cbmV4cG9ydHMuaXNVbnN1cHBvcnRlZCA9IGlzVW5zdXBwb3J0ZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XG5mdW5jdGlvbiBzaG93Q29udHJvbEJhcnMoKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcbiAgICAgICAgdWk6ICdjb250cm9sLWJhcicsXG4gICAgICAgIHZpc2libGU6IHRydWVcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2hvd0NvbnRyb2xCYXJzID0gc2hvd0NvbnRyb2xCYXJzO1xuZnVuY3Rpb24gaGlkZUNvbnRyb2xCYXJzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xuICAgICAgICB1aTogJ2NvbnRyb2wtYmFyJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICB9KTtcbn1cbmV4cG9ydHMuaGlkZUNvbnRyb2xCYXJzID0gaGlkZUNvbnRyb2xCYXJzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZGV2ZWxvcG1lbnRQcmVmaXggPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XG52YXIgd2ViUHJlZml4ID0gJy9pbnRlcmFjdGl2ZS1hcGkvdjUvJztcbmV4cG9ydHMuZGV2aWNlVHlwZXMgPSB7XG4gICAgZGV2ZWxvcG1lbnQ6ICdkZXZlbG9wbWVudCcsXG4gICAgbW9iaWxlOiAnbW9iaWxlJyxcbiAgICB3ZWI6ICd3ZWInLFxuICAgIGRlc2t0b3A6ICdkZXNrdG9wJ1xufTtcbmZ1bmN0aW9uIGlzV2luZG93czgoKSB7XG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodXNlckFnZW50LmluZGV4T2YoXCJtc2llXCIpICE9PSAtMSkge1xuICAgICAgICBpZiAodXNlckFnZW50LmluZGV4T2YoXCJ3ZWJ2aWV3XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5pc1dpbmRvd3M4ID0gaXNXaW5kb3dzODtcbmZ1bmN0aW9uIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSB7XG4gICAgcmV0dXJuICh3aW5kb3cubG9jYXRpb24uaG9zdC5pbmRleE9mKCdsb2NhbGhvc3Q6ODAwMCcpID4gLTEpO1xufVxuZXhwb3J0cy5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50ID0gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudDtcbmZ1bmN0aW9uIGdldERldmljZVR5cGUoKSB7XG4gICAgaWYgKGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBkZXZpY2VUeXBlQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNwbGl0KCc9JylbMF0udG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdkZXZpY2V0eXBlJzsgfSk7XG4gICAgICAgIGlmIChkZXZpY2VUeXBlQ29va2llLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkZXZpY2VUeXBlQ29va2llWzBdLnNwbGl0KCc9JylbMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5tb2JpbGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmdldERldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlO1xuZXhwb3J0cy5pc1dlYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldERldmljZVR5cGUoKSA9PT0gZXhwb3J0cy5kZXZpY2VUeXBlcy53ZWI7IH07XG5leHBvcnRzLmlzRGVza3RvcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldERldmljZVR5cGUoKSA9PT0gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXNrdG9wOyB9O1xuZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xuICAgIHZhciBkZXZpY2VUeXBlID0gZ2V0RGV2aWNlVHlwZSgpO1xuICAgIHN3aXRjaCAoZGV2aWNlVHlwZSkge1xuICAgICAgICBjYXNlIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ6XG4gICAgICAgICAgICByZXR1cm4gZGV2ZWxvcG1lbnRQcmVmaXg7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gd2ViUHJlZml4O1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0UHJlZml4ID0gZ2V0UHJlZml4O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gc2hvd0Rvd25sb2FkZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2Rvd25sb2FkcycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xufVxuZXhwb3J0cy5zaG93RG93bmxvYWRlciA9IHNob3dEb3dubG9hZGVyO1xuZnVuY3Rpb24gZ2V0RG93bmxvYWRTdGF0dXMoaWQpIHtcbiAgICByZXR1cm4gaWQgPyBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJkb3dubG9hZHMvXCIgKyBpZCArIFwiL3N0YXR1c1wiKSA6IGludGVybmFsTWV0aG9kc18xLmdldCgnZG93bmxvYWRzL3N0YXR1cycpO1xufVxuZXhwb3J0cy5nZXREb3dubG9hZFN0YXR1cyA9IGdldERvd25sb2FkU3RhdHVzO1xuZnVuY3Rpb24gYWRkVG9Eb3dubG9hZGVyKGlkKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2Rvd25sb2FkcycsIHsgaWRzOiBbaWRdIH0pO1xufVxuZXhwb3J0cy5hZGRUb0Rvd25sb2FkZXIgPSBhZGRUb0Rvd25sb2FkZXI7XG5mdW5jdGlvbiByZW1vdmVGcm9tRG93bmxvYWRlcihpZCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiZG93bmxvYWRzL1wiICsgaWQpO1xufVxuZXhwb3J0cy5yZW1vdmVGcm9tRG93bmxvYWRlciA9IHJlbW92ZUZyb21Eb3dubG9hZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XG5mdW5jdGlvbiBlbWJlZChlbGVtZW50LCBpZCwgcGFnZSkge1xuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHZhciBwYWdlQXJnID0gcGFnZSA/IFwiP3BhZ2U9XCIgKyBwYWdlIDogJyc7XG4gICAgICAgIGdldFJlc291cmNlKGkucmVzb3VyY2VVcmwgKyBwYWdlQXJnKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmF0dHIoJ3NyYycsIGkucmVzb3VyY2VVcmwgKyBwYWdlQXJnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmVtYmVkID0gZW1iZWQ7XG5mdW5jdGlvbiBlbWJlZEltYWdlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBvcHRpb25zLnBhZ2UgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NpemUnLCB2YWx1ZTogb3B0aW9ucy5zaXplIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd3aWR0aCcsIHZhbHVlOiBvcHRpb25zLndpZHRoIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdoZWlnaHQnLCB2YWx1ZTogb3B0aW9ucy5oZWlnaHQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21heFdpZHRoJywgdmFsdWU6IG9wdGlvbnMubWF4V2lkdGggfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21heEhlaWdodCcsIHZhbHVlOiBvcHRpb25zLm1heEhlaWdodCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncm90YXRlJywgdmFsdWU6IG9wdGlvbnMucm90YXRlIH0sXG4gICAgICAgIF0uZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4gISF4LnZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIHVybCA9IGkucmVzb3VyY2VVcmw7XG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdXJsICs9ICc/JyArICQucGFyYW0ocGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRSZXNvdXJjZSh1cmwpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0cignc3JjJywgdXJsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmVtYmVkSW1hZ2UgPSBlbWJlZEltYWdlO1xuZnVuY3Rpb24gZ2V0UmVzb3VyY2UodXJsKSB7XG4gICAgcmV0dXJuICQuZ2V0KHVybCkudGhlbihmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgcmV0cnkuXG4gICAgICAgIC8vIGlPUyByZXR1cm5zIDIwMi4gRHVlIHRvIHN5c3RlbSBsaW1pdGF0aW9ucywgQW5kcm9pZCByZXR1cm5zIDIwMCArIGJsYW5rIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDIgfHwgKHJlcXVlc3Quc3RhdHVzID09IDIwMCAmJiAhcmVxdWVzdC5yZXNwb25zZVRleHQpKSB7XG4gICAgICAgICAgICAvLyBTdWdnZXN0ZWQgZGVsYXkgYW1vdW50IGlzIHNldCBpbiB0aGUgUmV0cnktQWZ0ZXIgaGVhZGVyIG9uIGlPUy4gRGVmYXVsdCB0byAzIHNlY29uZHMgaWYgbm90IGZvdW5kLlxuICAgICAgICAgICAgdmFyIGRlbGF5Rm9yID0gcGFyc2VJbnQocmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIlJldHJ5LUFmdGVyXCIpKSB8fCAzO1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZ2V0UmVzb3VyY2UodXJsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpOyB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5Rm9yICogMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gQ29udGVudCByZXRyaWV2ZWQuIFJlc29sdmUgdGhlIHByb21pc2UuXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0RGF0YShpZCkge1xuICAgIHJldHVybiBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gZ2V0UmVzb3VyY2UoaS5yZXNvdXJjZVVybCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldERhdGEgPSBnZXREYXRhO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gb2JqVG9TdHJpbmcob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0ga2V5ICsgJzonICsgb2JqW2tleV0gKyAnLCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LnNsaWNlKDAsIHJlc3VsdC5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHZhciBEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgdmFyIGxpbWl0ID0gMTAwO1xuICAgIHZhciBnZXRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmlsdGVyID0gZW5jb2RlVVJJQ29tcG9uZW50KG9ialRvU3RyaW5nKG9iaikpO1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaXRlbXM/ZmlsdGVyPVwiICsgZmlsdGVyICsgXCImb2Zmc2V0PVwiICsgb2Zmc2V0ICsgXCImbGltaXQ9XCIgKyBsaW1pdClcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgbGltaXQpIHtcbiAgICAgICAgICAgICAgICBEZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gbGltaXQ7XG4gICAgICAgICAgICAgICAgZ2V0UGFnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIERlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGdldFBhZ2UoKTtcbiAgICByZXR1cm4gRGVmZXJyZWQucHJvbWlzZSgpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmlsdGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gZ2V0Rm9sZGVyKGlkKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCArIFwiL2l0ZW1zXCIpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0Rm9sZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gZ2V0R3BzQ29vcmRpbmF0ZXMoKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgJ2dwcycpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0R3BzQ29vcmRpbmF0ZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XG5mdW5jdGlvbiBnZXRJbnRlcmFjdGl2ZUluZm8oKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaW50ZXJhY3RpdmUnKTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEludGVyYWN0aXZlSW5mbztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGRldmljZSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XG52YXIgY29tbWFuZFN1cHBvcnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZFN1cHBvcnQnKTtcbmZ1bmN0aW9uIEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIEludGVyYWN0aXZlc0ludGVyZmFjZSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5mdW5jdGlvbiBnZXQoZnVuYywgcGFyYW0sIGV4cGVjdEpzb24pIHtcbiAgICBpZiAocGFyYW0gPT09IHZvaWQgMCkgeyBwYXJhbSA9IG51bGw7IH1cbiAgICBpZiAoZXhwZWN0SnNvbiA9PT0gdm9pZCAwKSB7IGV4cGVjdEpzb24gPSB0cnVlOyB9XG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYyArIChwYXJhbSA9PT0gbnVsbCA/ICcnIDogJy8nICsgcGFyYW0pO1xuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcbiAgICB9XG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICAgICAgLy8gQ29udGVudCByZXRyaWV2ZWQuIFRyYW5zZm9ybSB0byBKU09OIGlmIHN1cHBvc2VkIHRvLlxuICAgICAgICAgICAgaWYgKGV4cGVjdEpzb24gJiYgcmVxdWVzdCAmJiByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpLmluZGV4T2YoXCJ0ZXh0L2h0bWxcIikgPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgd2FzIHNlbnQgYmFjayBhcyB0ZXh0L2h0bWwgSlNPTi5wYXJzZSBpdCB0byBhIEpTT04gb2JqZWN0LlxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICAgICAgLy8gQ29udGVudCBjb3VsZCBub3QgYmUgcmV0cmlldmVkLiBSZWplY3QgdGhlIHByb21pc2UuXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbn1cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuZnVuY3Rpb24gcG9zdChmdW5jLCBkYXRhKSB7XG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xuICAgIH1cbiAgICBpZiAoSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IEludGVyYWN0aXZlc0ludGVyZmFjZS5wb3N0KHVybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICB2YXIgcmVzdWx0SlNPTiA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG59XG5leHBvcnRzLnBvc3QgPSBwb3N0O1xuZnVuY3Rpb24gZGRlbGV0ZShmdW5jLCBkYXRhKSB7XG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xuICAgIH1cbiAgICBpZiAoSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IEludGVyYWN0aXZlc0ludGVyZmFjZS5kZWxldGUodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHZhciByZXN1bHRKU09OID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0SlNPTi5kYXRhLCByZXN1bHRKU09OLnN0YXR1c10pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xufVxuZXhwb3J0cy5kZGVsZXRlID0gZGRlbGV0ZTtcbmZ1bmN0aW9uIHB1dChmdW5jLCBkYXRhKSB7XG4gICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcbiAgICB9XG4gICAgaWYgKEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBJbnRlcmFjdGl2ZXNJbnRlcmZhY2UucHV0KHVybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICB2YXIgcmVzdWx0SlNPTiA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG59XG5leHBvcnRzLnB1dCA9IHB1dDtcbmZ1bmN0aW9uIHNob3dVSShuYW1lLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIHBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcbiAgICAgICAgdWk6IG5hbWUsXG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuc2hvd1VJID0gc2hvd1VJO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gZ2V0SXRlbShpZCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQpO1xufVxuZXhwb3J0cy5nZXRJdGVtID0gZ2V0SXRlbTtcbmZ1bmN0aW9uIGdldEN1cnJlbnRJdGVtKCkge1xuICAgIHJldHVybiBnZXRJdGVtKCdfX3NlbGZfXycpO1xufVxuZXhwb3J0cy5nZXRDdXJyZW50SXRlbSA9IGdldEN1cnJlbnRJdGVtO1xuZnVuY3Rpb24gZ2V0U2hhcmUoaWQpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkICsgJy9zaGFyZScpO1xufVxuZXhwb3J0cy5nZXRTaGFyZSA9IGdldFNoYXJlO1xuZnVuY3Rpb24gZ2V0TGFzdFZpZXdlZENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9bGFzdC12aWV3ZWQnKTtcbn1cbmV4cG9ydHMuZ2V0TGFzdFZpZXdlZENvbnRlbnQgPSBnZXRMYXN0Vmlld2VkQ29udGVudDtcbmZ1bmN0aW9uIGdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9cmVjZW50bHktY3JlYXRlZCcpO1xufVxuZXhwb3J0cy5nZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50ID0gZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XG52YXIgdXNlTG9jYWxTdG9yYWdlID0gZGV2aWNlXzEuaXNXZWIoKSB8fCBkZXZpY2VfMS5pc0Rlc2t0b3AoKTtcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XG4gICAgICAgICAgICB2YXIgYWxsID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYga2V5IHN0YXJ0c3dpdGggcHJlZml4XG4gICAgICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGlzLCBbYWxsLCAyMDBdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaW5mbz9wcmVmaXg9XCIgKyBwcmVmaXgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHZhciBhbGwgPSB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkLndoZW4oYWxsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2luZm8nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRWYWx1ZXMocHJlZml4KSB7XG4gICAgaWYgKHByZWZpeCkge1xuICAgICAgICAvLyBHZXQgdmFsdWVzIHdpdGggc3BlY2lmaWVkIHByZWZpeFxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0VmFsdWVzID0gZ2V0VmFsdWVzO1xuZnVuY3Rpb24gZ2V0VmFsdWUoa2V5KSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgJ0ludmFsaWQga2V5IHByb3ZpZGVkJztcbiAgICB9XG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZChmdW5jdGlvbiAoZGZkKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFt2YWx1ZSwgMjAwXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZmQucmVqZWN0V2l0aCh0aGlzLCBbdmFsdWUsIDQwNF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpbmZvXCIsIGtleSwgZmFsc2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0VmFsdWUgPSBnZXRWYWx1ZTtcbmZ1bmN0aW9uIHB1dFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgICB0aHJvdyAnSW52YWxpZCBrZXkgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFsnJywgMjAwXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJpbmZvXCIsIFt7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfV0pO1xuICAgIH1cbn1cbmV4cG9ydHMucHV0VmFsdWUgPSBwdXRWYWx1ZTtcbmZ1bmN0aW9uIGRlbGV0ZUtleShrZXkpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgICB0aHJvdyAnSW52YWxpZCBrZXkgcHJvdmlkZWQnO1xuICAgIH1cbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImluZm8vXCIgKyBrZXkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVsZXRlS2V5ID0gZGVsZXRlS2V5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xuZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL2JhY2snO1xufVxuZXhwb3J0cy5jbG9zZSA9IGNsb3NlO1xuZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvaXRlbXMvX19zZWxmX18vbmV4dCc7XG59XG5leHBvcnRzLm5leHQgPSBuZXh0O1xuZnVuY3Rpb24gcHJldmlvdXMoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL3ByZXZpb3VzJztcbn1cbmV4cG9ydHMucHJldmlvdXMgPSBwcmV2aW91cztcbmZ1bmN0aW9uIG9wZW5JdGVtKGlkLCBib29rbWFyaykge1xuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSB7fTtcbiAgICAgICAgdmFyIHVybCA9IGl0ZW0udXJsO1xuICAgICAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSB8fCBkZXZpY2VfMS5pc0Rlc2t0b3AoKSkge1xuICAgICAgICAgICAgcGFyYW1zWydyZXR1cm51cmwnXSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib29rbWFyaykge1xuICAgICAgICAgICAgcGFyYW1zWydib29rbWFyayddID0gYm9va21hcms7XG4gICAgICAgIH1cbiAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgJC5wYXJhbShwYXJhbXMpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgdXJsO1xuICAgIH0pO1xufVxuZXhwb3J0cy5vcGVuSXRlbSA9IG9wZW5JdGVtO1xuZXhwb3J0cy5vcGVuID0gb3Blbkl0ZW07XG5mdW5jdGlvbiBvcGVuRm9sZGVyKGlkKSB7XG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBpdGVtLnVybDtcbiAgICB9KTtcbn1cbmV4cG9ydHMub3BlbkZvbGRlciA9IG9wZW5Gb2xkZXI7XG5mdW5jdGlvbiBnb3RvKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2dvdG8gbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XG59XG5leHBvcnRzLmdvdG8gPSBnb3RvO1xuZnVuY3Rpb24gYnJvd3NlKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2Jyb3dzZSBtZXRob2QgaXMgbm93IGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugb3Blbkl0ZW0gZ29pbmcgZm9yd2FyZC4nKTtcbn1cbmV4cG9ydHMuYnJvd3NlID0gYnJvd3NlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gYWRkTm90aWZpY2F0aW9uKGlkKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xufVxuZXhwb3J0cy5hZGROb3RpZmljYXRpb24gPSBhZGROb3RpZmljYXRpb247XG5mdW5jdGlvbiByZW1vdmVOb3RpZmljYXRpb24oaWQpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XG59XG5leHBvcnRzLnJlbW92ZU5vdGlmaWNhdGlvbiA9IHJlbW92ZU5vdGlmaWNhdGlvbjtcbmZ1bmN0aW9uIGdldE5vdGlmaWNhdGlvblN0YXR1cyhpZCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xufVxuZXhwb3J0cy5nZXROb3RpZmljYXRpb25TdGF0dXMgPSBnZXROb3RpZmljYXRpb25TdGF0dXM7XG5mdW5jdGlvbiBzaG93Tm90aWZpY2F0aW9uTWFuYWdlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnbm90aWZpY2F0aW9ucycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xufVxuZXhwb3J0cy5zaG93Tm90aWZpY2F0aW9uTWFuYWdlciA9IHNob3dOb3RpZmljYXRpb25NYW5hZ2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gZ2V0T25saW5lU3RhdHVzKGFyZ3VtZW50KSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgJ29ubGluZS1zdGF0dXMnKTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldE9ubGluZVN0YXR1cztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5mdW5jdGlvbiBvcGVuV2luZG93KHVybCkge1xuICAgIHJldHVybiB3aW5kb3cub3Blbih1cmwsIFwiSW50ZXJhY3RpdmVzV2luZG93XCIgKyB1dGlsc18xLmd1aWQoKSk7XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBvcGVuV2luZG93O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gcG9zdEFjdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2FjdGlvbnMnLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMucG9zdEFjdGlvbiA9IHBvc3RBY3Rpb247XG5mdW5jdGlvbiBwb3N0UGFnZVZpZXcoaWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIHtcbiAgICAgICAgdHlwZTogJ2RvY3VtZW50JyxcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBwYWdlOiBwYWdlXG4gICAgfSk7XG59XG5leHBvcnRzLnBvc3RQYWdlVmlldyA9IHBvc3RQYWdlVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcbmZ1bmN0aW9uIHBvc3RFdmVudChrZXksIHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImV2ZW50c1wiLCB7IGtleToga2V5LCBwcm9wZXJ0aWVzOiBKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzKSB9KTtcbn1cbmV4cG9ydHMucG9zdEV2ZW50ID0gcG9zdEV2ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xuZnVuY3Rpb24gc2VhcmNoKHRlcm0sIG9mZnNldCwgbGltaXQpIHtcbiAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxuICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gMTAwOyB9XG4gICAgdmFyIGRmZDEgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBvYmogPSB7XG4gICAgICAgIHRlcm06IHRlcm0sXG4gICAgICAgIG9mZnNldDogb2Zmc2V0LFxuICAgICAgICBsaW1pdDogbGltaXRcbiAgICB9O1xuICAgIHZhciBnZXRQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcXMgPSAkLnBhcmFtKG9iaik7XG4gICAgICAgIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXM/JyArIHFzKVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBvYmoubGltaXQpIHtcbiAgICAgICAgICAgICAgICBkZmQxLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iai5vZmZzZXQgKz0gb2JqLmxpbWl0O1xuICAgICAgICAgICAgICAgIGdldFBhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZmQxLnJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGdldFBhZ2UoKTtcbiAgICByZXR1cm4gZGZkMS5wcm9taXNlKCk7XG59XG5leHBvcnRzLnNlYXJjaCA9IHNlYXJjaDtcbmZ1bmN0aW9uIHNob3dTZWFyY2goeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ3NlYXJjaCcsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xufVxuZXhwb3J0cy5zaG93U2VhcmNoID0gc2hvd1NlYXJjaDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcInN5bmNlZGluZm8/cHJlZml4PVwiICsgcHJlZml4KTtcbn1cbmZ1bmN0aW9uIGdldEFsbFZhbHVlcygpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jZWRpbmZvJyk7XG59XG5mdW5jdGlvbiBnZXRTeW5jZWRWYWx1ZXMocHJlZml4KSB7XG4gICAgaWYgKHByZWZpeCkge1xuICAgICAgICAvLyBHZXQgdmFsdWVzIHdpdGggc3BlY2lmaWVkIHByZWZpeFxuICAgICAgICByZXR1cm4gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEFsbFZhbHVlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U3luY2VkVmFsdWVzID0gZ2V0U3luY2VkVmFsdWVzO1xuZnVuY3Rpb24gZ2V0U3luY2VkVmFsdWUoa2V5KSB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgJ0ludmFsaWQga2V5IHByb3ZpZGVkJztcbiAgICB9XG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3luY2VkaW5mbycsIGtleSwgZmFsc2UpO1xufVxuZXhwb3J0cy5nZXRTeW5jZWRWYWx1ZSA9IGdldFN5bmNlZFZhbHVlO1xuZnVuY3Rpb24gcHV0U3luY2VkVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHRocm93ICdJbnZhbGlkIGtleSBwcm92aWRlZCc7XG4gICAgfVxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwic3luY2VkaW5mb1wiLCBbeyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH1dKTtcbn1cbmV4cG9ydHMucHV0U3luY2VkVmFsdWUgPSBwdXRTeW5jZWRWYWx1ZTtcbmZ1bmN0aW9uIGRlbGV0ZVN5bmNlZEtleShrZXkpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgICB0aHJvdyAnSW52YWxpZCBrZXkgcHJvdmlkZWQnO1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcInN5bmNlZGluZm9cIiwgW2tleV0pO1xufVxuZXhwb3J0cy5kZWxldGVTeW5jZWRLZXkgPSBkZWxldGVTeW5jZWRLZXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XG5mdW5jdGlvbiBnZXRTeXN0ZW1JbmZvKCkge1xuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0U3lzdGVtSW5mbztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcbmZ1bmN0aW9uIGdldFVwbG9hZFVybChrZXkpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nLCBcInVwbG9hZHVybD9rZXk9XCIgKyBrZXkpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0VXBsb2FkVXJsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBndWlkKCkge1xuICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbn1cbmV4cG9ydHMuZ3VpZCA9IGd1aWQ7XG4iLCIvKipcbiAqIChjKSAyMDEzLTIwMTYsIE1lZGlhZmx5LCBJbmMuXG4gKiBtZmx5Q29tbWFuZHMgaXMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugd2hpY2ggd3JhcHMgY29tbW9uIG1mbHkgY2FsbHMgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQmVmb3JlIHVzZSwgcGxlYXNlIGJlIHN1cmUgdG8gY2FsbCBzZXRQcmVmaXggaWYgeW91IGFyZSB3b3JraW5nIG9uIGEgZGV2ZWxvcG1lbnQgcGxhdGZvcm0gKGUuZy5cbiAqIGEgbG9jYWwgd2Vic2VydmVyIG9uIGEgUEMpIGZvciBleGFtcGxlLCBodHRwOi8vbG9jYWxob3N0OjgwMDAvIC5cbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgaW50ZXJhY3RpdmVJbmZvXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mbycpO1xudmFyIHN5c3RlbUluZm9fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc3lzdGVtSW5mbycpO1xudmFyIG9ubGluZVN0YXR1c18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9vbmxpbmVTdGF0dXMnKTtcbnZhciB1cGxvYWRVcmxfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvdXBsb2FkVXJsJyk7XG52YXIgaXRlbSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvaXRlbScpO1xudmFyIGNvbGxlY3Rpb25zID0gcmVxdWlyZSgnLi9jb21tYW5kcy9jb2xsZWN0aW9ucycpO1xudmFyIGZvbGRlcl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9mb2xkZXInKTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZmlsdGVyJyk7XG52YXIgZ3BzQ29vcmRpbmF0ZXNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMnKTtcbnZhciBzZWFyY2hfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc2VhcmNoJyk7XG52YXIgbmF2aWdhdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9uYXZpZ2F0aW9uJyk7XG52YXIgZG93bmxvYWRlciA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZG93bmxvYWRlcicpO1xudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbm90aWZpY2F0aW9uJyk7XG52YXIgYWNjb3VudEluZm8gPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FjY291bnRJbmZvJyk7XG52YXIgbG9jYWxLZXlWYWx1ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2xvY2FsS2V5VmFsdWVTdG9yYWdlJyk7XG52YXIgc3luY2VkS2V5VmFsdWVTdG9yYWdlID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zeW5jZWRLZXlWYWx1ZVN0b3JhZ2UnKTtcbnZhciBhcHBsaWNhdGlvblN5bmMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FwcGxpY2F0aW9uU3luYycpO1xudmFyIG5hdmlnYXRpb24gPSByZXF1aXJlKCcuL2NvbW1hbmRzL25hdmlnYXRpb24nKTtcbnZhciBhcHBGZWF0dXJlcyA9IHJlcXVpcmUoJy4vY29tbWFuZHMvYXBwRmVhdHVyZXMnKTtcbnZhciBjb250cm9sc18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9jb250cm9scycpO1xudmFyIGVtYmVkXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2VtYmVkJyk7XG52YXIgcG9zdEFjdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9wb3N0QWN0aW9uJyk7XG52YXIgcG9zdEV2ZW50XzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3Bvc3RFdmVudCcpO1xudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9kZXZpY2UnKTtcbnZhciBvcGVuV2luZG93XzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL29wZW5XaW5kb3cnKTtcbnZhciBtZmx5Q29tbWFuZHMgPSB7XG4gICAgY2xvc2U6IG5hdmlnYXRpb25fMS5jbG9zZSxcbiAgICBnZXRJbnRlcmFjdGl2ZUluZm86IGludGVyYWN0aXZlSW5mb18xLmRlZmF1bHQsXG4gICAgZ2V0U3lzdGVtSW5mbzogc3lzdGVtSW5mb18xLmRlZmF1bHQsXG4gICAgZ2V0T25saW5lU3RhdHVzOiBvbmxpbmVTdGF0dXNfMS5kZWZhdWx0LFxuICAgIGdldEdwc0Nvb3JkaW5hdGVzOiBncHNDb29yZGluYXRlc18xLmRlZmF1bHQsXG4gICAgZ2V0VXBsb2FkVXJsOiB1cGxvYWRVcmxfMS5kZWZhdWx0LFxuICAgIGdldEZvbGRlcjogZm9sZGVyXzEuZGVmYXVsdCxcbiAgICBmaWx0ZXI6IGZpbHRlcl8xLmRlZmF1bHQsXG4gICAgc2VhcmNoOiBzZWFyY2hfMS5zZWFyY2gsXG4gICAgc2hvd1NlYXJjaDogc2VhcmNoXzEuc2hvd1NlYXJjaCxcbiAgICBoaWRlQ29udHJvbEJhcnM6IGNvbnRyb2xzXzEuaGlkZUNvbnRyb2xCYXJzLFxuICAgIHNob3dDb250cm9sQmFyczogY29udHJvbHNfMS5zaG93Q29udHJvbEJhcnMsXG4gICAgZW1iZWQ6IGVtYmVkXzEuZW1iZWQsXG4gICAgZW1iZWRJbWFnZTogZW1iZWRfMS5lbWJlZEltYWdlLFxuICAgIGdldERhdGE6IGVtYmVkXzEuZ2V0RGF0YSxcbiAgICBnZXREZXZpY2VUeXBlOiBkZXZpY2VfMS5nZXREZXZpY2VUeXBlLFxuICAgIGdldFByZWZpeDogZGV2aWNlXzEuZ2V0UHJlZml4LFxuICAgIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQ6IGRldmljZV8xLmlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQsXG4gICAgaXNXaW5kb3dzODogZGV2aWNlXzEuaXNXaW5kb3dzOCxcbiAgICBvcGVuV2luZG93OiBvcGVuV2luZG93XzEuZGVmYXVsdCxcbiAgICBwb3N0QWN0aW9uOiBwb3N0QWN0aW9uXzEucG9zdEFjdGlvbixcbiAgICBwb3N0UGFnZVZpZXc6IHBvc3RBY3Rpb25fMS5wb3N0UGFnZVZpZXcsXG4gICAgcG9zdEV2ZW50OiBwb3N0RXZlbnRfMS5wb3N0RXZlbnQsXG59O1xuJC5leHRlbmQobWZseUNvbW1hbmRzLCBpdGVtKTtcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgY29sbGVjdGlvbnMpO1xuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgbm90aWZpY2F0aW9uKTtcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgYWNjb3VudEluZm8pO1xuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIHN5bmNlZEtleVZhbHVlU3RvcmFnZSk7XG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcGxpY2F0aW9uU3luYyk7XG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBGZWF0dXJlcyk7XG5tb2R1bGUuZXhwb3J0cyA9IG1mbHlDb21tYW5kcztcbiJdfQ==
