package com.pusher.beam.notification;

import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.pusher.pushnotifications.BeamsCallback;
import com.pusher.pushnotifications.PushNotifications;
import com.pusher.pushnotifications.PushNotificationsInstance;
import com.pusher.pushnotifications.PusherCallbackError;
import com.pusher.pushnotifications.auth.AuthData;
import com.pusher.pushnotifications.auth.AuthDataGetter;
import com.pusher.pushnotifications.auth.BeamsTokenProvider;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NativePlugin
public class PusherBeamNotification extends Plugin {

    @PluginMethod
    public void clientInit(PluginCall call) {
        String instanceId = call.getString("instanceId");
        PushNotifications.start(this.getContext(), instanceId);
        Log.i("PusherBeams", "Init Successfully with Pusher Beams");
    }

    @PluginMethod
    public void addDeviceInterest(PluginCall call) {
        String interestName = call.getString("interestName");
        PushNotifications.addDeviceInterest(interestName);
    }

    @PluginMethod
    public void addUser(PluginCall call) {
        final int userId = call.getInt("userId");
        final String token = call.getString("token");
        Log.i("PusherBeams", "Pusher Beams params userId:" + userId);
        Log.i("PusherBeams", "Pusher Beams params token:" + token);
        BeamsTokenProvider tokenProvider = new BeamsTokenProvider(
                "https://delugeonaluge.com/mobile-app/dev/public/api/pusher/beams-auth",
                new AuthDataGetter() {
                    @Override
                    public AuthData getAuthData() {
                        HashMap<String, String> headers = new HashMap<>();
                        headers.put("Authorization", "Bearer " + token);
                        HashMap<String, String> queryParams = new HashMap<>();
                        queryParams.put("user_id", String.valueOf(userId));
                        return new AuthData(
                                headers,
                                queryParams
                        );
                    }
                }
        );
        try {
            PushNotifications.setUserId(String.valueOf(userId), tokenProvider, new BeamsCallback<Void, PusherCallbackError>() {
                @Override
                public void onSuccess(Void... values) {
                    Log.i("PusherBeams", "Successfully authenticated with Pusher Beams" + userId);
                }

                @Override
                public void onFailure(PusherCallbackError error) {
                    Log.i("PusherBeams", "Pusher Beams authentication failed: " + error.getMessage());
                }
            });
        } catch (Exception e) {
            Log.i("PusherBeams",  "Error while adding " + e.getMessage());
        }
    }

    @PluginMethod
    public void clearState(PluginCall call) {
        PushNotifications.clearAllState();
        Log.i("PusherBeams", "User state cleared");
    }
}
