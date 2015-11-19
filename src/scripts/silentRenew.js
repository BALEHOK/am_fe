import { OidcTokenManager } from './libs/oidc/oidc';

var mgr = new OidcTokenManager();
mgr.processTokenCallbackSilent();