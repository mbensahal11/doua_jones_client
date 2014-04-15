var adresse_serveur = "http://192.168.0.50:8080";
var pseudo_color = "#032f55";
var hasscrolledchatglobal;
var idJoueur;
var pseudo;
var hasscrolledmessagerie;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	navigator.splashscreen.show();
}

$(document).on("pageinit", "#Acceuil_jeu", function() {
	navigator.notification.alert('Nouveau message de la BMC!');
});
