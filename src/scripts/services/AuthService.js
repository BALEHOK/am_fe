import { OidcClient , OidcTokenManager } from '../libs/oidc/oidc';

let _lastError = null;
class AuthService {
  constructor() {
    let domain = window.location.protocol + "//" + window.location.host;
    let config = {
      // Auth server settings
      authority: AUTHURL,
      client_id: 'AMSPA',
      redirect_uri: domain + '/authCallback.html',
      post_logout_redirect_uri: domain + '/',
      scope: 'openid profile webApi',
      response_type: 'id_token token',

      // we're not using these in this sample
      //silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/silent_renew.html",
      //silent_renew: true,

      // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app 
      // wouldn't care about them or want them taking up space
      filter_protocol_claims: true
    };

    this.mgr = new OidcTokenManager(config);
  }

  authorize() {
    this.mgr.redirectForToken();
  }

  handleCallback() {
    return this.mgr.processTokenCallbackAsync()
      .catch(function (error) {
        _lastError = error;
        throw error;
      });
  }

  logout() {
    this.mgr.redirectForLogout();
  }

  isLoggedIn() {
    return !this.mgr.expired;
  }

  get lastError() {
    return _lastError;
  }

  get accessToken() {
    return this.mgr.access_token;
  }

  get profile() {
    return this.mgr.profile;
  }
}

export default new AuthService()
