import fetch from "../util/fetch";

export default class ContactRepository {

    sendMessage(data) {
        var url = `/api/Contacts`;
        return fetch(url, { responseAs: 'text' }).post({
             subject: data.subject,
             message: data.message,
        });
    }

}
