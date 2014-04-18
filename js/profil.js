// JavaScript Document

$(document).on("pageinit", "#profil", function() {
	var joueur = {idJoueur : idJoueur};
	var socket=io.connect(adresse_serveur);	
	socket.emit('getOrdresEnCours',joueur);
	socket.emit('getEmpruntsEnCours',joueur);
	socket.emit('getCarnetJoueur',joueur);
	socket.emit('getInfosJoueur',joueur);
	socket.emit('getListeObjetsJoueur',joueur);
	
	//2 variables "globales"
	var imageAvatar=["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15","A16","A17","A18","A19","A20","A21","A22","A23","A24","A25","A26","A27","A28","A29","A30","A31","A32"]	
	var idAvatar=0;	
	
	//Onglet Transaction
	
		// Création de la table Ordre en attente	
	socket.on('resultGetOrdresEnCours',function(data){
			for (var i=0; i<data.length;i++) {
				var ordre=data[i];
				var ajout="<tr><td>"+ordre.DateCreation+"</td><td>"+ordre.Sens+"</td><td>"+ordre.Type+"</td><td>"+ordre.Entreprise_idEntreprise+"</td><td>"+ordre.Quantite+"</td><td>"+ordre.Prix+"</td><td>"+ordre.DateValidite+"</td></tr>";
		
			$('#table_ordre tbody tr:last').after(ajout);
		
			}
			
			$('#table_ordre').table("refresh");
		});
		
		// Création de la table Emprunt		
	socket.on('resultGetEmpruntsEnCours',function(data){
			for (var i=0; i<data.length;i++) {
				var emprunt=data[i];
				var ajout="<tr><td>"+emprunt.date_emprunt+"</td><td>"+emprunt.valeur_empruntee+"</td><td>"+emprunt.remboursement_quotidien+"</td><td>"+emprunt.retard+"</td><td>"+emprunt.montant_restant+"</td></tr>";
				$('#table_emprunt tbody tr:last').after(ajout);
			}
			$('#table_emprunt').table("refresh");
	});	
	
	
		// Création de la table Action		
	socket.on('resultGetCarnetJoueur',function(data){
			for (var i=0; i<data.length;i++) {
				var action=data[i];
				var ajout="<tr><td>"+action.nom_entreprise+"</td><td>"+action.quantite+"</td><td>"+action.valeur+"</td></tr>";
			
			$('#table_action tbody tr:last').after(ajout);
			
			}
			$('#table_action').table("refresh");
	});	
	
		//Affichage en fonction du choix de l'utilisateur	
	$("#choix_transaction").on("change",function() {
		
		if (  $('#choix_transaction option:selected').val()=="1") {
			$("#mouvant13").show();
			$("#mouvant11").hide();
			$("#mouvant12").hide();
		} else if ($('#choix_transaction option:selected').val()=="2") {
			$("#mouvant11").show();
			$("#mouvant12").hide();
			$("#mouvant13").hide();
		} else if ($('#choix_transaction option:selected').val()=="3") {
			$("#mouvant12").show();
			$("#mouvant11").hide();
			$("#mouvant13").hide();
		}
		
	});
	
//Onglet Infos	

	//Affichage des informations du joueur
	socket.on('resultGetInfosJoueur',function(data) {	
	
			//avatar
		var lien="img/avatars/"+data.avatar+".png";
		$('#affiche_avatar').prop('src',lien);	
			//pseudo
		$('#affiche_pseudo').text(data.pseudo);
			//description
		$('#affiche_description').text(data.description);
			//Informations générales
		$('#affiche_depart').text(data.departement);
		$('#affiche_etude').text(data.annee_etude);
		$('#affiche_sexe').text(data.sexe);
		$('#affiche_societe').text(data.nom_societe);
		$('#affiche_score').text(data.score);
		$('#affiche_jour').text(data.jour);		
			//Statut bancaire
		$('#affiche_compte').text(data.compte_en_banque);
		$('#affiche_argent').text(data.argent_disponible);
		
			//Statut d'investisseur
		$('#affiche_actionsAchetees').text(data.nb_actions_achetées);
		$('#affiche_actionsVendues').text(data.nb_actions_vendues);
		$('#affiche_actionsPossedees').text(data.nombre_actions_possedees);
		$('#affiche_ordre').text(data.nombre_ordres_en_cours);
			//Statut d'emprunteur
		$('#affiche_statut').text(data.statut_investisseur);
		$('#affiche_empruntsEnCours').text(data.nombre_emprunts_en_cours);
		$('#affiche_empruntsEnRetard').text(data.nombre_emprunts_en_retard);
		$('#affiche_empruntsNombreMax').text(data.nb_emprunts_maximum);
		$('#affiche_teg').text(data.TEG);

		
			//Informations de l'écran de modification des informations qui sont initialisées aux valeurs courantes. Par exemple, lorsque le joueur veut modifier son avatar, l'avatar affiché dans l'écran de modification est son avatar actuel. Idem pour la description, sexe, année d'étude.
			
			//Mise à jour de l'idAvatar (variable globale) pour afficher l'avatar actuel
		
		var j=0 ; 
		while (imageAvatar[j]!=data.avatar) {
			j++	;
		}
		idAvatar=j;
				
			
				//Mise à jour des autres informations
		$('#choix_description').val(data.description);
		$('#choix_annee').val(data.annee_etude).selectmenu("refresh");
		$('#choix_sexe').val(data.sexe).selectmenu("refresh");
		$('#choix_depart').val(data.departement).selectmenu("refresh"); 
		$("#image_avatar").prop("src",lien);
	});        
	
		
				//Défilement des avatars click gauche/droit
	$(document).on("click","#fleche_gauche_avatar", function(event) {	
		event.preventDefault();
		event.stopImmediatePropagation();
		if (idAvatar!=0) {
			idAvatar--;
			var src="img/avatars/"+imageAvatar[idAvatar]+".png";
			$("#image_avatar").prop("src",src);
		}  else {
			idAvatar=imageAvatar.length-1 ;
			var src="img/avatars/"+imageAvatar[idAvatar]+".png";
			$("#image_avatar").prop("src",src);
		} 
		return false;	
	});

	$(document).on("click","#fleche_droite_avatar", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		if (idAvatar!=imageAvatar.length-1) {
			idAvatar++;
			var src="img/avatars/"+imageAvatar[idAvatar]+".png";
			$("#image_avatar").prop("src",src);
		} else {
			idAvatar=0 ;
			var src="img/avatars/"+imageAvatar[idAvatar]+".png";
			$("#image_avatar").prop("src",src);	
		}
		return false;
	});		
		
	//click sur le btn modifier le mot de pase depuis le profil, l'écran de chgt de mdp caché dans une div s'affiche
	
	$(document).on("click","#btn_modif_mdp", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$("#mouvant1").hide();
		$("#mouvant2").show();
		return false;
	});
	
	//click sur le btn modifier les infos depuis le profil. Idem
	
	$(document).on("click","#btn_modif_infos", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$("#mouvant1").hide();
		$("#mouvant3").show();
		return false;
	});

	//click sur retour au profil depuis l'écran de chgt de mdp
	
	$(document).on("click","#retour_infos_from_mdp", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$("#mouvant1").show();
		$("#mouvant2").hide();
		$("#ancienMdp").val('');
		$("#nouveauMdp").val('');
		$("#validerNouveauMdp").val('');
		return false;
	});

	//click sur retour au profil depuis l'écran de chgt d'infos

	$(document).on("click","#retour_infos_from_modinfos", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$("#mouvant1").show();
		$("#mouvant3").hide();
		return false;
	
	});
	
	//Click sur Envoi des informations
	$(document).on("click","#envoi_infos", function(event) {		
		event.preventDefault();
		event.stopImmediatePropagation();
		var data={idJoueur:joueur.idJoueur, annee_etude:$('#choix_annee').val(), description:$('#choix_description').val(), sexe:$('#choix_sexe').val(), date_de_naissance:$('#choix_dateNaissance').val(), departement:$('#choix_depart').val(),avatar:imageAvatar[idAvatar]}
		socket.emit('setInfosJoueur',data);
		$("#mouvant1").show();
		$("#mouvant3").hide();
		//Informations modifiables par l'utilisateur sont aussi modifiées en local. Permet une mise à jour directe des éléments sans recharger la page. Au chargement de la page, ces informations sont modifiées par le serveur.
		$('#affiche_depart').text($('#choix_depart').val()); 
		$('#affiche_etude').text($('#choix_annee').val());
		$('#affiche_sexe').text($('#choix_sexe').val());	
		$('#affiche_description').text($('#choix_description').val());
		var src="img/avatars/"+imageAvatar[idAvatar]+".png";
		$("#affiche_avatar").prop("src",src);
		return false;
	});
	
	// Click sur Envoi du nouveau mot de passe
	$(document).on("click","#envoi_new_mdp", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		//Contrôler avec le mot de passe actuel, il faut remplacer password par la valeur du mdp actuel contenue ds le localstorage
	
		if ($('#ancienMdp').val()!='password') {
			alert('ancien mot de passe incorrect'); }
		else if ($('#nouveauMdp').val()!=$('#validerNouveauMdp').val()) {
			alert('Retaper le nouveau mot de passe');
			$('#nouveauMdp').val('');
			$('#validerNouveauMdp').val('');
		}
		else if (!$('#nouveauMdp').val()) {
			alert('Veuillez entrer un mot de passe non nul');
		}
		else {
			var newpassword=$('#nouveauMdp').val();
			var data= {idJoueur:1, newPassword:newpassword};
			socket.emit('setNewPassword',data);	
		//Mettre à jour le mot de passe dans le localStorage
			socket.on('resultSetNewPassword',function(booboo) {
				if (booboo) {
					alert('mot de passe changé avec succès');
						$("#mouvant1").show();
						$("#mouvant2").hide();
						$("#ancienMdp").val('');
						$("#nouveauMdp").val('');
						$("#validerNouveauMdp").val('');
				}
				else {alert('erreur serveur, veuillez réessayer')}
			})
		};
		return false;
	});


	//Empêcher la saisie du caractère " qui fait planter le serveur (remplacé par ' )
	jQuery("#choix_description").keyup(function(event)
			{
				name = jQuery("#choix_description").val();
				var reg=new RegExp('(")', "g");
				name = name.replace(reg,"'");
				jQuery("#choix_description").val(name);
			});

	//Autoriser seulement les caractères alphanumériques pour les chgts de mot de passe, Marche pas visiblement.
	$('#ancienMdp, #nouveauMdp, #validerNouveauMdp').bind('keypress', function (event) 			{
		var regex = new RegExp("^[a-zA-Z0-9]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			alert("Caractères spéciaux non autorisés");
			event.preventDefault();
		   return false;
		}
	});

//Onglet vitrine
	//Défilement des objets achetés
	socket.on ('resultGetListeObjetsJoueur', function(data) {
		var idMod;
		var module;
		var idObj;
		//En fonction du module choisi, les objets possédés par le joueur sont affichés
		$(document).on("change","#consult_boutique", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			idMod=$('#consult_boutique option:selected').val();
			module=data[idMod-1];
			idObj=0;
			if (module.length!=0) {
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets").prop("src",src);
				$("#description_item").text(module[idObj].nom);
				$("#affiche_objets").show();
				$("#affiche_non_objets").hide();			
			} else {
			$("#affiche_non_objets").show();
			$("#affiche_objets").hide();
			}
			return false;				
		});
		
		//Défilement gauche/droit
		$(document).on("click","#fleche_gauche", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();		
			if (idObj!=0) {
				idObj--;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets").prop("src",src);
				$("#description_item").text(module[idObj].nom);
			}  else {
				idObj=module.length-1 ;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets").prop("src",src);
				$("#description_item").text(module[idObj].nom);
			} 
			return false;
		});

		$(document).on("click","#fleche_droite", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			if (idObj!=module.length-1) {
				idObj++;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets").prop("src",src);
				$("#description_item").text(module[idObj].nom);
			} else {
				idObj=0 ;
				var src="img/"+module[idObj].nom+".png";
				$("#image_objets").prop("src",src);
				$("#description_item").text(module[idObj].nom);			
			}
			return false;
		});
		
	});
	
	
//Onglet société d'investissement en chantier	
	
	/*	var ave=["A1","A4","A8","A10","A15","A16"];
		for (var k=0; k<ave.length;k++) {
			$( "<img>" ).attr({ 
				src: "img/avatars/"+ave[k]+".png",
				alt: ave[k]
			})
			.addClass("imgMembre")
			.appendTo("#affiche_membresSociete");		
		}   

*/

		var ave=["A1","A4","A8","A10","A15","A16"];
		for (var k=0; k<ave.length;k++) {
			$('<div>')
			.css('display','inline-block')
			.appendTo("#affiche_membresSociete")
			.append($("<img>")
				.attr({ 
					src: "img/avatars/"+ave[k]+".png",
					alt: ave[k] 	})
				.addClass("imgMembre")
			)
			.append("<p>Coucou</p>")
			.addClass("divMembre");
		}   


	
/*	
//Societe d'investissement
	$(document).on("click","#privileges_president", function() {	
//si l'entreprise majoritaire quelquepart
	$("#mouvant_president").html("<label for='majoritaire'>Fixer la capacité chez</label>");
	$('<select>').attr({'name':'majoritaire','id':'majoritaire','data-native-menu':'false'}).appendTo('#mouvant_president');
	$('<option>').html("Choisis l'entreprise").appendTo('#boutique_obj');
	$.each(data[$(this).val()-1], function(key, value) {  
		$('#majoritaire')
			 .append($("<option></option>")
			 .attr("value",key)	
			 .text(value.nom));
	}); 
	$('#majoritaire').selectmenu();

	}); 
	function () {
		alert("voub");
		var ave=["A1","A4","A8","A10","A15","A16"];
		for (var k=0; k<ave.length;k++) {
			$( "<img>" ).attr({ 
				src: "img/avatars/"+ave[k]+".png",
				alt: ave[k]
			}).appendTo("#affiche_membresSociete");		
			alert(ave[k]);
		}
	};
	*/
});

$(document).on("pageshow", "#profil", function() {
	var joueur = {idJoueur : idJoueur};
	var socket=io.connect(adresse_serveur);	
	socket.emit('getOrdresEnCours',joueur);
	socket.emit('getEmpruntsEnCours',joueur);
	socket.emit('getCarnetJoueur',joueur);
	socket.emit('getInfosJoueur',joueur);
	socket.emit('getListeObjetsJoueur',joueur);
});

