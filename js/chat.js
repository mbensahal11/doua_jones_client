// JavaScript Document

var pseudo_color = "#032f55";
var hasscrolledchatglobal;
$(document).on("pageinit", "#chat", function() {
	
	var socket = io.connect('http://localhost:8080');
	socket.emit('adduser', pseudo, idJoueur);
	//On initialise la page en disant qu'il n'y a pas eu de scroll
	hasscrolledchatglobal = false;
	
	/*socket.emit('getChatGlobalMessages');
	socket.on('resultGetChatGlobalMessages', function (value) {
		for (var i=0;i<value.length;i++) {
			//reste à tester si joueur.idJoueur est le joueur actif dans ce cas mettre le texte à droite
			
			
			$('#div_champs_chat').append("<div class='line_gauche'><img src='img/bulle_gauche.png' alt='' class='fleche_bulle_gauche'/><div 	class='pseudo'> <b>" + "<font color="+pseudo_color +">" + value[i].Joueur_idJoueur + "</font>" + "</b> </div> " + "<div class='message'>" + value[i].contenu + "</div> </div>");
		}
	});*/
	
	// Envoi d'un message dans le chat global
	$('#send_chatmessage_form').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		// On récupère le message
		var mess = $('#message_input').val();
		//Le message est envoyé s'il n'est pas vide
		if (mess != '') {
			socket.emit('setChatGlobalNewMessage', {
				idJoueur : idJoueur,
				pseudo : pseudo,
				message: $('#message_input').val()
			});
			// On écrit le message côté client
			$('#div_champs_chat').append("<div class='line_droite'><img src='img/bulle_droite.png' alt='' class='fleche_bulle_droite'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + pseudo + "</font>" + "</b> </div> " + "<div class='message'>" + mess + "</div> </div>");
			//Le champs texte est remis à zéro
			$('#message_input').val('');
			//On scroll vers le bas
			$(document).scrollTop($(document).height());  
		}
			
		return false;
	});
	
	//A la réception d'un message dans le chat global
	socket.on('Message', function (message) {
		var scrolleddown = true
		
		if ($(window).scrollTop() + $(window).height() != $(document).height() && hasscrolledchatglobal==true) {
			scrolleddown = false;
		}
		//On écrit le message reçu
		$('#div_champs_chat').append("<div class='line_gauche'><img src='img/bulle_gauche.png' alt='' class='fleche_bulle_gauche'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + message.pseudo + "</font>" + "</b> </div> " + "<div class='message'>" + message.message + "</div> </div>");
		
		//Si le joueur a remonté dans le fil de conversation, on ne fait pas un scroll automatique vers le bas
		if (scrolleddown) {
			$(document).scrollTop($(document).height());  
		}

	});
	
	//La variable hasscrolled est initialisé à false, si le joueur ne scrolle pas et qu'il reçoit des messages, la page scrollera automatiquement
	window.onscroll = function (e) {  
		hasscrolledchatglobal = true;  
	} 
	
	
	//Onglet messagerie
	
	//conversion datejs to datesql
	Date.prototype.toMysqlFormat = function() {
   		return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
	};
	
	var date_70 = new Date(0);
	socket.emit('getNewPrivateMessages', idJoueur, date_70.toMysqlFormat());
	socket.on('resultGetNewPrivateMessages', on_receive_new_messages);
	
	
	//Une popup s'ouvre lorsqu'on veut créer un nouveau fil de conversation
	$('#new_mail').click(function () {
		$('#popupmess').popup( "open" );
	});
	
	/*$( "#popupmess" ).popup({
		afterclose: function( event, ui ) {
						$('#destinataire').html('');
					}
		});*/
	
	//On vérifie que le destinataire entrée existe bien
	$('#search_destinataire').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var destinataire = $('#destinataire_entre').val();
		
		
		socket.emit("check_destinataire", destinataire);
		
		return false;
	});
	
	//Si le destinataire existe, on peut écrire et envoyer le message
	socket.on("resultCheckDestinataire", function(exist, id_destinataire){
		var destinataire = $('#destinataire_entre').val();
		if (exist) {
			if (id_destinataire == idJoueur) {
				alert('Vous ne pouvez pas envoyer un message à vous-même');
			}
			else{
				$('#destinataire').text(destinataire);
				//On stocke l'id du destinataire
				$('#destinataire').data("id_destinataire",id_destinataire);
				$('#destinataire_entre').val('');
			}
		}
		else {
			alert("Ce pseudo n'existe pas");
		}
	});
			
	
	$('#send_private_message').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		if ($("#destinataire").text()=='') {
			alert('Veuillez sélectionner un destinataire');
		}
		else { 
			var d = new Date();
			/*maj_tchat_prive(d,$("#destinataire").text(),$("#private_message").val());*/
			socket.emit("setNewPrivateMessages", $("#private_message").val(), $('#destinataire').data("id_destinataire"),idJoueur);
			/*var dateBefore = substractMinutes(d, 1);
			var dateBeforeSQL = dateBefore.toMysqlFormat();
			socket.emit('getNewPrivateMessages', idJoueur, dateBeforeSQL);*/
			maj_tchat_prive(d,$("#destinataire").text(),$("#private_message").val(), $('#destinataire').data("id_destinataire"));
			//On ferme puis réinitialise la popup
			$('#popupmess').popup( "close" );
			$('#destinataire').data("id_destinataire","");
			$("#destinataire").html('');
			$("#private_message").val('');
			$('#destinataire_entre').val('');
		}
		
		return false;
		
	});
	

	function on_receive_new_messages (rows) {
		for (var i=0;i<rows.length;i++) {
			var destinataire=rows[i].pseudo;
			var contenu=rows[i].contenu;
			var dateSQL=rows[i].date;
			var id = rows[i].idEmetteur;
			var dateJS = new Date(dateSQL);
			maj_tchat_prive(dateJS,destinataire,contenu,id);
		}
	};
		
	//On retire nbminutes minutes de la date en entrée
	function substractMinutes(date, nbMinutes) {
    	return new Date(date.getTime() - nbMinutes*60000);
	}
	
	//function utilisée par toMysqlFormat
	function twoDigits(d) {
		if(0 <= d && d < 10) return "0" + d.toString();
		if(-10 < d && d < 0) return "-0" + (-1*d).toString();
		return d.toString();
	}

	
		
	
	function maj_tchat_prive (date, destinataire, contenu,id) {
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			if (day < 10) { day = "0" + day; };
			month += 1;
			if (month < 10) { month = "0" + month; };
			if (hour < 10) { hour = "0" + hour; };
			if (minute < 10) { minute = "0" + minute; };
			var content;
			var conversation_commencee = false;
			var destinataire_index;
			//On vérifie si le fil de conversation existe déjà
			$(".destinataire_liste").each(function(i){
				if ($(this).text() == destinataire) {
					conversation_commencee = true;
					destinataire_index = i;
				}
			});
			//Si la conversation n'existe pas
			if (!(conversation_commencee)) {
				//Si le joueur a déjà reçu un message ce jour
				if (day + '/' + month + '/' + year == $('.date_message_prive').eq(0).html()) {
					content = '<li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste" data-pseudo='+destinataire+' data-id='+id+'>'+
									destinataire+
								'</h3><p class="dernier_message">'+
								contenu+
								'</p><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></a></li>';
					
					$('.content_list_divider').eq(0).before(content);
					
				}
				//Si le joueur n'a pas encore reçu de message aujourd'hui, on ajoute un list divider
				else {
					content = '<li data-role="list-divider" class="list_divider"><div class="date_message_prive">'+
					day + '/' + month + '/' + year + '</div>'+
								'<span class="ui-li-count">0</span></li><li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste" data-pseudo='+destinataire+' data-id='+id+'>'+
									destinataire+
								'</h3><p class="dernier_message">'+
								contenu+
								'</p><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></a></li>';
					$('#liste_messages_persos').prepend(content);
				}
			}
			//si la conversation existe déjà
			else {
				//Si le joueur a déjà reçu un message ce jour
				if (day + '/' + month + '/' + year == $('.date_message_prive').eq(0).html()) {
					content = '<li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste" data-pseudo='+destinataire+' data-id='+id+'>'+
									destinataire+
								'</h3><p class="dernier_message">'+
								contenu+
								'</p><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></a></li>';
					//S'il n'y a qu'un seul élément entre les deux dates, on le remplace par content sinon on le supprime et on le replace en tête de liste		
					
					if ($('.list_divider').eq(0).next().next().find('.date_message_prive').length >0 || $(this).next().next().length ==0) {
						$('.content_list_divider').eq(0).replaceWith(content);
					}
					else {
						$(".content_list_divider").eq(destinataire_index).remove();
						$('.content_list_divider').eq(0).before(content);
					}
					
				}
				//Si le joueur n'a pas encore reçu de message aujourd'hui, on ajoute un list divider
				else {
					$(".content_list_divider").eq(destinataire_index).remove();
					content = '<li data-role="list-divider" class="list_divider"><div class="date_message_prive">'+
					day + '/' + month + '/' + year + '</div>'+
								'<span class="ui-li-count">0</span></li><li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste" data-pseudo='+destinataire+' data-id='+id+'>'+
									destinataire+
								'</h3><p class="dernier_message">'+
								contenu+
								'</p><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></a></li>';
					$('#liste_messages_persos').prepend(content);
				}
				//Si il n'y a plus de messages à une certaine date, on supprime le list divider en question
				$(".list_divider").each(function(i){
					if ($(this).next().find('.date_message_prive').length >0 || $(this).next().length ==0){
  					$(this).remove();
					}
				});
				
				
			}
			//On rafraichit la listview
			$('#liste_messages_persos').listview('refresh');
	};
	
	
	//conversion de datetime SQL en date js
	function dateObjectFromUTC(s) {
 		 s = s.split(/\D/);
  	return new Date(Date.UTC(+s[0], --s[1], +s[2], +s[3], +s[4], +s[5], 0));
	}
			
	$( "#liste_messages_persos" ).on('click', '.content_list_divider', function() {
		$('#tchat_perso').data("idDestinataire",$(this).find('.destinataire_liste').data('id'));
		$('#tchat_perso').data("pseudoDestinataire",$(this).find('.destinataire_liste').data('pseudo'));
		$('#titre_tchat_perso').html($(this).find('.destinataire_liste').data('pseudo'));
		$.mobile.changePage("#tchat_perso");
	});
	
	//Partie Chat société
	socket.on('nomSociete', function (nomSociete) {
		$('#tab_tchat_societe').text('Tchat avec : '+nomSociete);
	});
});

$(document).on("pageshow", "#chat", function() {
	hasscrolledchatglobal = false;
	var socket = io.connect('http://localhost:8080');
	var d= new Date();
	var d_passe = substractMinutes(d, 600)
	socket.emit('getNewPrivateMessages', idJoueur, d_passe.toMysqlFormat());
	
	//On retire nbminutes minutes de la date en entrée
	function substractMinutes(date, nbMinutes) {
    	return new Date(date.getTime() - nbMinutes*60000);
	}


});

//conversion datejs to datesql
Date.prototype.toMysqlFormat = function() {
   		return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

//function utilisée par toMysqlFormat
 twoDigits = function(d) {
		if(0 <= d && d < 10) return "0" + d.toString();
		if(-10 < d && d < 0) return "-0" + (-1*d).toString();
		return d.toString();
}

