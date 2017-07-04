$(document).ready(init);

var text = [
	"Dit ziet er uit alsof het allemaal door elkaar ligt...",
	"Volgens mij liggen de opgelichte stukken op de juiste plek...",
	"Liggen alle stukjes op de juiste plek? Wat is dat luikje daar in het open vlak?",
	"Kijk eens aan! Je hebt weer een hieroglief gevonden!",
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
						$('#dagobert').attr("src", "img/hierogliefen/Hieroglief schuifpuzzel na scan.png");
						$("#text").empty();
						$("#text").append("<p>"+ text[3] +"</p>");
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