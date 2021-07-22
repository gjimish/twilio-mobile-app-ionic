
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
          "id": "cordova-plugin-telerik-imagepicker.ImagePicker",
          "file": "plugins/cordova-plugin-telerik-imagepicker/www/imagepicker.js",
          "pluginId": "cordova-plugin-telerik-imagepicker",
        "clobbers": [
          "plugins.imagePicker"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-app-version": "0.1.12",
      "cordova-plugin-inappbrowser": "4.1.0",
      "cordova-plugin-telerik-imagepicker": "2.3.5"
    };
    // BOTTOM OF METADATA
    });
    