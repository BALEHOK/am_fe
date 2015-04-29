module.exports = {
    getFileUrl(assetTypeId, assetId, attributeId) {
        return BASE_URL +
            `/FileHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    }
}
