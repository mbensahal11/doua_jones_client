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
              
              /*Plug-in Validate
              $("#commentForm").validate(); */
                 
              // Pas de texte dans des input nombres
              $(document).on("keypress","#Prix, #Nombre",function (e){
                  var ev= e||window.event;
                  var k=ev.keyCode || ev.which; 
                  if (k>57 || k<46) {
                      ev.returnValue=false; 
                      if (ev.preventDefault) 
                          ev.preventDefault(); 
                  }
              });	
                 
              // Envoi et réinitialisation du formulaire
              
              $('#commentForm').submit(function() {
                  if ( !$('#Prix').val()) {
                  	$('#requis').text('Il faut saisir un prix !');}
                  else {
					  var myselectun = $( "#select-custom-17" );
					  myselectun[0].selectedIndex = 0;
					  myselectun.selectmenu( "refresh" );
					  var myselectdeux = $( "#select-custom-18" );
					  myselectdeux[0].selectedIndex = 0;
					  myselectdeux.selectmenu( "refresh" );
					  $("#Prix").val('');
					  $('#requis').text();
					  $('#Nombre').val(1).slider("refresh");
					  $("#validite input").prop("checked",false).checkboxradio("refresh");
					  $("#radio-choice-1").prop("checked",true).checkboxradio("refresh");
                  }
                  $('#saisiedate').datepicker("setDate", new Date()).datepicker("refresh");
				  return false;
				});		
              

  
}); 