smash.Exception = function (value, message) {
    this.value = value;
    this.message = message;
    this.toString = function() {
        return 'SmashException ' + this.value + ': ' + this.message;
    };
};
