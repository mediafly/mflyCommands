interface Folder {
	url: string
}

import { get } from './internalMethods'

export default function getFolder(id) : JQueryPromise<Folder> {
	return get('items', `${id}/items`)
}
