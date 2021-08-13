
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-app-version.AppVersionPlugin",
          "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
          "pluginId": "cordova-plugin-app-version",
        "clobbers": [
          "cordova.getAppVersion"
        ]
        },
      {
          "id": "cordova-plugin-inappbrowser.inappbrowser",
          "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
          "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
          "cordova.InAppBrowser.open"
        ]
        },
      {
          "id": "cordova-plugin-android-permissions.Permissions",
          "file": "plugins/cordova-plugin-android-permissions/www/permissions.js",
          "pluginId": "cordova-plugin-android-permissions",
        "clobbers": [
          "cordova.plugins.permissions"
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
          "id": "cordova-plugin-telerik-imagepicker.ImagePicker",
          "file": "plugins/cordova-plugin-telerik-imagepicker/www/imagepicker.js",
          "pluginId": "cordova-plugin-telerik-imagepicker",
        "clobbers": [
          "plugins.imagePicker"
        ]
        },
      {
          "id": "cordova-plugin-twiliovoicesdk.CordovaCall",
          "file": "plugins/cordova-plugin-twiliovoicesdk/www/TwilioVoicePlugin.js",
          "pluginId": "cordova-plugin-twiliovoicesdk",
        "clobbers": [
          "TwilioPlugin.TwilioVoiceClient"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-android-permissions": "1.1.2",
      "cordova-plugin-app-version": "0.1.12",
      "cordova-plugin-device": "2.0.3",
      "cordova-plugin-inappbrowser": "4.1.0",
      "cordova-plugin-telerik-imagepicker": "2.3.5",
      "cordova-plugin-twiliovoicesdk": "5.6.1"
    };
    // BOTTOM OF METADATA
    });
    