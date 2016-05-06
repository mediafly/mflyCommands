/**
 * (c) 2013-2016, Mediafly, Inc.
 * mflyCommands is a singleton instance which wraps common mfly calls into a JavaScript object.
 * Before use, please be sure to call setPrefix if you are working on a development platform (e.g.
 * a local webserver on a PC) to override mfly:// with, for example, http://localhost:8000/ .
 */

import interactiveInfo from './commands/interactiveInfo'
import systemInfo from './commands/systemInfo'
import onlineStatus from './commands/onlineStatus'
import uploadUrl from './commands/uploadUrl'
import { getCurrentItem, getItem, shareItem } from './commands/item'
import getFolder from './commands/folder'
import filter from './commands/filter'
import gpsCoordinates from './commands/gpsCoordinates'
import search from './commands/search'

var mflyCommands = {
	getInteractiveInfo: interactiveInfo,
	getSystemInfo: systemInfo,
	getOnlineStatus: onlineStatus,
	getGpsCoordinates: gpsCoordinates,
	getUploadUrl: uploadUrl,
	getCurrentItem: getCurrentItem,
	getItem: getItem,
	getShare: shareItem,
	getFolder: getFolder,
	filter: filter,
	search: search,
}

export = mflyCommands