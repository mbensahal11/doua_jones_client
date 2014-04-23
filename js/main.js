//var adresse_serveur = "http://giserv5.insa-lyon.fr:15550";
var adresse_serveur = "http://88.172.179.93:5050";
var pseudo_color = "#032f55";
var hasscrolledchatglobal;
var idJoueur;
var pseudo;
var idSociete;
var statutJoueur
var hasscrolledmessagerie;
var devicePlatform;
var argentJoueur=0;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	navigator.splashscreen.show();
	devicePlatform = device.model;
	//Si on appuie sur le back button sur la page principale et que la dernière page visitée et la page de connection, on quitte l'application
	document.addEventListener("backbutton",  function (e, data) {
            e.preventDefault();
			if (data.prevPage.attr('id') == 'connexion') {
				//do nothing
			}
			else {
				window.history.back();
			}
        }, false );
		
	jQuery("#CIBLE").keyup(function(event) {
		name = jQuery("#choix_description").val();
		var reg=new RegExp('(")', "g");
		name = name.replace(reg,"'");
		jQuery("#choix_description").val(name);
		});
	}

$(document).on("pageinit", "#Accueil_jeu", function() { 
	var socket=io.connect(adresse_serveur);
	socket.emit('getArgentDisponibleJoueur',idJoueur);
	
	socket.on ('resultGetArgentDisponibleJoueur', function(data) {
		argentJoueur=data.argent_disponible;
		$('.argent_dispo').text(argentJoueur + ' ฿');
		$("#avoir").text(argentJoueur);
	});
	
	//On empêche le scroll sur la page d'accueil
	$( "#Accueil_jeu" ).on( "scrollstart", (function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		return false;
	}));
	
	$( "#Accueil_jeu" ).on( "swipeleft", (function(event){
		$.mobile.changePage('#notifications',{
			transition: "slide"
		});
	}));
	
	
});
$(document).on("pageshow", "#Accueil_jeu", function() { 
	var socket=io.connect(adresse_serveur);
	$.mobile.silentScroll(0);
	socket.emit('getArgentDisponibleJoueur',idJoueur);
});