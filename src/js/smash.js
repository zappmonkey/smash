window.onload = function(e){
    smash.init();
}

var smash = {
    init: function() {
        var ssb = document.querySelector(".smash-searchbox input");
        if (ssb) {
            ssb.onfocus = function() {
                smash.class.add(document.querySelector(".smash-header"), 'is-focussed');
            };
            ssb.onblur = function() {
                smash.class.remove(document.querySelector(".smash-header"), 'is-focussed');
            };
        }
        var sibl = document.querySelector(".smash-icon-bar .lock");
        if (sibl) {
            sibl.onclick = function() {
                smash.class.toggle(this, 'unlock');
                smash.class.toggle(document.querySelector(".smash-icon-bar"), 'is-unlocked');
            };
        }
        var sib = document.querySelector(".smash-icon-bar");
        if (sib) {
            smash.class.add(sib, 'is-unlocked');
        }
    }
};
