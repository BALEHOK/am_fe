//https://github.com/DanialK/advanced-security-in-backbone/blob/master/public/scripts/Session.js
export class SessionModel extends Backbone.Model {

    private supportStorage: boolean;
    constructor() {
        super();
        this.url = '/api/auth';

        //Ajax Request Configuration
        //To Set The CSRF Token To Request Header
        //$.ajaxSetup({
        //    headers: {
        //        'X-CSRF-Token': csrf
        //    }
        //});

        //Check for sessionStorage support
        if (Storage && sessionStorage) {
            this.supportStorage = true;
        }
    }

    get(key) {
        if (this.supportStorage) {
            var data = sessionStorage.getItem(key);
            if (data && data[0] === '{') {
                return JSON.parse(data);
            } else {
                return data;
            }
        } else {
            return super.get.call(this, key);
        }
    }

    set(key, value) {
        if (this.supportStorage) {
            sessionStorage.setItem(key, value);
        } else {
            super.set.call(this, key, value);
        }
        return this;
    }

    unset(key) {
        if (this.supportStorage) {
            sessionStorage.removeItem(key);
        } else {
            super.unset.call(this, key);
        }
        return this;
    }

    clear() {
        if (this.supportStorage) {
            sessionStorage.clear();
        } else {
            super.clear(this);
        }
    }

    public getAuth(callback) {
        var that = this;
        var Session = this.fetch();
        Session.done(response => {
            this.set('authenticated', true);
            this.set('user', JSON.stringify(response.user));
        });
        Session.fail(response => {
            response = JSON.parse(response.responseText);
            that.clear();
            //csrf = response.csrf !== csrf ? response.csrf : csrf;
            that.initialize();
        });
        Session.always(callback);
    }
}