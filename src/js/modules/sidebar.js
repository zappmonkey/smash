smash.sidebar = {
    i_: false
};

smash.sidebar.init = function() {
    if (smash.sidebar.i_) {
        return;
    }
    var sibl = document.querySelector(".smash-sidebar .lock");
    if (!sibl) {
        return;
    }
    sibl.onclick = function() {
        smash.sidebar.toggleLock();
    };

    var sib = document.querySelector(".smash-sidebar");
    smash.class.add(sib, 'is-unlocked');
    smash.sidebar.i_ = true;
    if (smash.config.get('sidebar_lock')) {
        smash.sidebar.toggleLock();
    }
};

smash.sidebar.toggleLock = function() {
    if (!smash.sidebar.i_) {
        return;
    }
    smash.class.toggle(document.querySelector(".smash-sidebar .lock"), 'unlock');
    smash.class.toggle(document.querySelector(".smash-sidebar"), 'is-unlocked');
    smash.config.set('sidebar_lock', !smash.class.has(document.querySelector(".smash-sidebar"), 'is-unlocked'));
};
