var urlAttributes = null;
export function getUrlAttributes() {
	if (urlAttributes == null) {
		urlAttributes = {};
		let url = window.location.search;
		if (url.length > 0) {
			url = url.substring(1);
			let array = url.split('&');
			for (let i in array) {
				let item = array[i].split('=');
				urlAttributes[item[0]] = item[1];
			}
		}
	}
	return urlAttributes;
}