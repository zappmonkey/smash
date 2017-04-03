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
                input.value = select.options[select.selectedIndex].text;
            } else {
                input.value = "";
            }
            input.focus();
            input.blur();
            if (old != value) {
                if (select.onchange) {
                    select.onchange();
                }
                if (this.onchange) {
                    this.onchange();
                }
            }
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
        ul.onmouseup = function(e) {
            e.stopPropagation();
        };
        for (var j = 0; j < options.length; j++) {
            var option = options[j];
            if (!option.getAttribute('value')) {
                continue;
            }
            var li = document.createElement('li');
            li.setAttribute("value", option.value);
            li.innerHTML = option.innerHTML;
            ul.appendChild(li);
            li.onmousedown = function(e) {
                this.parentElement.parentElement.setValue(this.getAttribute('value'));
                e.stopPropagation();
                if (window.onmouseup) {
                    window.onmouseup();
                }
            }
        }
        select.parentElement.appendChild(ul);
        input.onfocus = function(e) {
            if (smash.class.has(this.parentElement, 'is-focussed')) {
                return;
            }
            var l = this.parentElement.querySelector("label");
            if (l) {
                if (this.value != "") {
                    smash.class.add(l, 'show');
                } else {
                    smash.class.remove(l, 'show');
                }
            }
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
            var select = this;
            input.setAttribute("placeholder", input.value);
            input.removeAttribute("readonly");
            input.blur();
            input.value = "";
            window.onmouseup = function() {
                window.onmouseup = null;
                input.onkeyup = null;
                input.setAttribute("readonly", "readonly");
                select.reset();
                if (items = smash.getAll(select, 'ul li')) {
                    for (var i=0; i<items.length; i++) {
                        items[i].style.display = "";
                    }
                    smash.show(select, 'ul');
                }
                smash.class.remove(select, 'is-focussed');
                return false;
            };
            input.onkeyup = function(e) {
                e.preventDefault();
                e.stopPropagation();
                switch (e.keyCode) {
                case 13:
                    if (selected = smash.get(select, 'ul li.selected')) {
                        selected.onmousedown(e);
                    }
                    break;
                case 37:
                case 38:
                    if (selected = smash.get(select, 'ul li.selected')) {
                        smash.class.remove(selected, "selected");
                        if (previous = smash.previousVisible(selected)) {
                            smash.class.add(previous, "selected");
                            previous.parentElement.scrollTop = previous.parentElement.scrollTop - previous.offsetHeight;
                        } else {
                            if (last = smash.lastVisible(selected)) {
                                smash.class.add(last, "selected");
                                last.parentElement.scrollTop = last.parentElement.scrollHeight;
                            }
                        }
                    } else {
                        var li = smash.get(select, 'ul li');
                        if (last = smash.lastVisible(li)) {
                            smash.class.add(last, "selected");
                            last.parentElement.scrollTop = last.parentElement.scrollHeight;
                        }
                    }
                    break;
                case 39:
                case 40:
                    if (selected = smash.get(select, 'ul li.selected')) {
                        smash.class.remove(selected, "selected");
                        if (next = smash.nextVisible(selected)) {
                            smash.class.add(next, "selected");
                            next.parentElement.scrollTop = next.parentElement.scrollTop + next.offsetHeight;
                        } else {
                            if (next = smash.firstVisible(selected)) {
                                smash.class.add(next, "selected");
                                next.parentElement.scrollTop = 0;
                            }
                        }
                    } else {
                        var li = smash.get(select, 'ul li');
                        if (next = smash.firstVisible(li)) {
                            smash.class.add(next, "selected");
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
                var q = this.value.replace(/[^a-zA-Z0-9_ ]/g, "");
                if (items = smash.getAll(select, 'ul li')) {
                    smash.show(select, 'ul');
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
                        smash.hide(select, 'ul');
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
