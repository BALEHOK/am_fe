module.exports = {
	imageParams: 'w=165&h=95&mode=crop',

    getFileUrl(assetTypeId, assetId, attributeId) {
        return APIURL +
            `/FileHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    },

    getImageUrl(assetTypeId, assetId, attributeId) {
        return APIURL +
            `/ImageHandler.ashx?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}&${this.imageParams}`;
    },

    getInstantImageUrl(imageUrl) {
    	return APIURL + imageUrl + '?' + this.imageParams;
    },
}
