// JavaScript Document
	//on stocke les 3 input et le bt dans des variables pour récup leur valeur plus tard

$(document).on("pageinit", "#inscription", function() {
	var idJoueur_inscription;
	var socket = io.connect(adresse_serveur);
	var pushNotification = window.plugins.pushNotification;
	
	$(document).on("click", "#envoi_ins", function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		if(!$('#mdp').val() || !$('#cmdp').val() || !$('#pseudo').val() || !$('#mail').val() ) {
			alert("Veuillez remplir tous les champs")
		}
		else if ($("#mdp").val()!=$("#cmdp").val()) {
			alert("Mot de passe saisi incorrect");
			$('#mdp').val('');
			$("#cmdp").val('');		
		}
		else {
			$("#envoi_ins").prop("disabled",true);
			var mail=$('#mail').val()+'@insa-lyon.fr';
			var data = {pseudo : $("#pseudo").val(), password : $("#mdp").val() , email : mail };
			socket.emit("inscription", data); 
		}
		$.mobile.loading( 'show', {
			text: "Veuillez patienter",
			textVisible: true,
			theme: "b",
		});
		return false;
	});
	
	socket.on('resultInscription', function(data) {
		alert('Le serveur a un message pour vous : ' + data.erreur);
		$("#envoi_ins").prop("disabled",false);
		if (data.inscriptionAccordee) {
			$.mobile.changePage("#connexion");
			idJoueur_inscription = data.idJoueur;
			pushNotification.register(tokenHandler,errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
		}
		else {
			$.mobile.loading( 'hide' );
		}
	});
	
	$(document).on("click", "#retour_conn", function(event){
		event.preventDefault();
		event.stopImmediatePropagation();		
		$.mobile.changePage("#connexion");
		return false;
	});
	
	
	$('#mdp, #pseudo').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z0-9]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			alert("Caractères spéciaux non autorisés");
			event.preventDefault();
			return false;
		}
	});
	
	
	
	//Enregistrement de l'application lors de l'inscription
	tokenHandler=function(msg) {
        console.log("Token Handler " + msg);
    };
    errorHandler=function(error) {
        console.log("Error Handler " + error);
    };
    // result contains any message sent from the plugin call
    successHandler= function(result) {  
    };

       
    
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
			socket.emit('idNotification', event.badge, idJoueur_inscription);
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
					socket.emit('idNotification', e.regid, idJoueur_inscription);
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model
              // of the intermediary push server which must also be reflected in GCMIntentService.java
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;

            case 'error':
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
		$.mobile.loading( 'hide' );
    }

});

$(document).on("pagebeforeshow", "#inscription", function() {
	$.mobile.loading( 'hide' );
});
	