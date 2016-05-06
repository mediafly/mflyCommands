import { getData } from './internalMethods'

export default function getUploadUrl(key) {
	return getData('system', `uploadurl?key=${key}`)
}
