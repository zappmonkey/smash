smash.searchbox = {
    i_: false
};

smash.searchbox.init = function() {
    if (smash.searchbox.i_) {
        return;
    }
    var ssb = document.querySelector(".smash-searchbox input");
    if (ssb) {
        ssb.onfocus = function() {
            smash.class.add(document.querySelector(".smash-header"), 'is-focussed');
        };
        ssb.onblur = function() {
            smash.class.remove(document.querySelector(".smash-header"), 'is-focussed');
        };
    }
    smash.searchbox.i_ = true;
};
