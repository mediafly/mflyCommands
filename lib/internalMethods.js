var device = require('./device')
var guid = require('./utils').guid
var $ = require('jquery')

function _transformUrl(url) {
    /**
     * Required for Windows8 support.
     */
    if (device.isWindows8()) {
        var port = location.port
        return "http://localhost:" + port + "/device.windows8.data.ajax?url__VB64__=" + Base64.encode(url) + "&newCall=" + guid()
    } else {
        return url
    }
}

exports.getData = function _internalGetData(func, param, dfd, expectJson = true) {
    var prefix = device.getPrefix()
    var url = _transformUrl(prefix + func + (param === null ? "" : "/" + param))

    $.ajax({
        url: url,
        success: function (data, textStatus, request) {
            // Content retrieved. Transform to JSON if supposed to.
            if (expectJson && request && request.getResponseHeader("Content-Type").indexOf("text/html") > -1) {
                // This was sent back as text/html JSON.parse it to a JSON object.
                data = JSON.parse(data)
            }

            // Resolve the promise.
            dfd.resolveWith(this, [data, request.status])
        },
        error: function (data, status, request) {
            // Content could not be retrieved. Reject the promise.
            if (device.isWeb() && data.status === 401) {
                // Viewer does not have an authenticated session. Take user to Viewer root.
                sessionStorage.returnUrl = window.location.href
                window.location.replace(data.responseJSON.returnUrl)
            }

            dfd.reject(this, [request, data.status])
        }
    })
}