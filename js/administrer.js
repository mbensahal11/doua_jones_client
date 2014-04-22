// JavaScript Document

var descriptionSociete;
var tableau=[];
var nbEntrepRecu=0;

$(document).on("pageshow", "#administrer", function() {
	var socket=io.connect(adresse_serveur);	
	var joueur={idJoueur: idJoueur};
	socket.emit('getEntrepriseSocieteMajoritaire',joueur);
	socket.emit('getInfosSocieteDuJoueur',joueur);

});

$(document).on("pageinit", "#administrer", function() {
	var socket=io.connect(adresse_serveur);	
	var joueur={idJoueur: idJoueur};	
	var vicepresident = false; 
	if (statutJoueur=="Vice-President") {
		vicepresident = true;
	}

	
	if (vicepresident==true) {
			
		$("#fixerCapacite").hide();
		$("#dissolutionSociete").hide();
		
	}
	
	//Renvoie les entreprises dans lesquelles les sociétés sont majoritaires (Le select s'affiche même si pas président ->erreur)
	socket.on('resultGetEntrepriseSocieteMajoritaire', function(data) {	

//Je mets toutes les entreprises dans un tableau
			if (data!=null) {
				tableau.push(data);
			}
			nbEntrepRecu++;
//Traitement des entreprises (création du select et du tableau)			
			if (nbEntrepRecu==26) {
				$("#fixerCapacite").append("<label for='majoritaire'>Fixer la capacité chez</label>");
				$('<select>').attr({'name':'majoritaire','id':'majoritaire','data-native-menu':'false'}).appendTo('#fixerCapacite');
				$('<option>').html("Choisis l'entreprise").appendTo('#majoritaire');
				for (var l=0; l<tableau.length; l++) {  
						$('#majoritaire')
							 .append($("<option></option>")
							 .attr("value",l)	
							 .text(tableau[l].nom_entreprise)
							 .data('idEntrep',tableau[l].idEntreprise));
					}; 
				$('#majoritaire').selectmenu();
				
				//Table
				for (var l=0; l<tableau.length;l++) {
					var capa=tableau[l];
					var ajout="<tr><td>"+capa.nom_entreprise+"</td><td>"+capa.capacitefixee+"</td></tr>"
					$('#table_capacite tbody tr:last').after(ajout);
				}
				$('#table_capacite').table("refresh");		
		
			} 
		
		
	});

	//Mise à jour de la description actuelle dans l'écran Administrer
	socket.on('resultGetInfosSocieteDuJoueur', function(data) {
	
		descriptionSociete=data.descriptionSociete;
		$('#choix_descriptionSociete').val(descriptionSociete);
	
	})
	
	//En cas de dissolution et de confirmation par le serveur , retour sur la page d'accueil du jeu
	socket.on('resultSetDissoudreSociete', function(data) {
		alert(data.message);
		if(data.erreur==false) {
			$.mobile.changePage("#profil_joueur", { allowSamePageTransition: true } );	
		}
	
	})
	
	//Modifie la capacite de l'entreprise
	$(document).on("click","#btn_modif_capa", function(event) {
				
		event.preventDefault();
		event.stopImmediatePropagation();
		var nouvelle=parseFloat($('#majoritaire option:selected').val())+1;
		
		//Change les données en local
		$('#table_capacite tbody tr:eq('+nouvelle+')').html("<td>"+tableau[nouvelle-1].nom_entreprise+"</td><td>"+$("#newCapacite").val()+"</td>");
		$('#table_capacite').table("refresh"); 
		
		//Envoie des données de changement de capacite		
		socket.emit('setDemandeChangerCapacite',idJoueur,$('#majoritaire option:selected').data('idEntrep'),$("#newCapacite").val());

		
	});

	//Modifier les infos de la société (que la description en fait..)
	$(document).on("click","#btn_modif_infoSociete", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		description=$('#choix_descriptionSociete').val();
		//Envoi des données de chgt de description
		socket.emit('setNewDescriptionSociete', joueur.idJoueur, description);
		alert('Description modifiée');
	});		


	//Dissoudre la société
	$(document).on("click","#dissoudreSociete", function(event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			socket.emit('setDissoudreSociete', joueur.idJoueur);
	});
	
	//En cas de choix d'une société pour laquelle on fixe la capacité, montrer la div de modification
	$(document).on("change","#majoritaire", function() {	
		$("#rangeCapacite").show();
	}); 
	
	//Interdire le caractère "
	jQuery("#choix_descriptionSociete").keyup(function(event)
		{
			name = jQuery("#choix_descriptionSociete").val();
			var reg=new RegExp('(")', "g");
			name = name.replace(reg,"'");
			jQuery("#choix_descriptionSociete").val(name);
		});
		

});

