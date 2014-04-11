// JavaScript Document
$(document).on("pageshow", "#Entreprise", function() {
			
			//Graphe page performance
			$(function() {
		
					
		var btGetCours = document.getElementById("btGetCours");

		var socket = io.connect('http://134.214.47.242:8080');

		socket.emit("getCoursEntreprise", $('#entreprise_active').data("id_entreprise"));

		var values;
	
		socket.on("resultGetCoursEntreprise", function(datas){
	
			values = [{ data: datas, label: "Cours", }];

			$.plot("#placeholder", values, {
				xaxis: {
					mode: "time",
					min: (new Date(currentYear,currentMonth,currentDay)).getTime(),
					max: (new Date(currentYear,currentMonth,currentDay+1)).getTime(),
				},
				lines: {fill:true},
				legend: {position:"nw", backgroundOpacity:0.3}		
				//	zoom: {interactive: true},
				//	pan: {interactive: true}
			});	
		});
			
		var currentMonth=(new Date()).getMonth() ;
		var currentDay=(new Date()).getDate();
		var currentYear=(new Date()).getFullYear();
				
		$("#today").click(function () {
			$.plot("#placeholder", values, {
				xaxis: {
					mode: "time",
					min: (new Date(currentYear,currentMonth,currentDay)).getTime(),
					max: (new Date(currentYear,currentMonth,currentDay+1)).getTime(),
				},
				lines: {fill:true},
				legend: {position:"nw", backgroundOpacity:0.3},
			});
		});

		
		$("#lastweek").click(function () {
			$.plot("#placeholder", values, {
				xaxis: {
					mode: "time",
					minTickSize: [1, "day"],
					min: (new Date(currentYear,currentMonth,currentDay-7)).getTime(),
					max: (new Date(currentYear,currentMonth,currentDay+1)).getTime(),
					timeformat: "%e/%m",
				//	dayNames: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"]
				},
				lines: {fill:true},
				legend: {position:"nw", backgroundOpacity:0.3},
			});
		});
		
		$("#lastmonth").click(function () {
			$.plot("#placeholder", values, {
				xaxis: {
					mode: "time",
					min: (new Date(currentYear, currentMonth-1, currentDay)).getTime(),
					max: (new Date(currentYear, currentMonth, currentDay)).getTime(),
				timeformat: "%e/%m",
				},
				lines: {fill:true},
				legend: {position:"nw", backgroundOpacity:0.3},
			});
		});

	});
			
			
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

					//On remet le formulaire à zéro lorsque l'on change de type d'ordre, sauf le sens de l'ordre et le type d'ordre
					  	//Prix
					  $("#Prix").val('');
					  	//Texte requis
					  $('#requis').text('');
					  	//Slider Nombre
					  $('#Nombre').val(1).slider("refresh");
					  	//Date de validite
					  $("#validite input").prop("checked",false).checkboxradio("refresh");
					  $("#radio-choice-1").prop("checked",true).checkboxradio("refresh");
					  //DatePicker
						$('#saisiedate').datepicker("setDate", new Date()).datepicker("refresh");
					//Type de déclenchement
					$("#typedeclenchement input").prop("checked",false).checkboxradio("refresh");
					$("#radio-choice-h-2a").prop("checked",true).checkboxradio("refresh");
					//Seuil qui réapparaît, Plage qui disparaît
					$("#vplage").hide();
					$("#vplagelabel").hide();
					$("#vseuil").show();	
					$("#vseuillabel").show();					
					//Valeur du seuil
					$('#vseuil').val('');
					//Texte seuil requis
					$('#seuilrequis').text('');
					//Initialiser la plage
					$('#range-10a').val(1).slider("refresh");
					$('#range-10b').val(100).slider("refresh");
				  
			//Ordre à cours limité
				   if ($(this).val() === 'cours_limite') { 
					  $("#declenchement").hide();
					  $("#Prix").prop("disabled",false);
				  }
			//ordre au marché
				  if ($(this).val() === 'au_marche') { 
					  $("#declenchement").hide();
					  $("#Prix").prop("disabled",true);
				  }
			//Ordre à déclenchement
				  if ($(this).val() === 'seuil_declenchement') {
					  $("#declenchement").show();
					  $("#Prix").prop("disabled",true);

				  }
			//Ordre à la meilleure limite
				  if ($(this).val() === 'meilleure_limite') { 
					  $("#declenchement").hide();
					  $("#Prix").prop("disabled",true);
				  }  
				});
			
			//Champs et valeurs selon le type de déclenchement
			$("#typedeclenchement input").on("click",function(event) { 								                //seuil
				if (event.target.id=="radio-choice-h-2a") {
				$("#vplage").hide();
				$("#vplagelabel").hide();
				$("#vseuil").show();	
				$("#vseuillabel").show();
				//On nettoie ce que le joueur a entré dans plage
				$('#range-10a').val(1).slider("refresh");
				$('#range-10b').val(100).slider("refresh");
				}
				//plage
				if (event.target.id=="radio-choice-h-2b") {
				$("#vseuil").hide();
				$("#vseuillabel").hide();
				$("#vplage").show();
				$("#vplagelabel").show();	
					//On nettoie ce que le joueur a entré dans seuil et le label saisir un seuil ! en cas d'oubli	
				$('#vseuil').val('');		
				$('#seuilrequis').text('');	
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
					var radio_type_date = $("input:radio[name='radio-choice-type-date']");
					var index_type_date = radio_type_date.index(radio_type_date.filter(':checked'));
					
					//On récupère l'index actif du type de déclenchement
					var radio_type_declenchement = $("input:radio[name='radio-choice-type-declenchement']");
					var index_type_declenchement = radio_type_declenchement.index(radio_type_declenchement.filter(':checked'));
					//On s'assure que le joueur ait rempli le champ prix (seul champ qui peut-être vide) en cas de choix de choix de l'ordre à cours limité
					if ( !$('#Prix').val() && $('#selectordre').val()==='cours_limite' ){
						$('#requis').text('Il faut saisir un prix !');
						}
					else if ( !$('#vseuil').val() && $('#selectordre').val()==='seuil_declenchement' && index_type_declenchement==0  ) {
						$('#seuilrequis').text('Il faut saisir le seuil !')
					}	
					else {	
					 
						 //On récupère la valeur de la borne inférieure ou du seuil que l'on nommera minimum (et de même pour la borne sup lors d'une vente)
						var minimum = $('#range-10a').val();
						var maximum = $('#range-10b').val();
						if ($('#selectordre').val() == 'seuil_declenchement') {
							//si c'est un seuil
							if (index_type_declenchement == 0) {
								//si c'est un achat	
								if ($('#select-custom-17').val() == 'achat') {
									minimum = parseFloat($('#vseuil').val());
									maximum = parseFloat($('#range-10b').val());
								}
								//si c'est une vente
								else {
									minimum = parseFloat($('#range-10a').val());
									maximum = parseFloat($('#vseuil').val());
								}
							}
	
						}
						
						//Si le prix est nul, on le fixe à zéro
						var prix_action
						if (!$('#Prix').val()) {
							prix_action = 0;
						}
						else {
							prix_action = parseFloat($('#Prix').val());
						}
						
						var socket = io.connect('http://localhost:8080');
						//On envoie les données de l'ordre
						socket.emit('setOrdre',{
							idJoueur:1,
							idEntreprise:parseFloat($('#entreprise_active').data("id_entreprise")),
							sens:$('#select-custom-17').val(),
							typeOrdre:$('#selectordre').val(),
							prix:prix_action,
							quantite:parseFloat($('#Nombre').val()),
							borneInf:minimum,
							borneSup:maximum,
							dateValidite:$('#saisiedate').val()
							});
						
						//On remet le formulaire à zéro après validation
							//Sens de l'ordre
						var myselectun = $( "#select-custom-17" );
						myselectun[0].selectedIndex = 0;
						myselectun.selectmenu( "refresh" );
							//Type de l'ordre
						var myselectdeux = $( "#selectordre" );
						myselectdeux[0].selectedIndex = 0;
						myselectdeux.selectmenu( "refresh" );
							//Valeur du prix
						$("#Prix").val('');
							//Texte requis
						$('#requis').text('');
							//Slider Nombre
						$('#Nombre').val(1).slider("refresh");
							//Date de validite
						$("#validite input").prop("checked",false).checkboxradio("refresh");
						$("#radio-choice-1").prop("checked",true).checkboxradio("refresh");
						  //DatePicker
						$('#saisiedate').datepicker("setDate", new Date()).datepicker("refresh");
						//Type de déclenchement
						$("#typedeclenchement input").prop("checked",false).checkboxradio("refresh");
						$("#radio-choice-h-2a").prop("checked",true).checkboxradio("refresh");
						//Valeur du seuil
						$('#vseuil').val('');
						//Initialiser la plage
						$('#range-10a').val(1).slider("refresh");
						$('#range-10b').val(100).slider("refresh");
						
						//Cacher la div déclenchement
						$('#declenchement').hide();
						
						//Prix able
						$("#Prix").prop("disabled",false);

				  }

				  //On envoie le résultat par défaut de la fonction submit, on est passé par socket.io
				  return false;
				});		

  
}); 