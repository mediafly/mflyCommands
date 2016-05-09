/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */

import { extend } from 'jquery'
import getInteractiveInfo from './commands/interactiveInfo'
import getSystemInfo from './commands/systemInfo'
import getOnlineStatus from './commands/onlineStatus'
import getUploadUrl from './commands/uploadUrl'
import * as item from './commands/item'
import * as collections from './commands/collections'
import getFolder from './commands/folder'
import filter from './commands/filter'
import getGpsCoordinates from './commands/gpsCoordinates'
import search from './commands/search'
import close from './commands/close'
import * as downloader from './commands/downloader'

var mflyCommands = {
	close,
	getInteractiveInfo,
	getSystemInfo ,
	getOnlineStatus,
	getGpsCoordinates,
	getUploadUrl,
	getFolder,
	filter,
	search,
}

extend(mflyCommands, item)
extend(mflyCommands, collections)
extend(mflyCommands, downloader)

export = mflyCommands