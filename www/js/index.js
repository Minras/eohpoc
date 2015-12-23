var app = {
    log: Log.getInstance(),

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.log.add("Application initialization finished");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // Phonegap is now ready...
    onDeviceReady: function() {
        this.log.add("Device is ready");

        // Start adding your code here....
    }
};