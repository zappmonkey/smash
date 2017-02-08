smash.workspace = {
    _ws_: undefined,
    _hdr_: undefined,
    _sb_: undefined
};

smash.workspace.init = function() {
    smash.workspace._ws_ = document.querySelector(".smash-workspace");
    if (!smash.workspace._ws_) {
        return
    }
    smash.workspace._hdr_ = document.querySelector(".smash-header");
    if (smash.workspace._hdr_) {
        smash.class.add(smash.workspace._ws_, 'has-header');
    }
    smash.workspace._sb_ = document.querySelector(".smash-workspace .smash-sidebar");
    if (smash.workspace._sb_) {
        smash.class.add(smash.workspace._ws_, 'has-sidebar');
    }
};
