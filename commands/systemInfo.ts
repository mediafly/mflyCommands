import { getData } from './internalMethods'

export default function systemInfo() {
	return getData('system', null)
}