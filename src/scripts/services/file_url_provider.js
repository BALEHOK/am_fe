module.exports = {
    getFileUrl(assetTypeId, assetId, attributeId) {
        return BASE_URL +
            `/FileHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    },

    getInstantFileUrl(fileId) {
    	return BASE_URL +
            `/FileHandler.ashx?fileId=${fileId}`;
    }
}
