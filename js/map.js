// JavaScript Document


//On attend le chargement de la page avant de lancer la fonction d'initialisation
$(document).on("pageshow", "#map", function() {
	if ($("#map-canvas").html() === '') {
		initialize();
	}
	google.maps.event.trigger(map, "resize");
});

	
function initialize() {
	
	//le style de la carte
	var myStyles =[
    	{
        	featureType: "poi",
        	elementType: "labels",
        	stylers: [
       					{ visibility: "off" }
       				 ]
    	}
	];
	
	//Les options de la carte
	 mapOptions = {
    	zoom: 14,
    	center: new google.maps.LatLng(45.7840383, 4.8776921),
		styles : myStyles,
		streetViewControl: false
  		};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	 
	 // On définit les coordonnées de chaque zone
  		var GICoords = [
    		new google.maps.LatLng(45.78279609583433, 4.872613258335832),
			new google.maps.LatLng(45.78311783435683, 4.873997223942524),
			new google.maps.LatLng(45.78298309235994, 4.87404547752385),
			new google.maps.LatLng(45.78309725873358, 4.874528310388882),
			new google.maps.LatLng(45.78190573133237, 4.8750915652206),
			new google.maps.LatLng(45.78163633893279, 4.873903333536418),
			new google.maps.LatLng(45.782549131528334, 4.873530493392991),
			new google.maps.LatLng(45.78241448091351, 4.872795608335878)
  		];
  
  		var BMCCoords = [
     		new google.maps.LatLng(45.78274366611187, 4.8757513624575495),
			new google.maps.LatLng(45.78299812165077, 4.876979840367085),
			new google.maps.LatLng(45.78242574172158, 4.877205145924336),
			new google.maps.LatLng(45.78216757006048, 4.8760625389161305)
  		];
		
		var GENCoords = [
    		new google.maps.LatLng(45.783147752451555, 4.872468419049028),
			new google.maps.LatLng(45.783454524884284, 4.873868514155561),
			new google.maps.LatLng(45.78311783435683, 4.873997223942524),
			new google.maps.LatLng(45.78279609583433, 4.872613258335832)
  		];
		
		var TCCoords = [
    		new google.maps.LatLng(45.783880986774086, 4.872114367459062),
			new google.maps.LatLng(45.78416529952895, 4.873519844982866),
			new google.maps.LatLng(45.783454524884284, 4.873868514155561),
			new google.maps.LatLng(45.783147752451555, 4.872468419049028)
  		];
		
		var GECoords = [
    		new google.maps.LatLng(45.783574226649186, 4.870773262951616),
			new google.maps.LatLng(45.783880986774086, 4.872114367459062),
			new google.maps.LatLng(45.78291207043258, 4.872560950760203),
			new google.maps.LatLng(45.782624012725876, 4.871210454021366)
  		];
		
		var RotondeCoords = [
    		new google.maps.LatLng(45.78416529952895, 4.873519844982866),
			new google.maps.LatLng(45.784329910948536, 4.874276209925824),
			new google.maps.LatLng(45.78371639403171, 4.874544394581562),
			new google.maps.LatLng(45.783566744673855, 4.873820252392534)
  		];
		
		var EFICoords = [
    		new google.maps.LatLng(45.78483118425365, 4.870150990460161),
			new google.maps.LatLng(45.785324981272936, 4.872586436245683),
			new google.maps.LatLng(45.78408294347568, 4.873133526458787),
			new google.maps.LatLng(45.783574226649186, 4.870773262951616)
  		];
		
		var CBCoords = [
    		new google.maps.LatLng(45.785324981272936, 4.872586436245683),
			new google.maps.LatLng(45.78596841715052, 4.8753705512039005),
			new google.maps.LatLng(45.7846890397969, 4.875928414433247),
			new google.maps.LatLng(45.78408294347568, 4.873133526458787)
  		];
		
		var HumasCoords = [
    		new google.maps.LatLng(45.783566744673855, 4.873820252392534),
			new google.maps.LatLng(45.78409797238965, 4.876185942744428),
			new google.maps.LatLng(45.78349941689201, 4.876432669728047),
			new google.maps.LatLng(45.78298309235994, 4.87404547752385)
  		];
		
		var KfetCoords = [
    		new google.maps.LatLng(45.784329910948536, 4.874276209925824),
			new google.maps.LatLng(45.7846890397969, 4.875928414433247),
			new google.maps.LatLng(45.78409797238965, 4.876185942744428),
			new google.maps.LatLng(45.78371639403171, 4.874544394581562)
  		];
		
		var BSCoords = [
    		new google.maps.LatLng(45.78241448091351, 4.872795608335878),
			new google.maps.LatLng(45.782549131528334, 4.873530493392991),
			new google.maps.LatLng(45.78163633893279, 4.873903333536418),
			new google.maps.LatLng(45.781486661440596, 4.873197899475144)
  		];
		
		var IFCoords = [
    		new google.maps.LatLng(45.78254539047193, 4.872414694442796),
			new google.maps.LatLng(45.78260717301228, 4.8727044534423385),
			new google.maps.LatLng(45.781486661440596, 4.873197899475144),
			new google.maps.LatLng(45.78119485273164, 4.871829972877549),
			new google.maps.LatLng(45.781823427004845, 4.871561814402753),
			new google.maps.LatLng(45.78204789292776, 4.872634661762959)
  		];
		
		var BeurkCoords = [
    		new google.maps.LatLng(45.781398800019176, 4.872784919712785),
			new google.maps.LatLng(45.78162888921024, 4.873889971827566),
			new google.maps.LatLng(45.78067115486669, 4.874260080425984),
			new google.maps.LatLng(45.780454100687905, 4.873213992729234)
  		];
		
		var CDCoords = [
    		new google.maps.LatLng(45.78021471872471, 4.871931977246049),
			new google.maps.LatLng(45.78067115486669, 4.874260080425984),
			new google.maps.LatLng(45.77957871895478, 4.874716055958515),
			new google.maps.LatLng(45.7791745967048, 4.8724039656069635)
  		];
		
		var GCUCoords = [
    		new google.maps.LatLng(45.7846890397969, 4.875928414433247),
			new google.maps.LatLng(45.78492845760968, 4.876936961268484),
			new google.maps.LatLng(45.783746321846614, 4.877441180317646),
			new google.maps.LatLng(45.78349941689201, 4.876432669728047)
  		];
		
		var GMCCoords = [
    		new google.maps.LatLng(45.78309725873358, 4.874528310388882),
			new google.maps.LatLng(45.783574236610406, 4.876711655711233),
			new google.maps.LatLng(45.78299812165077, 4.876979840367085),
			new google.maps.LatLng(45.78274366611187, 4.8757513624575495),
			new google.maps.LatLng(45.78216757006048, 4.8760625389161305),
			new google.maps.LatLng(45.78190573133237, 4.8750915652206)
  		];
		
		var DirCoords = [
    		new google.maps.LatLng(45.783574236610406, 4.876711655711233),
			new google.maps.LatLng(45.78404559903309, 4.878857422923261),
			new google.maps.LatLng(45.78290456332772, 4.8793535822549075),
			new google.maps.LatLng(45.78242574172158, 4.877205145924336),
  		];
		
		var CapelleCoords = [
    		new google.maps.LatLng(45.78368645615884, 4.879002280209306),
			new google.maps.LatLng(45.78415782759384, 4.881003190135061),
			new google.maps.LatLng(45.783357258997576, 4.881378663151509),
			new google.maps.LatLng(45.78290456332772, 4.8793535822549075)
  		];
		
		var CDSCoords = [
    		new google.maps.LatLng(45.78596841715052, 4.8753705512039005),
			new google.maps.LatLng(45.78649961201979, 4.877752352809011),
			new google.maps.LatLng(45.78404559903309, 4.878857422923261),
			new google.maps.LatLng(45.783746321846614, 4.877441180317646),
			new google.maps.LatLng(45.78492845760968, 4.876936961268484),
			new google.maps.LatLng(45.7846890397969, 4.875928414433247)
  		];
		
		var GJCoords = [
    		new google.maps.LatLng(45.78649961201979, 4.877752352809011),
			new google.maps.LatLng(45.78675772102882, 4.879117606197269),
			new google.maps.LatLng(45.78460670204622, 4.880155589872857),
			new google.maps.LatLng(45.784711433870484, 4.8807805244670135),
			new google.maps.LatLng(45.78415782759384, 4.881003190135061),
			new google.maps.LatLng(45.78368645615884, 4.879002280209306)
  		];
		
		var GMDCoords = [
    		new google.maps.LatLng(45.785402604269905, 4.879750616524461),
			new google.maps.LatLng(45.78578137549828, 4.8815718184462185),
			new google.maps.LatLng(45.78441214639291, 4.882113562240875),
			new google.maps.LatLng(45.78415782759384, 4.881003190135061),
			new google.maps.LatLng(45.784711433870484, 4.8807805244670135),
			new google.maps.LatLng(45.78460670204622, 4.880155589872857)
  		];
		
		var TravCoords = [
    		new google.maps.LatLng(45.78415782759384, 4.881003190135061),
			new google.maps.LatLng(45.78441214639291, 4.882113562240875),
			new google.maps.LatLng(45.78421020088481, 4.882194072814855),
			new google.maps.LatLng(45.78441408202078, 4.883159658998807),
			new google.maps.LatLng(45.7837799906191, 4.883460057347065),
			new google.maps.LatLng(45.783357258997576, 4.881378663151509)
  		];
		
		var FermatCoords = [
    		new google.maps.LatLng(45.78531189818733, 4.881762255286276),
			new google.maps.LatLng(45.785541961267846, 4.8826929818144436),
			new google.maps.LatLng(45.78441408202078, 4.883159658998807),
			new google.maps.LatLng(45.78421020088481, 4.882194072814855)
  		];
		
		var batABCoords = [
    		new google.maps.LatLng(45.78519779154962, 4.882843203518632),
			new google.maps.LatLng(45.785394197284596, 4.883808780764639),
			new google.maps.LatLng(45.78396885117591, 4.884451117450794),
			new google.maps.LatLng(45.7837799906191, 4.883460057347065)
  		];
		
		
		var gymBCoords = [
    		new google.maps.LatLng(45.785541961267846, 4.8826929818144436),
			new google.maps.LatLng(45.78575512451616, 4.883639739170121),
			new google.maps.LatLng(45.785394197284596, 4.883808780764639),
			new google.maps.LatLng(45.78519779154962, 4.882843203518632)
  		];
		
		var SGMCoords = [
    		new google.maps.LatLng(45.782624012725876, 4.871210454021366),
			new google.maps.LatLng(45.78291207043258, 4.872560950760203),
			new google.maps.LatLng(45.78260717301228, 4.8727044534423385),
			new google.maps.LatLng(45.78254539047193, 4.872414694442796),
			new google.maps.LatLng(45.78204789292776, 4.872634661762959),
			new google.maps.LatLng(45.781823427004845, 4.871561814402753)
  		];


  		// On définit les zones
  		var GI = new google.maps.Polygon({
    		paths: GICoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
  
   		var BMC = new google.maps.Polygon({
    		paths: BMCCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var GEN = new google.maps.Polygon({
    		paths: GENCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var TC = new google.maps.Polygon({
    		paths: TCCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var GE = new google.maps.Polygon({
    		paths: GECoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Rotonde = new google.maps.Polygon({
    		paths: RotondeCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var EFI = new google.maps.Polygon({
    		paths: EFICoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var CB = new google.maps.Polygon({
    		paths: CBCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Humas = new google.maps.Polygon({
    		paths: HumasCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Kfet = new google.maps.Polygon({
    		paths: KfetCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var BS = new google.maps.Polygon({
    		paths: BSCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var IF = new google.maps.Polygon({
    		paths: IFCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Beurk = new google.maps.Polygon({
    		paths: BeurkCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var CD = new google.maps.Polygon({
    		paths: CDCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var GCU = new google.maps.Polygon({
    		paths: GCUCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var GMC = new google.maps.Polygon({
    		paths: GMCCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Dir = new google.maps.Polygon({
    		paths: DirCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Capelle = new google.maps.Polygon({
    		paths: CapelleCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var CDS = new google.maps.Polygon({
    		paths: CDSCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var GJ = new google.maps.Polygon({
    		paths: GJCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var GMD = new google.maps.Polygon({
    		paths: GMDCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Trav = new google.maps.Polygon({
    		paths: TravCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var Fermat = new google.maps.Polygon({
    		paths: FermatCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var batAB = new google.maps.Polygon({
    		paths: batABCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		
		var gymB = new google.maps.Polygon({
    		paths: gymBCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		var SGM = new google.maps.Polygon({
    		paths: SGMCoords,
    		strokeColor: '#00F12F',
    		strokeOpacity: 0.8,
    		strokeWeight: 2,
    		fillColor: '#10FF3F',
    		fillOpacity: 0.35
  		});
		
		
  		//On stocke toutes les entreprises dans un tableau d'objets possédant des informations propres aux zones
		var Entreprise = [];
		Entreprise[0] = {Objet :GI,
						 nom : "Total Logistics",
						 srcImage : 'img/carrefour.png',
						 //Coordonnées sud-ouest de l'image
						 swBound : new google.maps.LatLng(0, 0),
						 //Coordonnées nord est de l'image
						 neBound : new google.maps.LatLng(1, 1),
						 //On initialise l'image à null, on l'a crée ligne 789
						 bounds : null,
						 Overlay : null,
						 };
		Entreprise[1] = {Objet :BMC,
						 nom : "Banque Mondiale du Commerce",
						 srcImage : 'img/logoloreal.png',
						 swBound : new google.maps.LatLng(45.7823848, 4.8766084),
						 neBound : new google.maps.LatLng(45.7827290, 4.8769196),
						 bounds : null,
						 Overlay : null,
						 };
		Entreprise[2] = {Objet :GEN,
						 nom : "Green Energy & Co",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
		Entreprise[3] = {Objet :TC,
						 nom : "Blue Telecom",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
		Entreprise[4] = {Objet :GE,
						 nom : "Genius Electrics",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
		Entreprise[5] = {Objet :Rotonde,
						 nom : "Brodewei",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
		Entreprise[6] = {Objet :EFI,
						 nom : "Hill Tone",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[7] = {Objet :CB,
						 srcImage : 'img/BMC2.png',
						 nom : "Wilbedon & Co",
						 swBound : new google.maps.LatLng(45.7844124, 4.8739048),
						 neBound : new google.maps.LatLng(45.7854299, 4.8749133),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[8] = {Objet :Humas,
						 srcImage : 'img/BMC2.png',
						 nom : "Center Park",
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[9] = {Objet :Kfet,
						 srcImage : 'img/BMC2.png',
						 nom : "Club Made",
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[10] = {Objet :BS,
						 srcImage : 'img/BMC2.png',
						 nom : "Biotech",
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[11] = {Objet :IF,
						 srcImage : 'img/BMC2.png',
						 nom : "Banana IT",
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[12] = {Objet :Beurk,
						 srcImage : 'img/BMC2.png',
						 nom : "Miam Inc.",
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[13] = {Objet :CD,
						 nom : "Campanule",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[14] = {Objet :GCU,
						 nom : "Leonard Construction",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[15] = {Objet :GMC,
						 nom : "Mech. Enterprise",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[16] = {Objet :Dir,
						 Chemin : "Dir.html",
						 nom : "Doua Postal",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[17] = {Objet :Capelle,
						 nom : "Palais des Congrès",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[18] = {Objet :CDS,
						 nom : "Sports Center",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[19] = {Objet :GJ,
						 nom : "ORPIste",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[20] = {Objet :GMD,
						 nom : "Airboost",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[21] = {Objet :Trav,
						 nom : "Lion Formation",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 }; 
						 
		Entreprise[22] = {Objet :Fermat,
						 Chemin : "Fermat.html",
						 nom : "Ecole Multitechnique",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 }; 
						 
		Entreprise[23] = {Objet :batAB,
						 nom : "Formula One",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
						 
		Entreprise[24] = {Objet :gymB,
						 nom : "Badison Square Garden",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };
						 
		Entreprise[25] = {Objet :SGM,
						 nom : "The Material Company",
						 srcImage : 'img/BMC2.png',
						 swBound : new google.maps.LatLng(0, 0),
						 neBound : new google.maps.LatLng(1, 1),
						 bounds : null,
						 Overlay : null,
						 };

	 
	 
	//On charge la carte une fois à l'ouverture de la page 
	loadmap();
	
	
	//On simule la position du joueur à un point hors du campus pour qu'il puisse consulter la carte sans pouvoir réaliser de check-in
	var coordonnees_joueur = {
		latitude : 0,
		longitude : 0
	}
	
	var position_joueur = new google.maps.LatLng(coordonnees_joueur.latitude,coordonnees_joueur.longitude);

	//On actualise la position du joueur sans recharger toute la carte
	navigator.geolocation.watchPosition(onSuccess, onError),{maximumAge:600000, timeout:10000, enableHighAccuracy: true};
  
  	//géolocalisation : off
    function onError(error) {
		alert(' activer geolocalisation');		
 	} 
  
	var marker = new google.maps.Marker({
		clickable : false
	});
  	//géolocalisation : on
  	function onSuccess(position) { 
		coordonnees_joueur.latitude = position.coords.latitude;  	
		coordonnees_joueur.longitude = position.coords.longitude;
 		position_joueur = new google.maps.LatLng(coordonnees_joueur.latitude, coordonnees_joueur.longitude);
		marker.setMap(null);
		marker.setPosition(position_joueur);
		marker.setMap(map);
		setcircle();
	}

	//Distance à laquelle le joueur peut se localiser (rayon du cercle)
	var precision_metre = 30;
	
	var displaycurrentposition = new google.maps.Circle();
	
	//Lorsque l'on récupère la position du joueur on affiche le cercle
	function setcircle() {
		var position_options = {
	  		strokeColor: '#FF0000',
      		strokeOpacity: 0.8,
      		strokeWeight: 2,
      		fillColor: '#FF0000',
      		fillOpacity: 0.35,
      		map: map,
      		center: position_joueur,
      		radius: precision_metre,
			clickable : false
   	 	};
		//On efface l'ancien cercle pour ne pas surcharger la carte
		displaycurrentposition.setMap(null);
		displaycurrentposition = new google.maps.Circle(position_options);
		//Pn centre la carte sur le joueur
		map.panTo(position_joueur);
        map.setZoom(17);
	}
		
	//fonction appelé au chargement de la carte
	function loadmap() {

		//On affiche chaque entreprise ainsi que son image sur la carte 
		for (var i=0;i<Entreprise.length;i++) {
  			Entreprise[i].Objet.setMap(map);
			Entreprise[i].bounds = new google.maps.LatLngBounds(Entreprise[i].swBound, Entreprise[i].neBound);
			Entreprise[i].Overlay = new google.maps.GroundOverlay(Entreprise[i].srcImage,Entreprise[i].bounds);
			Entreprise[i].index = i;
			Entreprise[i].Overlay.setMap(map);
		};

		//fin loadmap()
	};
	
		//Fonction permettant de récupérer les coordonnées sur le cercle pour savoir si ce cerlce intersecte une autre zone
		function findCoordinates(pos, radius)
		{
   			 	// Combien de points décrivent le cercle? 
    			var numberOfPoints = 30;
    			var degreesPerPoint = 360 / numberOfPoints;

  			  	// Angle courrant (incrémenté de 0 à 360)
    			var currentAngle = 0;

   			 	// Coordonnées des points sur le cerlce
   			 	
    			//On sauvegarde les points dans un tableau
   			 	var points = new Array();

   			 	for(var i=0; i < numberOfPoints; i++) {
       			 	 

        			//On crée le point puis on l'ajoute dans le tableau    
					    
       			 	p = google.maps.geometry.spherical.computeOffset(pos, radius, currentAngle);
					points.push(p);
	
        			// On incrémente l'angle
        			currentAngle += degreesPerPoint;
   				 }
    			// On renvoie le tableau de points
    			return points;
			}
	
		//On vérifie si l'entreprise est accessible par le joueur
		function location_contained_or_edge (entreprise) {
			//On regarde s'il on se trouve dans la zone en question
			if (google.maps.geometry.poly.containsLocation(position_joueur,entreprise)) {
				return true;
			}
			// On regarde si le joueur ne se trouve pas à la BMC (check-in débloqué pour toutes les zones)
			else if (google.maps.geometry.poly.containsLocation(position_joueur,Entreprise[1].Objet)) {
				return true;
			}
			//On regarde si la zone n'est pas accessible via le cercle
	 		else {
					var points = findCoordinates(position_joueur,precision_metre); 
					var i = 0;
					var ok = false;
					var marker;
					while (i<points.length && !(ok)) {
						if (google.maps.geometry.poly.containsLocation(points[i],entreprise)) {
							ok = true
						}
						else {
							i = i+1;
						}
					}
					return ok;
			}
		}
		
		//On crée une infowindow permettant le check-in ou la demande d'informations
		var infowindow = new google.maps.InfoWindow();
		
		var content_infowindow
		

		function show_myInfowindow(entreprise,position) {
			infowindow.close(map);
			content_infowindow = '<div style="line-height:1.35;overflow:hidden;white-space:nowrap"><center class="departement"><b>'+entreprise.nom+'</b><br/></center><button id="checkin" >Check-in</button><button id="info">Informations</button></div>'
			$('#infowindow_content').html(content_infowindow);
			infowindow.setContent($('#infowindow_content').html());
			// Replace our Info Window's position
			infowindow.setPosition(position);
			
			//Si la zone est accessible par le joueur, on autorise le check-in
			infowindow.open(map);

			if (location_contained_or_edge(entreprise.Objet)) {
				document.getElementById('checkin').disabled = false;
			}
			
		} 
		
		
		// Lors d'un click sur une entreprise, on affiche l'infowindow et on écoute un click possible sur "informations" ou "checkin"
		google.maps.event.addListener(Entreprise[0].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[0],event.latLng);
			domlistener(Entreprise[0]);	
  		})
		
		google.maps.event.addListener(Entreprise[1].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[1],event.latLng);
			domlistener(Entreprise[1]);	
  		})
		
		google.maps.event.addListener(Entreprise[2].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[2],event.latLng);	
			domlistener(Entreprise[2]);	
  		})
		
		google.maps.event.addListener(Entreprise[3].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[3],event.latLng);	
			domlistener(Entreprise[3]);		
  		})
		
		google.maps.event.addListener(Entreprise[4].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[4],event.latLng);	
			domlistener(Entreprise[4]);	
  		})
		
		google.maps.event.addListener(Entreprise[5].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[5],event.latLng);	
			domlistener(Entreprise[5]);		
  		})
		
		google.maps.event.addListener(Entreprise[6].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[6],event.latLng);	
			domlistener(Entreprise[6]);	
  		})
		
		google.maps.event.addListener(Entreprise[7].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[7],event.latLng);	
			domlistener(Entreprise[7]);	
  		})
		
		google.maps.event.addListener(Entreprise[8].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[8],event.latLng);	
			domlistener(Entreprise[8]);		
  		})
		
		google.maps.event.addListener(Entreprise[9].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[9],event.latLng);	
			domlistener(Entreprise[9]);		
  		})
		
		google.maps.event.addListener(Entreprise[10].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[10],event.latLng);	
			domlistener(Entreprise[10]);		
  		})
		
		google.maps.event.addListener(Entreprise[11].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[11],event.latLng);	
			domlistener(Entreprise[11]);		
  		})
		
		google.maps.event.addListener(Entreprise[12].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[12],event.latLng);	
			domlistener(Entreprise[12]);		
  		})
		
		google.maps.event.addListener(Entreprise[13].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[13],event.latLng);	
			domlistener(Entreprise[13]);	
  		})
		
		google.maps.event.addListener(Entreprise[14].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[14],event.latLng);	
			domlistener(Entreprise[14]);		
  		})
		
		google.maps.event.addListener(Entreprise[15].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[15],event.latLng);	
			domlistener(Entreprise[15]);	
  		})
		
		google.maps.event.addListener(Entreprise[16].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[16],event.latLng);	
			domlistener(Entreprise[16]);		
  		})
		
		google.maps.event.addListener(Entreprise[17].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[17],event.latLng);	
			domlistener(Entreprise[17]);		
  		})
		
		google.maps.event.addListener(Entreprise[18].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[18],event.latLng);	
			domlistener(Entreprise[18]);	
  		})
		
		google.maps.event.addListener(Entreprise[19].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[19],event.latLng);	
			domlistener(Entreprise[19]);		
  		})
		
		google.maps.event.addListener(Entreprise[20].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[20],event.latLng);	
			domlistener(Entreprise[20]);	
  		})
		
		google.maps.event.addListener(Entreprise[21].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[21],event.latLng);	
			domlistener(Entreprise[21]);		
  		})
		
		google.maps.event.addListener(Entreprise[22].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[22],event.latLng);	
			domlistener(Entreprise[22]);	
  		})
		
		google.maps.event.addListener(Entreprise[23].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[23],event.latLng);	
			domlistener(Entreprise[23]);	
  		})
		
		google.maps.event.addListener(Entreprise[24].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[24],event.latLng);	
			domlistener(Entreprise[24]);		
  		})
		
		google.maps.event.addListener(Entreprise[25].Objet,'click', function(event) {
			show_myInfowindow(Entreprise[25],event.latLng);	
			domlistener(Entreprise[25]);		
  		})
		
		function domlistener(entreprise) {
			google.maps.event.addDomListener(document.getElementById('info'), 'click', function(){openinfo(entreprise)})
			google.maps.event.addDomListener(document.getElementById('checkin'), 'click', function(){checkin(entreprise)})	
		}
		var socket = io.connect('http://134.214.47.247:8080');
		function checkin(entreprise) {
			//On envoie les données du checkin
			socket.emit('setCheckin',{
			idEntreprise : entreprise.index,
			idJoueur : 1,
			});
			
		}
		socket.on('resultSetCheckin', function (result) {
			alert(result);
			});
			
		var ok_ordre = false
		function openinfo(entreprise) {
			//On charge l'image de l'entreprise sur la page de l'entreprise
			document.getElementById('image_entreprise').setAttribute('src',entreprise.srcImage)
			//On écrit le nom de l'entreprise dans le header
			$('#nom_entreprise').html(entreprise.nom);
			//On écrit le nom de l'entreprise dans le champ nom où il faut passer l'ordre
			$('#entreprise_active').html(entreprise.nom);
			$('#index_entreprise').html(entreprise.index);
			
			//On vérifie que l'on puisse bien passer un ordre
				ok_ordre = true;		
			if (document.getElementById('checkin').disabled == true) {				
				ok_ordre = false;
			}
			//On ferme l'infowindow	
			infowindow.close(map);
			//On affiche la page entreprise
			$.mobile.changePage("#Entreprise");
		}
		 	
			//On grise(respectivement dégrise) l'onglet passer un ordre si on est pas sur la zone
			$(document).on("pagebeforeshow", "#Entreprise", function() {
				if (ok_ordre==false) {	
				/*	$("#tabs").tabs("option", "disabled", [2]);*/
				}
				else {
					$( "#tabs" ).tabs( "enable", 2 );
				}
				
				//On affiche l'onglet profil par défaut
				var idx = $('#tabs a[href="#Profil"]').parent().index();
				$("#tabs").tabs( "option", "active", idx );
				
			});
	
//fin initialize
}