smash.config = {
    _values_: {
        _sidebar_lock_: false
    }
}

smash.config.init = function() {
    var v = smash.storage.get('config');
    if (v) {
        smash.config._values_ = v;
    }
};

smash.config.get = function(option) {
    var o = '_' + option + '_';
    if (o in smash.config._values_) {
        return smash.config._values_[o];
    }
    throw new smash.Exception('001', 'Invalid config option "' + option + '"');
};

smash.config.set = function(option, value) {
    var o = '_' + option + '_';
    if (!o in smash.config._values_) {
        throw new smash.Exception('001', 'Invalid config option "' + option + '"');
    }
    smash.config._values_[o] = value;
    smash.storage.set('config', smash.config._values_);
};
