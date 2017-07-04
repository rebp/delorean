$(document).ready(init);

var text = [
	"Wat is dit? kan het waar zijn? Schatzoekers? Ben ik dan niet helemaal alleen? Kom maar dichterbij dan kan ik me voorstellen.",
	"Hallo! Ik ben Dagobert Duck. Je vraagt je vast af hoe ik hier terecht ben gekomen. Net als jullie had ik gehoord dat hier de grootste schat die je je maar kunt voorstellen te vinden is! Maar het was een val! Zodat ik binnenstapte viel de deur dicht en stuurde de Farao zijn mummies op me af",
	"Maar ik wilde nog steeds de schat hebben. En ik kwam zo dichtbij! Ik was de mummies al helemaal vergeten en toen ineens, poef! Was ik er zelf &eacute;&eacute;n geworden... In plaats van dat de schat nu van mij is ben ik gedoemd om hem voor altijd te bewaken voor de kwaadaardige Farao.",
	"Jullie zijn heel dapper toch? Dan kunnen jullie me misschien wel helpen! Je moet wel snel je weg door de piramide vinden, want hoe langer je in de piramide blijft hoe groter de kans dat de mummies je vinden en je net als ik voor altijd vast komt te zitten!",
	"Ik heb de route al een keer doorlopen en kan jullie helpen om bij de schatkamer te komen. Eens zien waar we nu zijn...",
	"Dit is de grafkamer van de vrouw van de farao. Moet je eens zien wat een rijkdommen er zitten in dat graf!",
	"Zie ik daar cijfers op sommige objecten in het graf zitten?",
	"Heb je dat kistje al zien staan in de hoek? Zouden de cijfers op de objecten iets met het slot te maken hebben?",
	"Kijk eens aan! Je hebt een hieroglief gevonden! Misschien heb je deze later nog nodig... Vergeet niet de fakkel mee te nemen!"

];

var start = 0;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);

    $("#text").append("<p>"+ text[start] +"</p>");

    $("#doorgaanknop").on('click', function(){
    	$("#text").empty();
    	start++;
    	$("#text").append("<p>"+ text[start] +"</p>");

    	if(start == 5) {

    		$("#doorgaanknop").hide();  
    		$("#hierogliefen").css("visibility", "visible");
    		$("#scan-btn").css("visibility", "visible"); 
    		$("#hints").css("visibility", "visible"); 

		    $("#scan-btn").on("click", function(){
				cordova.plugins.barcodeScanner.scan(

					    function (result) {

					    	var result = result.text;

					    	if(result == "Hieroglief") {
					    		$("#scan-btn").hide();
					    		$("#hierogliefen").hide();
					    		$("#hints").hide();
								$('#dagobert').attr("src", "img/hierogliefen/Hieroglief grabbelpuzzel na scan.png");
								$("#text").empty();
								$("#text").append("<p>"+ text[8] +"</p>");
					    	}

						    },
						    function (error) {
						        alert("Scanning failed: " + error);
						    },
						    {
						        "preferFrontCamera" : false,
						        "showFlipCameraButton" : false,
						        "showTorchButton" : true,
						        "orientation" : "landscape"
						    }
					    );
				});

		    setTimeout(function(){
		    	$('#hint-1').attr("src", "img/Actieve hintknop@1x.png");
		    }, 60000);

		    $('#hint-1').on("click", function(){
		    	if ($('#hint-1').attr("src") == "img/Actieve hintknop@1x.png") {
		    		$('#hint-1').attr("src", "img/Gebruikte hintknop@1x.png");
		    		$("#text").empty();
		    		$("#text").append("<p>"+ text[6] +"</p>");
		    	}
		    	if ($('#hint-1').attr("src") == "img/Gebruikte hintknop@1x.png") {
		    		$("#text").empty();
		    		$("#text").append("<p>"+ text[6] +"</p>");
		    	}
		    });

		    setTimeout(function(){
		    	$('#hint-2').attr("src", "img/Actieve hintknop@1x.png");
		    }, 180000);

		    $('#hint-2').on("click", function(){
		    	if ($('#hint-2').attr("src") == "img/Actieve hintknop@1x.png") {
		    		$('#hint-2').attr("src", "img/Gebruikte hintknop@1x.png");
		    		$("#text").empty();
		    		$("#text").append("<p>"+ text[7] +"</p>");
		    	}
		    	if ($('#hint-2').attr("src") == "img/Gebruikte hintknop@1x.png") {
		    		$("#text").empty();
		    		$("#text").append("<p>"+ text[7] +"</p>");
		    	}
		    });	

    	}
    });

}

function onDeviceReady() {
 	window.screen.lockOrientation('landscape');
	StatusBar.hide();
}