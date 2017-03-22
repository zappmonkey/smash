smash.searchbox = {
    i_: false,
    minAutoCompleteLength: 3,
    onfocus: undefined,
    onblur: undefined,
    onchange: undefined,
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
        if (this.value.length == 0) {
            smash.searchbox.results('<div class="smash-instruction">Start typing to find results</div>');
        }
        smash.class.add(document.querySelector(".smash-header"), 'is-focussed');
        smash.class.add(document.querySelector(".smash-searchbox .smash-searchbox-results"), 'show');
        if (smash.searchbox.onfocus) {
            smash.searchbox.onfocus();
        }
    };
    ssb.onblur = function() {
        smash.class.remove(document.querySelector(".smash-header"), 'is-focussed');
        smash.class.remove(document.querySelector(".smash-searchbox .smash-searchbox-results"), 'show');
        if (smash.searchbox.onblur) {
            smash.searchbox.onblur();
        }
    };
    ssb.onkeyup = function(e) {
        if (this.value.length < smash.searchbox.minAutoCompleteLength) {
            return;
        }
        switch (e.keyCode) {
        case 27:
            this.value = "";
        }
        if (smash.searchbox.onchange) {
            smash.searchbox.onchange(this.value);
        }
    };
    smash.searchbox.i_ = true;
};

smash.searchbox.empty = function() {
    if (i = smash.get(document, ".smash-searchbox input")) {
        return (i.value.length == 0);
    }
    return true;
}

smash.searchbox.appendTo = function(content) {
    var node = document.createElement("div");
    node.innerHTML = content;
    var results = document.querySelector(".smash-searchbox .smash-searchbox-results");
    results.appendChild(node);
};

smash.searchbox.results = function(content) {
    var results = document.querySelector(".smash-searchbox .smash-searchbox-results");
    results.innerHTML = content;
};
