import * as $ from 'jquery'
import {getDeviceType, deviceTypes} from './device'
import { get } from './internalMethods'

export default function getInteractiveInfo () {
	if (getDeviceType() === deviceTypes.web || getDeviceType() === deviceTypes.development) {
		return get('interactive')
	} else {
		return $.getJSON('mflyManifest.json')
	}
}