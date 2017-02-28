smash.dialog = {};

smash.dialog.new = function(content) {
    var backdrop = smash.dialog.checkBackdrop();

    var dialog = document.createElement('div');
    dialog.className = 'smash-dialog';
    dialog.innerHTML = content;
    backdrop.appendChild(dialog);
};

smash.dialog.checkBackdrop = function() {
    if (backdrop = smash.get(document, ".smash-dialog-backdrop")) {
        if (dialog = smash.get(document, ".smash-dialog-backdrop .smash-dialog")) {
            backdrop.removeChild(dialog);
        }
        return backdrop;
    }
    var backdrop = document.createElement('div');
    backdrop.className = 'smash-dialog-backdrop';
    backdrop.innerHTML = '<div class="smash-dialog-background"></div>';
    smash.get(backdrop, '.smash-dialog-background').onclick = smash.dialog.close;
    smash.get(document, 'body').appendChild(backdrop);
    return backdrop;
};

smash.dialog.close = function() {
    if (dialog = smash.get(document, ".smash-dialog-backdrop")) {
        smash.get(document, 'body').removeChild(dialog);
    }
};
