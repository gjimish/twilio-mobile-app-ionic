import Foundation
import Capacitor
import PushNotifications

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(PusherBeamNotification)
public class PusherBeamNotification: CAPPlugin {
    let beamsClient = PushNotifications.shared

    @objc func clientInit(_ call: CAPPluginCall) {
        let value = call.getString("instanceId") ?? ""
        print("clientInit is called", value)
    }
    
    @objc func addDeviceInterest(_ call: CAPPluginCall) {
        let interestName = call.getString("interestName") ?? ""
        try? self.beamsClient.addDeviceInterest(interest: interestName)
    }
    
    @objc func addUser(_ call: CAPPluginCall) {
        let userId = call.getInt("userId") ?? 0
        let token = call.getString("token") ?? ""
        print("userId", userId)
        print("token", token)
        let tokenProvider = BeamsTokenProvider(authURL: "https://delugeonaluge.com/mobile-app/dev/public/api/pusher/beams-auth") { () -> AuthData in
          let sessionToken = token
          let headers = ["Authorization": "Bearer \(sessionToken)"] // Headers your auth endpoint needs
          let queryParams = ["user_id": String(userId)] // URL query params your auth endpoint needs
          return AuthData(headers: headers, queryParams: queryParams)
        }

        self.beamsClient.setUserId(String(userId), tokenProvider: tokenProvider, completion: { error in
          guard error == nil else {
              print(error.debugDescription)
              return
          }
          print("Successfully authenticated with Pusher Beams")
        })
    }
    
    @objc func clearState(_ call: CAPPluginCall) {
        try? self.beamsClient.clearAllState {
            print("Cleared all state!")
        }
    }
}
