import fetch from "../util/fetch";

export default class FaqRepository {

    loadFaq() {
        var url = `/api/faq`;
        return fetch(url).get();
    }

}
