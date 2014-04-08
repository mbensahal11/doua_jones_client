$(document).on("pagebeforeshow", "#tchat_perso", function() {
	//On efface la conversation
	$('#div_champs_messagerie').find('*').not('.chat_blank').remove();
});
	var idJoueur = 1;
	var pseudo= 'Quentin';
$(document).on("pageshow", "#tchat_perso", function() {

	var socket = io.connect('http://localhost:8080');
	
	socket.emit('getPrivateMessagesDestinataire', $('#tchat_perso').data("idDestinataire") ,idJoueur);
	

	$('#send_message_prive_form').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var mess = $('#message_prive_input').val();
		//Le message est envoyé s'il n'est pas vide
		if (mess != '') {
			socket.emit('setNewPrivateMessages', mess, $('#tchat_perso').data("idDestinataire"), idJoueur);
			socket.emit('pm', $('#tchat_perso').data("pseudoDestinataire"), mess);
		// On écrit le message côté client
			$('#div_champs_messagerie').append("<div class='line_droite'><img src='img/bulle_droite.png' alt='' class='fleche_bulle_droite'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + "j aime me battre" + "</font>" + "</b> </div> " + "<div class='message'>" + mess + "</div> </div>");
			//Le champs texte est remis à zéro
			$('#message_prive_input').val('');
			//On scroll vers le bas
			$(document).scrollTop($(document).height());  
		}
		return false;
	});
	
});

$(document).on("pageinit", "#tchat_perso", function() {
	var socket = io.connect('http://localhost:8080');
	socket.emit('adduser', pseudo);
	socket.on('updatechat', function (username, data) {
		if (username == $('#tchat_perso').data("pseudoDestinataire") ) {
			$('#div_champs_messagerie').append(data);
		}
	});
		
		
	socket.on('resultGetPrivateMessagesDestinataire', function(rows) {
		for (var i=0;i<rows.length;i++) {
			
		}
	});
});