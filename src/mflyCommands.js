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

},{"./internalMethods":16}],2:[function(require,module,exports){
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

},{"./internalMethods":16}],3:[function(require,module,exports){
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

},{"./internalMethods":16}],4:[function(require,module,exports){
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

},{"./internalMethods":16}],5:[function(require,module,exports){
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

},{"./device":8}],6:[function(require,module,exports){
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

},{"./internalMethods":16}],7:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getCredentials() {
    return internalMethods_1.get('credentials');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getCredentials;

},{"./internalMethods":16}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./internalMethods":16}],10:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function sendEmail(options) {
    return internalMethods_1.post('email', options);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendEmail;

},{"./internalMethods":16}],11:[function(require,module,exports){
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

},{"./item":17}],12:[function(require,module,exports){
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

},{"./internalMethods":16}],13:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getFolder(id) {
    return internalMethods_1.get('items', id + "/items");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFolder;

},{"./internalMethods":16}],14:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getGpsCoordinates() {
    return internalMethods_1.get('system', 'gps');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGpsCoordinates;

},{"./internalMethods":16}],15:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getInteractiveInfo() {
    return internalMethods_1.get('interactive');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInteractiveInfo;

},{"./internalMethods":16}],16:[function(require,module,exports){
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

},{"./commandSupport":5,"./device":8}],17:[function(require,module,exports){
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

},{"./internalMethods":16}],18:[function(require,module,exports){
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

},{"./device":8,"./internalMethods":16}],19:[function(require,module,exports){
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

},{"./device":8,"./item":17}],20:[function(require,module,exports){
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

},{"./internalMethods":16}],21:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getOnlineStatus(argument) {
    return internalMethods_1.get('system', 'online-status');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOnlineStatus;

},{"./internalMethods":16}],22:[function(require,module,exports){
"use strict";
var utils_1 = require('./utils');
function openWindow(url) {
    return window.open(url, "InteractivesWindow" + utils_1.guid());
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = openWindow;

},{"./utils":29}],23:[function(require,module,exports){
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

},{"./internalMethods":16}],24:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function postEvent(key, properties) {
    return internalMethods_1.post("events", { key: key, properties: JSON.stringify(properties) });
}
exports.postEvent = postEvent;

},{"./internalMethods":16}],25:[function(require,module,exports){
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

},{"./internalMethods":16}],26:[function(require,module,exports){
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

},{"./internalMethods":16}],27:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getSystemInfo() {
    return internalMethods_1.get('system');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getSystemInfo;

},{"./internalMethods":16}],28:[function(require,module,exports){
"use strict";
var internalMethods_1 = require('./internalMethods');
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUploadUrl;

},{"./internalMethods":16}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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
var credentials_1 = require('./commands/credentials');
var mflyCommands = {
    close: navigation_1.close,
    getInteractiveInfo: interactiveInfo_1.default,
    getCredentials: credentials_1.default,
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

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/collections":4,"./commands/controls":6,"./commands/credentials":7,"./commands/device":8,"./commands/downloader":9,"./commands/email":10,"./commands/embed":11,"./commands/filter":12,"./commands/folder":13,"./commands/gpsCoordinates":14,"./commands/interactiveInfo":15,"./commands/item":17,"./commands/localKeyValueStorage":18,"./commands/navigation":19,"./commands/notification":20,"./commands/onlineStatus":21,"./commands/openWindow":22,"./commands/postAction":23,"./commands/postEvent":24,"./commands/search":25,"./commands/syncedKeyValueStorage":26,"./commands/systemInfo":27,"./commands/uploadUrl":28}]},{},[30])(30)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudGVtcC9jb21tYW5kcy9hY2NvdW50SW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL2FwcEZlYXR1cmVzLmpzIiwiLnRlbXAvY29tbWFuZHMvYXBwbGljYXRpb25TeW5jLmpzIiwiLnRlbXAvY29tbWFuZHMvY29sbGVjdGlvbnMuanMiLCIudGVtcC9jb21tYW5kcy9jb21tYW5kU3VwcG9ydC5qcyIsIi50ZW1wL2NvbW1hbmRzL2NvbnRyb2xzLmpzIiwiLnRlbXAvY29tbWFuZHMvY3JlZGVudGlhbHMuanMiLCIudGVtcC9jb21tYW5kcy9kZXZpY2UuanMiLCIudGVtcC9jb21tYW5kcy9kb3dubG9hZGVyLmpzIiwiLnRlbXAvY29tbWFuZHMvZW1haWwuanMiLCIudGVtcC9jb21tYW5kcy9lbWJlZC5qcyIsIi50ZW1wL2NvbW1hbmRzL2ZpbHRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2ZvbGRlci5qcyIsIi50ZW1wL2NvbW1hbmRzL2dwc0Nvb3JkaW5hdGVzLmpzIiwiLnRlbXAvY29tbWFuZHMvaW50ZXJhY3RpdmVJbmZvLmpzIiwiLnRlbXAvY29tbWFuZHMvaW50ZXJuYWxNZXRob2RzLmpzIiwiLnRlbXAvY29tbWFuZHMvaXRlbS5qcyIsIi50ZW1wL2NvbW1hbmRzL2xvY2FsS2V5VmFsdWVTdG9yYWdlLmpzIiwiLnRlbXAvY29tbWFuZHMvbmF2aWdhdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL25vdGlmaWNhdGlvbi5qcyIsIi50ZW1wL2NvbW1hbmRzL29ubGluZVN0YXR1cy5qcyIsIi50ZW1wL2NvbW1hbmRzL29wZW5XaW5kb3cuanMiLCIudGVtcC9jb21tYW5kcy9wb3N0QWN0aW9uLmpzIiwiLnRlbXAvY29tbWFuZHMvcG9zdEV2ZW50LmpzIiwiLnRlbXAvY29tbWFuZHMvc2VhcmNoLmpzIiwiLnRlbXAvY29tbWFuZHMvc3luY2VkS2V5VmFsdWVTdG9yYWdlLmpzIiwiLnRlbXAvY29tbWFuZHMvc3lzdGVtSW5mby5qcyIsIi50ZW1wL2NvbW1hbmRzL3VwbG9hZFVybC5qcyIsIi50ZW1wL2NvbW1hbmRzL3V0aWxzLmpzIiwiLnRlbXAvbWZseUNvbW1hbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdhY2NvdW50Jyk7XHJcbn1cclxuZXhwb3J0cy5nZXRVc2VySW5mbyA9IGdldFVzZXJJbmZvO1xyXG5mdW5jdGlvbiBsb2dvdXQoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvYWNjb3VudC9sb2dvdXQnO1xyXG59XHJcbmV4cG9ydHMubG9nb3V0ID0gbG9nb3V0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gc2hvd1NldHRpbmdzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2FwcC1zZXR0aW5ncycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd1NldHRpbmdzID0gc2hvd1NldHRpbmdzO1xyXG5mdW5jdGlvbiBzaG93VXNlck1hbmFnZW1lbnQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgndXNlci1tYW5hZ2VtZW50JywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93VXNlck1hbmFnZW1lbnQgPSBzaG93VXNlck1hbmFnZW1lbnQ7XHJcbmZ1bmN0aW9uIHNob3dTZWNvbmRTY3JlZW5PcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHsgdWk6ICdzZWNvbmQtc2NyZWVuJyB9KTtcclxufVxyXG5leHBvcnRzLnNob3dTZWNvbmRTY3JlZW5PcHRpb25zID0gc2hvd1NlY29uZFNjcmVlbk9wdGlvbnM7XHJcbmZ1bmN0aW9uIGVtYWlsKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9lbWFpbCcsIHsgaWQ6IGlkIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1haWwgPSBlbWFpbDtcclxuZnVuY3Rpb24gY29tcG9zZUVtYWlsKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL2NvbXBvc2UtZW1haWwnLCBvcHRpb25zKTtcclxufVxyXG5leHBvcnRzLmNvbXBvc2VFbWFpbCA9IGNvbXBvc2VFbWFpbDtcclxuZnVuY3Rpb24gc2hvd0Fubm90YXRpb25zKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2NvbnRyb2wvc2hvdy11aScsIHsgdWk6ICdhbm5vdGF0aW9ucycgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93QW5ub3RhdGlvbnMgPSBzaG93QW5ub3RhdGlvbnM7XHJcbmZ1bmN0aW9uIHRha2VBbmRFbWFpbFNjcmVlbnNob3QoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9lbWFpbC1zY3JlZW5zaG90Jyk7XHJcbn1cclxuZXhwb3J0cy50YWtlQW5kRW1haWxTY3JlZW5zaG90ID0gdGFrZUFuZEVtYWlsU2NyZWVuc2hvdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnc3luYycpO1xyXG59XHJcbmV4cG9ydHMucmVmcmVzaCA9IHJlZnJlc2g7XHJcbmZ1bmN0aW9uIGdldFN5bmNTdGF0dXMoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeW5jJywgJ3N0YXR1cycpO1xyXG59XHJcbmV4cG9ydHMuZ2V0U3luY1N0YXR1cyA9IGdldFN5bmNTdGF0dXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9ucygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2NvbGxlY3Rpb25zJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRDb2xsZWN0aW9ucyA9IGdldENvbGxlY3Rpb25zO1xyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiY29sbGVjdGlvbnMvXCIgKyBpZCwgJ2l0ZW1zJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRDb2xsZWN0aW9uID0gZ2V0Q29sbGVjdGlvbjtcclxuZnVuY3Rpb24gY3JlYXRlQ29sbGVjdGlvbihuYW1lKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29sbGVjdGlvbnMnLCB7IG5hbWU6IG5hbWUgfSk7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVDb2xsZWN0aW9uID0gY3JlYXRlQ29sbGVjdGlvbjtcclxuZnVuY3Rpb24gYWRkSXRlbVRvQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQsIGl0ZW1JZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJjb2xsZWN0aW9ucy9cIiArIGNvbGxlY3Rpb25JZCArIFwiL2l0ZW1zXCIsIHsgaWRzOiBbaXRlbUlkXSB9KTtcclxufVxyXG5leHBvcnRzLmFkZEl0ZW1Ub0NvbGxlY3Rpb24gPSBhZGRJdGVtVG9Db2xsZWN0aW9uO1xyXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb24oY29sbGVjdGlvbklkLCBpdGVtSWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiY29sbGVjdGlvbnMvXCIgKyBjb2xsZWN0aW9uSWQgKyBcIi9pdGVtcy9cIiArIGl0ZW1JZCk7XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb24gPSByZW1vdmVJdGVtRnJvbUNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIGRlbGV0ZUNvbGxlY3Rpb24oaWQsIHNoYXJlZCkge1xyXG4gICAgaWYgKHNoYXJlZCA9PT0gdm9pZCAwKSB7IHNoYXJlZCA9IGZhbHNlOyB9XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImNvbGxlY3Rpb25zL1wiICsgaWQgKyBcIj9zaGFyZWQ9XCIgKyBzaGFyZWQpO1xyXG59XHJcbmV4cG9ydHMuZGVsZXRlQ29sbGVjdGlvbiA9IGRlbGV0ZUNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgaXRlbUlkLCBwb3NpdGlvbikge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnB1dChcImNvbGxlY3Rpb25zL1wiICsgY29sbGVjdGlvbklkICsgXCIvaXRlbXMvXCIgKyBpdGVtSWQgKyBcIi9vcmRlcj9wb3NpdGlvbj1cIiArIHBvc2l0aW9uKTtcclxufVxyXG5leHBvcnRzLnJlb3JkZXJJdGVtSW5Db2xsZWN0aW9uID0gcmVvcmRlckl0ZW1JbkNvbGxlY3Rpb247XHJcbmZ1bmN0aW9uIHJlbmFtZUNvbGxlY3Rpb24oaWQsIG5hbWUpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wdXQoXCJjb2xsZWN0aW9ucy9cIiArIGlkLCB7IG5hbWU6IG5hbWUgfSk7XHJcbn1cclxuZXhwb3J0cy5yZW5hbWVDb2xsZWN0aW9uID0gcmVuYW1lQ29sbGVjdGlvbjtcclxuLy8gVUkgTWV0aG9kc1xyXG5mdW5jdGlvbiBzaG93Q29sbGVjdGlvbnMoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnNob3dVSSgnY29sbGVjdGlvbnMnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dDb2xsZWN0aW9ucyA9IHNob3dDb2xsZWN0aW9ucztcclxuZnVuY3Rpb24gc2hvd0FkZFRvQ29sbGVjdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdhZGQtdG8tY29sbGVjdGlvbicsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd0FkZFRvQ29sbGVjdGlvbiA9IHNob3dBZGRUb0NvbGxlY3Rpb247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBpc1Vuc3VwcG9ydGVkKHVybCkge1xyXG4gICAgaWYgKCFkZXZpY2VfMS5pc1dlYigpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHVuc3VwcG9ydGVkU3RhdGVtZW50cyA9IFtcclxuICAgICAgICAnL2NvbnRyb2wvJyxcclxuICAgICAgICAnL2Rvd25sb2FkcycsXHJcbiAgICAgICAgJy9vbmxpbmUtc3RhdHVzJyxcclxuICAgICAgICAnL3N5c3RlbS9ncHMnXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHVuc3VwcG9ydGVkU3RhdGVtZW50cy5zb21lKGZ1bmN0aW9uIChzdGF0ZW1lbnQpIHsgcmV0dXJuIHVybC5pbmRleE9mKHN0YXRlbWVudCkgPiAtMTsgfSk7XHJcbn1cclxuZXhwb3J0cy5pc1Vuc3VwcG9ydGVkID0gaXNVbnN1cHBvcnRlZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNob3dDb250cm9sQmFycygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdjb250cm9sL3Nob3ctdWknLCB7XHJcbiAgICAgICAgdWk6ICdjb250cm9sLWJhcicsXHJcbiAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5zaG93Q29udHJvbEJhcnMgPSBzaG93Q29udHJvbEJhcnM7XHJcbmZ1bmN0aW9uIGhpZGVDb250cm9sQmFycyh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiAnY29udHJvbC1iYXInLFxyXG4gICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmhpZGVDb250cm9sQmFycyA9IGhpZGVDb250cm9sQmFycztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldENyZWRlbnRpYWxzKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnY3JlZGVudGlhbHMnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldENyZWRlbnRpYWxzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGRldmVsb3BtZW50UHJlZml4ID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8nO1xyXG52YXIgd2ViUHJlZml4ID0gJy9pbnRlcmFjdGl2ZS1hcGkvdjUvJztcclxuZXhwb3J0cy5kZXZpY2VUeXBlcyA9IHtcclxuICAgIGRldmVsb3BtZW50OiAnZGV2ZWxvcG1lbnQnLFxyXG4gICAgbW9iaWxlOiAnbW9iaWxlJyxcclxuICAgIHdlYjogJ3dlYicsXHJcbiAgICBkZXNrdG9wOiAnZGVza3RvcCdcclxufTtcclxuZnVuY3Rpb24gaXNXaW5kb3dzOCgpIHtcclxuICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAodXNlckFnZW50LmluZGV4T2YoXCJtc2llXCIpICE9PSAtMSkge1xyXG4gICAgICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZihcIndlYnZpZXdcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnRzLmlzV2luZG93czggPSBpc1dpbmRvd3M4O1xyXG5mdW5jdGlvbiBpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50KCkge1xyXG4gICAgcmV0dXJuICh3aW5kb3cubG9jYXRpb24uaG9zdC5pbmRleE9mKCdsb2NhbGhvc3Q6ODAwMCcpID4gLTEpO1xyXG59XHJcbmV4cG9ydHMuaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudCA9IGlzTG9jYWxob3N0Rm9yRGV2ZWxvcG1lbnQ7XHJcbmZ1bmN0aW9uIGdldERldmljZVR5cGUoKSB7XHJcbiAgICBpZiAoaXNMb2NhbGhvc3RGb3JEZXZlbG9wbWVudCgpKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGV2aWNlVHlwZXMuZGV2ZWxvcG1lbnQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgZGV2aWNlVHlwZUNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5zcGxpdCgnPScpWzBdLnRvTG93ZXJDYXNlKCkudHJpbSgpID09PSAnZGV2aWNldHlwZSc7IH0pO1xyXG4gICAgICAgIGlmIChkZXZpY2VUeXBlQ29va2llLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRldmljZVR5cGVDb29raWVbMF0uc3BsaXQoJz0nKVsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmRldmljZVR5cGVzLm1vYmlsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXREZXZpY2VUeXBlID0gZ2V0RGV2aWNlVHlwZTtcclxuZXhwb3J0cy5pc1dlYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldERldmljZVR5cGUoKSA9PT0gZXhwb3J0cy5kZXZpY2VUeXBlcy53ZWI7IH07XHJcbmV4cG9ydHMuaXNEZXNrdG9wID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0RGV2aWNlVHlwZSgpID09PSBleHBvcnRzLmRldmljZVR5cGVzLmRlc2t0b3A7IH07XHJcbmZ1bmN0aW9uIGdldFByZWZpeCgpIHtcclxuICAgIHZhciBkZXZpY2VUeXBlID0gZ2V0RGV2aWNlVHlwZSgpO1xyXG4gICAgc3dpdGNoIChkZXZpY2VUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBleHBvcnRzLmRldmljZVR5cGVzLmRldmVsb3BtZW50OlxyXG4gICAgICAgICAgICByZXR1cm4gZGV2ZWxvcG1lbnRQcmVmaXg7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHdlYlByZWZpeDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmdldFByZWZpeCA9IGdldFByZWZpeDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNob3dEb3dubG9hZGVyKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5zaG93VUkoJ2Rvd25sb2FkcycsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbmV4cG9ydHMuc2hvd0Rvd25sb2FkZXIgPSBzaG93RG93bmxvYWRlcjtcclxuZnVuY3Rpb24gZ2V0RG93bmxvYWRTdGF0dXMoaWQpIHtcclxuICAgIHJldHVybiBpZCA/IGludGVybmFsTWV0aG9kc18xLmdldChcImRvd25sb2Fkcy9cIiArIGlkICsgXCIvc3RhdHVzXCIpIDogaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdkb3dubG9hZHMvc3RhdHVzJyk7XHJcbn1cclxuZXhwb3J0cy5nZXREb3dubG9hZFN0YXR1cyA9IGdldERvd25sb2FkU3RhdHVzO1xyXG5mdW5jdGlvbiBhZGRUb0Rvd25sb2FkZXIoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdkb3dubG9hZHMnLCB7IGlkczogW2lkXSB9KTtcclxufVxyXG5leHBvcnRzLmFkZFRvRG93bmxvYWRlciA9IGFkZFRvRG93bmxvYWRlcjtcclxuZnVuY3Rpb24gcmVtb3ZlRnJvbURvd25sb2FkZXIoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5kZGVsZXRlKFwiZG93bmxvYWRzL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlRnJvbURvd25sb2FkZXIgPSByZW1vdmVGcm9tRG93bmxvYWRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHNlbmRFbWFpbChvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdCgnZW1haWwnLCBvcHRpb25zKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHNlbmRFbWFpbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpdGVtXzEgPSByZXF1aXJlKCcuL2l0ZW0nKTtcclxuZnVuY3Rpb24gZW1iZWQoZWxlbWVudCwgaWQsIHBhZ2UpIHtcclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyIHBhZ2VBcmcgPSBwYWdlID8gXCI/cGFnZT1cIiArIHBhZ2UgOiAnJztcclxuICAgICAgICBnZXRSZXNvdXJjZShpLnJlc291cmNlVXJsICsgcGFnZUFyZykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmF0dHIoJ3NyYycsIGkucmVzb3VyY2VVcmwgKyBwYWdlQXJnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZW1iZWQgPSBlbWJlZDtcclxuZnVuY3Rpb24gZW1iZWRJbWFnZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xyXG4gICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcGFyYW1zID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6ICdwb3NpdGlvbicsIHZhbHVlOiBvcHRpb25zLnBhZ2UgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnc2l6ZScsIHZhbHVlOiBvcHRpb25zLnNpemUgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnd2lkdGgnLCB2YWx1ZTogb3B0aW9ucy53aWR0aCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdoZWlnaHQnLCB2YWx1ZTogb3B0aW9ucy5oZWlnaHQgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4V2lkdGgnLCB2YWx1ZTogb3B0aW9ucy5tYXhXaWR0aCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdtYXhIZWlnaHQnLCB2YWx1ZTogb3B0aW9ucy5tYXhIZWlnaHQgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAncm90YXRlJywgdmFsdWU6IG9wdGlvbnMucm90YXRlIH0sXHJcbiAgICAgICAgXS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEheC52YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGl0ZW1fMS5nZXRJdGVtKGlkKS50aGVuKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IGkucmVzb3VyY2VVcmw7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHVybCArPSAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldFJlc291cmNlKHVybCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmF0dHIoJ3NyYycsIHVybCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmVtYmVkSW1hZ2UgPSBlbWJlZEltYWdlO1xyXG5mdW5jdGlvbiBnZXRSZXNvdXJjZSh1cmwpIHtcclxuICAgIHJldHVybiAkLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgcmV0cnkuXHJcbiAgICAgICAgLy8gaU9TIHJldHVybnMgMjAyLiBEdWUgdG8gc3lzdGVtIGxpbWl0YXRpb25zLCBBbmRyb2lkIHJldHVybnMgMjAwICsgYmxhbmsgcmVzcG9uc2UgYm9keVxyXG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAyIHx8IChyZXF1ZXN0LnN0YXR1cyA9PSAyMDAgJiYgIXJlcXVlc3QucmVzcG9uc2VUZXh0KSkge1xyXG4gICAgICAgICAgICAvLyBTdWdnZXN0ZWQgZGVsYXkgYW1vdW50IGlzIHNldCBpbiB0aGUgUmV0cnktQWZ0ZXIgaGVhZGVyIG9uIGlPUy4gRGVmYXVsdCB0byAzIHNlY29uZHMgaWYgbm90IGZvdW5kLlxyXG4gICAgICAgICAgICB2YXIgZGVsYXlGb3IgPSBwYXJzZUludChyZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiUmV0cnktQWZ0ZXJcIikpIHx8IDM7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRSZXNvdXJjZSh1cmwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7IH0pO1xyXG4gICAgICAgICAgICB9LCBkZWxheUZvciAqIDEwMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQ29udGVudCByZXRyaWV2ZWQuIFJlc29sdmUgdGhlIHByb21pc2UuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGdldERhdGEoaWQpIHtcclxuICAgIHJldHVybiBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHJldHVybiBnZXRSZXNvdXJjZShpLnJlc291cmNlVXJsKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBvYmpUb1N0cmluZyhvYmopIHtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGtleSArICc6JyArIG9ialtrZXldICsgJywnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlc3VsdC5zbGljZSgwLCByZXN1bHQubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIGZpbHRlcihvYmopIHtcclxuICAgIHZhciBEZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBvZmZzZXQgPSAwO1xyXG4gICAgdmFyIGxpbWl0ID0gMTAwO1xyXG4gICAgdmFyIGdldFBhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGZpbHRlciA9IGVuY29kZVVSSUNvbXBvbmVudChvYmpUb1N0cmluZyhvYmopKTtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KFwiaXRlbXM/ZmlsdGVyPVwiICsgZmlsdGVyICsgXCImb2Zmc2V0PVwiICsgb2Zmc2V0ICsgXCImbGltaXQ9XCIgKyBsaW1pdClcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIERlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldCArPSBsaW1pdDtcclxuICAgICAgICAgICAgICAgIGdldFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBEZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRQYWdlKCk7XHJcbiAgICByZXR1cm4gRGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZmlsdGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0Rm9sZGVyKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsIGlkICsgXCIvaXRlbXNcIik7XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRGb2xkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRHcHNDb29yZGluYXRlcygpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ3N5c3RlbScsICdncHMnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEdwc0Nvb3JkaW5hdGVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0SW50ZXJhY3RpdmVJbmZvKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaW50ZXJhY3RpdmUnKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldEludGVyYWN0aXZlSW5mbztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBkZXZpY2UgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG52YXIgY29tbWFuZFN1cHBvcnRfMSA9IHJlcXVpcmUoJy4vY29tbWFuZFN1cHBvcnQnKTtcclxuZnVuY3Rpb24gSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBJbnRlcmFjdGl2ZXNJbnRlcmZhY2UgIT09ICd1bmRlZmluZWQnO1xyXG59XHJcbmZ1bmN0aW9uIGdldChmdW5jLCBwYXJhbSwgZXhwZWN0SnNvbikge1xyXG4gICAgaWYgKHBhcmFtID09PSB2b2lkIDApIHsgcGFyYW0gPSBudWxsOyB9XHJcbiAgICBpZiAoZXhwZWN0SnNvbiA9PT0gdm9pZCAwKSB7IGV4cGVjdEpzb24gPSB0cnVlOyB9XHJcbiAgICB2YXIgcHJlZml4ID0gZGV2aWNlLmdldFByZWZpeCgpO1xyXG4gICAgdmFyIHVybCA9IHByZWZpeCArIGZ1bmMgKyAocGFyYW0gPT09IG51bGwgPyAnJyA6ICcvJyArIHBhcmFtKTtcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAvLyBDb250ZW50IHJldHJpZXZlZC4gVHJhbnNmb3JtIHRvIEpTT04gaWYgc3VwcG9zZWQgdG8uXHJcbiAgICAgICAgICAgIGlmIChleHBlY3RKc29uICYmIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKS5pbmRleE9mKFwidGV4dC9odG1sXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgd2FzIHNlbnQgYmFjayBhcyB0ZXh0L2h0bWwgSlNPTi5wYXJzZSBpdCB0byBhIEpTT04gb2JqZWN0LlxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW2RhdGEsIHJlcXVlc3Quc3RhdHVzXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAvLyBDb250ZW50IGNvdWxkIG5vdCBiZSByZXRyaWV2ZWQuIFJlamVjdCB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZpZXdlciBkb2VzIG5vdCBoYXZlIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbi4gVGFrZSB1c2VyIHRvIFZpZXdlciByb290LlxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG59XHJcbmV4cG9ydHMuZ2V0ID0gZ2V0O1xyXG5mdW5jdGlvbiBwb3N0KGZ1bmMsIGRhdGEpIHtcclxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYztcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IEludGVyYWN0aXZlc0ludGVyZmFjZS5wb3N0KHVybCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHZhciByZXN1bHRKU09OID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHRKU09OLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRKU09OLmRhdGEsIHJlc3VsdEpTT04uc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3RXaXRoKHRoaXMsIFtyZXN1bHRKU09OLmRhdGEsIHJlc3VsdEpTT04uc3RhdHVzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLnBvc3QgPSBwb3N0O1xyXG5mdW5jdGlvbiBkZGVsZXRlKGZ1bmMsIGRhdGEpIHtcclxuICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciBwcmVmaXggPSBkZXZpY2UuZ2V0UHJlZml4KCk7XHJcbiAgICB2YXIgdXJsID0gcHJlZml4ICsgZnVuYztcclxuICAgIGlmIChjb21tYW5kU3VwcG9ydF8xLmlzVW5zdXBwb3J0ZWQodXJsKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKEludGVyYWN0aXZlc0ludGVyZmFjZUlzRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IEludGVyYWN0aXZlc0ludGVyZmFjZS5kZWxldGUodXJsLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdEpTT04gPSBKU09OLnBhcnNlKHJlc3VsdCk7XHJcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdEpTT04uZGF0YSwgcmVzdWx0SlNPTi5zdGF0dXNdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmVXaXRoKHRoaXMsIFtkYXRhLCByZXF1ZXN0LnN0YXR1c10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cywgcmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZS5pc1dlYigpICYmIGRhdGEuc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWaWV3ZXIgZG9lcyBub3QgaGF2ZSBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24uIFRha2UgdXNlciB0byBWaWV3ZXIgcm9vdC5cclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZXR1cm5VcmwnLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZGF0YS5yZXNwb25zZUpTT04ucmV0dXJuVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh0aGlzLCBbcmVxdWVzdCwgZGF0YS5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLmRkZWxldGUgPSBkZGVsZXRlO1xyXG5mdW5jdGlvbiBwdXQoZnVuYywgZGF0YSkge1xyXG4gICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxyXG4gICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHByZWZpeCA9IGRldmljZS5nZXRQcmVmaXgoKTtcclxuICAgIHZhciB1cmwgPSBwcmVmaXggKyBmdW5jO1xyXG4gICAgaWYgKGNvbW1hbmRTdXBwb3J0XzEuaXNVbnN1cHBvcnRlZCh1cmwpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoSW50ZXJhY3RpdmVzSW50ZXJmYWNlSXNEZWZpbmVkKCkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gSW50ZXJhY3RpdmVzSW50ZXJmYWNlLnB1dCh1cmwsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB2YXIgcmVzdWx0SlNPTiA9IEpTT04ucGFyc2UocmVzdWx0KTtcclxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0SlNPTi5kYXRhLCByZXN1bHRKU09OLnN0YXR1c10pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhLCB0ZXh0U3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlV2l0aCh0aGlzLCBbZGF0YSwgcmVxdWVzdC5zdGF0dXNdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHJlcXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UuaXNXZWIoKSAmJiBkYXRhLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmlld2VyIGRvZXMgbm90IGhhdmUgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uLiBUYWtlIHVzZXIgdG8gVmlld2VyIHJvb3QuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmV0dXJuVXJsJywgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGRhdGEucmVzcG9uc2VKU09OLnJldHVyblVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QodGhpcywgW3JlcXVlc3QsIGRhdGEuc3RhdHVzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbn1cclxuZXhwb3J0cy5wdXQgPSBwdXQ7XHJcbmZ1bmN0aW9uIHNob3dVSShuYW1lLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gcG9zdCgnY29udHJvbC9zaG93LXVpJywge1xyXG4gICAgICAgIHVpOiBuYW1lLFxyXG4gICAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLnNob3dVSSA9IHNob3dVSTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldEl0ZW0oaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoJ2l0ZW1zJywgaWQpO1xyXG59XHJcbmV4cG9ydHMuZ2V0SXRlbSA9IGdldEl0ZW07XHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRJdGVtKCkge1xyXG4gICAgcmV0dXJuIGdldEl0ZW0oJ19fc2VsZl9fJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRDdXJyZW50SXRlbSA9IGdldEN1cnJlbnRJdGVtO1xyXG5mdW5jdGlvbiBnZXRTaGFyZShpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCBpZCArICcvc2hhcmUnKTtcclxufVxyXG5leHBvcnRzLmdldFNoYXJlID0gZ2V0U2hhcmU7XHJcbmZ1bmN0aW9uIGdldExhc3RWaWV3ZWRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaXRlbXMnLCAnP2xpc3Q9bGFzdC12aWV3ZWQnKTtcclxufVxyXG5leHBvcnRzLmdldExhc3RWaWV3ZWRDb250ZW50ID0gZ2V0TGFzdFZpZXdlZENvbnRlbnQ7XHJcbmZ1bmN0aW9uIGdldFJlY2VudGx5Q3JlYXRlZENvbnRlbnQoKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcycsICc/bGlzdD1yZWNlbnRseS1jcmVhdGVkJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRSZWNlbnRseUNyZWF0ZWRDb250ZW50ID0gZ2V0UmVjZW50bHlDcmVhdGVkQ29udGVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbnZhciBkZXZpY2VfMSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbnZhciB1c2VMb2NhbFN0b3JhZ2UgPSBkZXZpY2VfMS5pc1dlYigpIHx8IGRldmljZV8xLmlzRGVza3RvcCgpO1xyXG5mdW5jdGlvbiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCkge1xyXG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgdmFyIGFsbCA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBrZXkgc3RhcnRzd2l0aCBwcmVmaXhcclxuICAgICAgICAgICAgICAgIGlmIChrZXkuc2xpY2UoMCwgcHJlZml4Lmxlbmd0aCkgPT0gcHJlZml4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsW2tleV0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGlzLCBbYWxsLCAyMDBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpbmZvP3ByZWZpeD1cIiArIHByZWZpeCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0QWxsVmFsdWVzKCkge1xyXG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHZhciBhbGwgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIGFsbFtrZXldID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQud2hlbihhbGwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnaW5mbycpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldFZhbHVlcyhwcmVmaXgpIHtcclxuICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgICAvLyBHZXQgdmFsdWVzIHdpdGggc3BlY2lmaWVkIHByZWZpeFxyXG4gICAgICAgIHJldHVybiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZ2V0QWxsVmFsdWVzKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRWYWx1ZXMgPSBnZXRWYWx1ZXM7XHJcbmZ1bmN0aW9uIGdldFZhbHVlKGtleSkge1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdFdpdGgodGhpcywgWydJbnZhbGlkIGtleSBwcm92aWRlZCcsIDUwMF0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZVdpdGgodGhpcywgW3ZhbHVlLCAyMDBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRmZC5yZWplY3RXaXRoKHRoaXMsIFt2YWx1ZSwgNDA0XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJpbmZvXCIsIGtleSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZ2V0VmFsdWUgPSBnZXRWYWx1ZTtcclxuZnVuY3Rpb24gcHV0VmFsdWUoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdFdpdGgodGhpcywgWydJbnZhbGlkIGtleSBwcm92aWRlZCcsIDUwMF0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGRmZC5yZXNvbHZlV2l0aCh0aGlzLCBbJycsIDIwMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJpbmZvXCIsIFt7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfV0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucHV0VmFsdWUgPSBwdXRWYWx1ZTtcclxuZnVuY3Rpb24gZGVsZXRlS2V5KGtleSkge1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdFdpdGgodGhpcywgWydJbnZhbGlkIGtleSBwcm92aWRlZCcsIDUwMF0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHVzZUxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHJldHVybiAkLkRlZmVycmVkKGZ1bmN0aW9uIChkZmQpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgZGZkLnJlc29sdmVXaXRoKHRoaXMsIFsnJywgMjAwXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZGRlbGV0ZShcImluZm8vXCIgKyBrZXkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVsZXRlS2V5ID0gZGVsZXRlS2V5O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGl0ZW1fMSA9IHJlcXVpcmUoJy4vaXRlbScpO1xyXG52YXIgZGV2aWNlXzEgPSByZXF1aXJlKCcuL2RldmljZScpO1xyXG5mdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9pbnRlcmFjdGl2ZS1yZWRpcmVjdC92NS9pdGVtcy9fX3NlbGZfXy9iYWNrJztcclxufVxyXG5leHBvcnRzLmNsb3NlID0gY2xvc2U7XHJcbmZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvaXRlbXMvX19zZWxmX18vbmV4dCc7XHJcbn1cclxuZXhwb3J0cy5uZXh0ID0gbmV4dDtcclxuZnVuY3Rpb24gcHJldmlvdXMoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvaW50ZXJhY3RpdmUtcmVkaXJlY3QvdjUvaXRlbXMvX19zZWxmX18vcHJldmlvdXMnO1xyXG59XHJcbmV4cG9ydHMucHJldmlvdXMgPSBwcmV2aW91cztcclxuZnVuY3Rpb24gb3Blbkl0ZW0oaWQsIGJvb2ttYXJrKSB7XHJcbiAgICBpdGVtXzEuZ2V0SXRlbShpZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSB7fTtcclxuICAgICAgICB2YXIgdXJsID0gaXRlbS51cmw7XHJcbiAgICAgICAgaWYgKGRldmljZV8xLmlzV2ViKCkgfHwgZGV2aWNlXzEuaXNEZXNrdG9wKCkpIHtcclxuICAgICAgICAgICAgcGFyYW1zWydyZXR1cm51cmwnXSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9va21hcmspIHtcclxuICAgICAgICAgICAgcGFyYW1zWydib29rbWFyayddID0gYm9va21hcms7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArICQucGFyYW0ocGFyYW1zKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgdXJsO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5vcGVuSXRlbSA9IG9wZW5JdGVtO1xyXG5leHBvcnRzLm9wZW4gPSBvcGVuSXRlbTtcclxuZnVuY3Rpb24gb3BlbkZvbGRlcihpZCkge1xyXG4gICAgaXRlbV8xLmdldEl0ZW0oaWQpLnRoZW4oZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGl0ZW0udXJsO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5vcGVuRm9sZGVyID0gb3BlbkZvbGRlcjtcclxuZnVuY3Rpb24gZ290bygpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ2dvdG8gbWV0aG9kIGlzIG5vdyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG9wZW5JdGVtIGdvaW5nIGZvcndhcmQuJyk7XHJcbn1cclxuZXhwb3J0cy5nb3RvID0gZ290bztcclxuZnVuY3Rpb24gYnJvd3NlKCkge1xyXG4gICAgY29uc29sZS5lcnJvcignYnJvd3NlIG1ldGhvZCBpcyBub3cgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBvcGVuSXRlbSBnb2luZyBmb3J3YXJkLicpO1xyXG59XHJcbmV4cG9ydHMuYnJvd3NlID0gYnJvd3NlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gYWRkTm90aWZpY2F0aW9uKGlkKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEucG9zdChcIm5vdGlmaWNhdGlvbnMvXCIgKyBpZCk7XHJcbn1cclxuZXhwb3J0cy5hZGROb3RpZmljYXRpb24gPSBhZGROb3RpZmljYXRpb247XHJcbmZ1bmN0aW9uIHJlbW92ZU5vdGlmaWNhdGlvbihpZCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlTm90aWZpY2F0aW9uID0gcmVtb3ZlTm90aWZpY2F0aW9uO1xyXG5mdW5jdGlvbiBnZXROb3RpZmljYXRpb25TdGF0dXMoaWQpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJub3RpZmljYXRpb25zL1wiICsgaWQpO1xyXG59XHJcbmV4cG9ydHMuZ2V0Tm90aWZpY2F0aW9uU3RhdHVzID0gZ2V0Tm90aWZpY2F0aW9uU3RhdHVzO1xyXG5mdW5jdGlvbiBzaG93Tm90aWZpY2F0aW9uTWFuYWdlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdub3RpZmljYXRpb25zJywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuZXhwb3J0cy5zaG93Tm90aWZpY2F0aW9uTWFuYWdlciA9IHNob3dOb3RpZmljYXRpb25NYW5hZ2VyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0T25saW5lU3RhdHVzKGFyZ3VtZW50KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nLCAnb25saW5lLXN0YXR1cycpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0T25saW5lU3RhdHVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcbmZ1bmN0aW9uIG9wZW5XaW5kb3codXJsKSB7XHJcbiAgICByZXR1cm4gd2luZG93Lm9wZW4odXJsLCBcIkludGVyYWN0aXZlc1dpbmRvd1wiICsgdXRpbHNfMS5ndWlkKCkpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gb3BlbldpbmRvdztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIHBvc3RBY3Rpb24ob3B0aW9ucykge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoJ2FjdGlvbnMnLCBvcHRpb25zKTtcclxufVxyXG5leHBvcnRzLnBvc3RBY3Rpb24gPSBwb3N0QWN0aW9uO1xyXG5mdW5jdGlvbiBwb3N0UGFnZVZpZXcoaWQsIHBhZ2UpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5wb3N0KCdhY3Rpb25zJywge1xyXG4gICAgICAgIHR5cGU6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgIHBhZ2U6IHBhZ2VcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucG9zdFBhZ2VWaWV3ID0gcG9zdFBhZ2VWaWV3O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gcG9zdEV2ZW50KGtleSwgcHJvcGVydGllcykge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJldmVudHNcIiwgeyBrZXk6IGtleSwgcHJvcGVydGllczogSlNPTi5zdHJpbmdpZnkocHJvcGVydGllcykgfSk7XHJcbn1cclxuZXhwb3J0cy5wb3N0RXZlbnQgPSBwb3N0RXZlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBzZWFyY2godGVybSwgb2Zmc2V0LCBsaW1pdCkge1xyXG4gICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IDA7IH1cclxuICAgIGlmIChsaW1pdCA9PT0gdm9pZCAwKSB7IGxpbWl0ID0gMTAwOyB9XHJcbiAgICB2YXIgZGZkMSA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgdGVybTogdGVybSxcclxuICAgICAgICBvZmZzZXQ6IG9mZnNldCxcclxuICAgICAgICBsaW1pdDogbGltaXRcclxuICAgIH07XHJcbiAgICB2YXIgZ2V0UGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcXMgPSAkLnBhcmFtKG9iaik7XHJcbiAgICAgICAgaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdpdGVtcz8nICsgcXMpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IG9iai5saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgZGZkMS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmoub2Zmc2V0ICs9IG9iai5saW1pdDtcclxuICAgICAgICAgICAgICAgIGdldFBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkZmQxLnJlamVjdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGdldFBhZ2UoKTtcclxuICAgIHJldHVybiBkZmQxLnByb21pc2UoKTtcclxufVxyXG5leHBvcnRzLnNlYXJjaCA9IHNlYXJjaDtcclxuZnVuY3Rpb24gc2hvd1NlYXJjaCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuc2hvd1VJKCdzZWFyY2gnLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG5leHBvcnRzLnNob3dTZWFyY2ggPSBzaG93U2VhcmNoO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGludGVybmFsTWV0aG9kc18xID0gcmVxdWlyZSgnLi9pbnRlcm5hbE1ldGhvZHMnKTtcclxuZnVuY3Rpb24gZ2V0VmFsdWVzV2l0aFByZWZpeChwcmVmaXgpIHtcclxuICAgIHJldHVybiBpbnRlcm5hbE1ldGhvZHNfMS5nZXQoXCJzeW5jZWRpbmZvP3ByZWZpeD1cIiArIHByZWZpeCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0QWxsVmFsdWVzKCkge1xyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3luY2VkaW5mbycpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFN5bmNlZFZhbHVlcyhwcmVmaXgpIHtcclxuICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgICAvLyBHZXQgdmFsdWVzIHdpdGggc3BlY2lmaWVkIHByZWZpeFxyXG4gICAgICAgIHJldHVybiBnZXRWYWx1ZXNXaXRoUHJlZml4KHByZWZpeCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZ2V0QWxsVmFsdWVzKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5nZXRTeW5jZWRWYWx1ZXMgPSBnZXRTeW5jZWRWYWx1ZXM7XHJcbmZ1bmN0aW9uIGdldFN5bmNlZFZhbHVlKGtleSkge1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdFdpdGgodGhpcywgWydJbnZhbGlkIGtleSBwcm92aWRlZCcsIDUwMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmdldCgnc3luY2VkaW5mbycsIGtleSwgZmFsc2UpO1xyXG59XHJcbmV4cG9ydHMuZ2V0U3luY2VkVmFsdWUgPSBnZXRTeW5jZWRWYWx1ZTtcclxuZnVuY3Rpb24gcHV0U3luY2VkVmFsdWUoa2V5LCB2YWx1ZSkge1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdFdpdGgodGhpcywgWydJbnZhbGlkIGtleSBwcm92aWRlZCcsIDUwMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLnBvc3QoXCJzeW5jZWRpbmZvXCIsIFt7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfV0pO1xyXG59XHJcbmV4cG9ydHMucHV0U3luY2VkVmFsdWUgPSBwdXRTeW5jZWRWYWx1ZTtcclxuZnVuY3Rpb24gZGVsZXRlU3luY2VkS2V5KGtleSkge1xyXG4gICAgaWYgKCFrZXkpIHtcclxuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdFdpdGgodGhpcywgWydJbnZhbGlkIGtleSBwcm92aWRlZCcsIDUwMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGludGVybmFsTWV0aG9kc18xLmRkZWxldGUoXCJzeW5jZWRpbmZvXCIsIFtrZXldKTtcclxufVxyXG5leHBvcnRzLmRlbGV0ZVN5bmNlZEtleSA9IGRlbGV0ZVN5bmNlZEtleTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcm5hbE1ldGhvZHNfMSA9IHJlcXVpcmUoJy4vaW50ZXJuYWxNZXRob2RzJyk7XHJcbmZ1bmN0aW9uIGdldFN5c3RlbUluZm8oKSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nKTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFN5c3RlbUluZm87XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgaW50ZXJuYWxNZXRob2RzXzEgPSByZXF1aXJlKCcuL2ludGVybmFsTWV0aG9kcycpO1xyXG5mdW5jdGlvbiBnZXRVcGxvYWRVcmwoa2V5KSB7XHJcbiAgICByZXR1cm4gaW50ZXJuYWxNZXRob2RzXzEuZ2V0KCdzeXN0ZW0nLCBcInVwbG9hZHVybD9rZXk9XCIgKyBrZXkpO1xyXG59XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0VXBsb2FkVXJsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuZnVuY3Rpb24gZ3VpZCgpIHtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXHJcbiAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufVxyXG5leHBvcnRzLmd1aWQgPSBndWlkO1xyXG4iLCIvKipcclxuICogKGMpIDIwMTMtMjAxNiwgTWVkaWFmbHksIEluYy5cclxuICogbWZseUNvbW1hbmRzIGlzIGEgc2luZ2xldG9uIGluc3RhbmNlIHdoaWNoIHdyYXBzIGNvbW1vbiBtZmx5IGNhbGxzIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cclxuICogQmVmb3JlIHVzZSwgcGxlYXNlIGJlIHN1cmUgdG8gY2FsbCBzZXRQcmVmaXggaWYgeW91IGFyZSB3b3JraW5nIG9uIGEgZGV2ZWxvcG1lbnQgcGxhdGZvcm0gKGUuZy5cclxuICogYSBsb2NhbCB3ZWJzZXJ2ZXIgb24gYSBQQykgZm9yIGV4YW1wbGUsIGh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8gLlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBpbnRlcmFjdGl2ZUluZm9fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvaW50ZXJhY3RpdmVJbmZvJyk7XHJcbnZhciBzeXN0ZW1JbmZvXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3N5c3RlbUluZm8nKTtcclxudmFyIG9ubGluZVN0YXR1c18xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9vbmxpbmVTdGF0dXMnKTtcclxudmFyIHVwbG9hZFVybF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy91cGxvYWRVcmwnKTtcclxudmFyIGl0ZW0gPSByZXF1aXJlKCcuL2NvbW1hbmRzL2l0ZW0nKTtcclxudmFyIGNvbGxlY3Rpb25zID0gcmVxdWlyZSgnLi9jb21tYW5kcy9jb2xsZWN0aW9ucycpO1xyXG52YXIgZm9sZGVyXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ZvbGRlcicpO1xyXG52YXIgZmlsdGVyXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2ZpbHRlcicpO1xyXG52YXIgZ3BzQ29vcmRpbmF0ZXNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZ3BzQ29vcmRpbmF0ZXMnKTtcclxudmFyIHNlYXJjaF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9zZWFyY2gnKTtcclxudmFyIG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvbmF2aWdhdGlvbicpO1xyXG52YXIgZG93bmxvYWRlciA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZG93bmxvYWRlcicpO1xyXG52YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnLi9jb21tYW5kcy9ub3RpZmljYXRpb24nKTtcclxudmFyIGFjY291bnRJbmZvID0gcmVxdWlyZSgnLi9jb21tYW5kcy9hY2NvdW50SW5mbycpO1xyXG52YXIgbG9jYWxLZXlWYWx1ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2xvY2FsS2V5VmFsdWVTdG9yYWdlJyk7XHJcbnZhciBzeW5jZWRLZXlWYWx1ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3N5bmNlZEtleVZhbHVlU3RvcmFnZScpO1xyXG52YXIgYXBwbGljYXRpb25TeW5jID0gcmVxdWlyZSgnLi9jb21tYW5kcy9hcHBsaWNhdGlvblN5bmMnKTtcclxudmFyIG5hdmlnYXRpb24gPSByZXF1aXJlKCcuL2NvbW1hbmRzL25hdmlnYXRpb24nKTtcclxudmFyIGFwcEZlYXR1cmVzID0gcmVxdWlyZSgnLi9jb21tYW5kcy9hcHBGZWF0dXJlcycpO1xyXG52YXIgY29udHJvbHNfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvY29udHJvbHMnKTtcclxudmFyIGVtYmVkXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2VtYmVkJyk7XHJcbnZhciBwb3N0QWN0aW9uXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL3Bvc3RBY3Rpb24nKTtcclxudmFyIHBvc3RFdmVudF8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9wb3N0RXZlbnQnKTtcclxudmFyIGRldmljZV8xID0gcmVxdWlyZSgnLi9jb21tYW5kcy9kZXZpY2UnKTtcclxudmFyIG9wZW5XaW5kb3dfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvb3BlbldpbmRvdycpO1xyXG52YXIgZW1haWxfMSA9IHJlcXVpcmUoJy4vY29tbWFuZHMvZW1haWwnKTtcclxudmFyIGNyZWRlbnRpYWxzXzEgPSByZXF1aXJlKCcuL2NvbW1hbmRzL2NyZWRlbnRpYWxzJyk7XHJcbnZhciBtZmx5Q29tbWFuZHMgPSB7XHJcbiAgICBjbG9zZTogbmF2aWdhdGlvbl8xLmNsb3NlLFxyXG4gICAgZ2V0SW50ZXJhY3RpdmVJbmZvOiBpbnRlcmFjdGl2ZUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0Q3JlZGVudGlhbHM6IGNyZWRlbnRpYWxzXzEuZGVmYXVsdCxcclxuICAgIGdldFN5c3RlbUluZm86IHN5c3RlbUluZm9fMS5kZWZhdWx0LFxyXG4gICAgZ2V0T25saW5lU3RhdHVzOiBvbmxpbmVTdGF0dXNfMS5kZWZhdWx0LFxyXG4gICAgZ2V0R3BzQ29vcmRpbmF0ZXM6IGdwc0Nvb3JkaW5hdGVzXzEuZGVmYXVsdCxcclxuICAgIGdldFVwbG9hZFVybDogdXBsb2FkVXJsXzEuZGVmYXVsdCxcclxuICAgIGdldEZvbGRlcjogZm9sZGVyXzEuZGVmYXVsdCxcclxuICAgIGZpbHRlcjogZmlsdGVyXzEuZGVmYXVsdCxcclxuICAgIHNlYXJjaDogc2VhcmNoXzEuc2VhcmNoLFxyXG4gICAgc2hvd1NlYXJjaDogc2VhcmNoXzEuc2hvd1NlYXJjaCxcclxuICAgIGhpZGVDb250cm9sQmFyczogY29udHJvbHNfMS5oaWRlQ29udHJvbEJhcnMsXHJcbiAgICBzaG93Q29udHJvbEJhcnM6IGNvbnRyb2xzXzEuc2hvd0NvbnRyb2xCYXJzLFxyXG4gICAgZW1iZWQ6IGVtYmVkXzEuZW1iZWQsXHJcbiAgICBlbWJlZEltYWdlOiBlbWJlZF8xLmVtYmVkSW1hZ2UsXHJcbiAgICBnZXREYXRhOiBlbWJlZF8xLmdldERhdGEsXHJcbiAgICBnZXREZXZpY2VUeXBlOiBkZXZpY2VfMS5nZXREZXZpY2VUeXBlLFxyXG4gICAgZ2V0UHJlZml4OiBkZXZpY2VfMS5nZXRQcmVmaXgsXHJcbiAgICBpc0xvY2FsaG9zdEZvckRldmVsb3BtZW50OiBkZXZpY2VfMS5pc0xvY2FsaG9zdEZvckRldmVsb3BtZW50LFxyXG4gICAgaXNXaW5kb3dzODogZGV2aWNlXzEuaXNXaW5kb3dzOCxcclxuICAgIG9wZW5XaW5kb3c6IG9wZW5XaW5kb3dfMS5kZWZhdWx0LFxyXG4gICAgcG9zdEFjdGlvbjogcG9zdEFjdGlvbl8xLnBvc3RBY3Rpb24sXHJcbiAgICBwb3N0UGFnZVZpZXc6IHBvc3RBY3Rpb25fMS5wb3N0UGFnZVZpZXcsXHJcbiAgICBwb3N0RXZlbnQ6IHBvc3RFdmVudF8xLnBvc3RFdmVudCxcclxuICAgIHNlbmRFbWFpbDogZW1haWxfMS5kZWZhdWx0LFxyXG59O1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGl0ZW0pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGNvbGxlY3Rpb25zKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBkb3dubG9hZGVyKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBub3RpZmljYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFjY291bnRJbmZvKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBsb2NhbEtleVZhbHVlU3RvcmFnZSk7XHJcbiQuZXh0ZW5kKG1mbHlDb21tYW5kcywgc3luY2VkS2V5VmFsdWVTdG9yYWdlKTtcclxuJC5leHRlbmQobWZseUNvbW1hbmRzLCBhcHBsaWNhdGlvblN5bmMpO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIG5hdmlnYXRpb24pO1xyXG4kLmV4dGVuZChtZmx5Q29tbWFuZHMsIGFwcEZlYXR1cmVzKTtcclxubW9kdWxlLmV4cG9ydHMgPSBtZmx5Q29tbWFuZHM7XHJcbiJdfQ==
