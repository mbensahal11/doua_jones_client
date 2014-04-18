var adresse_serveur = "http://giserv5.insa-lyon.fr:15550";
var pseudo_color = "#032f55";
var hasscrolledchatglobal;
var idJoueur;
var pseudo;
var hasscrolledmessagerie;
var devicePlatform;
var argentJoueur=0;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	navigator.splashscreen.show();
	devicePlatform = device.model;
}

$(document).on("pageinit", "#Accueil_jeu", function() { 
	var socket=io.connect(adresse_serveur);
	socket.emit('getArgentDisponibleJoueur',idJoueur);
	
	socket.on ('resultGetArgentDisponibleJoueur', function(data) {
		argentJoueur=data.argent_disponible;
		$('.argent_dispo').text(argentJoueur + ' ฿');
		$("#avoir").text(argentJoueur);
	});
	
	//Si on appuie sur le back button sur la page principale et que la dernière page visitée et la page de connection, on quitte l'application
	document.addEventListener("backbutton", onBackKeyPress, true);
	function onBackKeyPress() {
		if (data.prevPage.attr('id') == 'connexion') {
			navigator.app.exitApp();
		}
	}
	
	//On empêche le scroll sur la page d'accueil
	$( "#Accueil_jeu" ).on( "scrollstart", (function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		return false;
	}));
	
});