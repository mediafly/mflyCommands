import { post } from './internalMethods'

export function showControlBars() {
	return post('control/control-bars', { visible: true })
}

export function hideControlBars(x, y, width, height) {
	return post('control/control-bars', { visible: false })
}
