var Log = (function () {
    var instance,
        _logs = [],
        _log_levels = ['debug', 'info', 'warning', 'error'],
        _log_level_default = 'info';

    function createInstance() {
        return {
            add: function(msg, severity) {
                var _msg = _build_message(msg, severity);
                _logs.push(_msg);
            },
            list: function() {
                return _logs;
            },
            get: function(i) {
                return _logs[i];
            }
        };
    }

    function _build_message(msg, severity) {
        if (undefined === severity || -1 === _log_levels.indexOf(severity)) {
            severity = _log_level_default;
        }
        return {
            'message': msg,
            'time': new Date(),
            'severity': severity
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();