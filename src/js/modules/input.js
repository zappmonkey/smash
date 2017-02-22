smash.input = {};

smash.input.init = function() {
    var inputs = document.querySelectorAll(".smash-input.has-floating-label input");
    var input;
    for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        if (smash.class.has(input.parentElement, 'smash-initialised')) {
            continue;
        }
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
        input.onkeyup();
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
        var input = document.createElement('input');
        input.type = "text";
        input.placeholder = select.getAttribute('placeholder');
        input.setAttribute("readonly", "readonly");
        select.parentElement.appendChild(input);

        var options = select.querySelectorAll("option");
        var ul = document.createElement('ul');
        for (var j = 0; j < options.length; j++) {
            var option = options[j];
            if (option.getAttribute('value')) {
                var li = document.createElement('li');
                li.setAttribute("value", option.value);
                li.innerHTML = option.innerHTML;
                ul.appendChild(li);
                li.onmousedown = function(e) {
                    var val = this.getAttribute('value');
                    var parent = this.parentElement.parentElement;
                    smash.class.remove(parent, 'is-focussed');
                    window.onmousedown = null;
                    parent.querySelector("select").value = val;
                    parent.querySelector("input").value = this.innerHTML;
                    parent.querySelector("input").focus();
                    parent.querySelector("input").onfocus();
                    e.stopPropagation();
                }
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
        smash.class.add(select.parentElement, 'smash-initialised');
    }
};
