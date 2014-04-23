// JavaScript Document

$(document).on("pageinit", "#profil_exterieur_joueur", function() {
	var socket = io.connect(adresse_serveur);
	var imageAvatar=["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15","A16","A17","A18","A19","A20","A21","A22","A23","A24","A25","A26","A27","A28","A29","A30","A31","A32","A33","A34","A35","A36","A37","A38","A39","A40","A41","A42","A43","A44","A45"]	
	var idAvatar=0;	
	//Affichage des informations du joueur
	socket.on('resultGetInfosJoueur_exterieur',function(data) {	
		statutJoueur=data.statut_societe;
		var statut;
		if (statutJoueur == "President") {
			$("#bouton_administrer").show();
			$("#bouton_candidatures").show();
			$("#bouton_avatar_societe").show();
			statut = "Président";
		}
		else if (statutJoueur== "President" || statutJoueur=="Vice-president") {
			$("#bouton_candidatures").show();
			$("#bouton_avatar_societe").show();
			statut = "Vice-président";
		}
		else {
			statut = "Membre";
		}
			//avatar
		var lien="img/avatars/"+data.avatar+".png";
		$('#affiche_avatar_exterieur').prop('src',lien);	
			//pseudo
		$('#affiche_pseudo_exterieur').text(data.pseudo);
			//description
		$('#affiche_description_exterieur').text(data.description);
			//Informations générales
		$('#affiche_depart_exterieur').text(data.departement);
		$('#affiche_etude_exterieur').text(data.annee_etude);
		$('#affiche_sexe_exterieur').text(data.sexe);
		$('#affiche_societe_exterieur').text(data.nomSociete);
		$('#affiche_statut_exterieur').text(statut);
		$('#affiche_score_exterieur').text(data.score);
		$('#affiche_jour_exterieur').text(data.jour);		
			//Statut bancaire
		$('#affiche_compte_exterieur').text(data.compte_en_banque);
		$('#affiche_argent_exterieur').text(data.argent_disponible);
		
			//Statut d'investisseur
		$('#affiche_actionsAchetees_exterieur').text(data.nb_actions_achetees);
		$('#affiche_actionsVendues_exterieur').text(data.nb_actions_vendues);
		$('#affiche_actionsPossedees_exterieur').text(data.nombre_actions_possedees);
		$('#affiche_ordre_exterieur').text(data.nombre_ordres_en_cours);
			//Statut d'emprunteur
		$('#affiche_empruntsEnCours_exterieur').text(data.nombre_emprunts_en_cours);
		$('#affiche_empruntsEnRetard_exterieur').text(data.nombre_emprunts_en_retard);
		$('#affiche_empruntsNombreMax_exterieur').text(data.nb_emprunts_maximum);
		$('#affiche_teg_exterieur').text(data.TEG);

		
			//Informations de l'écran de modification des informations qui sont initialisées aux valeurs courantes. Par exemple, lorsque le joueur veut modifier son avatar, l'avatar affiché dans l'écran de modification est son avatar actuel. Idem pour la description, sexe, année d'étude.
			
			//Mise à jour de l'idAvatar (variable globale) pour afficher l'avatar actuel
		
		var j=0 ; 
		while (imageAvatar[j]!=data.avatar) {
			j++	;
		}
		idAvatar=j;

	});  
	
	//Onglet vitrine
		
		var module;
		var idObj;
		var listeObjets;
	socket.on ('resultGetListeObjetsJoueur_exterieur', function(data) {
		listeObjets=data;
		var idMod=$('#consult_boutique_exterieur option:selected').val();
		if (idMod != "choose-one") {
			idObj=0;	
			module = listeObjets[idMod-1];
			if (module.length!=0) {
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets_exterieur").prop("src",src);
				$("#description_item_exterieur").text(module[idObj].nom);
				$("#affiche_objets_exterieur").show();
				$("#affiche_non_objets_exterieur").hide();			
			} else {
			$("#affiche_non_objets_exterieur").show();
			$("#affiche_objets_exterieur").hide();
			}
		}
	});
		//En fonction du module choisi, les objets possédés par le joueur sont affichés
		$(document).on("change","#consult_boutique_exterieur", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			idObj=0;
			var idMod=$('#consult_boutique_exterieur option:selected').val();
			module = listeObjets[idMod-1];
			if (module.length!=0) {
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets_exterieur").prop("src",src);
				$("#description_item_exterieur").text(module[idObj].nom);
				$("#affiche_objets_exterieur").show();
				$("#affiche_non_objets_exterieur").hide();			
			} else {
			$("#affiche_non_objets_exterieur").show();
			$("#affiche_objets_exterieur").hide();
			}
			return false;				
		});
		
		//Défilement gauche/droit
		$(document).on("click","#fleche_gauche_exterieur", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();		
			if (idObj!=0) {
				idObj--;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets_exterieur").prop("src",src);
				$("#description_item_exterieur").text(module[idObj].nom);
			}  else {
				idObj=module.length-1 ;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets_exterieur").prop("src",src);
				$("#description_item_exterieur").text(module[idObj].nom);
			} 
			return false;
		});

		$(document).on("click","#fleche_droite_exterieur", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			if (idObj!=module.length-1) {
				idObj++;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets_exterieur").prop("src",src);
				$("#description_item_exterieur").text(module[idObj].nom);
			} else {
				idObj=0 ;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets_exterieur").prop("src",src);
				$("#description_item_exterieur").text(module[idObj].nom);			
			}
			return false;
		});
		

	
	//Partie société d'investissement
	
	//Affiches les membres de la sté
	socket.on('resultGetMembresSocieteDuJoueur_exterieur', function(data) {	
		$('#affiche_membresSociete_societe_joueur_exterieur').empty();
		for (var k=0; k<data.length;k++) {
			var membre=data[k];
			var color;
			if (membre.statut_societe == "President") {
				color = "#ff0000";
			}
			else if (membre.statut_societe == "Membre") {
				color = "#31748f";
			}
			else {
				color =  "#e1533c";
			}
			$('<div data-id='+membre.idJoueur+'>')
			.css('display','inline-block')
			.appendTo("#affiche_membresSociete_societe_joueur_exterieur")
			.append(
			$("<a>").attr({href:'#'+''})
			.append(
			$("<img>").attr({ 
			src: "img/avatars/"+membre.avatar+".png",
			alt: membre.pseudo })
			.addClass("imgMembre")
			)
			)
			.append("<p class='pseudo_membre'  style='color:"+color+"'  data-statut="+membre.statut_societe+">"+membre.pseudo+"</p>")
			.addClass("divMembre");
		}   
	});
	
	//à insérer si on peut rafraichir la page
	$( "#affiche_membresSociete_societe_joueur_exterieur" ).on("click", ".divMembre", function () {
		//Si on clique sur le profil d'un autre joueur, on est redirigé
		if ($(this).find('.pseudo_membre').text() != $("#titre_profil_exterieur_joueur").text()) {
			$('#profil_exterieur_joueur').data("idJoueur",$(this).data('id'));
			$("#titre_profil_exterieur_joueur").text($(this).find('.pseudo_membre').text());
			$.mobile.changePage("#profil_exterieur_joueur", { allowSamePageTransition: true } );
		}
	});
	
	
	socket.on('EntrepriseSocieteMajoritaire_exterieur', function(data) {
			$('#DisplayEntrepriseMajoritaire_societe_joueur_exterieur tbody').append('<tr><th>'+data.nom_entreprise+'</th></tr>');
			$('#affiche_entrepriseSociete_societe_joueur_exterieur').show();	
			$('#DisplayEntrepriseMajoritaire_societe_joueur_exterieur').table("refresh");
		})
		
	socket.on('resultGetInfosSocieteDuJoueur_exterieur', function(data) {
		$("#affiche_descriptionSociete_societe_joueur_exterieur").text(data.descriptionSociete);	
		$("#affiche_nomSociete_societe_joueur_exterieur").text(data.nomSociete);
		$("#affiche_nomSociete_societe_joueur_exterieur").data('idSociete',data.idSociete);
		var lien="img/avatarsSociete/"+data.avatarSociete+".png";
		$('#affiche_avatar_societe_joueur_exterieur').prop('src',lien);
	});
	
	socket.on('resultGetInfosSocieteDuJoueur_ScoreEtClassement_exterieur', function(data){
		//pos, idSociete, capital, nomSociete
		$("#affiche_rangSociete_societe_joueur_exterieur").text(data.pos);
		$("#affiche_liquiditeSociete_societe_joueur_exterieur").text(data.capital);
	});
	
	socket.on('resultGetInfosSocieteDuJoueur_CumulActionsVenduesSocieteParIdJoueur_exterieur', function(data) {
		// cumul_vente, Societe_idSociete
		$("#affiche_actionsVenduesSociete_societe_joueur_exterieur").text(data.cumul_vente);
	
	});
	
	socket.on('resultGetInfosSocieteDuJoueur_CumulActionsAcheteesSocieteParIdJoueur_exterieur', function(data) {
		$("#affiche_actionsAchetéesSociete_societe_joueur_exterieur").text(data.cumul_achat);
	});
	
	socket.on('resultGetInfosSocieteDuJoueur_CumulOrdresEnCoursSocieteParIdJoueur_exterieur', function(data) {
		$("#affiche_actionsEnAttenteSociete_societe_joueur_exterieur").text(data.cumul_ordre);
	});
	
	$('#rejoindre_societe_joueur_exterieur').on("click", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		//Si le joueur appartient déjà à la société
		if (idSociete == $("#affiche_nomSociete_societe_joueur_exterieur").data('idSociete')) {
			alert("Vous appartenez déjà à cette société d'investissement");
		}
		else {
		$('#confirmer_rejoindre_societe_joueur_exterieur').popup("open");
		}
	});
	
	$('#confirmerRejoindreSociete_joueur_exterieur').on("click", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		socket.emit("setDemandeAjoutMembreSociete", idJoueur, $("#affiche_nomSociete_societe_joueur_exterieur").data('idSociete'));
		alert("Votre demande a été envoyée");
		$('#confirmer_rejoindre_societe_joueur_exterieur').popup("close");
	});
	
});

$(document).on("pageshow", "#profil_exterieur_joueur", function() {
	var socket = io.connect(adresse_serveur);
	var joueur = {idJoueur : $('#profil_exterieur_joueur').data("idJoueur")};
	$('#DisplayEntrepriseMajoritaire_societe_joueur_exterieur tbody').empty();	
	$('#consult_boutique_exterieur_label').text('Consulte les objets de '+$("#titre_profil_exterieur_joueur").text());
	$('#affiche_non_objets_exterieur').text($("#titre_profil_exterieur_joueur").text()+' n\'a pas d\'objet dans ce module');
	socket.emit('getInfosJoueur_exterieur',joueur);
	socket.emit('getListeObjetsJoueur_exterieur',joueur);
	socket.emit('getMembresSocieteDuJoueur_exterieur',joueur);
	socket.emit('getInfosSocieteDuJoueur_exterieur',joueur);
});

$(document).on("pagebeforeshow", "#profil_exterieur_joueur", function() {
	//vider contenu
});