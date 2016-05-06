import { getData } from './internalMethods'

export default function onlineStatus(argument) {
	return getData('online-status', null)	
}
