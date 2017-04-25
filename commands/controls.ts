import { post } from './internalMethods'

export function showControlBars() {
	return post('control/show-ui', {
		ui: 'control-bar',
		visible: true
	})
}

export function hideControlBars(x, y, width, height) {
	return post('control/show-ui', {
		ui: 'control-bar',
		visible: false
	})
}
