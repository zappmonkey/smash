smash.input = {};

smash.input.init = function() {
    var inputs = document.querySelectorAll(".smash-input.has-floating-label input");
    var input;
    for (var i = 0; i < inputs.length; i++) {
        input = inputs[i];
        smash.class.remove(input.parentElement, 'has-floating-label');
        smash.class.add(input.parentElement, 'floating-label');

        var label = document.createElement('label');
        label.innerHTML = input.placeholder;
        input.parentElement.appendChild(label);
        input.onkeyup = function(e) {
            var l = this.parentElement.querySelector("label");
            if (l) {
                if (e.srcElement.value != "") {
                    smash.class.add(l, 'show');
                } else {
                    smash.class.remove(l, 'show');
                }
            }
        };
    }
    var selects = document.querySelectorAll(".smash-select select");
    var select;
    for (var i = 0; i < selects.length; i++) {
        select = selects[i];
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
                li.onclick = function() {
                    var val = this.getAttribute('value');
                    this.parentElement.parentElement.querySelector("select").value = val;
                    this.parentElement.parentElement.querySelector("input").value = this.innerHTML;
                }
            }
        }
        select.parentElement.appendChild(ul);
        input.onchange = function(e) {
            var l = this.parentElement.querySelector("label");
            if (l) {
                if (e.srcElement.value != "") {
                    smash.class.add(l, 'show');
                } else {
                    smash.class.remove(l, 'show');
                }
            }
        };
    }
};
