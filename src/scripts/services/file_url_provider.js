module.exports = {
	imageParams: 'w=165&h=95&mode=crop',

    getFileUrl(assetTypeId, assetId, attributeId) {
        return `/api/files/?assetTypeId=${assetTypeId}&assetId=${assetId}&attributeId=${attributeId}`;
    },

    getImageUrl(filename) {
        return `${filename}?${this.imageParams}`;
    },

}
