import * as $ from 'jquery'
import { get } from './internalMethods'

export default function search(term, offset = 0, limit = 100) {
	var dfd1 = $.Deferred()
	var result = []

	var obj = {
		term: term,
		offset: offset,
		limit: limit
	}

	var getPage = function() {
		var qs = $.param(obj);

		get('items?' + qs)
			.done(function(data: any) {
				result = result.concat(data);
				if (data.length < obj.limit) {
					dfd1.resolve(result);
				} else {
					obj.offset += obj.limit;
					getPage();
				}
			}).fail(function() {
				dfd1.reject();
			});
	};

	getPage();

	return dfd1.promise();
}