$(document).on("pageinit", "#tutoriel", function() {
	var idPage = 1;
	$('#tutorielPrevious').click(function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		if (idPage !=1) {
			idPage -= 1;
			document.getElementById('imgTutorielActive').setAttribute('src',"img/tutoriel/t"+idPage+".jpg");
			$('#pageTutoriel').text(idPage + '/50');
			
		}
		return false;
	});
	
	$('#tutorielNext').click(function(event){
		if (idPage !=50) {
			idPage += 1;
			document.getElementById('imgTutorielActive').setAttribute('src',"img/tutoriel/t"+idPage+".jpg");
			$('#pageTutoriel').text(idPage + '/50');
		}
		event.preventDefault();
		event.stopImmediatePropagation();
		
		return false;
	});
});