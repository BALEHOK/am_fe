import React from 'react/addons'
import { OidcClient , OidcTokenManager } from '../../libs/oidc/oidc'

export default class Login extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        var config = {
            authority: 'http://auth.am.local/core',
            client_id: 'AMSPA',
            redirect_uri: 'http://localhost:3000/login.html',
            post_logout_redirect_uri: 'http://localhost:3000/login.html',

            // these two will be done dynamically from the buttons clicked
            //response_type: "id_token token",
            //scope: "openid profile email read write",

            // we're not using these in this sample
            //silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/silent_renew.html",
            //silent_renew: true,

            // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app 
            // wouldn't care about them or want them taking up space
            filter_protocol_claims: false
        };

        var mgr = new OidcTokenManager(config);

        mgr.addOnTokenObtained(function () {
            console.log("token obtained");
        });
        mgr.addOnTokenRemoved(function () {
            display("#response", { message: "Logged Out" });
            showTokens();
        });

        showTokens();

        if (window.location.hash && window.location.hash.indexOf('access_token') != -1) {
            handleCallback();
        } else {
            authorize('openid profile webApi', 'id_token token');
        }

        function display(selector, data) {
            if (data && typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data) {
                data = JSON.stringify(data, null, 2);
            }
            console.log(selector, data);
        }

        function showTokens() {
            display("#id-token", mgr.profile || "");
            display("#access-token", mgr.access_token && { access_token: mgr.access_token, expires_in: mgr.expires_in } || "");
        }

        function handleCallback() {
            mgr.processTokenCallbackAsync().then(function () {
                var hash = window.location.hash.substr(1);
                var result = hash.split('&').reduce(function (result, item) {
                    var parts = item.split('=');
                    result[parts[0]] = parts[1];
                    return result;
                }, {});
                display("#response", result);

                showTokens();
            }, function (error) {
                display("#response", error.message && { error: error.message } || error);
            });
        }

        function authorize(scope, response_type) {
            config.scope = scope;
            config.response_type = response_type;
            mgr.redirectForToken();
        }

        [].forEach.call(document.querySelectorAll(".request"), function (button) {
            button.addEventListener("click", function () {
                authorize(this.dataset["scope"], this.dataset["type"]);
            });
        });
    }

    render() {
        return (
            <div className="auth-screen">
                Logging in...
            </div>
        );
    }
}
