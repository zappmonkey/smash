smash.searchbox = {
    i_: false,
    minAutoCompleteLength: 3,
    onfocus: undefined,
    onblur: undefined,
    onvalue: undefined,
};

smash.searchbox.init = function() {
    if (smash.searchbox.i_) {
        return;
    }
    var ssb = document.querySelector(".smash-searchbox input");
    if (!ssb) {
        return;
    }
    ssb.onfocus = function() {
        smash.class.add(document.querySelector(".smash-header"), 'is-focussed');
        if (smash.searchbox.onfocus) {
            smash.searchbox.onfocus();
        }
    };
    ssb.onblur = function() {
        smash.class.remove(document.querySelector(".smash-header"), 'is-focussed');
        if (smash.searchbox.onblur) {
            smash.searchbox.onblur();
        }
    };
    ssb.onkeyup = function(e) {
        if (this.value.length < smash.searchbox.minAutoCompleteLength) {
            return;
        }
        if (smash.searchbox.onchange) {
            smash.searchbox.onchange(this.value);
        }
    };
    smash.searchbox.i_ = true;
};
