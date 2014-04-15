// JavaScript Document
var pushNotification = window.plugins.pushNotification;
pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"494854872923","ecb":"app.onNotificationGCM"});
var result_test='';
// result contains any message sent from the plugin call
successHandler= function(result) {
	result_test = result;
    alert('Callback Success! Result = '+result)
};

errorHandler=function(error) {
	result_test = 'nope';
    alert(error);
};

onNotificationGCM= function(e) {
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