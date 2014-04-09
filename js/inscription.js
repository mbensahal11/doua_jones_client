// JavaScript Document
	//on stocke les 3 input et le bt dans des variables pour récup leur valeur plus tard

$(document).on("pageshow", "#inscription", function() {

//	var socket = io.connect('http://192.168.0.50:8080');
	$(document).on("click", "#envoi_ins", function(){
		event.preventDefault();
		event.stopImmediatePropagation();
		if(!$('#mdp').val() || !$('#cmdp').val() || !$('#pseudo').val() || !$('#mail').val() ) {
			alert("Veuillez remplir tous les champs")
		}
		else if ($("#mdp").val()!=$("#cmdp").val()) {
			alert("Mot de passe saisi incorrect");
			$('#mdp').val('');
			$("#cmdp").val('');		
		}
		else {
			$("#envoi_ins").prop("disabled",true);
			var mail=$('#mail').val()+'@insa-lyon.fr';
			var data = {pseudo : $("#pseudo").val(), password : $("#mdp").val() , email : mail };
			socket.emit("inscription", data); 
		}
	});
	
	socket.on('resultInscription', function(data) {
		alert('Le serveur a un message pour vous : ' + data.erreur);
		$("#envoi_ins").prop("disabled",false);
		if (data.inscriptionAccordee) {
			$.mobile.changePage("#connexion");
		}
	});
	
	$(document).on("click", "#retour_conn", function(event){
		event.preventDefault();
		event.stopImmediatePropagation();		
		$.mobile.changePage("#connexion");
	});

});