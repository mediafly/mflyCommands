import { getData } from './internalMethods'

export default function uploadUrl(key) {
	return getData('system', `uploadurl?key=${key}`)
}
