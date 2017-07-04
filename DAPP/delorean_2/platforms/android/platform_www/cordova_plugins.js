cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.phonegap.plugins.barcodescanner.BarcodeScanner",
        "file": "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
        "pluginId": "com.phonegap.plugins.barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "id": "net.yoik.cordova.plugins.screenorientation.screenorientation",
        "file": "plugins/net.yoik.cordova.plugins.screenorientation/www/screenorientation.js",
        "pluginId": "net.yoik.cordova.plugins.screenorientation",
        "clobbers": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "id": "net.yoik.cordova.plugins.screenorientation.screenorientation.android",
        "file": "plugins/net.yoik.cordova.plugins.screenorientation/www/screenorientation.android.js",
        "pluginId": "net.yoik.cordova.plugins.screenorientation",
        "merges": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-yanap.Yanap",
        "file": "plugins/cordova-plugin-yanap/www/Yanap.js",
        "pluginId": "cordova-plugin-yanap",
        "clobbers": [
            "cordova.plugins.Yanap"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-compat": "1.1.0",
    "com.phonegap.plugins.barcodescanner": "6.0.5",
    "net.yoik.cordova.plugins.screenorientation": "1.4.2",
    "cordova-plugin-statusbar": "2.2.4-dev",
    "nl.x-services.plugins.backgroundaudio": "1.0.1",
    "cordova-plugin-yanap": "0.8.9",
    "cordova-plugin-device": "1.1.6",
    "cordova-plugin-background-mode": "0.7.2"
};
// BOTTOM OF METADATA
});