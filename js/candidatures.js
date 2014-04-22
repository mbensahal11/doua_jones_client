// JavaScript Document
$(document).on("pageshow", "#candidatures", function() {
	
	var socket=io.connect(adresse_serveur);	

	socket.emit("getDemandesAjoutSociete",idSociete);   //idsociete  

});

$(document).on("pageinit", "#candidatures", function() {
	var joueur={idJoueur:idJoueur}
	var socket=io.connect(adresse_serveur);	
	
	var idCandidat;
	var pseudoCandidat;

	socket.on("resultGetDemandesAjoutSociete", function(data) {
		
		$("#contenu_candidats").empty();	
		$("#contenu_candidats").append("<ul id='candidat' data-role='listview' data-inset='true'></ul>");
		$("#contenu_candidats").trigger("create");
		
		for (var i in data.rows) {

			var src="img/avatars/"+data.rows[i].avatar+".png";
			$("#candidat").append('<li class="candidatSoc" data-id='+data.rows[i].idJoueur+'><a href="#purchase" data-rel="popup"><img src='+src+'><h2 id="pseudo_candidat">'+data.rows[i].pseudo+'</h2><p>'+data.rows[i].nomSociete+'</p></a></li>');
			$("#candidat").listview("refresh");
		}
		
	});
	
	
	socket.on('resultSetAccepterDemandeMembre',function(data) {
		alert(data.message);
		if (data.erreur==false) {
			$('li[data-id="'+idCandidat+'"]').remove();
			$("#candidat").listview("refresh"); 
		}
	});
	

	$("#contenu_candidats").on("click", ".candidatSoc", function() {
		idCandidat=$(this).data("id");
		pseudoCandidat= $(this).find('#pseudo_candidat').text();
	});
	
	$("#voir_profil_candidature").on("click", function() {
		$('#profil_exterieur_joueur').data("idJoueur",idCandidat);
		$("#titre_profil_exterieur_joueur").text(pseudoCandidat);
		$.mobile.changePage("#profil_exterieur_joueur");
	});
	
	
	
	$(document).on("click","#accepter_joueur", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		socket.emit('setAccepterDemandeMembre',joueur.idJoueur,idCandidat);
		$('#purchase').popup('close');
	});	
	
	
	
	$(document).on("click","#refuser_joueur", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		socket.emit('setRefuserDemandeMembre',joueur.idJoueur,idCandidat);
		$('li[data-id="'+idCandidat+'"]').remove();
		$("#candidat").listview("refresh"); 
	});	


			
});