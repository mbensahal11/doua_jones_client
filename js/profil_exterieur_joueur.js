// JavaScript Document

$(document).on("pageinit", "#profil_exterieur_joueur", function() {
	var socket = io.connect(adresse_serveur);
});

$(document).on("pageshow", "#profil_exterieur_joueur", function() {
	var socket = io.connect(adresse_serveur);
	var joueur = {idJoueur : $('#profil_exterieur_joueur').data("idJoueur")};
	socket.emit('getInfosJoueur',joueur);
	socket.emit('getListeObjetsJoueur',joueur);
});

$(document).on("pagebeforeshow", "#profil_exterieur_joueur", function() {
	//vider contenu
});