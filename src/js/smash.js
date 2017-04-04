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

smash.nextVisible = function(el) {
    while (el = el.nextSibling) {
        if (el.style.display == 'none') {
            continue;
        }
        return el;
    }
    return undefined;
};

smash.firstVisible = function(el) {
    el = el.parentElement.firstChild;
    if (el.style.display != 'none') {
        return el;
    }
    while (el = el.nextSibling) {
        if (el.style.display == 'none') {
            continue;
        }
        return el;
    }
    return undefined;
};

smash.previousVisible = function(el) {
    while (el = el.previousSibling) {
        if (el.style.display == 'none') {
            continue;
        }
        return el;
    }
    return undefined;
};

smash.lastVisible = function(el) {
    el = el.parentElement.lastChild;
    if (el.style.display != 'none') {
        return el;
    }
    while (el = el.previousSibling) {
        if (el.style.display == 'none') {
            continue;
        }
        return el;
    }
    return undefined;
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

smash.findNextTabStop = function(form, el) {
    var universe = smash.getAll(form, '.smash-input, .smash-button, .smash-select, .smash-textarea, .smash-checkbox');
    var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
    var index = list.indexOf(el);
    return list[index + 1] || list[0];
};
