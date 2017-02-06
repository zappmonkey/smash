window.onload = function(e){
    smash.init();
}

var smash = {
    init: function() {
        var sb = document.querySelector(".smash-searchbox input");
        sb.onfocus = function() {
            smash.addClass(document.querySelector(".smash-header"), 'is-focussed');
        };
        sb.onblur = function() {
            smash.removeClass(document.querySelector(".smash-header"), 'is-focussed');
        };
    },
    addClass: function(el, className) {
        el.classList ? el.classList.add(className) : el.className += (' ' + className);
    },
    removeClass: function(el, className) {
        el.classList ? el.classList.remove(className) : el.className = el.className.replace(className, '');
    }
};
