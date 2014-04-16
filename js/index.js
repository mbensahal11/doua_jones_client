/*$(document).on("pageinit", "#Accueil_jeu", function() {
	

	var socket = io.connect(adresse_serveur);
    tokenHandler=function(msg) {
        console.log("Token Handler " + msg);
    };
    errorHandler=function(error) {
        console.log("Error Handler " + error);
        alert(error);
    };
    // result contains any message sent from the plugin call
    successHandler= function(result) {
        alert('Success! Result = '+result)
    };

        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        //if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(successHandler, errorHandler,{"senderID":"494854872923","ecb":"onNotificationGCM"});
        }
        else {
            pushNotification.register(tokenHandler,errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
    
    // iOS
    onNotificationAPN= function(event) {
        var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        console.log("event badge " + event.badge);
        console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM= function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert('registration id = '+e.regid);
					socket.emit('idNotification', e.regid);
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
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
});*/