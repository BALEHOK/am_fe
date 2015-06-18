var Actions = require('./Actions');

class AssetActions extends Actions {

  loadAsset(params) {
    return this._dispatcher.loadAsset(params)
      .then(() => {

        var asset = this._dispatcher.getStore('asset').getState().asset;
        this._dispatcher.loadTaxonomyPath(asset.assetTypeId);

        if (asset.barcode) {
          this._dispatcher.loadBarcode(asset.barcode);
        }

        return this._dispatcher.loadRelatedAssets(params);
      });
  }

  returnToAsset(attrId, assetType) {
    let store = this._dispatcher.getStore('asset');
    let id = store.getState().asset.id;
    this.popAsset();
    this.setAttribute(attrId, id);
    let nwId = store.getState().asset.id;

    return this._dispatcher.loadRelatedAssets({
        assetTypeId: assetType,
        uid: id
    });
  }

  pushAsset() {
    return this._dispatcher.pushAsset();
  }

  popAsset() {
    return this._dispatcher.popAsset();
  }

  setAttribute(id, value) {
    return this._dispatcher.setAttribute(id, value);
  }

  loadRoles() {
    return this._dispatcher.loadRoles();
  }

  loadList(params) {
    return this._dispatcher.loadList(params);
  }

  loadHistory(params) {
    this._dispatcher.loadHistory(params)
  }

  loadAssetsList(params) {
    return this._dispatcher.loadAssetsList(params);
  }

  loadDynamicList(query) {
    return this._dispatcher.loadDynamicList(query);
  }

  loadSearchTracking(searchId) {
    return this._dispatcher.loadSearchTracking(searchId);
  }

  saveAsset(asset) {
    return this._dispatcher.getStore('asset').saveAsset(asset);
  }

  loadBarcode(params) {
    return this._dispatcher.loadBarcode(params);
  }

  generateBarcode(params) {
    return this._dispatcher.generateBarcode(params);
  }

  deleteAsset(params) {
    return this._dispatcher.deleteAsset(params);
  }

  restoreAsset(params) {
    return this._dispatcher.restoreAsset(params);
  }

  validateAttribute(params) {
    this._dispatcher.validateAttribute(params);
  }

  loadAssetTypes() {
    return this._dispatcher.loadAssetTypes();
  }
}

module.exports = AssetActions;
