class BarcodeRepository {
    generate() {
        return $.get('/api/barcode');
    }
}

module.exports = BarcodeRepository;
