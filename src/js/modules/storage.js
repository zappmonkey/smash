smash.storage = {};

smash.storage.set = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

smash.storage.unset = function(key) {
    localStorage.removeItem(key);
};

smash.storage.get = function(key) {
    var i = localStorage.getItem(key);
    if (!i) {
        return undefined;
    }
    return JSON.parse(i);
};

smash.storage.clear = function() {
    localStorage.clear();
};
