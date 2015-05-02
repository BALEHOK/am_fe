module.exports = {
    getFileUrl(assetTypeId, assetId, attributeId) {
        return BASE_URL +
            `/FileHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    },

    getImageUrl(assetTypeId, assetId, attributeId) {
        return BASE_URL +
            `/ImageHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    },

    getInstantImageUrl(fileId) {
    	return BASE_URL +
            `/ImageHandler.ashx?fileId=${fileId}`;
    }
}
