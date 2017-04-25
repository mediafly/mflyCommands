import { get } from './internalMethods'

export default function getGpsCoordinates () {
	return get('system', 'gps')
}