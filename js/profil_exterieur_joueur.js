// JavaScript Document

$(document).on("pageinit", "#profil_exterieur_joueur", function() {
	var socket = io.connect(adresse_serveur);
	var imageAvatar=["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15","A16","A17","A18","A19","A20","A21","A22","A23","A24","A25","A26","A27","A28","A29","A30","A31","A32"]	
	var idAvatar=0;	
	//Affichage des informations du joueur
	socket.on('resultGetInfosJoueur',function(data) {	
	
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
		$('#affiche_societe_exterieur').text(data.nom_societe);
		$('#affiche_score_exterieur').text(data.score);
		$('#affiche_jour_exterieur').text(data.jour);		
			//Statut bancaire
		$('#affiche_compte_exterieur').text(data.compte_en_banque);
		$('#affiche_argent_exterieur').text(data.argent_disponible);
		
			//Statut d'investisseur
		$('#affiche_actionsAchetees_exterieur').text(data.nb_actions_achetées);
		$('#affiche_actionsVendues_exterieur').text(data.nb_actions_vendues);
		$('#affiche_actionsPossedees_exterieur').text(data.nombre_actions_possedees);
		$('#affiche_ordre_exterieur').text(data.nombre_ordres_en_cours);
			//Statut d'emprunteur
		$('#affiche_statut_exterieur').text(data.statut_investisseur);
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
	socket.on ('resultGetListeObjetsJoueur', function(data) {
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
		
	});


$(document).on("pageshow", "#profil_exterieur_joueur", function() {
	var socket = io.connect(adresse_serveur);
	var joueur = {idJoueur : $('#profil_exterieur_joueur').data("idJoueur")};
	$('#consult_boutique_exterieur_label').text('Consulte les objets de '+$("#titre_profil_exterieur_joueur").text());
	$('#affiche_non_objets_exterieur').text($("#titre_profil_exterieur_joueur").text()+' n\'a pas d\'objet dans ce module');
	socket.emit('getInfosJoueur',joueur);
	socket.emit('getListeObjetsJoueur',joueur);
});

$(document).on("pagebeforeshow", "#profil_exterieur_joueur", function() {
	//vider contenu
});