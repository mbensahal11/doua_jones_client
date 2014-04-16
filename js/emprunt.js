// JavaScript Document
$(document).on("pageshow", "#emprunt", function() {

	var socket=io.connect(adresse_serveur);
	
	//remplacer le 1 par l'identifiant joueur
	socket.emit("getStatsEmprunt", idJoueur);
	
	
$(document).on("click", "#saisie_emprunt", function (event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	if (data.nbEmprunts>=data.nbEmpruntsMaximum) {
			alert("Nombre d'emprunts maximum atteint");
			$('#duree_emprunt').val(1).slider("refresh");
			$('#somme_emprunt').val(1).slider("refresh");			
	} else {
		var h={idJoueur: idJoueur, montant:$('#somme_emprunt').val(), duree:$('#duree_emprunt').val() };
		if ($('#bmcprofil').data("isAtBMC")) {
			socket.emit("setEmprunt", h);
		}
		else {
			alert('Vous devez vous rendre à la BMC pour effectuer un emprunt');
		}
		$('#duree_emprunt').val(1).slider("refresh");
		$('#somme_emprunt').val(1).slider("refresh");
	}
	return false;
});	


//Pas de lettres dans les zones de saisie
$(document).on("keypress","#duree_emprunt, #somme_emprunt",function (e){
	var ev= e||window.event;
	var k=ev.keyCode || ev.which;
	if ((k>57 || k<46) && (k!=8)) {
		ev.returnValue=false;
		if (ev.preventDefault) {
			ev.preventDefault();
		}
	}
 });	

});

$(document).on("pageinit", "#emprunt", function() {
	var socket=io.connect(adresse_serveur);
	socket.on("resultGetStatsEmprunt",function(data) {
	//informations contenues dans data data.
	$('#TEG').val(data.TEG); //valeur du cours
	var TEG_temp = $('#TEG').val()*100;
	var TEG=TEG_temp +' %';
	$('#TEG').val(TEG);
	$('#somme_emprunt').prop("max",data.empruntMaximum); //somme max empruntable

	});

});