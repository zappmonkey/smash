smash.router = {
    __parseRouteRegex: /{(.*?)}/ig,
    __dynamicParts: [],
    __routes: {
        static: [],
        dynamic: []
    }
};

smash.router.add = function(path, callback) {
    var route = smash.router.parseRoute(path);
    if (route.regex) {
        route.callback = callback;
        if (!smash.router.__routes.dynamic[route.depth]) {
            smash.router.__routes.dynamic[route.depth] = [];
        }
        if (!smash.router.__routes.dynamic[route.depth][route.numVars]) {
            smash.router.__routes.dynamic[route.depth][route.numVars] = [];
        }
        smash.router.__routes.dynamic[route.depth][route.numVars].push(route);
        return;
    }
    smash.router.__routes.static[path] = callback;
};

smash.router.set = function(route) {
    window.history.pushState("", "", route);
    window.dispatchEvent(new Event('popstate'));
};

smash.router.redirect = function(route) {
    window.location = route;
};

smash.router.handleNotFound = function(route) {
    console.log("route: " + JSON.stringify(route) + " does not exist");
};

smash.router.run = function() {
    window.onpopstate = function(event) {
        smash.router.execute();
    };
    smash.router.execute();
}

smash.router.execute = function() {
    var path = this.getPath();
    if (this.__routes.static[path.path]) {
        this.__routes.static[path.path]();
        return;
    }
    var depth = path.path.split("/").length-1;
    if (this.__routes.dynamic[depth]) {
        var route;
        var matches;
        var data = {};
        for (var varNum in this.__routes.dynamic[depth]) {
            for (var item in this.__routes.dynamic[depth][varNum]) {
                var route = this.__routes.dynamic[depth][varNum][item];
                matches = path.path.match(route.regex);
                if (!matches) {
                    continue;
                }
                for (var i=0; i<route.numVars; i++) {
                    data[route.vars[i]] = matches[i+1];
                }
                route.callback(data);
                return;
            }
        }
    }
    smash.router.handleNotFound(path);
};

smash.router.getPath = function() {
    var l = document.createElement("a");
    l.href = window.location;
    return {host: l.hostname, path: l.pathname};
};

smash.router.parseRoute = function(path) {
    if (path.substring(0,1) != "/") {
        path = "/" + path;
    }
    if (path.substring(path.length-2) == "/") {
        path = "/" + path;
    }
    var route = {
        path: path,
        depth: (path.split("/").length - 1),
        vars: [],
        numVars: 0
    };
    smash.router.__dynamicParts = path.match(smash.router.__parseRouteRegex);
    if (smash.router.__dynamicParts != undefined && smash.router.__dynamicParts != null) {
        var regex = "^" + path.replace(/\//ig, "\\/") + "$";
        for (var i=0; i<smash.router.__dynamicParts.length; i++) {
            route.numVars++;
            route.vars.push(smash.router.__dynamicParts[i].substring(1, smash.router.__dynamicParts[i].length-1));
            regex = regex.replace(smash.router.__dynamicParts[i], "(.*?)");
        }
        route.regex = new RegExp(regex, 'i');
    }
    return route;
};

smash.router.queryParam = function(param) {
    var regexS = "[\\?&]"+param+"=([^&#]*)",
    regex = new RegExp( regexS ),
    results = regex.exec( window.location.search );
    if( results == null ){
        return undefined;
    }
    return results[1];//decodeURIComponent(results[1].replace(/\+/g, " "));
};
