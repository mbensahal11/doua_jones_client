$(document).on("pageinit", "#tutoriel", function() {
	var idPage = 1;
	$('#tutorielPrevious').click(previous);
	$( "#tutoriel" ).on( "swiperight", previous);
	$( "#tutoriel" ).on( "swipeleft",next); 
	$('#tutorielNext').click(next);
	
	function next (event){
		if (idPage !=45) {
			idPage += 1;
			document.getElementById('imgTutorielActive').setAttribute('src',"img/tutoriel/t"+idPage+".jpg");
			$('#pageTutoriel').text(idPage + '/45');
		}
		event.preventDefault();
		event.stopImmediatePropagation();
		
		return false;
	};
	
	function previous (event){
		event.preventDefault();
		event.stopImmediatePropagation();
		if (idPage !=1) {
			idPage -= 1;
			document.getElementById('imgTutorielActive').setAttribute('src',"img/tutoriel/t"+idPage+".jpg");
			$('#pageTutoriel').text(idPage + '/50');
			
		}
		return false;
	};

});