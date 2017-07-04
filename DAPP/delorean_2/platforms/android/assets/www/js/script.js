$(document).ready(init);

var text = [
	"Wat is het hier donker zeg! Is er een manier waarop wij iets meer zouden kunnen zien?",
	"Zouden de hieroglieven op de muur een betekenis hebben?",
	"Is dat een geheime tunnel in het altaar? Misschien kan je daar een oplossing vinden...",
	"Kijk eens aan! Je hebt weer een hieroglief gevonden!",
	"De deur gaat nog niet open! We moeten de fakkel in de hand van het standbeeld achterlaten..."
];

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);

	$("#hierogliefen").css("visibility", "visible");
	$("#scan-btn").css("visibility", "visible"); 
	$("#hints").css("visibility", "visible"); 

    $("#text").append("<p>"+ text[0] +"</p>");


    $("#scan-btn").on("click", function(){
		cordova.plugins.barcodeScanner.scan(

			    function (result) {

			    	var result = result.text;

			    	if(result == "Hieroglief") {
			    		$("#scan-btn").css("visibility", "hidden");
			    		$("#hierogliefen").css("visibility", "hidden");
			    		$("#hints").css("visibility", "hidden");
						$('#dagobert').attr("src", "img/hierogliefen/Hieroglief uv licht puzzel na scan.png");
						$("#text").empty();
						$("#text").append("<p>"+ text[3] +"</p>");

						setTimeout(function(){
							$("#text").empty();
							$("#text").append("<p>"+ text[4] +"</p>");
							$("#hierogliefen").css("visibility", "visible");
							$("#scan-btn").css("visibility", "visible"); 
							$("#hints").css("visibility", "visible"); 
							$('#dagobert').attr("src", "img/dagobert.png");
							$('#hieroflief-2').attr("src", "img/hierogliefen/Hieroglief%20uv%20licht%20puzzel%20verzameld%20.png");
						}, 2000);
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
    		$("#text").append("<p>"+ text[1] +"</p>");
    	}
    	if ($('#hint-1').attr("src") == "img/Gebruikte hintknop@1x.png") {
    		$("#text").empty();
    		$("#text").append("<p>"+ text[1] +"</p>");
    	}
    });

    setTimeout(function(){
    	$('#hint-2').attr("src", "img/Actieve hintknop@1x.png");
    }, 180000);

    $('#hint-2').on("click", function(){
    	if ($('#hint-2').attr("src") == "img/Actieve hintknop@1x.png") {
    		$('#hint-2').attr("src", "img/Gebruikte hintknop@1x.png");
    		$("#text").empty();
    		$("#text").append("<p>"+ text[2] +"</p>");
    	}
    	if ($('#hint-2').attr("src") == "img/Gebruikte hintknop@1x.png") {
    		$("#text").empty();
    		$("#text").append("<p>"+ text[2] +"</p>");
    	}
    });	

}

function onDeviceReady() {
 	window.screen.lockOrientation('landscape');
	StatusBar.hide();
}