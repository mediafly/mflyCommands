import * as $ from 'jquery'
import {getDeviceType, deviceTypes} from './device'
import { getData } from './internalMethods'

export default function interactiveInfo () {
	if (getDeviceType() === deviceTypes.web || getDeviceType() === deviceTypes.development) {
		return getData('interactive', null)
	} else {
		return $.getJSON('mflyManifest.json')
	}
}