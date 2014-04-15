// JavaScript Document

$(document).on("pageshow", "#boutique", function() { 

	$(document).on("change","#boutique_mod", function() {
		$("#image_item").hide();
		$("#prix_item").text('');
		
		$("#ajout").html("<label for='boutique_obj'>Objet</label>");
	    $('<select>').attr({'name':'boutique_obj','id':'boutique_obj','data-native-menu':'false'}).appendTo('#ajout');
		$('<option>').html('Choisis un objet').appendTo('#boutique_obj');

//liste des objets
		var	bmw= {name:"bmw",prix:"10000"};
		var	ford= {name:"ford",prix:"15000"};
		var	lexus= {name:"lexus",prix:"17000"};

		selectValues=[[bmw,ford,lexus],[bmw,ford,lexus]];
// Fin de la liste		

		$.each(selectValues[$(this).val()-1], function(key, value) {  
				$('#boutique_obj')
					 .append($("<option></option>")
					 .attr("value",key)	
					 .data("prix",value.prix)				 
					 .text(value.name)); 
			}); 
			$('#boutique_obj').selectmenu();
		
		$("#ajout").show();
	}); 

	$(document).on("change","#boutique_obj", function() {
		
		src="img/"+$('#boutique_obj option:selected').text()+".jpg";
		$("#image_item").prop("src",src).show();
	
		$("#prix_item").text($('#boutique_obj option:selected').data("prix"));
	
	});

	$(document).on("click","#acheter_item", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		//si le joueur ne se trouve pas à la BMC, il ne peut pas acheter d'items
		if ($('#bmcprofil').data("isAtBMC")) {
			
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