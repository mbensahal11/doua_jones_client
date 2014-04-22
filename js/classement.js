// JavaScript Document
$(document).on("pageinit", "#classement", function() {

var socket=io.connect(adresse_serveur);	

//Classement par score joueur
socket.on('resultGetPlageClassementScoreJoueur',function(data){
		$('#body_table_classement_score').html('<tr> </tr>');
		for (var i=0; i<data.length;i++) {
			var Class_score=data[i];
			var src="img/avatars/"+Class_score.avatar+".png";
			var rang=i+1; 
			var ajout="<tr class='content_classement_joueur'><a href='#'><td>"+"<img class='avatarClassement' alt='Av' src='"+src+"'/></td><td>"+rang+"</td><td class='classement_pseudo_id' data-id="+Class_score.idJoueur+">"+Class_score.pseudo+"</td><td>"+Class_score.score+"</td></a></tr>";
		$('#table_score tbody tr:last').after(ajout);
	
		}
		$('#table_score').table("refresh");
	});

//Classement par capital joueur	
socket.on('resultGetPlageClassementCapitalJoueur',function(data){
	$('#body_table_classement_capital').html('<tr> </tr>');
		for (var j=0; j<data.length;j++) {
			var Class_cap=data[j];
			var src="img/avatars/"+Class_cap.avatar+".png";
			var rang=j+1;
			var ajout="<tr class='content_classement_joueur'><a href='#'><td>"+"<img class='avatarClassement' \
						alt='Av' src='"+src+"'/></td><td>"+rang+"</td><td class='classement_pseudo_id' \
						data-id="+Class_cap.idJoueur+">"+Class_cap.pseudo+"</td><td>"+Class_cap.capital+"</td></a></tr>";
			$('#table_capital tbody tr:last').after(ajout);
	
		}
		$('#table_capital').table("refresh"); 
});


//Classement par capital Societe
socket.on('resultGetPlageClassementCapitalSociete',function(data){
		$('#body_table_classement_societe').html('<tr> </tr>');
		for (var j=0; j<data.length;j++) {
			var Class_soc=data[j];
			var rang=j+1;
			var ajout="<tr class='content_classement_societe'><a href='#'><td>"+rang+"</td><td class='classement_nomSociete_id' data-id="+Class_soc.idSociete+">"+Class_soc.nomSociete+"</td><td>"+Class_soc.capital+"</td></a></tr>";
			$('#table_societe tbody tr:last').after(ajout);
	
		}
		$('#table_societe').table("refresh"); 
});

//Classement relatif par capital Joueur
socket.on('PositionClassementCapitalJoueur',function(data,firstRank,rangJoueur){
		var rang=firstRank;
		var ajout="<tr><a href='#'><td>...</td><td>...</td><td>...</td><td>...</td></a></tr>";
		$('#table_capital tbody tr:last').after(ajout);
		$('#table_capital').table("refresh"); 
		
		for (var i=0; i<data.length;i++) {
			var Class_cap=data[i];
			var src="img/avatars/"+Class_cap.avatar+".png";
			if (rangJoueur==rang) {
				var ajout="<tr class='content_classement_joueur' style='font-weight:bold'><a href='#'><td><a href='#'>"+"<img class='avatarClassement' alt='Av' src='"+src+"'/></a></td><td>"+rang+"</td><td class='classement_pseudo_id' data-id="+Class_cap.idJoueur+">"+Class_cap.pseudo+"</td><td>"+Class_cap.capital+"</td></a></tr>";
				$('#table_capital tbody tr:last').after(ajout);
			} else {
				var ajout="<tr class='content_classement_joueur'><a href='#'><td>"+"<img class='avatarClassement' alt='Av' src='"+src+"'/></td><td>"+rang+"</td><td class='classement_pseudo_id' data-id="+Class_cap.idJoueur+">"+Class_cap.pseudo+"</td><td>"+Class_cap.capital+"</td></a></tr>";
				$('#table_capital tbody tr:last').after(ajout);}
			rang=rang+1;
		}
		$('#table_capital').table("refresh"); 
});

//Classement relatif par score joueur	
socket.on('PositionClassementScoreJoueur',function(data,firstRank,rangJoueur){
		var rang=firstRank;
		var ajout="<tr><a href='#'><td>...</td><td>...</td><td>...</td><td>...</td></a></tr>";
		$('#table_score tbody tr:last').after(ajout);
		$('#table_score').table("refresh"); 
		
		for (var j=0; j<data.length;j++) {
			var Class_sco=data[j];
			var src="img/avatars/"+Class_sco.avatar+".png";
			if (rangJoueur==rang) {
				var ajout="<tr class='content_classement_joueur' style='font-weight:bold'><a href='#'><td><a href='#'>"+"<img class='avatarClassement' alt='Av' src='"+src+"'/></a></td><td>"+rang+"</td><td class='classement_pseudo_id' data-id="+Class_sco.idJoueur+">"+Class_sco.pseudo+"</td><td>"+Class_sco.score+"</td></a></tr>";
				$('#table_score tbody tr:last').after(ajout);
			} else {			
				var ajout="<tr class='content_classement_joueur'><a href='#'><td><a href='#'>"+"<img class='avatarClassement' alt='Av' src='"+src+"'/></a></td><td>"+rang+"</td><td class='classement_pseudo_id' data-id="+Class_sco.idJoueur+">"+Class_sco.pseudo+"</td><td>"+Class_sco.score+"</td></a></tr>";
				$('#table_score tbody tr:last').after(ajout);
			}
			rang=rang+1;
		}
		$('#table_score').table("refresh"); 
});
	
//Classement relatif par capital société		
socket.on('PositionClassementCapitalSociete',function(data,firstRank,rangJoueur){
		var rang=firstRank; 
		var ajout="<tr><a href='#'><td>...</td><td>...</td><td>...</td></a></tr>";
		$('#table_societe tbody tr:last').after(ajout);
		$('#table_societe').table("refresh"); 
		
		for (var k=0; k<data.length;k++) {
			var Class_soc=data[k];
			//var src="img/avatars/"+Class_soc.avatarSociete+".png";
			if (rangJoueur==rang) {
				var ajout="<tr class='content_classement_societe' style='font-weight:bold'><a href='#'><td>"+rang+"</td><td  class='classement_nomSociete_id' data-id="+Class_soc.idSociete+">"+Class_soc.nomSociete+"</td><td>"+Class_soc.capital+"</td></a></tr>";
				$('#table_societe tbody tr:last').after(ajout);
			} else {			
				var ajout="<tr class='content_classement_societe'><a href='#'><td>"+rang+"</td><td class='classement_nomSociete_id' data-id="+Class_soc.idSociete+">"+Class_soc.nomSociete+"</td><td>"+Class_soc.capital+"</td></a></tr>";
				$('#table_societe tbody tr:last').after(ajout);
			}
				rang=rang+1;
		}
		$('#table_societe').table("refresh"); 
});	

	$( ".classement_table_class_joueur" ).on('click', '.content_classement_joueur', function() {
		$('#profil_exterieur_joueur').data("idJoueur",$(this).find('.classement_pseudo_id').data('id'));
		$("#titre_profil_exterieur_joueur").text($(this).find('.classement_pseudo_id').text());
		$.mobile.changePage("#profil_exterieur_joueur");
	});
	
	$( ".classement_table_class_societe" ).on('click', '.content_classement_societe', function() {
		$('#profil_exterieur_societe').data("idSociete",$(this).find('.classement_nomSociete_id').data('id'));
		$("#titre_profil_exterieur_societe").text($(this).find('.classement_nomSociete_id').text());
		$("#confirmer_rejoindre_societe_exterieur h2").text('Etes-vous sur de vouloir rejoindre "'+$("#titre_profil_exterieur_societe").text()+'" ? Vous quitterez votre ancienne société.');
		$.mobile.changePage("#profil_exterieur_societe");
	});


});

$(document).on("pageshow", "#classement", function() {
	var socket=io.connect(adresse_serveur);	
	//socket.emit('getWhatWeWant',borneInfClassement,borneSupClassement,idJoueur)
	socket.emit('getPlageClassementScoreJoueur',1,25,idJoueur);
	socket.emit('getPlageClassementCapitalJoueur',1,25,idJoueur);
	socket.emit('getPlageClassementCapitalSociete',1,25,idJoueur);
});

