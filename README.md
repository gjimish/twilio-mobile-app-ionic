# Twilio Mobile App Frontend
An Ionic mobile app for the Twilio for Zoho CRM extension

### To develop locally
Make sure you're using local/public url in environments/environment.js

```javascript
npm install
npm run dev
```

### Test on Android / ios locally
#### Prerequisites
```javascript
npm install -g @ionic/cli
ionic integrations enable capacitor
npm run build  TODO: this fails on well known script for windows
ionic capacitor add android
```
#### Test
```javascript
npx cap sync
ionic capacitor copy android
npx cap open android
```
If you have a virtual device set up, you should be able to hit the play button, if not, see the urls below

## Android Studio setup
https://ionicframework.com/docs/developing/android

## ios setup
https://ionicframework.com/docs/developing/ios