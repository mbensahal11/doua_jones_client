$(document).on("pageshow", "#connexion", function() { 

// var socket=io.connect('http://192.168.0.50:8080');

$(document).on("click","#envoi_conn", function(){
	
	$("#envoi_conn").prop("disabled",true);
	
	var data= {pseudo: $('#connect_pseudo').val(), password: $('#connect_mdp').val()};
	
	socket.emit("connexionUtilisateur",data);
	
	});

	socket.on('resultConnexionUtilisateur', function(data) {
		if (data.connexionAccordee) {
			$.mobile.changePage("#Accueil_jeu");
		}
		else {alert(data.erreur);
			$("#envoi_conn").prop("disabled",false);
		}
	});

	$(document).on("click","#retour_ins", function() {
		event.preventDefault();
		event.stopImmediatePropagation();
		$.mobile.changePage("#inscription")
	});

});