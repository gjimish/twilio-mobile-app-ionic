#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(PusherBeamNotification, "PusherBeamNotification",
           CAP_PLUGIN_METHOD(clientInit, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addDeviceInterest, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addUser, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearState, CAPPluginReturnPromise);
)
