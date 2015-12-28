/**
 * (c) 2013-2015, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */
"use strict";
var mflyCommands = function () {

    /**
     * Private variables and functions
     */
    var prefix = "mfly://";
    var deviceType = "";

    function _isWeb() {
        return mflyCommands.getDeviceType() === mflyCommands.deviceTypes.web;
    }

    function _isWindows8() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("msie") != -1) {
            if (userAgent.indexOf("webview") != -1) {
                return true;
            }
        }
        return false;
    }

    function _appendVersion(url) {
        var separator = url.indexOf('?') !== -1 ? "&" : "?";
        return url + separator + 'version=5';
    }

    function doControlStatement(url) {
        url = _appendVersion(url);

        if (_isWindows8()) {
            window.external.notify(url);
        } else if (_isWeb()) {
            window.location = url;
        }
        else {
            window.open(url);
        }
    }

    // Internal, recursive function to handle retry logic
    function _internalEmbed(id, dfd, options) {
        options = (typeof options === 'undefined') ? { } : options;
        if (_isWindows8()) {

            var pagepos = !options.page ? '' : '&position=' + options.page;
            var url = _transformUrl(prefix + "data/embed/" + id) + '&forceDownload=1' + pagepos;
            url = _appendVersion(url);

            $.ajax({
                url: url,
                contentType: "text/plain; charset=utf-8",
                dataType: "text",
                success: function (data, textStatus, request) {
                    var statusCode = 1 * request.getResponseHeader("x-inner-status");
                    if (!statusCode) {
                        statusCode = 1 * request.status;
                    }
                    switch (statusCode) {
                        case 202:
                            var delayFor = request.getResponseHeader("Retry-After") || 3;
                            setTimeout(function () {
                                _internalEmbed(id, dfd, options);
                            }, delayFor * 1000);
                            break;
                        case 301:
                            dfd.resolveWith(this, [request.getResponseHeader('x-Location'), request.responseText, statusCode]);
                            break;
                        case 404:
                            dfd.reject(this, [request.responseText, statusCode]);
                            break;
                    }
                },
                error: function (data, status, request) {
                    // Content could not be retrieved. Reject the promise.
                    dfd.reject(this, [request.responseText, request.status]);
                }
            });
        } else {
            // image scale params are only supported on the web
            var params = [
                { name: 'position', value: options.page },
                { name: 'size', value: options.size },
                { name: 'width', value: options.width },
                { name: 'height', value: options.height },
                { name: 'maxWidth', value: options.maxWidth },
                { name: 'maxHeight', value: options.maxHeight },
                { name: 'rotate', value: options.rotate },

            ].filter(function(x) {
                return !!x.value;
            });

            var url = prefix + "data/embed/" + id;
            if (params.length > 0) {
                url += '?' + $.param(params);
            }
            url = _appendVersion(url);
            $.ajax({
                url: url,
                success: function (data, textStatus, request) {
                    // Check for retry.
                    // iOS returns 202. Due to system limitations, Android returns 200 + blank response body
                    if (request.status === 202 || (request.status == 200 && !request.responseText)) {
                        // Suggested delay amount is set in the Retry-After header on iOS. Default to 3 seconds if not found.
                        var delayFor = request.getResponseHeader("Retry-After") || 3;
                        setTimeout(function () {
                            _internalEmbed(id, dfd, options);
                        }, delayFor * 1000);
                    } else {
                        // Content retrieved. Resolve the promise.
                        dfd.resolveWith(this, [request.responseText, request.status]);
                    }
                },
                error: function (data, status, request) {
                    // Content could not be retrieved. Reject the promise.
                    if (_isWeb() && data.status === 401) {
                        // Viewer does not have an authenticated session. Take user to Viewer root.
                        sessionStorage.returnUrl = window.location.href;
                        window.location.replace(data.responseJSON.returnUrl);
                    }

                    dfd.reject(this, [request.responseText, request.status]);
                }
            });
        }
    }

    function _internalGetData(func, param, dfd, expectJson) {
        if (expectJson === undefined) expectJson = true;
        var url = _transformUrl(prefix + "data/" + func + (param == null ? "" : "/" + param));
        url = _appendVersion(url);

        $.ajax({
            url: url,
            success: function (data, textStatus, request) {
                // Content retrieved. Transform to JSON if supposed to.
                if (expectJson && request && request.getResponseHeader("Content-Type").indexOf("text/html") > -1) {
                    // This was sent back as text/html; JSON.parse it to a JSON object.
                    data = JSON.parse(data);
                }

                // Resolve the promise.
                dfd.resolveWith(this, [data, request.status]);
            },
            error: function (data, status, request) {
                // Content could not be retrieved. Reject the promise.
                if (_isWeb() && data.status === 401) {
                    // Viewer does not have an authenticated session. Take user to Viewer root.
                    sessionStorage.returnUrl = window.location.href;
                    window.location.replace(data.responseJSON.returnUrl);
                }

                dfd.reject(this, [request, data.status]);

            }
        });
    }

    function _internalPutKeyData(key, value, dfd) {
        if (mflyCommands.getDeviceType() === mflyCommands.deviceTypes.web) {
            localStorage.setItem(key, value);
            dfd.resolveWith(this, ['', 200]);
        } else {
            var url = _transformUrl(prefix + "data/info/" + key);
            url = _appendVersion(url);
            $.ajax({
                type: "GET",
                url: url,
                contentType: "text/plain; charset=utf-8",
                data: "value=" + encodeURIComponent(value) + "&method=PUT",
                dataType: "text",
                success: function (data, textStatus, request) {
                    // PUT successful. Resolve the promise.
                    dfd.resolveWith(this, [data, request.status]);
                },
                error: function (data, status, request) {
                    // PUT failed. Reject the promise.
                    dfd.reject(this, [request, data.status]);
                }
            });
        }
    }

    function _internalDeleteKey(key, dfd) {
        if (mflyCommands.getDeviceType() === mflyCommands.deviceTypes.web) {
            localStorage.removeItem(key);
            dfd.resolveWith(this, ['', 200]);
        } else {
            var url = _transformUrl(prefix + "data/info/" + key);
            url = _appendVersion(url);
            url += '&method=DELETE'
            $.ajax({
                type: "GET",
                url: url,
                contentType: "text/plain; charset=utf-8",
                success: function (data, textStatus, request) {
                    // PUT successful. Resolve the promise.
                    dfd.resolveWith(this, [data, request.status]);
                },
                error: function (data, status, request) {
                    // PUT failed. Reject the promise.
                    dfd.reject(this, [request, data.status]);
                }
            });
        }
    }

    function _parseQueryParameters(x, y, w, h) {
        var qp = '?';
        if (typeof x != 'undefined') qp += 'x=' + x + '&';
        if (typeof y != 'undefined') qp += 'y=' + y + '&';
        if (typeof w != 'undefined') qp += 'w=' + w + '&';
        if (typeof h != 'undefined') qp += 'h=' + h + '&';
        if (qp.length > 1) {
            qp = qp.substr(0, qp.length - 1)
        } else {
            qp = ''
        }
        return qp;
    }


    /**
     * Required for Windows8 support.
     * @return guid
     */
    function _guid() {
        function s4() {
            return  Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     * Required for Windows8 support.
     */
    function _transformUrl(url) {
        if (_isWindows8()) {
            var port = location.port;
            return "http://localhost:" + port + "/device.windows8.data.ajax?url__VB64__=" + Base64.encode(url) + "&newCall=" + _guid();
        } else {
            return url;
        }
    }


    /**
     * Public variables and functions
     */

    return {
        deviceTypes: {
            "development": "development",
            "mobile": "mobile",
            "web": "web"
        },

        setPrefix: function (_prefix) {
            prefix = _prefix;
        },
        getPrefix: function () {
            return prefix;
        },

        setDeviceType: function (_deviceType) {
            deviceType = _deviceType;
        },
        getDeviceType: function () {
            return deviceType;
        },


        /**
         * Gets baseline information about this Interactive (ID, title, etc.). This is the same information
         * that is returned via mflyDataInit.
         */
        getInteractiveInfo: function () {
            if (mflyCommands.getDeviceType() === mflyCommands.deviceTypes.web || mflyCommands.getDeviceType() === mflyCommands.deviceTypes.development) {
                return $.Deferred(function (dfd) {
                    _internalGetData('interactive', null, dfd);
                });
            } else {
                return $.getJSON('mflyManifest.json');
            }
        },
        openItem: function (_id) {
            var url = prefix + "item/" + _id;
            if (_isWeb()) {
                url += '?returnurl=' + encodeURIComponent(window.location.href);
            }
            doControlStatement(url);
        },

        openFolder: function (_id) {
            doControlStatement(prefix + "folder/" + _id);
        },

        goto: function (_id) {
            doControlStatement(prefix + "control/goto/" + _id);
        },

        showControlBars: function () {
            doControlStatement(prefix + "control/showControlBars");
        },

        hideControlBars: function () {
            doControlStatement(prefix + "control/hideControlBars");
        },

        showSearch: function (_dimensions) {
            doControlStatement(prefix + "control/showSearch?" + _dimensions);
        },

        close: function () {
            var url = 'control/done';
            if (_isWeb() && !!sessionStorage.viewerInteractiveContext) {
                var interactiveContext = JSON.parse(sessionStorage.viewerInteractiveContext);
                if (interactiveContext.type === 'collection') {
                    url += '?collection=' + interactiveContext.id;
                }
                if (interactiveContext.type === 'search') {
                    url += '?term=' + interactiveContext.term;
                }
            }
            doControlStatement(prefix + url);
        },

        browse: function () {
            doControlStatement(prefix + "control/browse");
        },

        next: function () {
            var url = 'control/next';
            if (_isWeb() && !!sessionStorage.viewerInteractiveContext) {
                var interactiveContext = JSON.parse(sessionStorage.viewerInteractiveContext);
                if (interactiveContext.type === 'collection') {
                    url += '?collection=' + interactiveContext.id;
                }
                if (interactiveContext.type === 'search') {
                    url += '?term=' + interactiveContext.term;
                }
            }
            doControlStatement(prefix + url);
        },

        previous: function () {
            var url = 'control/previous';
            if (_isWeb() && !!sessionStorage.viewerInteractiveContext) {
                var interactiveContext = JSON.parse(sessionStorage.viewerInteractiveContext);
                if (interactiveContext.type === 'collection') {
                    url += '?collection=' + interactiveContext.id;
                }
                if (interactiveContext.type === 'search') {
                    url += '?term=' + interactiveContext.term;
                }
            }
            doControlStatement(prefix + url);
        },

        refresh: function () {
            doControlStatement(prefix + "control/refresh");
        },

        email: function (_id) {
            doControlStatement(prefix + "control/email/" + _id);
        },

        showSettings: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showSettings" + qp);
        },

        showUserManagement: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showSettings" + qp);
        },

        showDownloader: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showDownloader" + qp);
        },

        addToDownloader: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('addToDownloader', id, dfd, false);
            });
        },

        removeFromDownloader: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('removeFromDownloader', id, dfd, false);
            });
        },

        showAnnotations: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showAnnotations" + qp);
        },

        showCollections: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showCollections" + qp);
        },

        showAddToCollection: function (id, x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showAddToCollection?id=" + id + qp.replace('?', '&'));
        },

        showNotificationsManager: function (x, y, w, h) {
            var qp = _parseQueryParameters(x, y, w, h);
            doControlStatement(prefix + "control/showNotificationsManager" + qp);
        },

        takeAndEmailScreenshot: function () {
            doControlStatement(prefix + "control/takeAndEmailScreenshot");
        },

        showSecondScreenOptions: function () {
            doControlStatement(prefix + "control/secondScreenOptions");
        },


        /**
         * Get a JSON object with details of this item.
         * @param id Airship ID of the item/folder for which more information is requested.
         * @return a deferred that will resolve with a JSON object with details of this item/folder.
         */
        getItem: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('item', id, dfd);
            });
        },

        /**
         * Get a JSON object with the contents of this folder.
         * @param id Airship ID of the folder for which more information is requested.
         * @return a deferred that will resolve with a JSON array with the contents of this folder.
         */
        getFolder: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('folder', id, dfd);
            });
        },

        /**
         * Get a JSON object with the share settings for an item.
         * @param id Airship ID of the folder for which more information is requested.
         * @return a deferred that will resolve with a JSON object with the share settings for the item.
         */
        getShare: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('share', id, dfd);
            });
        },

        /**
         * Run the embed function and replace the src of jQuery element $e with the results.
         * @param $e jQuery element whose src element will get replace when the embeddable content
         * is ready for the Interactive.
         * @param id Airship ID of the item to embed.
         * @param page Page number for documents.
         */
        embed: function ($e, id, page) {
            if (_isWindows8()) {
                $.Deferred(function (dfd) {
                    _internalEmbed(id, dfd, {page: page});
                }).done(function (location, responseText, statusCode) {
                    $e.attr('src', location);
                }).fail(function () {
                    console.log('mflyCommands.js: embed failed. id=' + id + ' page=' + page + ' $e=', $e);
                });
            } else {
                $.Deferred(function (dfd) {
                    _internalEmbed(id, dfd, {page: page});
                }).done(function (url) {
                    if (_isWeb()) {
                        $e.attr('src', url);
                    }
                    else {
                        var pagepos = (typeof page == 'undefined' || page == null) ? '' : '?position=' + page;
                        $e.attr('src', prefix + 'data/embed/' + id + pagepos);
                    }
                }).fail(function () {
                    console.log('mflyCommands.js: embed failed. id=' + id + ' page=' + page + ' $e=', $e);
                });
            }
        },

        embedImage: function ($e, id, options) {
            options = (typeof options === 'undefined') ? { } : options;
            if (_isWindows8()) {
                $.Deferred(function (dfd) {
                    _internalEmbed(id, dfd, options);
                }).done(function (location, responseText, statusCode) {
                    $e.attr('src', location);
                }).fail(function () {
                    console.log('mflyCommands.js: embed failed. id=' + id + ' $e=', $e);
                });
            } else {
                $.Deferred(function (dfd) {
                    _internalEmbed(id, dfd, options);
                }).done(function (url) {
                    if (_isWeb()) {
                        $e.attr('src', url);
                    }
                    else {
                        $e.attr('src', prefix + 'data/embed/' + id);
                    }
                }).fail(function () {
                    console.log('mflyCommands.js: embed failed. id=' + id + ' $e=', $e);
                });
            }
        },

        /**
         * Post the action to Mediafly Reporting, in the case of embedding specific pages into an Interactive.
         * @param id Airship ID of the item shown
         * @param page Page of the item shown
         */
        postPageView: function(id, page) {
            return $.Deferred(function (dfd) {
                _internalGetData("postaction", id + "?page=" + page, dfd);
            });
        },

        /**
         * Post the action to Mediafly Reporting.
         * @param options are per device API's actions call
         */
        postAction: function(options) {
            return $.Deferred(function (dfd) {
                var params = 'actions?type=' + options.type;
                if (options.id) {
                    params += '&slug=' + options.id;
                }
                if (options.term) {
                    params += '&term=' + encodeURIComponent(options.term);
                }
                _internalGetData(params, null, dfd, false);
            });
        },

        /**
        * Get raw data of Interactive via the embed function.
        * @param id Airship ID of the item to embed. Currently limited to images and other Interactives
        * @return a deferred that will resolve with body and status code on completion.
        */
        getData: function (id) {
            if (mflyCommands.isWindows8()) {
                return $.Deferred(function (dfd2) {
                    $.Deferred(function (dfd) {
                        _internalEmbed(id, dfd);
                    }).done(function (location, responseText, statusCode) {
                        if (statusCode === 301) {
                            var url = location;
                            $.ajax({
                                url: url,
                                contentType: "text/plain charset=utf-8",
                                success: function (data, textStatus, request) {
                                    dfd2.resolveWith(this, [request.responseText, request.status]);
                                }
                            });
                        }
                    }).fail(function (responseText, statusCode) {
                        dfd2.reject(this, [responseText, statusCode]);
                    });
                });
            } else {
                return $.Deferred(function (dfd) {
                    _internalEmbed(id, dfd);
                });
            }
        },

        getSyncStatus: function () {
            return $.Deferred(function (dfd) {
                _internalGetData('getSyncStatus', null, dfd);
            });
        },
        getValue: function (key) {
            return $.Deferred(function (dfd) {
                if (mflyCommands.getDeviceType() === mflyCommands.deviceTypes.web) {
                    var value =  localStorage.getItem(key);
                    if (value) {
                        dfd.resolveWith(this, [value, 200]);
                    } else {
                        dfd.rejectWith(this, [value, 404]);
                    }
                } else {
                    _internalGetData('info', key, dfd, false);
                }
            });
        },
        getValues: function (prefix) {
            if (typeof prefix != 'undefined') {
                // Get values with specified prefix
                if (mflyCommands.getDeviceType() == mflyCommands.deviceTypes.web) {
                    return $.Deferred(function (dfd) {
                        var all = {};
                        for (var key in localStorage) {
                            // Check if key startswith prefix
                            if (key.slice(0, prefix.length) == prefix) {
                                all[key] = localStorage.getItem(key);
                            }
                        }
                        dfd.resolveWith(this, [all, 200]);
                    })
                } else {
                    return $.Deferred(function (dfd) {
                        _internalGetData('info?prefix=' + prefix, null, dfd);
                    });
                }
            } else {
                // Get ALL values
                if (mflyCommands.getDeviceType() == mflyCommands.deviceTypes.web) {
                    return $.Deferred(function (dfd) {

                        var all = {};
                        for (var key in localStorage) {
                            all[key] = localStorage.getItem(key);
                        }
                        dfd.resolveWith(this, [all, 200]);
                    })
                } else {
                    return $.Deferred(function (dfd) {
                        _internalGetData('info', null, dfd);
                    });
                }
            }
        },
        putValue: function (key, value) {
            return $.Deferred(function (dfd) {
                _internalPutKeyData(key, value, dfd);
            });
        },

        deleteKey: function (key) {
            return $.Deferred(function (dfd) {
                _internalDeleteKey(key, dfd);
            })
        },

        getOnlineStatus: function () {
            return $.Deferred(function (dfd) {
                _internalGetData('onlineStatus', null, dfd);
            });
        },

        /**
         * Get the download status for all items if ID is not passed. If ID is passed, get the download
         * status for that item.
         * @param id
         */
        getDownloadStatus: function (id) {
            var idStr = '';
            if (arguments.length == 1) {
                idStr = "/" + id;
            }

            return $.Deferred(function (dfd) {
                _internalGetData('download/status' + idStr, null, dfd);
            });
        },

        /**
         * Get the list of collections.
         */
        getCollections: function () {
            return $.Deferred(function (dfd) {
                _internalGetData('collections', null, dfd);
            });
        },

        /**
         * Get the contents of a collection.
         */
        getCollection: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('collection', id, dfd);
            });
        },

        /**
         * Create a Collection with name "name"
         */
        createCollection: function (name) {
            return $.Deferred(function (dfd) {
                _internalGetData('createCollection?name=' + encodeURIComponent(name), null, dfd);
            });
        },

        /**
         * Add item to Collection
         */
        addItemToCollection: function (collectionId, itemId) {
            return $.Deferred(function (dfd) {
                // Call internalGetData, but ensure that we do NOT expect JSON in the response.
                _internalGetData('addItemToCollection?id=' + collectionId + '&item=' + itemId, null, dfd, false);
            });
        },

        /**
         * Remove item from Collection
         */
        removeItemFromCollection: function (collectionId, itemId) {
            return $.Deferred(function (dfd) {
                // Call internalGetData, but ensure that we do NOT expect JSON in the response.
                _internalGetData('removeItemFromCollection?id=' + collectionId + '&item=' + itemId, null, dfd, false);
            });
        },

        deleteCollection: function (collectionId, shared) {
            return $.Deferred(function (dfd) {
                _internalGetData('deleteCollection', collectionId + '?shared=' + !!shared, dfd);
            });
        },

        reorderItemInCollection: function (collectionId, itemId, position) {
            return $.Deferred(function (dfd) {
                _internalGetData('reorderItemInCollection', collectionId + '?id=' + itemId + '&position=' + position, dfd);
            });
        },

        renameCollection: function (collectionId, name) {
            return $.Deferred(function (dfd) {
                _internalGetData('renameCollection', collectionId + '?name=' + encodeURIComponent(name), dfd);
            });
        },

        /**
         * Get notification status for an item.
         */
        getNotificationStatus: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('getNotificationStatus', id, dfd);
            });
        },
        /**
         * Add notification for a folder.
         */
        addNotification: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('addNotification', id, dfd);
            });
        },
        /**
         * Remove notification for a folder.
         */
        removeNotification: function (id) {
            return $.Deferred(function (dfd) {
                _internalGetData('removeNotification', id, dfd);
            });
        },

        /**
         * Do incremental search and return search results.
         */
        search: function (term) {
            return $.Deferred(function (dfd) {
                _internalGetData('search?term=' + encodeURIComponent(term), null, dfd);
            });
        },

        /**
         * Filter against metadata values.
         * Parameter: JSON object of key/value combinations. E.g. { { "type": "folder", "isPresent": true } }
         */
        filter: function (obj) {

            var dfd1 = $.Deferred();
            var result = [];
            obj.offset = 0;
            obj.limit = 100;

            var getPage = function () {
                var dfd2 = $.Deferred();
                var qs = $.param(obj);

                _internalGetData('filter?' + qs, null, dfd2);

                dfd2.promise().done(function (data) {
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

            getPage(obj.offset, obj.limit);

            return dfd1.promise();
        },

        /**
         * Get GPS Coordinates.
         */
        getGpsCoordinates: function () {
            return $.Deferred(function (dfd) {
                _internalGetData('gps', null, dfd);
            });
        },


        isLocalhostForDevelopment: function () {
            if (_isWindows8()) {
                return false;
            } else {
                return (window.location.host.indexOf('localhost:8000') > -1);
            }
        },
        isWindows8: function () {
            return _isWindows8();
        },

        /**
         * Needed for Windows 8 support.
         */
        documentReady: function () {
            if (prefix == "mfly://" && _isWindows8()) {
                doControlStatement(prefix + "control/ready");
            }
        },

        logout: function () {
            if (mflyCommands.getDeviceType() == mflyCommands.deviceTypes.web) {
                doControlStatement(prefix + "control/logout");
            }
            else if (mflyCommands.getDeviceType() == mflyCommands.deviceTypes.mobile) {
                return $.Deferred(function (dfd) {
                    _internalGetData('logout', null, dfd);
                });
            }
        }
    }
}();

/**
 * Set the prefix, based on whether this a development, web, or mobile version of the browser.
 * Requires iOS version ___, Android version ___, and Windows 8 version ___ to work correctly.
 */
(function (mflyCommands) {
    var developmentPrefix = "http://localhost:8000/";
    var webPrefix = "/interactive-api/";
    var mobilePrefix = "mfly://";

    // First, assume this is mobile with no additional input.
    mflyCommands.setPrefix(mobilePrefix);
    mflyCommands.setDeviceType(mflyCommands.deviceTypes.mobile);

    // If the local dev server is running, set the dev prefix
    if (mflyCommands.isLocalhostForDevelopment()) {
        mflyCommands.setPrefix(developmentPrefix);
        mflyCommands.setDeviceType(mflyCommands.deviceTypes.development);
    } else {
        for (var i = 0; i < document.cookie.split(';').length; i++) {
            if (document.cookie.split(';')[i].split('=')[0].toLowerCase().trim() === 'devicetype') {
                // This is a web device
               mflyCommands.setPrefix(webPrefix);
               mflyCommands.setDeviceType(mflyCommands.deviceTypes.web);
            }
        }
    }

})(mflyCommands);

/**
* Needed for Windows 8 support.
*/
$(document).ready(function () {
    mflyCommands.documentReady();
});


/**
*  Base64 encode / decode.
*  Needed for Windows 8 support.
*  http://www.webtoolkit.info/
*
**/
var Base64 = function () {

    /**
    * Private variables and functions
    */

    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


    function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }


    /**
     * Public variables and functions
     */

    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = _utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

            }

            return output;
        },

        decode: function (input) {
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

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

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
    }
}();
