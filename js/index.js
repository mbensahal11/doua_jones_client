// JavaScript Document
var app = {
// Application Constructor
initialize: function() {
    this.bindEvents();
},
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicity call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
    myApp.start(); //this is where I put the call to my App's functionality relying on device APIs
},
// Update DOM on a Received Event
receivedEvent: function(id) { // I didn't really use this, yet I left it in here as it's in the demo
   var pushNotification = window.plugins.pushNotification;
pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"494854872923","ecb":"app.onNotificationGCM"});
// result contains any message sent from the plugin call
successHandler: function(result) {
    alert('Callback Success! Result = '+result)
};

errorHandler:function(error) {
    alert(error);
};

onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }
}
};
