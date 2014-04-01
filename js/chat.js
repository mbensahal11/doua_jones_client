// JavaScript Document
$(document).on("pageshow", "#chat", function() {
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
	
	$('#send_chatmessage_form').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var mess = $('#message_input').val();
		if (mess != '') {
			socket.emit('setChatGlobalNewMessage', {
				idJoueur : 1,
				message: $('#message_input').val()
			});
		
			$('#div_champs_chat').append("<div class='line_droite'><img src='img/bulle_droite.png' alt='' class='fleche_bulle_droite'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + "j aime me battre" + "</font>" + "</b> </div> " + "<div class='message'>" + mess + "</div> </div>");
			$('#message_input').val('');
			
			$(document).scrollTop($(document).height());  
		}
			
		return false;
	});
	
	socket.on('Message', function (message) {
		var scrolleddown = true
		if ($(window).scrollTop() + $(window).height() != $(document).height() && hasscrolled==true) {
			scrolleddown = false;
		}
			
		$('#div_champs_chat').append("<div class='line_gauche'><img src='img/bulle_gauche.png' alt='' class='fleche_bulle_gauche'/><div class='pseudo'> <b>" + "<font color="+pseudo_color +">" + message.idJoueur + "</font>" + "</b> </div> " + "<div class='message'>" + message.message + "</div> </div>");
		
		if (scrolleddown) {
			$(document).scrollTop($(document).height());  
		}

	});
	
	$( window ).scroll(function() {
		hasscrolled = true;
	});
	
	$('#new_mail').click(function () {
		$('#popupmess').popup( "open" );
	});
	
	

});