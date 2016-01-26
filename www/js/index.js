function addLog(msg) {
    $('#tab-logs-content').html(
        $('#tab-logs-content').html() + "<br />" + msg
    );
}


var app = {
    log: Log.getInstance(),

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        // document.addEventListener('deviceready', this.onDeviceReady, false);
        this.log.add('Events initialized');
        addLog
    },

    startScan: function() {
        //TODO Disconnect / Close all addresses and empty

        var paramsObj = {
            serviceUuids: [],
            allowDuplicates: false
        };

        this.log.add("Start Scan : " + JSON.stringify(paramsObj));
        var that = this;
        ble.enable(function() {
            console.log("Bluetooth is enabled");
            ble.scan([], 5, function(device) {
                alert(1);
                that.log.add('scanned');
                that.log.add(JSON.stringify(device));
            }, function(err) {
                alert(2);
                that.log.add('error');
                that.log.add(err);
            });
        }, function() {
            console.log("The user did *not* enable Bluetooth");
        });
        //ble.startScan(this.startScanSuccess(this), this.startScanError(this), paramsObj);

        return false;
    },

    startScanSuccess: function(that) {
        return function(obj) {
            that.log.add("Start Scan Success : " + JSON.stringify(obj));

            if (obj.status == "scanResult") {
                that.log.add("Scan Result");

                //addDevice(obj.address, obj.name);
            } else if (obj.status == "scanStarted") {
                that.log.add("Scan Started");
            } else {
                that.log.add("Unexpected Start Scan Status");
            }
        }
    },

    startScanError: function(that) {
        return function(obj) {
            that.log.add("Start Scan Error : " + JSON.stringify(obj));
        }
    },




    // Application Constructor
    initialize: function() {
        addLog("test");
        try {
            this.log.add("Application initialization started");
            this.bindEvents();
            this.init_page_behaviour();
            this.log.add('Scan in progress.');
            // this.log.add(evothings === undefined ? "none" : 'xxx');
            //this.log.add(evothings.eddystone);

            this.startScan();
        } catch (e) {
            this.log.add(e.message);





            this.log.add("Application initialization finished");
        }
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
                    for (i = i - 1; i >= 0; i--) {
                        var el = $('<div />').loadTemplate($("#log-msg-template"), app.log.get(i));
                        container.append(el.html());
                    }

                }
            }
        });
    }
};
