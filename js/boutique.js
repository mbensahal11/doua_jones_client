// JavaScript Document

$(document).on("pageinit", "#boutique", function() { 
	var socket=io.connect(adresse_serveur);
	var buyableObjects;

	//Renvoi les objets achetables par l'utilisateur
	socket.on ('resultGetBuyableObjects', function(data) {
		buyableObjects = data;
	});
	
		//Lorsque que 'lon change de module, la liste est mise à jour
		$(document).on("change","#boutique_mod", function() {
			$("#image_item").hide();
			$("#prix_item").text('');
			if (buyableObjects[($(this).val()-1)].length==0) {
				$("#ajout").text("Vous possédez tous les objets");	
				$("#div_acheter_item").hide(); 
			} else {
				$("#div_acheter_item").hide(); 
				$("#ajout").html("<label for='boutique_obj'>Objet</label>");
				$('<select>').attr({'name':'boutique_obj','id':'boutique_obj','data-native-menu':'false'}).appendTo('#ajout');
				$('<option>').html('Choisis un objet').appendTo('#boutique_obj');
				$.each(buyableObjects[$(this).val()-1], function(key, value) {  
					$('#boutique_obj')
						 .append($("<option></option>")
						 .attr("value",key)	
						 .data("prix",value.prix)				 
						 .text(value.nom)
						 .data("idObjet",value.idObjet));
				}); 
				$('#boutique_obj').selectmenu();
				$("#ajout").show(); 
			}
		}); 
	
		//Lorque le joueur séléctionne un objet dans le module, on affiche cet objet
		$(document).on("change","#boutique_obj", function() {
			src="img/boutique/"+$('#boutique_obj option:selected').text()+".png";
			$("#image_item").prop("src",src).show();
			$("#prix_item").text($('#boutique_obj option:selected').data("prix"));
			if (argentJoueur>=$('#boutique_obj option:selected').data("prix")) {
			$("#div_acheter_item").show(); 
			} else {
			$("#div_acheter_item").hide();
			}	
		});
		
	
		//On achète un item 
		$(document).on("click","#acheter_item", function(event) {
			
			event.preventDefault();
			event.stopImmediatePropagation();
			//si le joueur ne se trouve pas à la BMC, il ne peut pas acheter d'items
			var argentDisp;
			argentDisp=argentJoueur;
			if (argentDisp>=$('#boutique_obj option:selected').data("prix")) {
			$("#div_acheter_item").hide(); //empêcher d'acheter plusieurs fois
			var data={idObjet:$('#boutique_obj option:selected').data("idObjet"), idJoueur:idJoueur, type:"collection", prix:$('#boutique_obj option:selected').data("prix") };
			//On envoie la demande d'achat au serveur
			socket.emit('setBuyObject',data);
			argentDisp=argentDisp-$('#boutique_obj option:selected').data("prix");
$("#avoir").text(argentDisp);
			} 
			socket.emit('getArgentDisponibleJoueur',data.idJoueur);
			$.mobile.changePage("#boutique");

			return false;
		});			
	
	
		//On achète un atout (module atout caché dans le html car non fonctionnel)
		$(document).on("click","#acheter_atout", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		if ($('#bmcprofil').data("isAtBMC")) {
			
		}
		else {
			alert('Vous devez vous rendre à la BMC pour acheter un atout');
		}
		return false;
	});	


});

$(document).on("pageshow", "#boutique", function() { 
	var socket=io.connect(adresse_serveur);
	var data = {idJoueur : idJoueur};
	socket.emit('getArgentDisponibleJoueur',data.idJoueur);
	socket.emit('getBuyableObjects',data);
	
});