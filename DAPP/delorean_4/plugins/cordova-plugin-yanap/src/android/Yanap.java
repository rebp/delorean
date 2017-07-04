package cordovaPluginYanap;

// -------------------------------
// ----------- Imports -----------
// -------------------------------

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URI;
import java.util.HashMap;

import android.util.Log;
import android.content.res.AssetFileDescriptor;
import android.os.ParcelFileDescriptor;

// -------------------------------
// ------ Class description ------
// -------------------------------

public class Yanap extends CordovaPlugin {

    // Log TAG definition
    public static final String TAG = Yanap.class.getSimpleName();

    // Url prefix used to indicate a file located in the package
    public static final String LOCAL_PATH_PREFIX = "file:///android_asset/";

    // States used by the players
    public enum STATE {
        NONE,     // LoopPlayer, MusicPlayer, SoundPlayer
        ERROR,    // LoopPlayer, MusicPlayer, SoundPlayer
        LOADING,  // LoopPlayer, MusicPlayer, SoundPlayer
        LOADED,   // LoopPlayer, MusicPlayer, SoundPlayer
        PLAYING,  // LoopPlayer, MusicPlayer
        LOOPING,  // LoopPlayer
        STOPPED,  // LoopPlayer, MusicPlayer
        RELEASED  // LoopPlayer, MusicPlayer, SoundPlayer
    };

    // We retain this callback to be able to emit messages to javascript at anytime
    private CallbackContext messageChannel;

    // Collections of players
    private HashMap<String, YanapPlayer> yanapPlayers;

    // -------------------------------
    // --------- Constructor ---------
    // -------------------------------

    public Yanap() {
        yanapPlayers = new HashMap<String, YanapPlayer>();
    }

    // -------------------------------
    // --- Javascript entry point ----
    // -------------------------------

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("createAudioInstance")) {
            createAudioInstance(args);
            callbackContext.success();
        } else if (action.equals("play") || action.equals("stop") || action.equals("release")) {
            String uid = args.getString(0);
            arglessExec(action, uid);
            callbackContext.success();
        } else if (action.equals("setVolume")) {
            setVolume(args);
            callbackContext.success();
        } else if (action.equals("messageChannel")) {
            messageChannel = callbackContext;
            // in this case we want to keep the callbackContext
        } else {
            return false;
        }
        return true;
    }

    // -------------------------------
    // ---- Audio object creation ----
    // -------------------------------

    private void createAudioInstance(JSONArray args) throws JSONException {
        String uid = args.getString(0);
        String audioType = args.getString(1);
        String filePath = args.getString(2);

        if (yanapPlayers.containsKey(uid)) {
            statusUpdate(uid, STATE.ERROR, "uid " + uid + " already exists");
            return;
        }

        AssetFileDescriptor afd;
        if (filePath.toLowerCase().startsWith(LOCAL_PATH_PREFIX)) { // apk relative path
            try {
                afd = cordova.getActivity().getApplicationContext().getAssets().openFd(filePath.substring(LOCAL_PATH_PREFIX.length()));
            } catch (java.io.IOException e) {
                statusUpdate(uid, STATE.ERROR, "unable to open file `" + filePath + "`");
                return;
            }
        } else {
            final File cacheFile;
            if (filePath.toLowerCase().startsWith("file://")) { // full absolute path
                cacheFile = new File(URI.create(filePath));
            } else { // application cache relative path
                cacheFile = new File(cordova.getActivity().getApplicationContext().getCacheDir(), filePath);
            }
            try {
                afd = new AssetFileDescriptor(ParcelFileDescriptor.open(cacheFile, ParcelFileDescriptor.MODE_READ_ONLY), 0, -1);
            } catch (java.io.FileNotFoundException e) {
                statusUpdate(uid, STATE.ERROR, "unable to open file `" + filePath + "` at `" + cacheFile.getAbsolutePath() + "`");
                return;
            }
        }

        YanapPlayer yanapPlayer = null;

        sendFileLength(uid, afd.getLength());

        if (audioType.equals("loop")) {
            yanapPlayer = new LoopPlayer(this, afd, uid, 1.0f);
        } else if (audioType.equals("music")) {
            yanapPlayer = new MusicPlayer(this, afd, uid, 1.0f);
        } else if (audioType.equals("sound")) {
            yanapPlayer = new SoundPlayer(this, afd, uid, 1, 1.0f);
        } else {
            statusUpdate(uid, STATE.ERROR, "unknown audioType `" + audioType + "`");
            return;
        }

        yanapPlayers.put(uid, yanapPlayer);
    }

    // -------------------------------
    // - Interface: ARG-LESS METHODS -
    // -------------------------------

    private void arglessExec(String method, String uid) throws JSONException {
        if (yanapPlayers.containsKey(uid)) {
            try {
                // retrieve and call the method
                Method m = IYanapPlayer.class.getMethod(method);
                m.invoke(yanapPlayers.get(uid));
            } catch (Exception e) {
                Log.e(TAG, "Exception " + e.getClass() + ". Most likely `" + method + "` method is unknown.");
            }
        } else {
            statusUpdate(uid, STATE.ERROR, "(" + method + ") audioInstance `" + uid + "` not found");
        }
    }

    // -------------------------------
    // ---- Interface: SET VOLUME ----
    // -------------------------------

    private void setVolume(JSONArray args) throws JSONException {
        String uid = args.getString(0);
        if (yanapPlayers.containsKey(uid)) {
            float volume1 = (float) args.getDouble(1);
            float volume2 = (float) args.getDouble(2);
            yanapPlayers.get(uid).setVolume(volume1, volume2);
        } else {
            statusUpdate(uid, STATE.ERROR, "(setVolume) audioInstance `" + uid + "` not found");
        }
    }

    // -------------------------------
    // ----- Native to JS events -----
    // -------------------------------

    // To transmit any message to javascript
    public void transmitToJs(JSONObject message) {
        if (messageChannel == null) { return; }
        PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, message);
        pluginResult.setKeepCallback(true); // we want to retain this callback forever
        messageChannel.sendPluginResult(pluginResult);
    }

    // Transmit an audio object status update to JS
    public void statusUpdate(String uid, Yanap.STATE state, String additionalInfo) {
        JSONObject message = new JSONObject();
        try {
            message.put("msgType", "statusUpdate");
            message.put("audioUid", uid);
            message.put("newStatus", state.toString());
            if (!additionalInfo.equals("")) {
                message.put("additionalInfo", additionalInfo);
            }
            transmitToJs(message);
        } catch (JSONException e) {
            Log.e(TAG, "Failed to create status details", e);
            return;
        }
    }

    // Transmit the file size to JS
    public void sendFileLength(String uid, long length) {
        JSONObject message = new JSONObject();
        try {
            message.put("msgType", "fileLength");
            message.put("audioUid", uid);
            message.put("fileLength", length);
            transmitToJs(message);
        } catch (JSONException e) {
            Log.e(TAG, "Failed to send file length", e);
            return;
        }
    }
}