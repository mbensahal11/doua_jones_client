// JavaScript Document
$(document).on("pageshow", "#Entreprise", function() {
			
          //Champ désactivé lors du chargement de la page
              $( "#saisiedate" ).prop( "disabled", true );
              
              //Initialisation du datepicker lors du chargement de la page
              $('#saisiedate').datepicker("setDate", new Date());
        
              // Changement du label en fonction du click pour la date de validité, le clik sur Date rend abled la zone input, le datepicker peut apparaître sur click de l'utilisateur
  
              $("#validite input").on("click",function(event) { 
  
                  if(event.target.id == "radio-choice-2") {
                      $( "#saisiedate" ).prop( "disabled", false );
                      $( "#legendedate" ).text("Sélectionner la date");
                  } else {
                      $( "#legendedate" ).text('');
                      $( "#saisiedate" ).prop( "disabled", true );
                      if(event.target.id == "radio-choice-1") {
                          $('#saisiedate').datepicker("setDate", new Date());	
                      }
                      if(event.target.id == "radio-choice-3"){
                          $('#saisiedate').datepicker("setDate", new Date(1992,06,24));	
                      }
                  }
              });
              
			  //Gestion de l'affichage des champs en fonction du type d'ordre choisi 
			  
			  $("#selectordre").on("change",function() {
			//Ordre à cours limité
				   if ($(this).val() === '1') { 
					  $("#declenchement").hide();
					  $("#Prix").prop("disabled",false);
				  }
			//ordre au marché
				  if ($(this).val() === '2') { 
					  $("#declenchement").hide();
					  $("#Prix").prop("disabled",true);
				  }
			//Ordre à déclenchement
				  if ($(this).val() === '3') {
					  $("#declenchement").show();
					  $("#Prix").prop("disabled",true);

				  }
			//Ordre à la meilleure limite
				  if ($(this).val() === '4') { 
					  $("#declenchement").hide();
					  $("#Prix").prop("disabled",true);
				  }  
				});
			
			//Valeur selon le type de déclenchement
			$("#typedeclenchement input").on("click",function(event) { 				//seuil
				if (event.target.id=="radio-choice-h-2a") {
				$("#vplage").hide();
				$("#vplagelabel").hide();
				$("#vseuil").show();	
				$("#vseuillabel").show();
				}
				//plage
				if (event.target.id=="radio-choice-h-2b") {
				$("#vseuil").hide();
				$("#vseuillabel").hide();
				$("#vplage").show();
				$("#vplagelabel").show();					
				}					
			});
	
             
                 
              // Pas de texte dans des input nombres
              $(document).on("keypress","#Prix, #Nombre,#vplage, #vseuil",function (e){
                  var ev= e||window.event;
                  var k=ev.keyCode || ev.which; 
                  if ((k>57 || k<46) && (k!=8)) {
                      ev.returnValue=false; 
                      if (ev.preventDefault) 
                          ev.preventDefault(); 
                  }
              });	
                 
				 
              // Envoi et réinitialisation du formulaire
              
              $('#commentForm').submit(function(event) {
				  event.preventDefault();
				  event.stopImmediatePropagation();
                  if ( !$('#Prix').val()) {
                  	$('#requis').text('Il faut saisir un prix !');}
                  else {
					  
					 //On récupère l'index actif du type de date
					var radio_type_date = $("input:radio[name='radio-choice-type-date']");
					var index_type_date = radio_type_date.index(radio_type_date.filter(':checked'));
					
					//On récupère l'index actif du type de déclenchement
					var radio_type_declenchement = $("input:radio[name='radio-choice-type-declenchement']");
					var index_type_declenchement = radio_type_declenchement.index(radio_type_declenchement.filter(':checked'));
					
					var socket = io.connect('http://localhost:8080');
					//On envoie les données de l'ordre
					socket.emit('ordre',{
						entreprise:parseFloat($('#index_entreprise').text()),
						sens:parseFloat($('#select-custom-17').val()),
						type_ordre:parseFloat($('#selectordre').val()),
						prix:parseFloat($('#Prix').val()),
						nombre:parseFloat($('#Nombre').val()),
						type_declenchement: index_type_declenchement,
						seuil:parseFloat($('#vseuil').val()),
						plage_min:parseFloat($('#range-10a').val()),
						plage_max:parseFloat($('#range-10b').val()),
						type_date:index_type_date,
						date:$('#saisiedate').val()
						});
					
					//On remet le formulaire à zéro
					  var myselectun = $( "#select-custom-17" );
					  myselectun[0].selectedIndex = 0;
					  myselectun.selectmenu( "refresh" );
					  var myselectdeux = $( "#selectordre" );
					  myselectdeux[0].selectedIndex = 0;
					  myselectdeux.selectmenu( "refresh" );
					  $("#Prix").val('');
					  $('#requis').text('');
					  $('#Nombre').val(1).slider("refresh");
					  $("#validite input").prop("checked",false).checkboxradio("refresh");
					  $("#radio-choice-1").prop("checked",true).checkboxradio("refresh");
                  }
                  $('#saisiedate').datepicker("setDate", new Date()).datepicker("refresh");
				  
				  //On envoie le résultat par défaut de la fonction submit, on est passé par socket.io
				  return false;
				});		

  
}); 