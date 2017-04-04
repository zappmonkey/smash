smash.workspace = {
    baseTitle: undefined,
    onlasttabclosed: undefined,
    _ws_: undefined,
    _hdr_: undefined,
    _sb_: undefined,
    _tabs_: []
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

smash.workspace.addTab = function(id, title, content, url) {
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

    document.title = smash.workspace.createTitle(title);

    if (tab = smash.get(tabs, '.smash-tab[data-id="' + id + '"]')) {
        var pane = smash.get(panesContainer, '.smash-pane[data-id="' + id + '"]');
        pane.innerHTML = content;
        tab.dataset.url = url;
        tab.onclick();
        return {tab: tab, pane: pane};
    }

    smash.hide(panesContainer, ".smash-pane");
    if (active = smash.get(tabs, '.smash-tab.active')) {
        smash.class.remove(active, 'active');
    }

    // Create a new tab
    var tab = document.createElement("div");
    tab.className = 'smash-tab active';
    tab.dataset.id = id;
    tab.dataset.url = url;
    tab.innerHTML = title + '<i class="material-icons close">close</i>';
    tab.onclick = function(e) {
        if (active = smash.get(tabs, '.smash-tab.active')) {
            smash.class.remove(active, 'active');
        }
        smash.class.add(this, 'active');
        smash.hide(document, '.smash-pane');
        smash.show(document, '.smash-pane[data-id="' + this.dataset.id + '"]');
        if (this.dataset.url && this.dataset.url != "undefined") {
            smash.router.displayURL(this.dataset.url);
        }
        document.title = smash.workspace.createTitle(this.innerHTML);
    };
    smash.on(tab, '.close', 'onclick', function(e) {
        if (this.parentElement.onclose && !this.parentElement.onclose()) {
            return;
        }
        if (smash.class.has(this.parentElement, 'active')) {
            if (this.parentElement.previousSibling) {
                this.parentElement.previousSibling.onclick();
            } else if (this.parentElement.nextSibling) {
                this.parentElement.nextSibling.onclick();
            }
        }
        if (pane = smash.get(document, '.smash-pane[data-id="' + this.parentElement.dataset.id + '"]')) {
            pane.parentElement.removeChild(pane);
        }
        this.parentElement.parentElement.removeChild(this.parentElement);
        if (this.parentElement.onclosed) {
            this.parentElement.onclosed();
        }
        if (!smash.workspace.activeTab() && smash.workspace.onlasttabclosed) {
            smash.workspace.onlasttabclosed();
        }
        e.stopPropagation();
    });
    tabs.appendChild(tab);

    // Create a new pane with the provided content
    var pane = document.createElement("div");
    pane.className = 'smash-pane';
    pane.dataset.id = id;
    pane.innerHTML = content;
    panesContainer.appendChild(pane);
    return {tab: tab, pane: pane};
};

smash.workspace.activeTab = function() {
    var tab = smash.get(document, '.smash-tab.active')
    if (!tab) {
        return null;
    }
    var pane = smash.get(document, '.smash-pane[data-id="' + tab.dataset.id + '"]');
    if (!pane) {
        return null;
    }
    return {tab: tab, pane: pane};
};

smash.workspace.createTitle = function(title) {
    var t = title.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, "");
    if (t == '') {
        var div = document.createElement("div");
        div.innerHTML = title;
        if (ts = smash.get(div, '.title')) {
            t = ts.innerHTML;
        }
        if (t == '') {
            t = 'unknown';
        }
    }
    return t + (smash.workspace.baseTitle ? ' | ' + smash.workspace.baseTitle : "");
};
