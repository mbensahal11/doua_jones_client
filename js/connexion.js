$(document).on("pageinit", "#connexion", function() { 

	var socket=io.connect(adresse_serveur);
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
		if ($('#connect_pseudo').val()!='' && $('#connect_mdp').val()!= '') {
			$("#envoi_conn").prop("disabled",true);
			
			var data= {pseudo: $('#connect_pseudo').val(), password: $('#connect_mdp').val()};
			
			socket.emit("connexionUtilisateur",data);
			$.mobile.loading( 'show', {
				text: "Veuillez patienter",
				textVisible: true,
				theme: "b",
			});
			localStorage.setItem(pseudo_localStorage, $('#connect_pseudo').val());
			localStorage.setItem(password_localStorage, $('#connect_mdp').val());
			$('#connect_pseudo').val('');
			$('#connect_mdp').val('');
		}
		else if ($('#connect_pseudo').val()=='') {
			alert('Veuillez entrer un pseudo');
		}
		else {
			alert('Veuillez entrer un mot de passe');
		}
		return false;
	});
	
	socket.on('resultConnexionUtilisateur', function(data) {
		if (data.connexionAccordee) {
			idJoueur = data.idJoueur;
			pseudo = data.pseudo;
			idSociete = data.idSociete;
			$.mobile.changePage("#Accueil_jeu");
		}
		else {alert(data.erreur);
			$("#envoi_conn").prop("disabled",false);
		}
		$.mobile.loading( 'hide' );
	});

	$(document).on("click","#retour_ins", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		$.mobile.changePage("#inscription");
		return false;
	});

	$('#connect_mdp, #connect_pseudo').bind('keypress', function (event) {
		var regex = new RegExp("^[a-zA-Z0-9]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			alert("Caractères spéciaux non autorisés");
			event.preventDefault();
			return false;
		}
	});
	
});


$(document).on("pageshow", "#connexion", function() { 
	var pseudo_localStorage = "pseudo_localStorage";
	var password_localStorage = "password_localStorage";
	var pseudo_joueur = localStorage.getItem(pseudo_localStorage);
	var password_joueur = localStorage.getItem(password_localStorage);
	if (pseudo_joueur != null && password_joueur!= null )  {
		$.mobile.loading( 'show', {
			text: 'Veuillez patienter...',
			textVisible: true,
			theme: 'a'
			});
		setTimeout(function(){
		$.mobile.loading( 'hide' );
		},10000);	
	}
});