var app = {
    log: Log.getInstance(),

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        // document.addEventListener('deviceready', this.onDeviceReady, false);
        this.log.add('Events initialized');
    },

    // Application Constructor
    initialize: function() {
        this.log.add("Application initialization started");
        this.bindEvents();
        this.init_page_behaviour();
        this.log.add("Application initialization finished");
    },

    init_page_behaviour: function() {
        $("#page-tabs").tabs({
            active: 1,
            activate: function(event, ui) {
                if ('tab-logs' == ui.newPanel.attr('id')) {
                    var container = $('#tab-logs-content').empty();
                    var i = app.log.list().length;
                    if (!i) {
                        container.html($('#log-msg-empty').html());
                        return;
                    }
                    var tpl = $('#log-msg-template').html();
                    for(i=i-1; i>=0; i--) {
                        var el = $('<div />').loadTemplate($("#log-msg-template"), app.log.get(i));
                        container.append(el.html());
                    }

                } else if ('tab-settings' == ui.newPanel.attr('id')) {
                    estimote.beacons.startRangingBeaconsInRegion(
                        {}, // Empty region matches all beacons.
                        function(result) {
                            this.log.add('*** Beacons ranged ***');
                            estimote.beacons.printObject(result);
                        },
                        function(errorMessage) {
                            this.log.add('Ranging error: ' + errorMessage);
                        }
                    )
;                }
            }
        });
    }
};