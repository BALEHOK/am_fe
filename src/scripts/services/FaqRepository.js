import fetch from "../util/fetch";

export default class FaqRepository {

    loadFaq() {
        var url = `/api/faq`;
        return fetch(url).get();
    }

    loadFaqId() {
        var url = `/api/faq/assettype`;
        return fetch(url).get();
    }

}
