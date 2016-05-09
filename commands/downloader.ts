import { isWeb } from './device'
import { get, post } from './internalMethods'

export function showDownloader(x, y, width, height) {
	return post('control/show-ui', {
		ui: 'downloads',
		position: {
			x,
			y,
			width,
			height
		}
	})
	
}

