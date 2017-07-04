$(document).ready(init);


function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
 	window.screen.lockOrientation('landscape');
	StatusBar.hide();
}