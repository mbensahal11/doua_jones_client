$(document).on("pageinit", "#connexion", function() { 

	var socket=io.connect('http://134.214.47.242:8080');
	//A la connexion, si l'utilisateur  à les valeurs sauvegardées en local storage, on le connecte automatiquement
	var pseudo_localStorage = "pseudo_localStorage";
	var password_localStorage = "password_localStorage";
    var pseudo_joueur = localStorage.getItem(pseudo_localStorage);
	var password_joueur = localStorage.getItem(password_localStorage);
	if (pseudo_joueur != null && password_joueur!= null )  {
		var data= {pseudo: pseudo_joueur, password: password_joueur};
        socket.emit("connexionUtilisateur",data);
    }
	
	
	$(document).on("click","#envoi_conn", function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		$("#envoi_conn").prop("disabled",true);
		
		var data= {pseudo: $('#connect_pseudo').val(), password: $('#connect_mdp').val()};
		
		socket.emit("connexionUtilisateur",data);
		localStorage.setItem(pseudo_localStorage, $('#connect_pseudo').val());
		localStorage.setItem(password_localStorage, $('#connect_mdp').val());
		$('#connect_pseudo').val('');
		$('#connect_mdp').val('');
		return false;
	});
	
	socket.on('resultConnexionUtilisateur', function(data) {
		if (data.connexionAccordee) {
			$.mobile.changePage("#Accueil_jeu");
		}
		else {alert(data.erreur);
			$("#envoi_conn").prop("disabled",false);
		}
	});

	$(document).on("click","#retour_ins", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$.mobile.changePage("#inscription");
		return false;
	});

});