import fetch from "fetchival";

export default class BarcodeRepository {
    generate() {
        return fetch('/api/barcode').get();
    }
}
