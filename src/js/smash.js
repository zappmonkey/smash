window.onload = function(e){
    smash.init();
}

var smash = {
    init: function() {
        smash.config.init();
        smash.sidebar.init();
        smash.searchbox.init();
        smash.workspace.init();
        smash.input.init();
    }
};
