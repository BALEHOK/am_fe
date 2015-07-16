import fetch from "../util/fetch";

export default class BarcodeRepository {
    generate() {
        return fetch('/api/barcode').get();
    }
}
