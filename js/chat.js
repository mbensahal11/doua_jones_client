// JavaScript Document
$(document).on("pageinit", "#chat", function() {
	var pseudo_color = "#032f55";
	var socket = io.connect('http://localhost:8080');
	
	//On initialise la page en disant qu'il n'y a pas eu de scroll
	var hasscrolled = false
	
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
				idJoueur : 1,
				message: $('#message_input').val()
			});
			// On écrit le message côté client
			$('#div_champs_chat').append("<div class='line_droite'><img src='img/bulle_droite.png' alt='' class='fleche_bulle_droite'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + "j aime me battre" + "</font>" + "</b> </div> " + "<div class='message'>" + mess + "</div> </div>");
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
		
		if ($(window).scrollTop() + $(window).height() != $(document).height() && hasscrolled==true) {
			scrolleddown = false;
		}
		//On écrit le message reçu
		$('#div_champs_chat').append("<div class='line_gauche'><img src='img/bulle_gauche.png' alt='' class='fleche_bulle_gauche'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + message.idJoueur + "</font>" + "</b> </div> " + "<div class='message'>" + message.message + "</div> </div>");
		
		//Si le joueur a remonté dans le fil de conversation, on ne fait pas un scroll automatique vers le bas
		if (scrolleddown) {
			$(document).scrollTop($(document).height());  
		}

	});
	
	//La variable hasscrolled est initialisé à false, si le joueur ne scrolle pas et qu'il reçois des messages, la page scrollera automatiquement
	$( window ).scroll(function() {
		hasscrolled = true;
	});
	
	
	//Onglet messagerie
	
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
			$('#destinataire').text(destinataire);
			//On stocke l'id du destinataire
			$('#destinataire').data("id_destinataire",id_destinataire);
			$('#destinataire_entre').val('');
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
			maj_tchat_prive(d,$("#destinataire").text(),$("#private_message").val());
			socket.emit("setNewPrivateMessages", $("#private_message").val(), $('#destinataire').data("id_destinataire"),2);
			
			//On ferme puis réinitialise la popup
			$('#popupmess').popup( "close" );
			$('#destinataire').data("id_destinataire","");
			$("#destinataire").html('');
			$("#private_message").val('');
			$('#destinataire_entre').val('');
		}
		
		return false;
		
	});
	
	
	var idJoueur = 1;
	socket.emit('getNewPrivateMessages', idJoueur);
	socket.on('resultGetNewPrivateMessages', function (rows) {
		for (var i=0;i<rows.length;i++) {
			destinataire=rows[i].pseudo;
			contenu=rows[i].contenu;
			var d = new Date();
			maj_tchat_prive(d,destinataire,contenu);
		}
	});
	
	
	
	function maj_tchat_prive (date, destinataire, contenu) {
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
					content = '<li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste">'+
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
								'<span class="ui-li-count">0</span></li><li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste">'+
									destinataire+
								'</h3><p class="dernier_message">'+
								contenu+
								'</p><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></a></li>';
					$('#liste_messages_persos').prepend(content);
				}
			}
			//si la conversation existe déjà
			else {
				$(".content_list_divider").eq(destinataire_index).remove();
				//Si le joueur a déjà reçu un message ce jour
				if (day + '/' + month + '/' + year == $('.date_message_prive').eq(0).html()) {
					content = '<li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste">'+
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
								'<span class="ui-li-count">0</span></li><li class="content_list_divider"><a href="#"><img src="img/logoloreal.png"><h3 class="destinataire_liste">'+
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
	function parse_date(string) {   
		var t = string.split(/[- :]/);
		var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);      
		return d;  
    }  
		
	

});

