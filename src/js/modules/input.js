smash.input = {};

smash.input.init = function() {
    var inputs = document.querySelectorAll(".smash-input input, .smash-textarea textarea");
    var input;
    for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        if (smash.class.has(input.parentElement, 'smash-initialised')) {
            continue;
        }

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
                var input = this.querySelector("input");
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

        select.parentElement.setValue = function(value) {
            smash.class.remove(this, 'is-focussed');
            var select = this.querySelector("select");
            var input = this.querySelector("input");
            var old = select.value;
            select.value = value;
            if (select.selectedIndex > -1) {
                input.value = select.options[select.selectedIndex].text;
            }
            input.focus();
            input.onfocus();
            if (old != value && select.onchange) {
                select.onchange();
            }
        };

        select.parentElement.getValue = function() {
            var select = this.querySelector("select");
            if (select.selectedIndex == -1) {
                return null;
            }
            return select.options[select.selectedIndex].value;
        };

        var input = document.createElement('input');
        input.type = "text";
        input.placeholder = select.getAttribute('placeholder');
        input.setAttribute("readonly", "readonly");
        select.parentElement.appendChild(input);

        var options = select.querySelectorAll("option");
        var ul = document.createElement('ul');
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
                window.onmousedown = null;
            }
        }
        select.parentElement.appendChild(ul);
        input.onfocus = function(e) {
            var l = this.parentElement.querySelector("label");
            if (l) {
                if (this.value != "") {
                    smash.class.add(l, 'show');
                } else {
                    smash.class.remove(l, 'show');
                }
            }
        };
        select.parentElement.onclick = function() {
            smash.class.add(this, 'is-focussed');
            var select = this;
            window.onmousedown = function() {
                console.log("click outside");
                window.onmousedown = null;
                smash.class.remove(select, 'is-focussed');
            };
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
