// JavaScript Document
$(document).on("pageshow", "#emprunt", function() {

var socket=io.connect(adresse_serveur);

//remplacer le 1 par l'identifiant joueur	
socket.emit("getStatsEmprunt", idJoueur);

socket.on("resultGetStatsEmprunt",function(data) {
	//informations contenues dans data data.
	$('#TEG').val(data.TEG); //valeur du cours
	var TEG=$('#TEG').val()+'%';
	$('#TEG').val(TEG);
$('#somme_emprunt').prop("max",data.empruntMaximum); //somme max empruntable

});

	$(document).on("click", "#saisie_emprunt", function (event) 
	{
		var h={idJoueur: idJoueur, montant:$('#somme_emprunt').val(), duree:$('#duree_emprunt').val() };
		socket.emit("setEmprunt", h);
		event.preventDefault();
		event.stopImmediatePropagation();
		$('#duree_emprunt').val(1).slider("refresh");
		$('#somme_emprunt').val(1).slider("refresh");
	});	
	
	
	//Pas de lettres dans les zones de saisie
	$(document).on("keypress","#duree_emprunt, #somme_emprunt",function (e){
		var ev= e||window.event;
		var k=ev.keyCode || ev.which; 
		if ((k>57 || k<46) && (k!=8)) {
			ev.returnValue=false; 
		if (ev.preventDefault) 
			ev.preventDefault(); 
	  }
  });		
	
	
	
});
