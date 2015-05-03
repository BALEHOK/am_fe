module.exports = {
	imageParams: 'w=165&h=95&mode=crop',

    getFileUrl(assetTypeId, assetId, attributeId) {
        return BASE_URL +
            `/FileHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    },

    getImageUrl(assetTypeId, assetId, attributeId) {
        return BASE_URL +
            `/ImageHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}&${this.imageParams}`;
    },

    getInstantImageUrl(imageUrl) {
    	return BASE_URL + imageUrl + '?' + this.imageParams;
    },
}
