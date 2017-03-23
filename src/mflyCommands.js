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

},{"./internalMethods":15}],2:[function(require,module,exports){
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

},{"./internalMethods":15}],3:[function(require,module,exports){
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

},{"./internalMethods":15}],4:[function(require,module,exports){
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

},{"./internalMethods":15}],5:[function(require,module,exports){
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

},{"./internalMethods":15}],7:[function(require,module,exports){
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

},{"./internalMethods":15}],9:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function sendEmail(options) {
    return internalMethods_1.post('email', options);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendEmail;

},{"./internalMethods":15}],10:[function(require,module,exports){
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

},{"./item":16}],11:[function(require,module,exports){
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

},{"./internalMethods":15}],12:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getFolder(id) {
    return internalMethods_1.get('items', id + "/items");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolder;

},{"./internalMethods":15}],13:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getGpsCoordinates() {
    return internalMethods_1.get('system', 'gps');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGpsCoordinates;

},{"./internalMethods":15}],14:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getInteractiveInfo() {
    return internalMethods_1.get('interactive');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInteractiveInfo;

},{"./internalMethods":15}],15:[function(require,module,exports){
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
        if (resultJSON.status === 200) {
            deferred.resolveWith(this, [resultJSON.data, resultJSON.status]);
        }
        else {
            deferred.rejectWith(this, [resultJSON.data, resultJSON.status]);
        }
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

},{"./commandSupport":5,"./device":7}],16:[function(require,module,exports){
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

},{"./internalMethods":15}],17:[function(require,module,exports){
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
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
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
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
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
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
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

},{"./device":7,"./internalMethods":15}],18:[function(require,module,exports){
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

},{"./device":7,"./item":16}],19:[function(require,module,exports){
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

},{"./internalMethods":15}],20:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getOnlineStatus(argument) {
    return internalMethods_1.get('system', 'online-status');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOnlineStatus;

},{"./internalMethods":15}],21:[function(require,module,exports){
"use strict";
var utils_1 = require('./utils');
function openWindow(url) {
    return window.open(url, "InteractivesWindow" + utils_1.guid());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = openWindow;

},{"./utils":28}],22:[function(require,module,exports){
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

},{"./internalMethods":15}],23:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postEvent(key, properties) {
    return internalMethods_1.post("events", { key: key, properties: JSON.stringify(properties) });
}
exports.postEvent = postEvent;

},{"./internalMethods":15}],24:[function(require,module,exports){
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

},{"./internalMethods":15}],25:[function(require,module,exports){
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
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    return internalMethods_1.get('syncedinfo', key, false);
}
exports.getSyncedValue = getSyncedValue;
function putSyncedValue(key, value) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    return internalMethods_1.post("syncedinfo", [{ key: key, value: value }]);
}
exports.putSyncedValue = putSyncedValue;
function deleteSyncedKey(key) {
    if (!key) {
        return $.Deferred().rejectWith(this, ['Invalid key provided', 500]);
    }
    return internalMethods_1.ddelete("syncedinfo", [key]);
}
exports.deleteSyncedKey = deleteSyncedKey;

},{"./internalMethods":15}],26:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.get('system');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":15}],27:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":15}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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
var email_1 = require('./commands/email');
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
    sendEmail: email_1.default,
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

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/collections":4,"./commands/controls":6,"./commands/device":7,"./commands/downloader":8,"./commands/email":9,"./commands/embed":10,"./commands/filter":11,"./commands/folder":12,"./commands/gpsCoordinates":13,"./commands/interactiveInfo":14,"./commands/item":16,"./commands/localKeyValueStorage":17,"./commands/navigation":18,"./commands/notification":19,"./commands/onlineStatus":20,"./commands/openWindow":21,"./commands/postAction":22,"./commands/postEvent":23,"./commands/search":24,"./commands/syncedKeyValueStorage":25,"./commands/systemInfo":26,"./commands/uploadUrl":27}]},{},[29])(29)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudGVtcC9jb21tYW5kcy9hY2NvdW50SW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2FwcEZlYXR1cmVzLmpzIiwiLnRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwiLnRlbXAvY29tbWFuZHMvY29sbGVjdGlvbnMuanMiLCIudGVtcC9jb21tYW5kcy9jb21tYW5kU3VwcG9ydC5qcyIsIi50ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwiLnRlbXAvY29tbWFuZHMvZGV2aWNlLmpzIiwiLnRlbXAvY29tbWFuZHMvZG93bmxvYWRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2VtYWlsLmpzIiwiLnRlbXAvY29tbWFuZHMvZW1iZWQuanMiLCIudGVtcC9jb21tYW5kcy9maWx0ZXIuanMiLCIudGVtcC9jb21tYW5kcy9mb2xkZXIuanMiLCIudGVtcC9jb21tYW5kcy9ncHNDb29yZGluYXRlcy5qcyIsIi50ZW1wL2NvbW1hbmRzL2ludGVyYWN0aXZlSW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2ludGVybmFsTWV0aG9kcy5qcyIsIi50ZW1wL2NvbW1hbmRzL2l0ZW0uanMiLCIudGVtcC9jb21tYW5kcy9sb2NhbEtleVZhbHVlU3RvcmFnZS5qcyIsIi50ZW1wL2NvbW1hbmRzL25hdmlnYXRpb24uanMiLCIudGVtcC9jb21tYW5kcy9ub3RpZmljYXRpb24uanMiLCIudGVtcC9jb21tYW5kcy9vbmxpbmVTdGF0dXMuanMiLCIudGVtcC9jb21tYW5kcy9vcGVuV2luZG93LmpzIiwiLnRlbXAvY29tbWFuZHMvcG9zdEFjdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL3Bvc3RFdmVudC5qcyIsIi50ZW1wL2NvbW1hbmRzL3NlYXJjaC5qcyIsIi50ZW1wL2NvbW1hbmRzL3N5bmNlZEtleVZhbHVlU3RvcmFnZS5qcyIsIi50ZW1wL2NvbW1hbmRzL3N5c3RlbUluZm8uanMiLCIudGVtcC9jb21tYW5kcy91cGxvYWRVcmwuanMiLCIudGVtcC9jb21tYW5kcy91dGlscy5qcyIsIi50ZW1wL21mbHlDb21tYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFVzZXJJbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnYWNjb3VudCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0VXNlckluZm8gPSBnZXRVc2VySW5mbztcclxuZnVuY3Rpb24gbG9nb3V0KCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2FjY291bnQvbG9nb3V0JztcclxufVxyXG5leHBvcnRzLmxvZ291dCA9IGxvZ291dDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNob3dTZXR0aW5ncyh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdhcHAtc2V0dGluZ3MnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dTZXR0aW5ncyA9IHNob3dTZXR0aW5ncztcclxuZnVuY3Rpb24gc2hvd1VzZXJNYW5hZ2VtZW50KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ3VzZXItbWFuYWdlbWVudCcsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd1VzZXJNYW5hZ2VtZW50ID0gc2hvd1VzZXJNYW5hZ2VtZW50O1xyXG5mdW5jdGlvbiBzaG93U2Vjb25kU2NyZWVuT3B0aW9ucygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7IHVpOiAnc2Vjb25kLXNjcmVlbicgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93U2Vjb25kU2NyZWVuT3B0aW9ucyA9IHNob3dTZWNvbmRTY3JlZW5PcHRpb25zO1xyXG5mdW5jdGlvbiBlbWFpbChpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvZW1haWwnLCB7IGlkOiBpZCB9KTtcclxufVxyXG5leHBvcnRzLmVtYWlsID0gZW1haWw7XHJcbmZ1bmN0aW9uIGNvbXBvc2VFbWFpbChvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9jb21wb3NlLWVtYWlsJywgb3B0aW9ucyk7XHJcbn1cclxuZXhwb3J0cy5jb21wb3NlRW1haWwgPSBjb21wb3NlRW1haWw7XHJcbmZ1bmN0aW9uIHNob3dBbm5vdGF0aW9ucygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7IHVpOiAnYW5ub3RhdGlvbnMnIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd0Fubm90YXRpb25zID0gc2hvd0Fubm90YXRpb25zO1xyXG5mdW5jdGlvbiB0YWtlQW5kRW1haWxTY3JlZW5zaG90KCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvZW1haWwtc2NyZWVuc2hvdCcpO1xyXG59XHJcbmV4cG9ydHMudGFrZUFuZEVtYWlsU2NyZWVuc2hvdCA9IHRha2VBbmRFbWFpbFNjcmVlbnNob3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiByZWZyZXNoKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ3N5bmMnKTtcclxufVxyXG5leHBvcnRzLnJlZnJlc2ggPSByZWZyZXNoO1xyXG5mdW5jdGlvbiBnZXRTeW5jU3RhdHVzKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3luYycsICdzdGF0dXMnKTtcclxufVxyXG5leHBvcnRzLmdldFN5bmNTdGF0dXMgPSBnZXRTeW5jU3RhdHVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdjb2xsZWN0aW9ucycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q29sbGVjdGlvbnMgPSBnZXRDb2xsZWN0aW9ucztcclxuZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcImNvbGxlY3Rpb25zL1wiICsgaWQsICdpdGVtcycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Q29sbGVjdGlvbiA9IGdldENvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbGxlY3Rpb24obmFtZSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbGxlY3Rpb25zJywgeyBuYW1lOiBuYW1lIH0pO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlQ29sbGVjdGlvbiA9IGNyZWF0ZUNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIGFkZEl0ZW1Ub0NvbGxlY3Rpb24oY29sbGVjdGlvbklkLCBpdGVtSWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwiY29sbGVjdGlvbnMvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9pdGVtc1wiLCB7IGlkczogW2l0ZW1JZF0gfSk7XHJcbn1cclxuZXhwb3J0cy5hZGRJdGVtVG9Db2xsZWN0aW9uID0gYWRkSXRlbVRvQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gcmVtb3ZlSXRlbUZyb21Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXMvXCIgKyBpdGVtSWQpO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlSXRlbUZyb21Db2xsZWN0aW9uID0gcmVtb3ZlSXRlbUZyb21Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiBkZWxldGVDb2xsZWN0aW9uKGlkLCBzaGFyZWQpIHtcclxuICAgIGlmIChzaGFyZWQgPT09IHZvaWQgMCkgeyBzaGFyZWQgPSBmYWxzZTsgfVxyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJjb2xsZWN0aW9ucy9cIiArIGlkICsgXCI/c2hhcmVkPVwiICsgc2hhcmVkKTtcclxufVxyXG5leHBvcnRzLmRlbGV0ZUNvbGxlY3Rpb24gPSBkZWxldGVDb2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW9yZGVySXRlbUluQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCwgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zL1wiICsgaXRlbUlkICsgXCIvb3JkZXI/cG9zaXRpb249XCIgKyBwb3NpdGlvbik7XHJcbn1cclxuZXhwb3J0cy5yZW9yZGVySXRlbUluQ29sbGVjdGlvbiA9IHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW5hbWVDb2xsZWN0aW9uKGlkLCBuYW1lKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucHV0KFwiY29sbGVjdGlvbnMvXCIgKyBpZCwgeyBuYW1lOiBuYW1lIH0pO1xyXG59XHJcbmV4cG9ydHMucmVuYW1lQ29sbGVjdGlvbiA9IHJlbmFtZUNvbGxlY3Rpb247XHJcbi8vIFVJIE1ldGhvZHNcclxuZnVuY3Rpb24gc2hvd0NvbGxlY3Rpb25zKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2NvbGxlY3Rpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93Q29sbGVjdGlvbnMgPSBzaG93Q29sbGVjdGlvbnM7XHJcbmZ1bmN0aW9uIHNob3dBZGRUb0NvbGxlY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnYWRkLXRvLWNvbGxlY3Rpb24nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dBZGRUb0NvbGxlY3Rpb24gPSBzaG93QWRkVG9Db2xsZWN0aW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuZnVuY3Rpb24gaXNVbnN1cHBvcnRlZCh1cmwpIHtcclxuICAgIGlmICghZGV2aWNlXzEuaXNXZWIoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciB1bnN1cHBvcnRlZFN0YXRlbWVudHMgPSBbXHJcbiAgICAgICAgJy9jb250cm9sLycsXHJcbiAgICAgICAgJy9kb3dubG9hZHMnLFxyXG4gICAgICAgICcvb25saW5lLXN0YXR1cycsXHJcbiAgICAgICAgJy9zeXN0ZW0vZ3BzJ1xyXG4gICAgXTtcclxuICAgIHJldHVybiB1bnN1cHBvcnRlZFN0YXRlbWVudHMuc29tZShmdW5jdGlvbiAoc3RhdGVtZW50KSB7IHJldHVybiB1cmwuaW5kZXhPZihzdGF0ZW1lbnQpID4gLTE7IH0pO1xyXG59XHJcbmV4cG9ydHMuaXNVbnN1cHBvcnRlZCA9IGlzVW5zdXBwb3J0ZWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzaG93Q29udHJvbEJhcnMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiAnY29udHJvbC1iYXInLFxyXG4gICAgICAgIHZpc2libGU6IHRydWVcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd0NvbnRyb2xCYXJzID0gc2hvd0NvbnRyb2xCYXJzO1xyXG5mdW5jdGlvbiBoaWRlQ29udHJvbEJhcnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHtcclxuICAgICAgICB1aTogJ2NvbnRyb2wtYmFyJyxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5oaWRlQ29udHJvbEJhcnMgPSBoaWRlQ29udHJvbEJhcnM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2ZWxvcG1lbnRQcmVmaXggPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwLyc7XHJcbnZhciB3ZWJQcmVmaXggPSAnL2ludGVyYWN0aXZlLWFwaS92NS8nO1xyXG5leHBvcnRzLmRldmljZVR5cGVzID0ge1xyXG4gICAgZGV2ZWxvcG1lbnQ6ICdkZXZlbG9wbWVudCcsXHJcbiAgICBtb2JpbGU6ICdtb2JpbGUnLFxyXG4gICAgd2ViOiAnd2ViJyxcclxuICAgIGRlc2t0b3A6ICdkZXNrdG9wJ1xyXG59O1xyXG5mdW5jdGlvbiBpc1dpbmRvd3M4KCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIm1zaWVcIikgIT09IC0xKSB7XHJcbiAgICAgICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKFwid2Vidmlld1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNXaW5kb3dzOCA9IGlzV2luZG93czg7XHJcbmZ1bmN0aW9uIGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQoKSB7XHJcbiAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdDo4MDAwJykgPiAtMSk7XHJcbn1cclxuZXhwb3J0cy5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50ID0gaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudDtcclxuZnVuY3Rpb24gZ2V0RGV2aWNlVHlwZSgpIHtcclxuICAgIGlmIChpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50KCkpIHtcclxuICAgICAgICByZXR1cm4gZXhwb3J0cy5kZXZpY2VUeXBlcy5kZXZlbG9wbWVudDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkZXZpY2VUeXBlQ29va2llID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNwbGl0KCc9JylbMF0udG9Mb3dlckNhc2UoKS50cmltKCkgPT09ICdkZXZpY2V0eXBlJzsgfSk7XHJcbiAgICAgICAgaWYgKGRldmljZVR5cGVDb29raWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlVHlwZUNvb2tpZVswXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGV2aWNlVHlwZXMubW9iaWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldERldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlO1xyXG5leHBvcnRzLmlzV2ViID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0RGV2aWNlVHlwZSgpID09PSBleHBvcnRzLmRldmljZVR5cGVzLndlYjsgfTtcclxuZXhwb3J0cy5pc0Rlc2t0b3AgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXREZXZpY2VUeXBlKCkgPT09IGV4cG9ydHMuZGV2aWNlVHlwZXMuZGVza3RvcDsgfTtcclxuZnVuY3Rpb24gZ2V0UHJlZml4KCkge1xyXG4gICAgdmFyIGRldmljZVR5cGUgPSBnZXREZXZpY2VUeXBlKCk7XHJcbiAgICBzd2l0Y2ggKGRldmljZVR5cGUpIHtcclxuICAgICAgICBjYXNlIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ6XHJcbiAgICAgICAgICAgIHJldHVybiBkZXZlbG9wbWVudFByZWZpeDtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gd2ViUHJlZml4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0UHJlZml4ID0gZ2V0UHJlZml4O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd0Rvd25sb2FkZXIoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnZG93bmxvYWRzJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93RG93bmxvYWRlciA9IHNob3dEb3dubG9hZGVyO1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGlkID8gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiZG93bmxvYWRzL1wiICsgaWQgKyBcIi9zdGF0dXNcIikgOiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2Rvd25sb2Fkcy9zdGF0dXMnKTtcclxufVxyXG5leHBvcnRzLmdldERvd25sb2FkU3RhdHVzID0gZ2V0RG93bmxvYWRTdGF0dXM7XHJcbmZ1bmN0aW9uIGFkZFRvRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2Rvd25sb2FkcycsIHsgaWRzOiBbaWRdIH0pO1xyXG59XHJcbmV4cG9ydHMuYWRkVG9Eb3dubG9hZGVyID0gYWRkVG9Eb3dubG9hZGVyO1xyXG5mdW5jdGlvbiByZW1vdmVGcm9tRG93bmxvYWRlcihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJkb3dubG9hZHMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVGcm9tRG93bmxvYWRlciA9IHJlbW92ZUZyb21Eb3dubG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2VuZEVtYWlsKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdlbWFpbCcsIG9wdGlvbnMpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gc2VuZEVtYWlsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGl0ZW1fMSA9IHJlcXVpcmUoJy4vaXRlbScpO1xyXG5mdW5jdGlvbiBlbWJlZChlbGVtZW50LCBpZCwgcGFnZSkge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgcGFnZUFyZyA9IHBhZ2UgPyBcIj9wYWdlPVwiICsgcGFnZSA6ICcnO1xyXG4gICAgICAgIGdldFJlc291cmNlKGkucmVzb3VyY2VVcmwgKyBwYWdlQXJnKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0cignc3JjJywgaS5yZXNvdXJjZVVybCArIHBhZ2VBcmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5lbWJlZCA9IGVtYmVkO1xyXG5mdW5jdGlvbiBlbWJlZEltYWdlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBwYXJhbXMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bvc2l0aW9uJywgdmFsdWU6IG9wdGlvbnMucGFnZSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdzaXplJywgdmFsdWU6IG9wdGlvbnMuc2l6ZSB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICd3aWR0aCcsIHZhbHVlOiBvcHRpb25zLndpZHRoIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ2hlaWdodCcsIHZhbHVlOiBvcHRpb25zLmhlaWdodCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhXaWR0aCcsIHZhbHVlOiBvcHRpb25zLm1heFdpZHRoIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ21heEhlaWdodCcsIHZhbHVlOiBvcHRpb25zLm1heEhlaWdodCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdyb3RhdGUnLCB2YWx1ZTogb3B0aW9ucy5yb3RhdGUgfSxcclxuICAgICAgICBdLmZpbHRlcihmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF4LnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgdXJsID0gaS5yZXNvdXJjZVVybDtcclxuICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdXJsICs9ICc/JyArICQucGFyYW0ocGFyYW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0UmVzb3VyY2UodXJsKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuYXR0cignc3JjJywgdXJsKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1iZWRJbWFnZSA9IGVtYmVkSW1hZ2U7XHJcbmZ1bmN0aW9uIGdldFJlc291cmNlKHVybCkge1xyXG4gICAgcmV0dXJuICQuZ2V0KHVybCkudGhlbihmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgIC8vIENoZWNrIGZvciByZXRyeS5cclxuICAgICAgICAvLyBpT1MgcmV0dXJucyAyMDIuIER1ZSB0byBzeXN0ZW0gbGltaXRhdGlvbnMsIEFuZHJvaWQgcmV0dXJucyAyMDAgKyBibGFuayByZXNwb25zZSBib2R5XHJcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDIgfHwgKHJlcXVlc3Quc3RhdHVzID09IDIwMCAmJiAhcmVxdWVzdC5yZXNwb25zZVRleHQpKSB7XHJcbiAgICAgICAgICAgIC8vIFN1Z2dlc3RlZCBkZWxheSBhbW91bnQgaXMgc2V0IGluIHRoZSBSZXRyeS1BZnRlciBoZWFkZXIgb24gaU9TLiBEZWZhdWx0IHRvIDMgc2Vjb25kcyBpZiBub3QgZm91bmQuXHJcbiAgICAgICAgICAgIHZhciBkZWxheUZvciA9IHBhcnNlSW50KHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJSZXRyeS1BZnRlclwiKSkgfHwgMztcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGdldFJlc291cmNlKHVybCkudGhlbihmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGVmZXJyZWQucmVzb2x2ZShkYXRhKTsgfSk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5Rm9yICogMTAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBDb250ZW50IHJldHJpZXZlZC4gUmVzb2x2ZSB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGF0YShpZCkge1xyXG4gICAgcmV0dXJuIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFJlc291cmNlKGkucmVzb3VyY2VVcmwpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5nZXREYXRhID0gZ2V0RGF0YTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIG9ialRvU3RyaW5nKG9iaikge1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0ga2V5ICsgJzonICsgb2JqW2tleV0gKyAnLCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnNsaWNlKDAsIHJlc3VsdC5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZnVuY3Rpb24gZmlsdGVyKG9iaikge1xyXG4gICAgdmFyIERlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICB2YXIgbGltaXQgPSAxMDA7XHJcbiAgICB2YXIgZ2V0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZmlsdGVyID0gZW5jb2RlVVJJQ29tcG9uZW50KG9ialRvU3RyaW5nKG9iaikpO1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpdGVtcz9maWx0ZXI9XCIgKyBmaWx0ZXIgKyBcIiZvZmZzZXQ9XCIgKyBvZmZzZXQgKyBcIiZsaW1pdD1cIiArIGxpbWl0KVxyXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCBsaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgRGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGxpbWl0O1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIERlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGdldFBhZ2UoKTtcclxuICAgIHJldHVybiBEZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBmaWx0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRGb2xkZXIoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQgKyBcIi9pdGVtc1wiKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEZvbGRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEdwc0Nvb3JkaW5hdGVzKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3lzdGVtJywgJ2dwcycpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0R3BzQ29vcmRpbmF0ZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRJbnRlcmFjdGl2ZUluZm8oKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpbnRlcmFjdGl2ZScpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0SW50ZXJhY3RpdmVJbmZvO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmljZSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbnZhciBjb21tYW5kU3VwcG9ydF8xID0gcmVxdWlyZSgnLi9jb21tYW5kU3VwcG9ydCcpO1xyXG5mdW5jdGlvbiBJbnRlcmFjdGl2ZXNJbnRlcmZhY2VJc0RlZmluZWQoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIEludGVyYWN0aXZlc0ludGVyZmFjZSAhPT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuZnVuY3Rpb24gZ2V0KGZ1bmMsIHBhcmFtLCBleHBlY3RKc29uKSB7XHJcbiAgICBpZiAocGFyYW0gPT09IHZvaWQgMCkgeyBwYXJhbSA9IG51bGw7IH1cclxuICAgIGlmIChleHBlY3RKc29uID09PSB2b2lkIDApIHsgZXhwZWN0SnNvbiA9IHRydWU7IH1cclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYyArIChwYXJhbSA9PT0gbnVsbCA/ICcnIDogJy8nICsgcGFyYW0pO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgcmV0cmlldmVkLiBUcmFuc2Zvcm0gdG8gSlNPTiBpZiBzdXBwb3NlZCB0by5cclxuICAgICAgICAgICAgaWYgKGV4cGVjdEpzb24gJiYgcmVxdWVzdCAmJiByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpLmluZGV4T2YoXCJ0ZXh0L2h0bWxcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3YXMgc2VudCBiYWNrIGFzIHRleHQvaHRtbCBKU09OLnBhcnNlIGl0IHRvIGEgSlNPTiBvYmplY3QuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgY291bGQgbm90IGJlIHJldHJpZXZlZC4gUmVqZWN0IHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5nZXQgPSBnZXQ7XHJcbmZ1bmN0aW9uIHBvc3QoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLnBvc3QodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdEpTT04gPSBKU09OLnBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdEpTT04uc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdFdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMucG9zdCA9IHBvc3Q7XHJcbmZ1bmN0aW9uIGRkZWxldGUoZnVuYywgZGF0YSkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLmRlbGV0ZSh1cmwsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB2YXIgcmVzdWx0SlNPTiA9IEpTT04ucGFyc2UocmVzdWx0KTtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0SlNPTi5kYXRhLCByZXN1bHRKU09OLnN0YXR1c10pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmlzV2ViKCkgJiYgZGF0YS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JldHVyblVybCcsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShkYXRhLnJlc3BvbnNlSlNPTi5yZXR1cm5VcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHRoaXMsIFtyZXF1ZXN0LCBkYXRhLnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMuZGRlbGV0ZSA9IGRkZWxldGU7XHJcbmZ1bmN0aW9uIHB1dChmdW5jLCBkYXRhKSB7XHJcbiAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmM7XHJcbiAgICBpZiAoY29tbWFuZFN1cHBvcnRfMS5pc1Vuc3VwcG9ydGVkKHVybCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcclxuICAgIH1cclxuICAgIGlmIChJbnRlcmFjdGl2ZXNJbnRlcmZhY2VJc0RlZmluZWQoKSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBJbnRlcmFjdGl2ZXNJbnRlcmZhY2UucHV0KHVybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHZhciByZXN1bHRKU09OID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRKU09OLmRhdGEsIHJlc3VsdEpTT04uc3RhdHVzXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLnB1dCA9IHB1dDtcclxuZnVuY3Rpb24gc2hvd1VJKG5hbWUsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBwb3N0KCdjb250cm9sL3Nob3ctdWknLCB7XHJcbiAgICAgICAgdWk6IG5hbWUsXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuc2hvd1VJID0gc2hvd1VJO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0SXRlbShpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCk7XHJcbn1cclxuZXhwb3J0cy5nZXRJdGVtID0gZ2V0SXRlbTtcclxuZnVuY3Rpb24gZ2V0Q3VycmVudEl0ZW0oKSB7XHJcbiAgICByZXR1cm4gZ2V0SXRlbSgnX19zZWxmX18nKTtcclxufVxyXG5leHBvcnRzLmdldEN1cnJlbnRJdGVtID0gZ2V0Q3VycmVudEl0ZW07XHJcbmZ1bmN0aW9uIGdldFNoYXJlKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkICsgJy9zaGFyZScpO1xyXG59XHJcbmV4cG9ydHMuZ2V0U2hhcmUgPSBnZXRTaGFyZTtcclxuZnVuY3Rpb24gZ2V0TGFzdFZpZXdlZENvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsICc/bGlzdD1sYXN0LXZpZXdlZCcpO1xyXG59XHJcbmV4cG9ydHMuZ2V0TGFzdFZpZXdlZENvbnRlbnQgPSBnZXRMYXN0Vmlld2VkQ29udGVudDtcclxuZnVuY3Rpb24gZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudCgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgJz9saXN0PXJlY2VudGx5LWNyZWF0ZWQnKTtcclxufVxyXG5leHBvcnRzLmdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQgPSBnZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxudmFyIHVzZUxvY2FsU3RvcmFnZSA9IGRldmljZV8xLmlzV2ViKCkgfHwgZGV2aWNlXzEuaXNEZXNrdG9wKCk7XHJcbmZ1bmN0aW9uIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KSB7XHJcbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICB2YXIgYWxsID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGtleSBzdGFydHN3aXRoIHByZWZpeFxyXG4gICAgICAgICAgICAgICAgaWYgKGtleS5zbGljZSgwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxba2V5XSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFthbGwsIDIwMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcImluZm8/cHJlZml4PVwiICsgcHJlZml4KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRBbGxWYWx1ZXMoKSB7XHJcbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgdmFyIGFsbCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJC53aGVuKGFsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpbmZvJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0VmFsdWVzKHByZWZpeCkge1xyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgIC8vIEdldCB2YWx1ZXMgd2l0aCBzcGVjaWZpZWQgcHJlZml4XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXRBbGxWYWx1ZXMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFZhbHVlcyA9IGdldFZhbHVlcztcclxuZnVuY3Rpb24gZ2V0VmFsdWUoa2V5KSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0V2l0aCh0aGlzLCBbJ0ludmFsaWQga2V5IHByb3ZpZGVkJywgNTAwXSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGlzLCBbdmFsdWUsIDIwMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGZkLnJlamVjdFdpdGgodGhpcywgW3ZhbHVlLCA0MDRdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcImluZm9cIiwga2V5LCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRWYWx1ZSA9IGdldFZhbHVlO1xyXG5mdW5jdGlvbiBwdXRWYWx1ZShrZXksIHZhbHVlKSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0V2l0aCh0aGlzLCBbJ0ludmFsaWQga2V5IHByb3ZpZGVkJywgNTAwXSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFsnJywgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImluZm9cIiwgW3sga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9XSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wdXRWYWx1ZSA9IHB1dFZhbHVlO1xyXG5mdW5jdGlvbiBkZWxldGVLZXkoa2V5KSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0V2l0aCh0aGlzLCBbJ0ludmFsaWQga2V5IHByb3ZpZGVkJywgNTAwXSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXNlTG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoZnVuY3Rpb24gKGRmZCkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgWycnLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiaW5mby9cIiArIGtleSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWxldGVLZXkgPSBkZWxldGVLZXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaXRlbV8xID0gcmVxdWlyZSgnLi9pdGVtJyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbmZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2ludGVyYWN0aXZlLXJlZGlyZWN0L3Y1L2l0ZW1zL19fc2VsZl9fL2JhY2snO1xyXG59XHJcbmV4cG9ydHMuY2xvc2UgPSBjbG9zZTtcclxuZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9uZXh0JztcclxufVxyXG5leHBvcnRzLm5leHQgPSBuZXh0O1xyXG5mdW5jdGlvbiBwcmV2aW91cygpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9wcmV2aW91cyc7XHJcbn1cclxuZXhwb3J0cy5wcmV2aW91cyA9IHByZXZpb3VzO1xyXG5mdW5jdGlvbiBvcGVuSXRlbShpZCwgYm9va21hcmspIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHZhciB1cmwgPSBpdGVtLnVybDtcclxuICAgICAgICBpZiAoZGV2aWNlXzEuaXNXZWIoKSB8fCBkZXZpY2VfMS5pc0Rlc2t0b3AoKSkge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ3JldHVybnVybCddID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29rbWFyaykge1xyXG4gICAgICAgICAgICBwYXJhbXNbJ2Jvb2ttYXJrJ10gPSBib29rbWFyaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgJC5wYXJhbShwYXJhbXMpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB1cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5JdGVtID0gb3Blbkl0ZW07XHJcbmV4cG9ydHMub3BlbiA9IG9wZW5JdGVtO1xyXG5mdW5jdGlvbiBvcGVuRm9sZGVyKGlkKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXRlbS51cmw7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLm9wZW5Gb2xkZXIgPSBvcGVuRm9sZGVyO1xyXG5mdW5jdGlvbiBnb3RvKCkge1xyXG4gICAgY29uc29sZS5lcnJvcignZ290byBtZXRob2QgaXMgbm93IGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2Ugb3Blbkl0ZW0gZ29pbmcgZm9yd2FyZC4nKTtcclxufVxyXG5leHBvcnRzLmdvdG8gPSBnb3RvO1xyXG5mdW5jdGlvbiBicm93c2UoKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdicm93c2UgbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XHJcbn1cclxuZXhwb3J0cy5icm93c2UgPSBicm93c2U7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBhZGROb3RpZmljYXRpb24oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KFwibm90aWZpY2F0aW9ucy9cIiArIGlkKTtcclxufVxyXG5leHBvcnRzLmFkZE5vdGlmaWNhdGlvbiA9IGFkZE5vdGlmaWNhdGlvbjtcclxuZnVuY3Rpb24gcmVtb3ZlTm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVOb3RpZmljYXRpb24gPSByZW1vdmVOb3RpZmljYXRpb247XHJcbmZ1bmN0aW9uIGdldE5vdGlmaWNhdGlvblN0YXR1cyhpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5nZXROb3RpZmljYXRpb25TdGF0dXMgPSBnZXROb3RpZmljYXRpb25TdGF0dXM7XHJcbmZ1bmN0aW9uIHNob3dOb3RpZmljYXRpb25NYW5hZ2VyKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ25vdGlmaWNhdGlvbnMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dOb3RpZmljYXRpb25NYW5hZ2VyID0gc2hvd05vdGlmaWNhdGlvbk1hbmFnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRPbmxpbmVTdGF0dXMoYXJndW1lbnQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdvbmxpbmUtc3RhdHVzJyk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRPbmxpbmVTdGF0dXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuZnVuY3Rpb24gb3BlbldpbmRvdyh1cmwpIHtcclxuICAgIHJldHVybiB3aW5kb3cub3Blbih1cmwsIFwiSW50ZXJhY3RpdmVzV2luZG93XCIgKyB1dGlsc18xLmd1aWQoKSk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBvcGVuV2luZG93O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcG9zdEFjdGlvbihvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnYWN0aW9ucycsIG9wdGlvbnMpO1xyXG59XHJcbmV4cG9ydHMucG9zdEFjdGlvbiA9IHBvc3RBY3Rpb247XHJcbmZ1bmN0aW9uIHBvc3RQYWdlVmlldyhpZCwgcGFnZSkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2FjdGlvbnMnLCB7XHJcbiAgICAgICAgdHlwZTogJ2RvY3VtZW50JyxcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgcGFnZTogcGFnZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5wb3N0UGFnZVZpZXcgPSBwb3N0UGFnZVZpZXc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBwb3N0RXZlbnQoa2V5LCBwcm9wZXJ0aWVzKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcImV2ZW50c1wiLCB7IGtleToga2V5LCBwcm9wZXJ0aWVzOiBKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzKSB9KTtcclxufVxyXG5leHBvcnRzLnBvc3RFdmVudCA9IHBvc3RFdmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNlYXJjaCh0ZXJtLCBvZmZzZXQsIGxpbWl0KSB7XHJcbiAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxyXG4gICAgaWYgKGxpbWl0ID09PSB2b2lkIDApIHsgbGltaXQgPSAxMDA7IH1cclxuICAgIHZhciBkZmQxID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgdmFyIG9iaiA9IHtcclxuICAgICAgICB0ZXJtOiB0ZXJtLFxyXG4gICAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICAgIGxpbWl0OiBsaW1pdFxyXG4gICAgfTtcclxuICAgIHZhciBnZXRQYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBxcyA9ICQucGFyYW0ob2JqKTtcclxuICAgICAgICBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zPycgKyBxcylcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgb2JqLmxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICBkZmQxLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iai5vZmZzZXQgKz0gb2JqLmxpbWl0O1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRmZDEucmVqZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgZ2V0UGFnZSgpO1xyXG4gICAgcmV0dXJuIGRmZDEucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMuc2VhcmNoID0gc2VhcmNoO1xyXG5mdW5jdGlvbiBzaG93U2VhcmNoKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ3NlYXJjaCcsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NlYXJjaCA9IHNob3dTZWFyY2g7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldChcInN5bmNlZGluZm8/cHJlZml4PVwiICsgcHJlZml4KTtcclxufVxyXG5mdW5jdGlvbiBnZXRBbGxWYWx1ZXMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jZWRpbmZvJyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0U3luY2VkVmFsdWVzKHByZWZpeCkge1xyXG4gICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgIC8vIEdldCB2YWx1ZXMgd2l0aCBzcGVjaWZpZWQgcHJlZml4XHJcbiAgICAgICAgcmV0dXJuIGdldFZhbHVlc1dpdGhQcmVmaXgocHJlZml4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBnZXRBbGxWYWx1ZXMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFN5bmNlZFZhbHVlcyA9IGdldFN5bmNlZFZhbHVlcztcclxuZnVuY3Rpb24gZ2V0U3luY2VkVmFsdWUoa2V5KSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0V2l0aCh0aGlzLCBbJ0ludmFsaWQga2V5IHByb3ZpZGVkJywgNTAwXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jZWRpbmZvJywga2V5LCBmYWxzZSk7XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jZWRWYWx1ZSA9IGdldFN5bmNlZFZhbHVlO1xyXG5mdW5jdGlvbiBwdXRTeW5jZWRWYWx1ZShrZXksIHZhbHVlKSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0V2l0aCh0aGlzLCBbJ0ludmFsaWQga2V5IHByb3ZpZGVkJywgNTAwXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcInN5bmNlZGluZm9cIiwgW3sga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9XSk7XHJcbn1cclxuZXhwb3J0cy5wdXRTeW5jZWRWYWx1ZSA9IHB1dFN5bmNlZFZhbHVlO1xyXG5mdW5jdGlvbiBkZWxldGVTeW5jZWRLZXkoa2V5KSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0V2l0aCh0aGlzLCBbJ0ludmFsaWQga2V5IHByb3ZpZGVkJywgNTAwXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcInN5bmNlZGluZm9cIiwgW2tleV0pO1xyXG59XHJcbmV4cG9ydHMuZGVsZXRlU3luY2VkS2V5ID0gZGVsZXRlU3luY2VkS2V5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0U3lzdGVtSW5mbygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0U3lzdGVtSW5mbztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFVwbG9hZFVybChrZXkpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsIFwidXBsb2FkdXJsP2tleT1cIiArIGtleSk7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRVcGxvYWRVcmw7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5mdW5jdGlvbiBndWlkKCkge1xyXG4gICAgZnVuY3Rpb24gczQoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcclxuICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG59XHJcbmV4cG9ydHMuZ3VpZCA9IGd1aWQ7XHJcbiIsIi8qKlxyXG4gKiAoYykgMjAxMy0yMDE2LCBNZWRpYWZseSwgSW5jLlxyXG4gKiBtZmx5Q29tbWFuZHMgaXMgYSBzaW5nbGV0b24gaW5zdGFuY2Ugd2hpY2ggd3JhcHMgY29tbW9uIG1mbHkgY2FsbHMgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxyXG4gKiBCZWZvcmUgdXNlLCBwbGVhc2UgYmUgc3VyZSB0byBjYWxsIHNldFByZWZpeCBpZiB5b3UgYXJlIHdvcmtpbmcgb24gYSBkZXZlbG9wbWVudCBwbGF0Zm9ybSAoZS5nLlxyXG4gKiBhIGxvY2FsIHdlYnNlcnZlciBvbiBhIFBDKSBmb3IgZXhhbXBsZSwgaHR0cDovL2xvY2FsaG9zdDo4MDAwLyAuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVyYWN0aXZlSW5mb18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9pbnRlcmFjdGl2ZUluZm8nKTtcclxudmFyIHN5c3RlbUluZm9fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc3lzdGVtSW5mbycpO1xyXG52YXIgb25saW5lU3RhdHVzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL29ubGluZVN0YXR1cycpO1xyXG52YXIgdXBsb2FkVXJsXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3VwbG9hZFVybCcpO1xyXG52YXIgaXRlbSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvaXRlbScpO1xyXG52YXIgY29sbGVjdGlvbnMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NvbGxlY3Rpb25zJyk7XHJcbnZhciBmb2xkZXJfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZm9sZGVyJyk7XHJcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZmlsdGVyJyk7XHJcbnZhciBncHNDb29yZGluYXRlc18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9ncHNDb29yZGluYXRlcycpO1xyXG52YXIgc2VhcmNoXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3NlYXJjaCcpO1xyXG52YXIgbmF2aWdhdGlvbl8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9uYXZpZ2F0aW9uJyk7XHJcbnZhciBkb3dubG9hZGVyID0gcmVxdWlyZSgnLi9jb21tYW5kcy9kb3dubG9hZGVyJyk7XHJcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCcuL2NvbW1hbmRzL25vdGlmaWNhdGlvbicpO1xyXG52YXIgYWNjb3VudEluZm8gPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FjY291bnRJbmZvJyk7XHJcbnZhciBsb2NhbEtleVZhbHVlU3RvcmFnZSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbG9jYWxLZXlWYWx1ZVN0b3JhZ2UnKTtcclxudmFyIHN5bmNlZEtleVZhbHVlU3RvcmFnZSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvc3luY2VkS2V5VmFsdWVTdG9yYWdlJyk7XHJcbnZhciBhcHBsaWNhdGlvblN5bmMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FwcGxpY2F0aW9uU3luYycpO1xyXG52YXIgbmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbmF2aWdhdGlvbicpO1xyXG52YXIgYXBwRmVhdHVyZXMgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2FwcEZlYXR1cmVzJyk7XHJcbnZhciBjb250cm9sc18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9jb250cm9scycpO1xyXG52YXIgZW1iZWRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZW1iZWQnKTtcclxudmFyIHBvc3RBY3Rpb25fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvcG9zdEFjdGlvbicpO1xyXG52YXIgcG9zdEV2ZW50XzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3Bvc3RFdmVudCcpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2RldmljZScpO1xyXG52YXIgb3BlbldpbmRvd18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9vcGVuV2luZG93Jyk7XHJcbnZhciBlbWFpbF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9lbWFpbCcpO1xyXG52YXIgbWZseUNvbW1hbmRzID0ge1xyXG4gICAgY2xvc2U6IG5hdmlnYXRpb25fMS5jbG9zZSxcclxuICAgIGdldEludGVyYWN0aXZlSW5mbzogaW50ZXJhY3RpdmVJbmZvXzEuZGVmYXVsdCxcclxuICAgIGdldFN5c3RlbUluZm86IHN5c3RlbUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0T25saW5lU3RhdHVzOiBvbmxpbmVTdGF0dXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0R3BzQ29vcmRpbmF0ZXM6IGdwc0Nvb3JkaW5hdGVzXzEuZGVmYXVsdCxcclxuICAgIGdldFVwbG9hZFVybDogdXBsb2FkVXJsXzEuZGVmYXVsdCxcclxuICAgIGdldEZvbGRlcjogZm9sZGVyXzEuZGVmYXVsdCxcclxuICAgIGZpbHRlcjogZmlsdGVyXzEuZGVmYXVsdCxcclxuICAgIHNlYXJjaDogc2VhcmNoXzEuc2VhcmNoLFxyXG4gICAgc2hvd1NlYXJjaDogc2VhcmNoXzEuc2hvd1NlYXJjaCxcclxuICAgIGhpZGVDb250cm9sQmFyczogY29udHJvbHNfMS5oaWRlQ29udHJvbEJhcnMsXHJcbiAgICBzaG93Q29udHJvbEJhcnM6IGNvbnRyb2xzXzEuc2hvd0NvbnRyb2xCYXJzLFxyXG4gICAgZW1iZWQ6IGVtYmVkXzEuZW1iZWQsXHJcbiAgICBlbWJlZEltYWdlOiBlbWJlZF8xLmVtYmVkSW1hZ2UsXHJcbiAgICBnZXREYXRhOiBlbWJlZF8xLmdldERhdGEsXHJcbiAgICBnZXREZXZpY2VUeXBlOiBkZXZpY2VfMS5nZXREZXZpY2VUeXBlLFxyXG4gICAgZ2V0UHJlZml4OiBkZXZpY2VfMS5nZXRQcmVmaXgsXHJcbiAgICBpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50OiBkZXZpY2VfMS5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50LFxyXG4gICAgaXNXaW5kb3dzODogZGV2aWNlXzEuaXNXaW5kb3dzOCxcclxuICAgIG9wZW5XaW5kb3c6IG9wZW5XaW5kb3dfMS5kZWZhdWx0LFxyXG4gICAgcG9zdEFjdGlvbjogcG9zdEFjdGlvbl8xLnBvc3RBY3Rpb24sXHJcbiAgICBwb3N0UGFnZVZpZXc6IHBvc3RBY3Rpb25fMS5wb3N0UGFnZVZpZXcsXHJcbiAgICBwb3N0RXZlbnQ6IHBvc3RFdmVudF8xLnBvc3RFdmVudCxcclxuICAgIHNlbmRFbWFpbDogZW1haWxfMS5kZWZhdWx0LFxyXG59O1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGl0ZW0pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGNvbGxlY3Rpb25zKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBub3RpZmljYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFjY291bnRJbmZvKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgc3luY2VkS2V5VmFsdWVTdG9yYWdlKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBsaWNhdGlvblN5bmMpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcEZlYXR1cmVzKTtcclxubW9kdWxlLmV4cG9ydHMgPSBtZmx5Q29tbWFuZHM7XHJcbiJdfQ==
