import fetch from "../util/fetch";

export default class FaqRepository {
    
    loadFaq() {
        var url = `/api/Faq`;
        return fetch(url).get();
    }

}
