smash.contextmenu = {};

smash.contextmenu.new = function(e, items) {
    if (ctx = smash.get(document, "#smash-context-menu")) {
        smash.remove(ctx);
    }
    var ctx = document.createElement("div");
    ctx.id =  "smash-context-menu";
    var list = "<ul class='clickable'>";
    for (i = 0; i < items.length; i++) {
        if (items[i] == "seperator") {
            list += '<li class="seperator"></li>';
            continue;
        }
        list += '<li class="ctx_item_' + i + '">' + items[i].label + "</li>";
    }
    list += '</ul>';
    ctx.innerHTML = list;
    document.body.appendChild(ctx);
    var item;
    for (i = 0; i < items.length; i++) {
        if (items[i] == "seperator") {
            continue;
        }
        item = smash.get(ctx, "li.ctx_item_" + i);
        item.callback = items[i].callback;
        item.onmousedown = function(e) {
            this.callback(e);
            smash.contextmenu.close(e);
        };
    }
    var y = e.pageY
    if (y + ctx.offsetHeight > window.innerHeight) {
        y = window.innerHeight - ctx.offsetHeight - 20;
    }
    ctx.style.top = y;
    ctx.style.left = e.pageX;
    ctx.style.zindex = 100;
    e.preventDefault();
    document.click = smash.contextmenu.close;
    return false;
};

smash.contextmenu.close = function(e) {
    e.preventDefault();
    if (ctx = smash.get(document, "#smash-context-menu")) {
        smash.remove(ctx);
    }
    document.click = undefined;
};
