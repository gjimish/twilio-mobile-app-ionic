package io.pwa.twillo;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.firebase.messaging.RemoteMessage;
import com.pusher.beam.notification.PusherBeamNotification;
import com.pusher.pushnotifications.PushNotificationReceivedListener;
import com.pusher.pushnotifications.PushNotifications;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(PusherBeamNotification.class);
    }});
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
  }
}
