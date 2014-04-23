// JavaScript Document
$(document).on("pageinit", "#informations_societe", function() {
	var socket=io.connect(adresse_serveur);	
	var joueur={idJoueur: idJoueur};
	
	var imageAvatar_societe=["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15"]	
	var idAvatar_societe=0;	
		
//Mise à jour de la description actuelle
	socket.on('resultGetInfosSocieteDuJoueur', function(data) {
		descriptionSociete=data.descriptionSociete;
		nomSociete=data.nomSociete;
		$('#choix_descriptionSociete').val(descriptionSociete);
		$('#choix_nomSociete').val(nomSociete);
		var lien="img/avatarsSociete/"+data.avatarSociete+".png";
		$('#image_avatar_societe').prop('src',lien);
		//Mise à jour de l'idAvatar  pour afficher l'avatar actuel
		var j=0 ; 
		while (imageAvatar_societe[j]!=data.avatarSociete) {
			j++	;
		}
		idAvatar_societe=j;
	});
	
	//Modifier les infos de la société (que la description en fait..)
	$(document).on("click","#btn_modif_infoSociete", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		description=$('#choix_descriptionSociete').val();
		//Envoi des données de chgt de description
		socket.emit('setNewDescriptionSociete', joueur.idJoueur, description);
		alert('Description modifiée');
	});	
	
	$(document).on("click","#btn_modif_nomSociete", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		nom=$('#choix_nomSociete').val();
		//Envoi des données de chgt de nom
		socket.emit('setNewNomSociete', joueur.idJoueur, nom);
		alert('Nom modifié');
	});		

 	$(document).on("click","#fleche_gauche_avatar_societe", function(event) {	
		event.preventDefault();
		event.stopImmediatePropagation();
		if (idAvatar_societe!=0) {
			idAvatar_societe--;
			var src="img/avatarsSociete/"+imageAvatar_societe[idAvatar_societe]+".png";
			$("#image_avatar_societe").prop("src",src);
		}  else {
			idAvatar_societe=imageAvatar_societe.length-1 ;
			var src="img/avatarsSociete/"+imageAvatar_societe[idAvatar_societe]+".png";
			$("#image_avatar_societe").prop("src",src);
		} 
		return false;	
	});

	$(document).on("click","#fleche_droite_avatar_societe", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		if (idAvatar_societe!=imageAvatar_societe.length-1) {
			idAvatar_societe++;
			var src="img/avatarsSociete/"+imageAvatar_societe[idAvatar_societe]+".png";
			$("#image_avatar_societe").prop("src",src);
		} else {
			idAvatar_societe=0 ;
			var src="img/avatarsSociete/"+imageAvatar_societe[idAvatar_societe]+".png";
			$("#image_avatar_societe").prop("src",src);	
		}
		return false;
	});		
	
	$(document).on("click","#changer_avatar_societe", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		socket.emit("setNewAvatarSociete", idJoueur, imageAvatar_societe[idAvatar_societe]);
		var src="img/avatarsSociete/"+imageAvatar_societe[idAvatar_societe]+".png";
		$("#affiche_avatar_societe").prop("src",src);
		alert("Avatar modifié");
	});
	
	//Interdire le caractère "
	jQuery("#choix_descriptionSociete").keyup(function(event)
		{
			name = jQuery("#choix_descriptionSociete").val();
			var reg=new RegExp('(")', "g");
			name = name.replace(reg,"'");
			jQuery("#choix_descriptionSociete").val(name);
		});
	
});

$(document).on("pageshow", "#informations_societe", function() {
	var socket=io.connect(adresse_serveur);	
	var joueur={idJoueur: idJoueur};
	socket.emit('getInfosSocieteDuJoueur',joueur);
});