smash.router = {
    __parseRouteRegex: /{(.*?)}/ig,
    __dynamicParts: [],
    __baseDirectory: null,
    __routes: {
        static: [],
        dynamic: []
    }
};

/**
 * Add a route handler to the router
 * @param string   path
 * @param Function callback
 */
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

/**
 * Set and execute the given path
 * @param string path
 */
smash.router.set = function(path) {
    smash.router.displayURL(path);
    window.dispatchEvent(new Event('popstate'));
};

/**
 * Display the url in the browser
 * @param  string path
 * @return void
 */
smash.router.displayURL = function(path) {
    path = smash.router.addBaseDirectory(path);
    window.history.pushState("", "", path);
};

/**
 * Redirect to the correct url
 * @param  string path
 * @return void
 */
smash.router.redirect = function(path) {
    if (!path.search(/^http[s]?:\/\//)) {
        path = smash.router.addBaseDirectory(path);
    }
    window.location = path;
};

/**
 * Execute when a path is not found.
 * @param  Route route
 * @return void
 */
smash.router.handleNotFound = function(route) {
    console.log("route: " + JSON.stringify(route) + " does not exist");
};

/**
 * Run the router and check the given path
 * @return void
 */
smash.router.run = function() {
    window.onpopstate = function(event) {
        smash.router.execute();
    };
    smash.router.execute();
}

/**
 * Execute the router and check given path
 * @return void
 */
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

/**
 * Get path without base directory if available
 * @return Path
 */
smash.router.getPath = function() {
    var l = document.createElement("a");
    l.href = window.location;
    return {host: l.hostname, path: smash.router.checkPath(l.pathname)};
};

/**
 * Parse the given route given by add
 * @param  string path
 * @return Route
 */
smash.router.parseRoute = function(path) {
    path = smash.router.cleanPath(path);
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

/**
 * Set the base directory to be used by all routes
 * @param string directory
 */
smash.router.setBaseDirectory = function(directory) {
    if (!directory) {
        smash.router.__baseDirectory = undefined;
        return;
    }
    smash.router.__baseDirectory = smash.router.cleanPath(directory);
};

/**
 * Add the base directory if it is available
 * @param string path
 * @return string
 */
smash.router.addBaseDirectory = function(path) {
    if (!smash.router.__baseDirectory) {
        return path;
    }
    if (path.indexOf(smash.router.__baseDirectory) === -1) {
        path = smash.router.__baseDirectory + path;
    }
    return path;
};

/**
 * Clean the given path to the proper path to be used by the router
 * @param  string path
 * @return string
 */
smash.router.cleanPath = function(path) {
    if (path.length > 0 && path.substring(0, 1) != "/") {
        path = "/" + path;
    }
    if (path.length > 2 && path.substring(path.length-2) == "/") {
        path = path.substring(0, path.length-2);
    }
    return path;
};

/**
 * Check the path if there is a base directory available
 * @param  string path The path to check
 * @return string      The path without a base directory for use of checking routes
 */
smash.router.checkPath = function(path) {
    path = smash.router.cleanPath(path);
    if (smash.router.__baseDirectory && path.indexOf(smash.router.__baseDirectory) !== -1) {
        path = path.replace(smash.router.__baseDirectory, '');
    }
    return path;
};

/**
 * Get the query param in the url
 * @param  string param The param you want to have
 * @return string       The value of the param or undefined if it is not available
 */
smash.router.queryParam = function(param) {
    var regexS = "[\\?&]"+param+"=([^&#]*)",
    regex = new RegExp( regexS ),
    results = regex.exec( window.location.search );
    if( results == null ){
        return undefined;
    }
    return results[1];//decodeURIComponent(results[1].replace(/\+/g, " "));
};
