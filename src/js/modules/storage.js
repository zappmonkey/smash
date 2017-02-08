smash.storage = {};

smash.storage.set = function(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
};

smash.storage.get = function(name) {
    var i = localStorage.getItem(name);
    if (!i) {
        return undefined;
    }
    return JSON.parse(i);
};

smash.storage.clear = function() {
    localStorage.clear();
};
