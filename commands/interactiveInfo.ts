import {getDeviceType, deviceTypes} from './device'
import { get } from './internalMethods'

export default function getInteractiveInfo () {

	const interactiveContext = JSON.parse(sessionStorage['viewerInteractiveContext'])
	return get('interactive')
		.then(info => {
			if (!!interactiveContext) {

				switch (interactiveContext.type) {
					case 'collection':
						info.invokedFrom = 'collection'
						info.invokedFromId = interactiveContext.id
						return info

					case 'folder':
						info.invokedFrom = 'folder'
						info.invokedFromId = interactiveContext.parentSlug
						return info
				
					default:
						return info
				}
			}

			return info
		})
}