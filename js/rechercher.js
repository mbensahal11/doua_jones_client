// JavaScript Document
$(document).on("pageinit", "#rechercher", function() {
	var socket=io.connect(adresse_serveur);	
	
	$('#search_joueur_form').submit(function(event) {
				  event.preventDefault();
				  event.stopImmediatePropagation();
				  if ($('#joueur_entre').val() != '') {
				  	socket.emit("rechercheJoueur", $('#joueur_entre').val());
				  }
				  else {
					  alert('Veuillez entrer un pseudo');
				  }
				  return false;
	});
	
	$('#search_societe_form').submit(function(event) {
				  event.preventDefault();
				  event.stopImmediatePropagation();
				  if ($('#societe_entre').val() != '') {
				  	socket.emit("rechercheSociete", $('#societe_entre').val());
				  }
				  else {
					  alert("Veuillez entrer le nom d'une société d'investissement");
				  }
				  return false;
	});
	
	socket.on("resultRechercheJoueur", function(rows){
		$('#ul_result_search_joueur').empty();
		for (var i=0;i<rows.length;i++) {
			var idJoueur = rows[i].idJoueur;
			var avatar = rows[i].avatar;
			var pseudo = rows[i].pseudo;
			var societe = rows[i].nomSociete;
			var content = '<li class="content_recherche_joueur"><a href="#"><img src="img/avatars/'+avatar+'.png" /><h3 class="pseudo_trouve" data-id='+idJoueur+'>'+pseudo+'</h3><p>'+societe+'</p></a></li>';
			$('#ul_result_search_joueur').append(content);
		}
		$('#ul_result_search_joueur').listview('refresh');
	});
	
	socket.on("resultRechercheSociete", function(rows){
		$('#ul_result_search_societe').empty();
		for (var i=0;i<rows.length;i++) {
			var idSociete_resultrecherche = rows[i].idSociete;
			var avatar = rows[i].avatarSociete;
			var nomSociete = rows[i].nomSociete;
			var content = '<li class="content_recherche_societe"><a href="#"><img src="img/avatarsSociete/'+avatar+'.png" /><h3 class="nomSociete_trouve" data-id='+idSociete_resultrecherche+'>'+nomSociete+'</h3></a></li>';
			$('#ul_result_search_societe').append(content);
		}
		$('#ul_result_search_societe').listview('refresh');
	});
	
	$( "#ul_result_search_joueur" ).on('click', '.content_recherche_joueur', function() {
		$('#profil_exterieur_joueur').data("idJoueur",$(this).find('.pseudo_trouve').data('id'));
		$("#titre_profil_exterieur_joueur").text($(this).find('.pseudo_trouve').text());
		$.mobile.changePage("#profil_exterieur_joueur");
	});
	
	$( "#ul_result_search_societe" ).on('click', '.content_recherche_societe', function() {
		$('#profil_exterieur_societe').data("idSociete",$(this).find('.nomSociete_trouve').data('id'));
		$("#titre_profil_exterieur_societe").text($(this).find('.nomSociete_trouve').text());
		$("#confirmer_rejoindre_societe_exterieur h2").text('Etes-vous sur de vouloir rejoindre "'+$("#titre_profil_exterieur_societe").text()+'" ? Vous quitterez votre ancienne société.');
		$.mobile.changePage("#profil_exterieur_societe");
	});
	
});