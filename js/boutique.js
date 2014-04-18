// JavaScript Document
//emit page show
$(document).on("pageinit", "#boutique", function() { 
	var socket=io.connect(adresse_serveur);
	var buyableObjects;

	socket.on ('resultGetBuyableObjects', function(data) {
		buyableObjects = data;
	});
	
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
	
		
		$(document).on("change","#boutique_obj", function() {
			src="img/"+$('#boutique_obj option:selected').text()+".jpg";
			$("#image_item").prop("src",src).show();
			$("#prix_item").text($('#boutique_obj option:selected').data("prix"));
			if (argentJoueur>=$('#boutique_obj option:selected').data("prix")) {
			$("#div_acheter_item").show(); 
			} else {
			$("#div_acheter_item").hide();
			}	
		});
		
	
	
		$(document).on("click","#acheter_item", function(event) {
			
			event.preventDefault();
			event.stopImmediatePropagation();
			//si le joueur ne se trouve pas à la BMC, il ne peut pas acheter d'items
			var argentDisp;
			argentDisp=argentJoueur;
			if ($('#bmcprofil').data("isAtBMC")) {
				if (argentDisp>=$('#boutique_obj option:selected').data("prix")) {
				$("#div_acheter_item").hide(); //empêcher d'acheter plusieurs fois
				var data={idObjet:$('#boutique_obj option:selected').data("idObjet"), idJoueur:idJoueur, type:"collection", prix:$('#boutique_obj option:selected').data("prix") };
				socket.emit('setBuyObject',data);
				argentDisp=argentDisp-$('#boutique_obj option:selected').data("prix");
$("#avoir").text(argentDisp);
				} 
				socket.emit('getArgentDisponibleJoueur',data.idJoueur);
				$.mobile.changePage("#boutique");
			}
				else {
					alert('Vous devez vous rendre à la BMC pour acheter un item');
				}
				return false;
		});			
	
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