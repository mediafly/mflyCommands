/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) for example, http://localhost:8000/ .
 */

import getInteractiveInfo from './commands/interactiveInfo'
import getSystemInfo from './commands/systemInfo'
import getOnlineStatus from './commands/onlineStatus'
import getUploadUrl from './commands/uploadUrl'
import * as item from './commands/item'
import * as collections from './commands/collections'
import getFolder from './commands/folder'
import getParentItems from './commands/getParentItems'
import filter from './commands/filter'
import getGpsCoordinates from './commands/gpsCoordinates'
import * as favorites from './commands/favorites'
import { search, showSearch } from './commands/search'
import { close } from './commands/navigation'
import * as downloader from './commands/downloader'
import * as notification from './commands/notification'
import * as accountInfo from './commands/accountInfo'
import * as localKeyValueStorage from './commands/localKeyValueStorage'
import * as syncedKeyValueStorage from './commands/syncedKeyValueStorage'
import * as applicationSync from './commands/applicationSync'
import * as navigation from './commands/navigation'
import * as appFeatures from './commands/appFeatures'
import { hideControlBars, showControlBars } from './commands/controls'
import { embed, embedImage, getData } from './commands/embed'
import { postAction, postPageView } from './commands/postAction'
import { postEvent } from './commands/postEvent'
import { getDeviceType, getPrefix, isLocalhostForDevelopment, isWindows8 } from './commands/device'
import openWindow from './commands/openWindow'
import { getEmailStatus, sendEmail } from './commands/email'
import getCredentials from './commands/credentials'
import version from './commands/version'
import copy from './commands/copy'
import * as updateMetadata from './commands/updateMetadata'
import { asyncCallback } from './commands/async'

var mflyCommands = {
	asyncCallback,
	close,
	copy,
	getExtensionInfo: getInteractiveInfo,
	getInteractiveInfo,
	getCredentials,
	getSystemInfo,
	getOnlineStatus,
	getGpsCoordinates,
	getUploadUrl,
	getFolder,
	getParentItems,
	filter,
	search,
	showSearch,
	hideControlBars,
	showControlBars,
	embed,
	embedImage,
	getData,
	getDeviceType,
	getPrefix,
	isLocalhostForDevelopment,
	isWindows8,
	openWindow,
	postAction,
	postPageView,
	postEvent,
	getEmailStatus,
	sendEmail,
	version
}

$.extend(mflyCommands, item)
$.extend(mflyCommands, collections)
$.extend(mflyCommands, downloader)
$.extend(mflyCommands, favorites)
$.extend(mflyCommands, notification)
$.extend(mflyCommands, accountInfo)
$.extend(mflyCommands, localKeyValueStorage)
$.extend(mflyCommands, syncedKeyValueStorage)
$.extend(mflyCommands, applicationSync)
$.extend(mflyCommands, navigation)
$.extend(mflyCommands, appFeatures)
$.extend(mflyCommands, updateMetadata)

window['mflyCommands'] = mflyCommands
export = mflyCommands
