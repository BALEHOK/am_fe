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
  if (LoginStore.access_token && url != '/token') {
      defOptions.headers['Authorization'] = 'Bearer ' + LoginStore.access_token;
  }
  return fetchival(APIURL + url, _.extend(defOptions, options));
}
