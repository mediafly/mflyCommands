import { get } from './internalMethods'

export default function getUploadUrl(key) {
	return get('system', `uploadurl?key=${key}`)
}
