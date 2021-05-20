// Dev
//const API_BASE_END_POINT = 'https://delugeonaluge.com/mobile-app/local/public';
//const MOBILE_URL = 'http://10.0.2.2:3000/Login'

// Prod
const API_BASE_END_POINT = 'https://delugeonaluge.com/mobile-app/dev/public';
const MOBILE_URL = 'https://twilio-for-zoho-crm-dev.herokuapp.com/Login'

export const environment = {
  API_BASE_END_POINT: API_BASE_END_POINT,
  ZOHO_LOGIN_REDIRECT_URI: `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.ALL,ZohoCRM.bulk.All,ZohoCRM.org.ALL,ZohoCRM.settings.ALL,ZohoCRM.settings.variables.ALL,ZohoCRM.modules.ALL&client_id=1000.WHF0S5ZXBUZFP4RN1AB1NYQR5H3YAT&response_type=code&access_type=offline&redirect_uri=${API_BASE_END_POINT}/api/zoho-auth`,
  MOBILE_LOGIN_URL: MOBILE_URL,
  PUSHER_BEAM_INSTANCE_ID: '4b5e942b-6a5e-4fb4-ac7f-de443b71c10e',
  PUSHER_ID: '0f860d00d0bd2d8f3e73'
};
