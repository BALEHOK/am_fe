import fetchival from "fetchival";
import _ from "underscore";
import LoginActions from "../actions/LoginActions";
import {store as LoginStore} from "../stores/LoginStore";

export default function fetch(url, options = {}) {
    let defOptions = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
    };
    if (LoginStore.access_token) {
        defOptions.headers['Authorization'] = 'Bearer ' + LoginStore.access_token;
    }
    return generate(APIURL + url, _.extend(defOptions, options));
}

function generate(url, options) {
    let target = {};
    let keys = ['post', 'delete', 'put', 'get', 'patch'].forEach((key) => {
        target[key] = function(data) {
            let args = [].slice.apply(arguments, []);
            if(typeof(data) === 'object') {
                if(key !== 'get') {
                    args.shift();
                    options.body = JSON.stringify(data);
                } else {
                  args.shift();
                  args.unshift(_.pick(data, prop => typeof(prop) !== 'undefined'));
                }
            }
            let request = fetchival(url, options);
            return request[key].apply(request, args)
              .catch((err) => {

                var status = err.response
                    ? err.response.status
                    : null;

               if (status === 401) {
                  LoginActions.authorize();
                }

                else {
                  throw err;
                }

              });
        }
    });
    return target;
}
