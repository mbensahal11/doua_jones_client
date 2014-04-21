// JavaScript Document
$(document).on("pageinit", "#profil_exterieur_societe", function() {
	var socket = io.connect(adresse_serveur);
});



$(document).on("pageshow", "#profil_exterieur_societe", function() {
	var socket = io.connect(adresse_serveur);
});


$(document).on("pagebeforeshow", "#profil_exterieur_societe", function() {
	//vider contenu
});