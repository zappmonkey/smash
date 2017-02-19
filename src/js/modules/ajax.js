smash.ajax = {
    _headers_: []
};

smash.ajax.addHeader = function(name, value) {
    smash.ajax._headers_[name] = value;
};

smash.ajax._xhr_ = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];
    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

smash.ajax.send = function (url, callback, method, data, responseType, async) {
    if (async === undefined) {
        async = true;
    }
    var x = smash.ajax._xhr_();
    x.responseType = responseType;
    x.onreadystatechange = function () {
		if (x.readyState == 4) {
			if (x.status == 200 || x.status == 201) {
				callback && callback(x.response);
			} else {
                console.log(x.status, x.response);
			}
		}
    };
    x.open(method, url, async);
    if (responseType == 'json') {
        x.setRequestHeader('Content-type', 'application/json');
    } else if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    for (var name in smash.ajax._headers_) {
        x.setRequestHeader(name, smash.ajax._headers_[name]);
    }
    x.send(data)
};

smash.ajax.get = function (url, callback, data, responseType, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    smash.ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, responseType,  async)
};

smash.ajax.post = function (url, callback, data, responseType, async) {
    var dataStr;
    if (data) {
        if (responseType != 'json') {
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            dataStr = query.join('&')
        } else {
            dataStr = JSON.stringify(data);
        }
    }
    smash.ajax.send(url, callback, 'POST', dataStr, responseType, async)
};
