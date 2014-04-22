// JavaScript Document
$(document).on("pageinit", "#profil_exterieur_societe", function() {
	var socket = io.connect(adresse_serveur);
	
	//Affiches les membres de la sté
	socket.on('resultGetMembresSociete', function(data) {	
		$('#affiche_membresSociete_societe_exterieur').empty();
		for (var k=0; k<data.length;k++) {
			var membre=data[k];
			$('<div data-id='+membre.idJoueur+'>')
			.css('display','inline-block')
			.appendTo("#affiche_membresSociete_societe_exterieur")
			.append(
			$("<a>").attr({href:'#'+''})
			.append(
			$("<img>").attr({ 
			src: "img/avatars/"+membre.avatar+".png",
			alt: membre.pseudo })
			.addClass("imgMembre")
			)
			)
			.append("<p class='pseudo_membre' data-statut="+membre.statut_societe+">"+membre.pseudo+"</p>")
			.addClass("divMembre");
		}   
	});
	
	$( "#affiche_membresSociete_societe_exterieur" ).on("click", ".divMembre", function () {
			$('#profil_exterieur_joueur').data("idJoueur",$(this).data('id'));
			$("#titre_profil_exterieur_joueur").text($(this).find('.pseudo_membre').text());
			$.mobile.changePage("#profil_exterieur_joueur");
	});
	
	socket.on('EntrepriseSocieteMajoritaireBis', function(data) {
			$('#DisplayEntrepriseMajoritaire_societe_exterieur tbody').append('<tr><th>'+data.nom_entreprise+'</th></tr>');
			$('#affiche_entrepriseSociete_societe_exterieur').show();	
			$('#DisplayEntrepriseMajoritaire_societe_exterieur').table("refresh");
		})
		
	socket.on('resultGetInfosSociete', function(data) {
		$("#affiche_descriptionSociete_societe_exterieur").text(data.descriptionSociete);	
		$("#affiche_nomSociete_societe_exterieur").text(data.nomSociete);
		$("#affiche_nomSociete_societe_exterieur").data('idSociete',data.idSociete);
	});
	
	socket.on('resultGetInfosSociete_ScoreEtClassement', function(data){
		//pos, idSociete, capital, nomSociete
		$("#affiche_rangSociete_societe_exterieur").text(data.pos);
		$("#affiche_liquiditeSociete_societe_exterieur").text(data.capital);
	});
	
	socket.on('resultGetInfosSociete_CumulActionsVenduesSociete', function(data) {
		// cumul_vente, Societe_idSociete
		$("#affiche_actionsVenduesSociete_societe_exterieur").text(data.cumul_vente);
	
	});
	
	socket.on('resultGetInfosSociete_CumulActionsAcheteesSociete', function(data) {
		$("#affiche_actionsAchetéesSociete_societe_exterieur").text(data.cumul_achat);
	});
	
	socket.on('resultGetInfosSociete_CumulOrdresEnCoursSociete', function(data) {
		$("#affiche_actionsEnAttenteSociete_societe_exterieur").text(data.cumul_ordre);
	});
	
	$('#rejoindre_societe_exterieur').on("click", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		//Si le joueur appartient déjà à la société
		if (idSociete == $("#affiche_nomSociete_societe_exterieur").data('idSociete')) {
			alert("Vous appartenez déjà à cette société d'investissement");
		}
		else {
		$('#confirmer_rejoindre_societe_exterieur').popup("open");
		}
	});
	
	$('#confirmerRejoindreSociete_exterieur').on("click", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		socket.emit("setDemandeAjoutMembreSociete", idJoueur, $("#affiche_nomSociete_societe_exterieur").data('idSociete'));
		alert("Votre demande a été envoyée");
		$('#confirmer_rejoindre_societe_exterieur').popup("close");
	});
	
});



$(document).on("pageshow", "#profil_exterieur_societe", function() {
	var socket = io.connect(adresse_serveur);
	var idsociete_selectionnee = $('#profil_exterieur_societe').data("idSociete");
	$('#DisplayEntrepriseMajoritaire_societe_exterieur tbody').empty();
	socket.emit('getMembresSociete',idsociete_selectionnee);
	socket.emit('getInfosSociete',idsociete_selectionnee);

});


$(document).on("pagebeforeshow", "#profil_exterieur_societe", function() {
	//vider contenu
});