window.addEventListener("load", function(e){
    smash.init();
}, false);

var smash = {};

smash.init = function() {
    smash.config.init();
    smash.sidebar.init();
    smash.searchbox.init();
    smash.workspace.init();
    smash.input.init();
};

smash.get = function(parent, selector) {
    try {
        return parent.querySelector(selector);
    } catch(e) {
        console.log(e);
    }
    return undefined;
};

smash.getAll = function(parent, selector) {
    try {
        return parent.querySelectorAll(selector);
    } catch(e) {
        console.log(e);
    }
    return undefined;
};

smash.hide = function(parent, selector) {
    var el;
    if (selector && typeof selector === 'string') {
        el = smash.getAll(parent, selector);
    } else {
        el = [parent];
    }
    for (var i=0; i<el.length; i++) {
        el[i].style.display = 'none';
    }
};

smash.show = function(parent, selector) {
    var el;
    if (selector && typeof selector === 'string') {
        el = smash.getAll(parent, selector);
    } else {
        el = [parent];
    }
    for (var i=0; i<el.length; i++) {
        el[i].style.display = '';
    }
};

smash.remove = function(el) {
    el.parentNode.removeChild(el);
};

smash.on = function(parent, selector, event, callback) {
    var elements = smash.getAll(parent, selector);
    for (var i=0; i<elements.length; i++) {
        elements[i][event] = callback;
    }
};

smash.fuzzyCompare = function(search, compare) {
    if (compare == undefined || search == undefined) {
        return false;
    }
    var regex = ".*?" + search.toLowerCase().replace(/-/g, "\\-").split("").join(".*?") + ".*?";
    return compare.toLowerCase().match(regex);
};
