$(document).ready(init);

var text = [
	"Deze farao lijkt wat lichaamsdelen te zijn verloren...",
	"De Egyptenaren bewaarden lichaamsdelen altijd in de potten die ook in deze kamer staan...",
	"Kijk eens aan! Je hebt weer een hieroglief gevonden!",
	"De deur gaat pas open als alle lichaamsdelen op de juiste plaats liggen..."
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
						$('#dagobert').attr("src", "img/hierogliefen/Hieroglief vormpuzzel na scan.png");
						$("#text").empty();
						$("#text").append("<p>"+ text[2] +"</p>");

						setTimeout(function(){
							$("#text").empty();
							$("#text").append("<p>"+ text[3] +"</p>");
							$("#hierogliefen").css("visibility", "visible");
							$("#scan-btn").css("visibility", "visible"); 
							$("#hints").css("visibility", "visible"); 
							$('#dagobert').attr("src", "img/dagobert.png");
							$('#hieroflief-4').attr("src", "img/hierogliefen/Hieroglief vormpuzzel verzameld.png");
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
    });

}

function onDeviceReady() {
 	window.screen.lockOrientation('landscape');
	StatusBar.hide();
}