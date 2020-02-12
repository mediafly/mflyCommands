(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mflyCommands = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getUserInfo() {
    return internalMethods_1.get('account');
}
exports.getUserInfo = getUserInfo;
function logout() {
    window.location.href = '/interactive-redirect/v5/account/logout';
}
exports.logout = logout;

},{"./internalMethods":20}],2:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],3:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function refresh() {
    return internalMethods_1.post('sync');
}
exports.refresh = refresh;
function getSyncStatus() {
    return internalMethods_1.get('sync', 'status');
}
exports.getSyncStatus = getSyncStatus;

},{"./internalMethods":20}],4:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = _dereq_("./utils");
// dictionary guid -> anon funcions
var callbacks = {};
function asyncCallback(guid, data) {
    callbacks[guid](data);
    callbacks[guid] = null;
}
exports.asyncCallback = asyncCallback;
function getDefined() {
    return InteractivesInterface.getDefined && InteractivesInterface.getDefined();
}
exports.getDefined = getDefined;
function callAsync(verb, url, data) {
    if (data === void 0) { data = null; }
    var newGuid = utils_1.guid();
    var deferred = $.Deferred();
    callbacks[newGuid] = function (result) {
        deferred.resolve(result);
    };
    InteractivesInterface.handleAsync(newGuid, url, verb, JSON.stringify(data));
    return deferred.promise();
}
exports.callAsync = callAsync;
function InteractivesInterfaceIsDefined() {
    return typeof InteractivesInterface !== 'undefined';
}
exports.InteractivesInterfaceIsDefined = InteractivesInterfaceIsDefined;

},{"./utils":34}],5:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],6:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var device_1 = _dereq_("./device");
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

},{"./device":10}],7:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],8:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
var updateMetadata_1 = _dereq_("./updateMetadata");
function copy(parentId, slug, name) {
    var action = internalMethods_1.post("items/copy", { parentId: parentId, slug: slug, name: name });
    if (name) {
        action = action.then(function (newItem) { return updateMetadata_1.updateItemMetadata(newItem.id, { "title": name }); });
    }
    return action;
}
exports.default = copy;

},{"./internalMethods":20,"./updateMetadata":32}],9:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getCredentials() {
    return internalMethods_1.get('credentials');
}
exports.default = getCredentials;

},{"./internalMethods":20}],10:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

},{}],11:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],12:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function sendEmail(options) {
    return internalMethods_1.post('email', options);
}
exports.sendEmail = sendEmail;
function getEmailStatus(id) {
    return internalMethods_1.get('email-status', id);
}
exports.getEmailStatus = getEmailStatus;

},{"./internalMethods":20}],13:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var device_1 = _dereq_("./device");
var item_1 = _dereq_("./item");
function embed(element, id, page) {
    item_1.getItem(id).then(function (i) {
        var pageArg = page ? "?page=" + page : '';
        if (device_1.isWeb()) {
            element.attr('src', i.resourceUrl + pageArg);
        }
        else {
            getResource(i.resourceUrl + pageArg).then(function () {
                return element.attr('src', i.resourceUrl + pageArg);
            });
        }
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
        if (device_1.isWeb()) {
            element.attr('src', url);
        }
        else {
            getResource(url).then(function () {
                return element.attr('src', url);
            });
        }
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

},{"./device":10,"./item":21}],14:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getFavorites() {
    return internalMethods_1.get('favorites/items');
}
exports.getFavorites = getFavorites;
function favorite(id) {
    return internalMethods_1.post("items/" + id + "/favorite");
}
exports.favorite = favorite;
function unfavorite(id) {
    return internalMethods_1.post("items/" + id + "/unfavorite");
}
exports.unfavorite = unfavorite;

},{"./internalMethods":20}],15:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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
function getPage(obj, offset, limit) {
    var filter = encodeURIComponent(objToString(obj));
    return internalMethods_1.get("items?filter=" + filter + "&offset=" + offset + "&limit=" + limit);
}
function getAllFilterResults(obj) {
    var result = [];
    var offset = 0;
    var limit = 100;
    var accumulatePages = function (obj) {
        return getPage(obj, offset, limit)
            .then(function (data) {
            result = result.concat(data);
            if (data.length < limit) {
                return result;
            }
            else {
                offset += limit;
                return accumulatePages(obj);
            }
        });
    };
    return accumulatePages(obj);
}
function filter(obj, offset, limit) {
    if (typeof offset == 'undefined') {
        return getAllFilterResults(obj);
    }
    else {
        return getPage(obj, offset, limit);
    }
}
exports.default = filter;

},{"./internalMethods":20}],16:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getFolder(id) {
    return internalMethods_1.get('items', id + "/items");
}
exports.default = getFolder;

},{"./internalMethods":20}],17:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = _dereq_("./collections");
var search_1 = _dereq_("./search");
var interactiveInfo_1 = _dereq_("./interactiveInfo");
var folder_1 = _dereq_("./folder");
function getParentItems(offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 100; }
    return interactiveInfo_1.default()
        .then(function (info) {
        if (info.invokedFrom === 'folder') {
            return folder_1.default(info.invokedFromId);
        }
        if (info.invokedFrom === 'collection') {
            return collections_1.getCollection(info.invokedFromId);
        }
        if (info.invokedFrom === 'search') {
            return search_1.search(info.invokedFromTerm, offset, limit);
        }
        return folder_1.default(info.parentId);
    });
}
exports.default = getParentItems;

},{"./collections":5,"./folder":16,"./interactiveInfo":19,"./search":29}],18:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getGpsCoordinates() {
    return internalMethods_1.get('system', 'gps');
}
exports.default = getGpsCoordinates;

},{"./internalMethods":20}],19:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getInteractiveInfo() {
    var interactiveContext;
    try {
        interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext']);
    }
    catch (err) { }
    return internalMethods_1.get('interactive')
        .then(function (info) {
        if (!!interactiveContext) {
            switch (interactiveContext.type) {
                case 'collection':
                    info.invokedFrom = 'collection';
                    info.invokedFromId = interactiveContext.id;
                    return info;
                case 'folder':
                    info.invokedFrom = 'folder';
                    info.invokedFromId = interactiveContext.parentSlug;
                    return info;
                case 'search':
                    info.invokedFrom = 'search';
                    info.invokedFromTerm = interactiveContext.term;
                    return info;
                default:
                    return info;
            }
        }
        return info;
    });
}
exports.default = getInteractiveInfo;

},{"./internalMethods":20}],20:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var device = _dereq_("./device");
var commandSupport_1 = _dereq_("./commandSupport");
var async_1 = _dereq_("./async");
function get(func, param, expectJson) {
    var _this = this;
    if (param === void 0) { param = null; }
    if (expectJson === void 0) { expectJson = true; }
    var prefix = device.getPrefix();
    var url = prefix + func + (param === null ? '' : '/' + param);
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    var deferred = $.Deferred();
    if (async_1.InteractivesInterfaceIsDefined() && async_1.getDefined()) {
        async_1.callAsync('GET', url)
            .then(function (result) {
            var resultJSON = JSON.parse(result);
            if (resultJSON.status < 300) {
                deferred.resolveWith(_this, [resultJSON.data, resultJSON.status]);
            }
            else {
                deferred.rejectWith(_this, [resultJSON.data, resultJSON.status]);
            }
        });
    }
    else {
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
                handleAuthForWeb(data);
                deferred.reject(this, [request, data.status]);
            }
        });
    }
    return deferred.promise();
}
exports.get = get;
function post(func, data) {
    var _this = this;
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (async_1.InteractivesInterfaceIsDefined()) {
        async_1.callAsync('POST', url, data)
            .then(function (result) {
            var resultJSON = JSON.parse(result);
            if (resultJSON.status < 300) {
                deferred.resolveWith(_this, [resultJSON.data, resultJSON.status]);
            }
            else {
                deferred.rejectWith(_this, [resultJSON.data, resultJSON.status]);
            }
        });
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
                handleAuthForWeb(data);
                deferred.reject(this, [request, data.status]);
            }
        });
    }
    return deferred.promise();
}
exports.post = post;
function ddelete(func, data) {
    var _this = this;
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (async_1.InteractivesInterfaceIsDefined()) {
        async_1.callAsync('DELETE', url, data)
            .then(function (result) {
            var resultJSON = JSON.parse(result);
            if (resultJSON.status < 300) {
                deferred.resolveWith(_this, [resultJSON.data, resultJSON.status]);
            }
            else {
                deferred.rejectWith(_this, [resultJSON.data, resultJSON.status]);
            }
        });
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
                handleAuthForWeb(data);
                deferred.reject(this, [request, data.status]);
            }
        });
    }
    return deferred.promise();
}
exports.ddelete = ddelete;
function put(func, data) {
    var _this = this;
    if (data === void 0) { data = null; }
    var deferred = $.Deferred();
    var prefix = device.getPrefix();
    var url = prefix + func;
    if (commandSupport_1.isUnsupported(url)) {
        throw new Error('This method is not supported on this platform.');
    }
    if (async_1.InteractivesInterfaceIsDefined()) {
        async_1.callAsync('PUT', url, data)
            .then(function (result) {
            var resultJSON = JSON.parse(result);
            if (resultJSON.status < 300) {
                deferred.resolveWith(_this, [resultJSON.data, resultJSON.status]);
            }
            else {
                deferred.rejectWith(_this, [resultJSON.data, resultJSON.status]);
            }
        });
    }
    else {
        $.ajax({
            method: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            url: url,
            success: function (data, textStatus, request) {
                deferred.resolveWith(this, [data, request.status]);
            },
            error: function (data, status, request) {
                handleAuthForWeb(data);
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
function handleAuthForWeb(response) {
    if (device.isWeb() && (response.status === 401 || response.status === 451)) {
        // Viewer does not have an authenticated session. Take user to Viewer root.
        sessionStorage.setItem('returnUrl', window.location.href);
        window.location.replace(response.responseJSON.returnUrl);
    }
}

},{"./async":4,"./commandSupport":6,"./device":10}],21:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function createItem(item) {
    return internalMethods_1.post('items', item);
}
exports.createItem = createItem;
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

},{"./internalMethods":20}],22:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
var device_1 = _dereq_("./device");
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

},{"./device":10,"./internalMethods":20}],23:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_1 = _dereq_("./item");
var device_1 = _dereq_("./device");
var internalMethods_1 = _dereq_("./internalMethods");
var utils_1 = _dereq_("./utils");
function preserveContext(url) {
    if ((device_1.isWeb() || device_1.isDesktop()) && !!sessionStorage['viewerInteractiveContext']) {
        var interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext']);
        if (interactiveContext.type === 'storyMapper') {
            url += "?sourceSlug=" + interactiveContext.sourceSlug;
            if (interactiveContext.sourcePage) {
                url += "&sourcePage=" + interactiveContext.sourcePage;
            }
            if (interactiveContext.sourceParentSlug) {
                url += "&sourceParentSlug=" + interactiveContext.sourceParentSlug;
            }
            if (interactiveContext.collection) {
                url += "&collection=" + interactiveContext.collection;
            }
            if (interactiveContext.sourceSearch) {
                url += "&sourceSearch=" + encodeURIComponent(interactiveContext.sourceSearch);
            }
            if (interactiveContext.sourceCollection) {
                url += "&sourceCollection=" + encodeURIComponent(interactiveContext.sourceCollection);
            }
        }
        if (interactiveContext.type === 'collection') {
            url += '?collection=' + interactiveContext.id;
        }
        if (interactiveContext.type === 'search') {
            url += '?term=' + interactiveContext.term;
        }
        if (interactiveContext.type === 'folder') {
            url += '?parentSlug=' + interactiveContext.parentSlug;
        }
    }
    var returnUrl = utils_1.getUrlParameter('returnurl');
    if (returnUrl) {
        url += "?returnurl=" + utils_1.getUrlParameter('returnurl');
    }
    return url;
}
function close() {
    var url = preserveContext('/interactive-redirect/v5/items/__self__/back');
    window.location.href = url;
}
exports.close = close;
function next() {
    var url = preserveContext('/interactive-redirect/v5/items/__self__/next');
    window.location.href = url;
}
exports.next = next;
function previous() {
    var url = preserveContext('/interactive-redirect/v5/items/__self__/previous');
    window.location.href = url;
}
exports.previous = previous;
function open(id, options) {
    item_1.getItem(id).then(function (item) {
        var params = {};
        var url = item.url;
        if (device_1.isWeb() || device_1.isDesktop()) {
            params.returnurl = window.location.href;
        }
        // Backwards compatiblity where bookmark is the second param
        if (typeof options === 'number') {
            params.bookmark = options;
        }
        else if (typeof options === 'object') {
            var openItemOptions = options;
            if (openItemOptions.bookmark) {
                params.bookmark = options.bookmark;
            }
            if (openItemOptions.context === 'collection') {
                params.collection = openItemOptions.collection;
            }
            if (openItemOptions.context === 'search') {
                params.search = openItemOptions.search;
            }
            if (openItemOptions.context === 'searchFolder') {
                params.parentSlug = openItemOptions.parentSlug;
            }
            if (openItemOptions.params) {
                params = $.extend(params, openItemOptions.params);
            }
        }
        url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
        window.location.href = window.location.protocol + "//" + window.location.host + url;
    });
}
exports.open = open;
exports.openItem = open;
function openFolder(id) {
    item_1.getItem(id).then(function (item) {
        window.location.href = item.url;
    });
}
exports.openFolder = openFolder;
function openLink(link) {
    if (device_1.isWeb() || device_1.isDesktop()) {
        window.open(link);
        return $.when();
    }
    return internalMethods_1.post('open-link', { link: link });
}
exports.openLink = openLink;
function goto() {
    console.error('goto method is now deprecated. Please use openItem going forward.');
}
exports.goto = goto;
function browse() {
    console.error('browse method is now deprecated. Please use openItem going forward.');
}
exports.browse = browse;

},{"./device":10,"./internalMethods":20,"./item":21,"./utils":34}],24:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],25:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getOnlineStatus(argument) {
    return internalMethods_1.get('system', 'online-status');
}
exports.default = getOnlineStatus;

},{"./internalMethods":20}],26:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = _dereq_("./utils");
function openWindow(url) {
    return window.open(url, "InteractivesWindow" + utils_1.guid());
}
exports.default = openWindow;

},{"./utils":34}],27:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],28:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function postEvent(key, properties) {
    return internalMethods_1.post("events", { key: key, properties: JSON.stringify(properties) });
}
exports.postEvent = postEvent;

},{"./internalMethods":20}],29:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getPage(term, offset, limit) {
    var obj = {
        term: term,
        offset: offset,
        limit: limit
    };
    var qs = $.param(obj);
    return internalMethods_1.get('items?' + qs);
}
function getAllSearchResults(term) {
    var result = [];
    var offset = 0;
    var limit = 100;
    var accumulatePages = function (term) {
        return getPage(term, offset, limit)
            .then(function (data) {
            result = result.concat(data);
            if (data.length < limit) {
                return result;
            }
            else {
                offset += limit;
                return accumulatePages(term);
            }
        });
    };
    return accumulatePages(term);
}
function getRelatedItems(id, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 100; }
    var term = "_related:" + id;
    return search(term, offset, limit);
}
exports.getRelatedItems = getRelatedItems;
function search(term, offset, limit) {
    if (typeof offset == 'undefined') {
        return getAllSearchResults(term);
    }
    else {
        return getPage(term, offset, limit);
    }
}
exports.search = search;
function showSearch(x, y, width, height) {
    return internalMethods_1.showUI('search', x, y, width, height);
}
exports.showSearch = showSearch;

},{"./internalMethods":20}],30:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
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

},{"./internalMethods":20}],31:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getSystemInfo() {
    return internalMethods_1.get('system');
}
exports.default = getSystemInfo;

},{"./internalMethods":20}],32:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
//This endpoint is only implemented in Viewer and should be deprecated
//in favor of updateItemMetadata
function updateMetadata(id, metadata) {
    return internalMethods_1.put("items/" + id + "/metadata", metadata);
}
exports.updateMetadata = updateMetadata;
function updateItemMetadata(id, metadata) {
    return internalMethods_1.put("items/" + id + "/item-metadata", { metadataJson: metadata });
}
exports.updateItemMetadata = updateItemMetadata;

},{"./internalMethods":20}],33:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMethods_1 = _dereq_("./internalMethods");
function getUploadUrl(key) {
    return internalMethods_1.get('system', "uploadurl?key=" + key);
}
exports.default = getUploadUrl;

},{"./internalMethods":20}],34:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
}
exports.getUrlParameter = getUrlParameter;

},{}],35:[function(_dereq_,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packageJson = _dereq_('../../package.json');
function version() {
    return packageJson.version;
}
exports.default = version;

},{"../../package.json":37}],36:[function(_dereq_,module,exports){
"use strict";
/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) for example, http://localhost:8000/ .
 */
var interactiveInfo_1 = _dereq_("./commands/interactiveInfo");
var systemInfo_1 = _dereq_("./commands/systemInfo");
var onlineStatus_1 = _dereq_("./commands/onlineStatus");
var uploadUrl_1 = _dereq_("./commands/uploadUrl");
var item = _dereq_("./commands/item");
var collections = _dereq_("./commands/collections");
var folder_1 = _dereq_("./commands/folder");
var getParentItems_1 = _dereq_("./commands/getParentItems");
var filter_1 = _dereq_("./commands/filter");
var gpsCoordinates_1 = _dereq_("./commands/gpsCoordinates");
var favorites = _dereq_("./commands/favorites");
var search_1 = _dereq_("./commands/search");
var navigation_1 = _dereq_("./commands/navigation");
var downloader = _dereq_("./commands/downloader");
var notification = _dereq_("./commands/notification");
var accountInfo = _dereq_("./commands/accountInfo");
var localKeyValueStorage = _dereq_("./commands/localKeyValueStorage");
var syncedKeyValueStorage = _dereq_("./commands/syncedKeyValueStorage");
var applicationSync = _dereq_("./commands/applicationSync");
var navigation = _dereq_("./commands/navigation");
var appFeatures = _dereq_("./commands/appFeatures");
var controls_1 = _dereq_("./commands/controls");
var embed_1 = _dereq_("./commands/embed");
var postAction_1 = _dereq_("./commands/postAction");
var postEvent_1 = _dereq_("./commands/postEvent");
var device_1 = _dereq_("./commands/device");
var openWindow_1 = _dereq_("./commands/openWindow");
var email_1 = _dereq_("./commands/email");
var credentials_1 = _dereq_("./commands/credentials");
var version_1 = _dereq_("./commands/version");
var copy_1 = _dereq_("./commands/copy");
var updateMetadata = _dereq_("./commands/updateMetadata");
var async_1 = _dereq_("./commands/async");
var mflyCommands = {
    asyncCallback: async_1.asyncCallback,
    close: navigation_1.close,
    copy: copy_1.default,
    getExtensionInfo: interactiveInfo_1.default,
    getInteractiveInfo: interactiveInfo_1.default,
    getCredentials: credentials_1.default,
    getSystemInfo: systemInfo_1.default,
    getOnlineStatus: onlineStatus_1.default,
    getGpsCoordinates: gpsCoordinates_1.default,
    getRelatedItems: search_1.getRelatedItems,
    getUploadUrl: uploadUrl_1.default,
    getFolder: folder_1.default,
    getParentItems: getParentItems_1.default,
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
    getEmailStatus: email_1.getEmailStatus,
    sendEmail: email_1.sendEmail,
    version: version_1.default
};
$.extend(mflyCommands, item);
$.extend(mflyCommands, collections);
$.extend(mflyCommands, downloader);
$.extend(mflyCommands, favorites);
$.extend(mflyCommands, notification);
$.extend(mflyCommands, accountInfo);
$.extend(mflyCommands, localKeyValueStorage);
$.extend(mflyCommands, syncedKeyValueStorage);
$.extend(mflyCommands, applicationSync);
$.extend(mflyCommands, navigation);
$.extend(mflyCommands, appFeatures);
$.extend(mflyCommands, updateMetadata);
window['mflyCommands'] = window['mflyCommands'] || mflyCommands;
module.exports = window['mflyCommands'];

},{"./commands/accountInfo":1,"./commands/appFeatures":2,"./commands/applicationSync":3,"./commands/async":4,"./commands/collections":5,"./commands/controls":7,"./commands/copy":8,"./commands/credentials":9,"./commands/device":10,"./commands/downloader":11,"./commands/email":12,"./commands/embed":13,"./commands/favorites":14,"./commands/filter":15,"./commands/folder":16,"./commands/getParentItems":17,"./commands/gpsCoordinates":18,"./commands/interactiveInfo":19,"./commands/item":21,"./commands/localKeyValueStorage":22,"./commands/navigation":23,"./commands/notification":24,"./commands/onlineStatus":25,"./commands/openWindow":26,"./commands/postAction":27,"./commands/postEvent":28,"./commands/search":29,"./commands/syncedKeyValueStorage":30,"./commands/systemInfo":31,"./commands/updateMetadata":32,"./commands/uploadUrl":33,"./commands/version":35}],37:[function(_dereq_,module,exports){
module.exports={
  "name": "mfly-commands",
  "version": "3.8.1",
  "description": "mflyCommands.js for Mediafly Interactives",
  "main": "src/mflyCommands.js",
  "scripts": {
    "start": "extension-cli serve",
    "clean": "rm -rf .temp src & mkdir src",
    "compile": "tsc",
    "browserify": "browserify .temp/mflyCommands.js --standalone mflyCommands | derequire > src/mflyCommands.js",
    "prebuild": "npm run clean",
    "build": "npm run compile && npm run browserify",
    "watch": "npm run build & chokidar mflyCommands.ts commands/**/*.ts -c 'npm run build' --polling --poll-interval 100 --verbose"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/mediafly/mflyCommands.git"
  },
  "author": {
    "name": "Nachiket Mehta",
    "email": "nmehta@mediafly.com",
    "url": "https://github.com/mediafly"
  },
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/mediafly/mflyCommands/issues"
  },
  "homepage": "https://github.com/mediafly/mflyCommands#readme",
  "keywords": [
    "mflyCommands",
    "Mediafly",
    "Interactives"
  ],
  "dependencies": {
    "jquery": "3.4.0"
  },
  "devDependencies": {
    "@types/jquery": "3.3.1",
    "browserify": "13.1.0",
    "browserify-shim": "3.8.12",
    "chokidar-cli": "1.2.2",
    "derequire": "^2.0.6",
    "typescript": "2.7.2"
  }
}

},{}]},{},[36])(36)
});