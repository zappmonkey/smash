smash.class = {};

smash.class.add = function(el, className) {
    if (!smash.class.has(el, className)) {
        el.classList ? el.classList.add(className) : el.className += (' ' + className);
    }
};

smash.class.remove = function(el, className) {
    if (smash.class.has(el, className)) {
        el.classList ? el.classList.remove(className) : el.className = el.className.replace(className, '');
    }
};

smash.class.has = function(el, className) {
    return ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1);
};

smash.class.toggle = function(el, className) {
    smash.class.has(el, className) ? smash.class.remove(el, className) : smash.class.add(el, className);
};
