export function guid() {
	function s4() {
		return  Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4()
}


export function getUrlParameter(sParam: string): string | undefined {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=')

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1])
		}
	}
}

export function isInIframe() {
	return window.location !== window.parent.location
}

export function openUrl(url: string) {
	if (isInIframe) {
		window.parent.location.href = url
	} else {
		window.location.href = url
	}
}
