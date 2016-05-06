import { getData } from './internalMethods'

export default function getSystemInfo() {
	return getData('system', null)
}