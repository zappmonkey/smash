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

smash.workspace.addTab = function(id, title, content) {
    if (!smash.get(document, '.smash-tab-pane')) {
        var panel = smash.get(document, '.smash-panel');
        if (!panel) {
            console.log('To add a tab there needs to be a panel');
            return;
        }
        panel.innerHTML = '<div class="smash-tab-pane"><div class="smash-tabs"></div><div class="smash-panes"></div></div>';
    }
    var tabs = smash.get(document, '.smash-tab-pane .smash-tabs');
    var panesContainer = smash.get(document, '.smash-tab-pane .smash-panes');

    smash.hide(panesContainer, ".smash-pane");
    if (active = smash.get(tabs, '.smash-tab.active')) {
        smash.class.remove(active, 'active');
    }
    tabs.innerHTML = tabs.innerHTML + '<div class="smash-tab active" data-id="' + id + '">' + title + '<i class="material-icons close">close</i></div>';
    panesContainer.innerHTML = panesContainer.innerHTML + '<div class="smash-pane" data-id="' + id + '">' + content + '</div>';
    if (test = smash.get(tabs, '.smash-tab.active')) {
        console.log('test 1');
        test.onclick = function(e) {
            console.log('test');
            if (active = smash.get(tabs, '.smash-tab.active')) {
                smash.class.remove(active, 'active');
            }
            smash.class.add(this, 'active');
        }
    }
};
