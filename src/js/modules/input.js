smash.input = {};

smash.input.init = function() {
    var inputs = document.querySelectorAll(".smash-input input, .smash-textarea textarea");
    var input;
    for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        if (smash.class.has(input.parentElement, 'smash-initialised')) {
            continue;
        }

        input.parentElement.getName = function() {
            return this.querySelector("input").getAttribute('name');
        };

        input.parentElement.setValue = function(value) {
            if (input = this.querySelector("input")) {
                input.value = value;
                input.onkeyup();
            } else if (input = this.querySelector("textarea")) {
                input.value = value;
                input.onkeyup();
            }
        };

        input.parentElement.getValue = function() {
            if (input = this.querySelector("input")) {
                var input = this.querySelector("input");
                return input.value
            } else if (input = this.querySelector("textarea")) {
                var input = this.querySelector("textarea");
                return input.value
            }
            return null;
        };

        input.parentElement.onfocus = function(e) {
            if (input = this.querySelector("input")) {
                input.focus();
            } else if (input = this.querySelector("textarea")) {
                input.focus();
            }
        };

        if (smash.class.has(input.parentElement, 'has-floating-label')) {
            smash.class.remove(input.parentElement, 'has-floating-label');
            smash.class.add(input.parentElement, 'floating-label');

            var label = document.createElement('label');
            label.innerHTML = input.placeholder;
            input.parentElement.appendChild(label);
            input.onkeyup = function(e) {
                var l = this.parentElement.querySelector("label");
                if (l) {
                    if (this.value != "") {
                        smash.class.add(l, 'show');
                    } else {
                        smash.class.remove(l, 'show');
                    }
                }
            };
        }

        if (input.parentElement.getAttribute('value')) {
            input.parentElement.setValue(input.parentElement.getAttribute('value'));
        }

        smash.class.add(input.parentElement, 'smash-initialised');
    }
    var selects = document.querySelectorAll(".smash-select select");
    var select;
    for (var i = 0; i < selects.length; i++) {
        select = selects[i];
        if (smash.class.has(select.parentElement, 'smash-initialised')) {
            continue;
        }
        if (smash.class.has(select.parentElement, 'has-floating-label')) {
            smash.class.remove(select.parentElement, 'has-floating-label');
            smash.class.add(select.parentElement, 'floating-label');
            var label = document.createElement('label');
            label.innerHTML = select.getAttribute('placeholder');
            select.parentElement.appendChild(label);
        }

        select.parentElement.getName = function() {
            return this.querySelector("select").getAttribute('name');
        };

        select.parentElement.setValue = function(value) {
            smash.class.remove(this, 'is-focussed');
            var select = this.querySelector("select");
            var input = this.querySelector("input");
            var old = select.value;
            select.value = value;
            if (select.selectedIndex > -1) {
                var text = select.options[select.selectedIndex].text;
                if (text && text != "") {
                    input.value = text;
                } else {
                    input.value = "";
                    input.placeholder = select.getAttribute('placeholder');
                }
            } else {
                input.value = "";
                input.placeholder = select.getAttribute('placeholder');
            }
            input.focus();
            input.blur();
            if (old != value) {
                if (selected = smash.get(this.parentElement, '.selected')) {
                    smash.class.remove(selected, 'selected');
                }
                if (value != '') {
                    if (selected = smash.get(this, 'li[value="' + value + '"]')) {
                        smash.class.add(selected, 'selected');
                    }
                }
                if (select.onchange) {
                    select.onchange();
                }
                if (this.onchange) {
                    this.onchange();
                }
                this.checkLabel();
            }
        };

        select.parentElement.onfocus = function(e) {
            var input = this.querySelector("input");
            input.focus(e);
        };

        select.parentElement.getValue = function() {
            var select = this.querySelector("select");
            if (select.selectedIndex == -1) {
                return null;
            }
            return select.options[select.selectedIndex].value;
        };

        select.parentElement.reset = function() {
            smash.get(this, 'input').value = this.getText();
            this.checkLabel();
            smash.get(this, 'input').blur();
            if (hover = smash.get(this, 'ul li.hover')) {
                smash.class.remove(hover, 'hover');
            }
        };

        select.parentElement.checkLabel = function() {
            var l = this.querySelector("label");
            if (l) {
                if (this.getValue() && this.getValue() != "") {
                    smash.class.add(l, 'show');
                } else {
                    smash.class.remove(l, 'show');
                }
            }
        };

        select.parentElement.getText = function() {
            var select = this.querySelector("select");
            if (select.selectedIndex == -1) {
                return null;
            }
            return select.options[select.selectedIndex].innerHTML;
        };

        var input = document.createElement('input');
        input.type = "text";
        input.placeholder = select.getAttribute('placeholder');
        input.setAttribute("readonly", "readonly");
        select.parentElement.appendChild(input);

        var options = select.querySelectorAll("option");
        var ul = document.createElement('ul');
        var val;
        ul.onmouseup = function(e) {
            e.stopPropagation();
        };
        for (var j = 0; j < options.length; j++) {
            var option = options[j];
            val = option.getAttribute('value');
            if (!val && val !== '') {
                continue;
            }
            var li = document.createElement('li');
            li.setAttribute("value", option.value);
            li.innerHTML = option.innerHTML == "" ? '&nbsp;' : option.innerHTML;
            ul.appendChild(li);
            li.onmousedown = function(e) {
                this.parentElement.parentElement.setValue(this.getAttribute('value'));
                if (next = smash.findNextTabStop(this.parentElement.parentElement.parentElement, this.parentElement.parentElement)) {
                    next.focus();
                }
                e.stopPropagation();
                e.preventDefault();
                if (window.onmouseup) {
                    window.onmouseup();
                }
                return false;
            }
        }
        select.parentElement.appendChild(ul);
        input.onfocus = function(e) {
            if (smash.class.has(this.parentElement, 'is-focussed')) {
                return;
            }
            this.parentElement.checkLabel();
            this.parentElement.click();
        };

        input.onblur = function(e) {
            if (window.onmouseup) {
                window.onmouseup();
            }
        }

        select.parentElement.onclick = function() {
            smash.class.add(this, 'is-focussed');
            var input = smash.get(this, 'input');
            var select = smash.get(this, 'select');
            var smash_select = this;
            if (input.value && input.value != "") {
                input.setAttribute("placeholder", input.value);
            } else {
                input.setAttribute("placeholder", select.getAttribute("placeholder"));
            }
            input.removeAttribute("readonly");
            input.blur();
            input.value = "";
            window.onmouseup = function() {
                window.onmouseup = null;
                input.onkeyup = null;
                input.setAttribute("readonly", "readonly");
                smash_select.reset();
                if (items = smash.getAll(smash_select, 'ul li')) {
                    for (var i=0; i<items.length; i++) {
                        items[i].style.display = "";
                    }
                    smash.show(smash_select, 'ul');
                }
                smash.class.remove(smash_select, 'is-focussed');
                return false;
            };
            input.onkeydown = function(e) {
                switch (e.keyCode) {
                case 9:
                    return true;
                case 13:
                case 39:
                    if (hover = smash.get(smash_select, 'ul li.hover')) {
                        hover.onmousedown(e);
                    }
                    break;
                case 38:
                    if (hover = smash.get(smash_select, 'ul li.hover')) {
                        smash.class.remove(hover, "hover");
                        if (previous = smash.previousVisible(hover)) {
                            smash.class.add(previous, "hover");
                            previous.parentElement.scrollTop = previous.offsetTop;
                        } else {
                            if (last = smash.lastVisible(hover)) {
                                smash.class.add(last, "hover");
                                last.parentElement.scrollTop = last.parentElement.scrollHeight;
                            }
                        }
                    } else {
                        var li = smash.get(smash_select, 'ul li');
                        if (last = smash.lastVisible(li)) {
                            smash.class.add(last, "hover");
                            last.parentElement.scrollTop = last.parentElement.scrollHeight;
                        }
                    }
                    break;
                case 40:
                    if (hover = smash.get(smash_select, 'ul li.hover')) {
                        smash.class.remove(hover, "hover");
                        if (next = smash.nextVisible(hover)) {
                            smash.class.add(next, "hover");
                            next.parentElement.scrollTop = next.offsetTop;
                        } else {
                            if (next = smash.firstVisible(hover)) {
                                smash.class.add(next, "hover");
                                next.parentElement.scrollTop = 0;
                            }
                        }
                    } else {
                        var li = smash.get(smash_select, 'ul li');
                        if (next = smash.firstVisible(li)) {
                            smash.class.add(next, "hover");
                            next.parentElement.scrollTop = 0;
                        }
                    }
                    break;
                case 27:
                    this.value = "";
                    this.blur();
                    this.focus();
                    break;
                }
                e.preventDefault();
                e.stopPropagation();
                var q = this.value.replace(/[^a-zA-Z0-9_ ]/g, "");
                if (items = smash.getAll(smash_select, 'ul li')) {
                    smash.show(smash_select, 'ul');
                    var item;
                    var results = false;
                    for (var i=0; i<items.length; i++) {
                        item = items[i];
                        if (q == "" || smash.fuzzyCompare(q, item.innerHTML)) {
                            item.style.display = "";
                            results = true;
                        } else {
                            item.style.display = "none";
                        }
                    }
                    if (!results) {
                        smash.hide(smash_select, 'ul');
                    }
                }
                return false;
            };
            input.focus();
        };

        if (select.parentElement.getAttribute('value')) {
            select.parentElement.setValue(select.parentElement.getAttribute('value'));
        }
        smash.class.add(select.parentElement, 'smash-initialised');
    }
    smash.input.checkboxInit();
};

smash.input.checkboxInit = function() {
    var checkboxes = document.querySelectorAll(".smash-checkbox input");
    var checkbox;
    for (var i = 0; i < checkboxes.length; i++) {
        checkbox = checkboxes[i];
        if (smash.class.has(checkbox.parentElement, 'smash-initialised')) {
            continue;
        }

        var c =  document.createElement('span');
        c.className = 'checks';
        c.innerHTML = '<i class="material-icons">check_box_outline_blank</i><i class="material-icons checked">check_box</i>';
        checkbox.parentElement.appendChild(c);

        if (label = checkbox.getAttribute('label')) {
            var l = document.createElement('span');
            l.className = 'label';
            l.innerHTML = label;
            checkbox.parentElement.appendChild(l);
        }
        smash.class.add(checkbox.parentElement, 'smash-initialised');
        checkbox.checked = smash.class.has(checkbox.parentElement, 'checked');

        checkbox.parentElement.onclick = function() {
            smash.class.toggle(this, 'checked');
            smash.get(this, 'input').checked = smash.class.has(this, 'checked');
            if (this.onchange) {
                this.onchange(smash.class.has(this, 'checked'));
            }
        };

        checkbox.parentElement.getName = function() {
            return this.querySelector("input").getAttribute('name');
        };

        checkbox.parentElement.getValue = function() {
            return smash.class.has(this, 'checked');
        };

        checkbox.parentElement.setValue = function(value) {
            if (smash.class.has(this, 'checked') == value) {
                return;
            }
            this.onclick();
        };
    }
};
