window.onload = function(e){
    smash.init();
}

var smash = {
    init: function() {
        var sb = document.querySelector(".smash-searchbox input");
        if (sb) {
            sb.onfocus = function() {
                smash.addClass(document.querySelector(".smash-header"), 'is-focussed');
            };
            sb.onblur = function() {
                smash.removeClass(document.querySelector(".smash-header"), 'is-focussed');
            };
        }
        var ibl = document.querySelector(".smash-icon-bar .lock");
        if (ibl) {
            ibl.onclick = function() {
                smash.toggleClass(this, 'unlock');
                smash.toggleClass(document.querySelector(".smash-icon-bar"), 'is-unlocked');
            };
        }
        var ib = document.querySelector(".smash-icon-bar");
        if (ib) {
            smash.addClass(ib, 'is-unlocked');
        }
    },
    addClass: function(el, className) {
        el.classList ? el.classList.add(className) : el.className += (' ' + className);
    },
    removeClass: function(el, className) {
        el.classList ? el.classList.remove(className) : el.className = el.className.replace(className, '');
    },
    hasClass: function(el, className) {
        return ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1);
    },
    toggleClass: function(el, className) {
        smash.hasClass(el, className) ? smash.removeClass(el, className) : smash.addClass(el, className);
    }
};
