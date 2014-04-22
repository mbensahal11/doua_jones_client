// JavaScript Document
$(document).on("pageinit", "#notifications", function() { 
	var socket=io.connect(adresse_serveur);	

	$( "#notifications" ).on( "swiperight", (function(event){
		$.mobile.changePage('#Accueil_jeu',{
			transition: "slide",
			reverse:true
		});
	}));
	$(".collabsible_notifications").each(function(i) {
    	$(".collabsible_notifications").eq(i).attr("data-theme", "a");
	});
	socket.on("resultGetNotifications", function(rows) {
			$('#liste_notifications_message').empty();
			$('#liste_notifications_bmc').empty();
			$('#liste_notifications_ordre').empty();
			$('#liste_notifications_impot').empty();
			$('#liste_notifications_emprunt').empty();
		for (var i=rows.length-1;i>=0;i--) {
			
			var dateSQL = rows[i].date;
			var date = new Date(dateSQL);
			var type = rows[i].type;
			var contenu = rows[i].contenu;
	
			
			
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			if (day < 10) { day = "0" + day; };
			month += 1;
			if (month < 10) { month = "0" + month; };
			if (hour < 10) { hour = "0" + hour; };
			if (minute < 10) { minute = "0" + minute; };
			
			var content;
			if (type == "bmc") {
				if (day + '/' + month + '/' + year == $('.date_notifications_bmc').eq(0).html()) {
					content = '<li class="content_list_divider_notifications_bmc"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('.content_list_divider_notifications_bmc').eq(0).before(content);
				}
				else {
					content = '<li data-role="list-divider" class="list_divider_notifications_bmc"><div class="date_notifications_bmc">'+ day + '/' + month + '/' + year +'</div>'+'</li><li class="content_list_divider_notifications_bmc"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('#liste_notifications_bmc').prepend(content);
				}
				$("#collabsible_bmc").attr("data-theme", "b");
				$('#liste_notifications_bmc').listview('refresh');
			}
			else if (type == "message") {
				if (day + '/' + month + '/' + year == $('.date_notifications_message').eq(0).html()) {
					content = '<li class="content_list_divider_notifications_message"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('.content_list_divider_notifications_message').eq(0).before(content);
				}
				else {
					content = '<li data-role="list-divider" class="list_divider_notifications_message"><div class="date_notifications_message">'+ day + '/' + month + '/' + year +'</div>'+'</li><li class="content_list_divider_notifications_message"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('#liste_notifications_message').prepend(content);
				}
				$("#collabsible_messages").attr("data-theme", "b");
				$('#liste_notifications_message').listview('refresh');
			}
			else if (type == "ordre") {
				if (day + '/' + month + '/' + year == $('.date_notifications_ordre').eq(0).html()) {
					content = '<li class="content_list_divider_notifications_ordre"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('.content_list_divider_notifications_ordre').eq(0).before(content);
				}
				else {
					content = '<li data-role="list-divider" class="list_divider_notifications_ordre"><div class="date_notifications_ordre">'+ day + '/' + month + '/' + year +'</div>'+'</li><li class="content_list_divider_notifications_ordre"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('#liste_notifications_ordre').prepend(content);
				}
				$("#collabsible_ordres").attr("data-theme", "b");
				$('#liste_notifications_ordre').listview('refresh');
			}
			else if (type == "emprunt") {
				if (day + '/' + month + '/' + year == $('.date_notifications_emprunt').eq(0).html()) {
					content = '<li class="content_list_divider_notifications_emprunt"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('.content_list_divider_notifications_emprunt').eq(0).before(content);
				}
				else {
					content = '<li data-role="list-divider" class="list_divider_notifications_emprunt"><div class="date_notifications_emprunt">'+ day + '/' + month + '/' + year +'</div>'+'</li><li class="content_list_divider_notifications_emprunt"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('#liste_notifications_emprunt').prepend(content);
				}
				$("#collabsible_emprunts").attr("data-theme", "b");
				$('#liste_notifications_emprunt').listview('refresh');
			}
			else if (type == "impot") {
				if (day + '/' + month + '/' + year == $('.date_notifications_impot').eq(0).html()) {
					content = '<li class="content_list_divider_notifications_impot"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('.content_list_divider_notifications_impot').eq(0).before(content);
				}
				else {
					content = '<li data-role="list-divider" class="list_divider_notifications_impot"><div class="date_notifications_impot">'+ day + '/' + month + '/' + year +'</div>'+'</li><li class="content_list_divider_notifications_impot"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('#liste_notifications_impot').prepend(content);
				}
				$("#collabsible_impots").attr("data-theme", "b");
				$('#liste_notifications_impot').listview('refresh');
			}
			else if (type == "societe") {
				if (day + '/' + month + '/' + year == $('.date_notifications_societe').eq(0).html()) {
					content = '<li class="content_list_divider_notifications_societe"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('.content_list_divider_notifications_societe').eq(0).before(content);
				}
				else {
					content = '<li data-role="list-divider" class="list_divider_notifications_societe"><div class="date_notifications_societe">'+ day + '/' + month + '/' + year +'</div>'+'</li><li class="content_list_divider_notifications_societe"><div class="contenu_notif">'+contenu+'</div><p class="ui-li-aside"><strong>'+ hour+':'+ minute + '</strong></p></li>';
					$('#liste_notifications_societe').prepend(content);
				}
				$("#collabsible_societe").attr("data-theme", "b");
				$('#liste_notifications_societe').listview('refresh');
			}
		}
	});
	
});

$(document).on("pageshow", "#notifications", function() { 
	var socket=io.connect(adresse_serveur);	
	socket.emit("getNotifications", idJoueur);
});