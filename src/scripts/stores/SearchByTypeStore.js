import {Flux} from 'delorean';
import {always} from '../util/util';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
  assetTypes: [],
  assetAttributes: [],

  actions: {
    'searchByType:assetTypes': 'loadAssetTypes',
    'searchByType:assetAttributes': 'loadAssetAttributes'
  },

  initialize() {
    this.assetTypeRepo = new AssetTypeRepository();
  },

  loadAssetTypes() {
    always(
      this.assetTypeRepo.loadAssetTypes().then(
        (data) => {
          if (!data.activeTypes || !data.activeTypes.length){
            this.assetTypes = [];
            return;
          }

          var assetTypes = [];
          for (var i = 0; i < data.activeTypes.length; i++) {
            var type = data.activeTypes[i];
            var typeModel = {
              id: type.id,
              name: type.displayName
            }

            assetTypes.push(typeModel);
          };
          
          this.assetTypes = assetTypes;
        },
        () => {
          this.assetTypes = [];
        }
      ),
      () => this.emitChange());
  },

  loadAssetAttributes(typeId) {
    always(
      this.assetTypeRepo.loadAssetAttributes(typeId).then(
        (data) => {
          if (!data.attributes || !data.attributes.length){
            this.assetAttributes[typeId] = [];
            return;
          }

          var attributes = [];
          for (var i = 0; i < data.attributes.length; i++) {
            var attribute = data.attributes[i];

            /* server model
            {
              "id":17696,
              "displayName":"DynEntityUid",
              "dbName":"DynEntityUid",
              "displayOrder":0,
              "relationType":null,
              "relationId":0,
              "validationExpression":null,
              "calculationFormula":null,
              "screenFormula":null,
              "dataType":"long",
              "hasDatabaseFormula":false,
              "hasScreenFormula":false,
              "hasValidationExpression":false,
              "isHighlighted":false}
            */

            /* shown attributes
            <option selected="selected" value="17700">Name</option>
            <option value="17701">Revision</option>
            <option value="17702">Barcode</option>
            <option value="17703">Location</option>
            <option value="17704">Base Location</option>
            <option value="17705">Next Location</option>
            <option value="17706">Department</option>
            <option value="17707">User</option>
            <option value="17708">Owner</option>
            <option value="17709">Update User</option>
            <option value="17710">Update Date</option>
            <option value="17713">Document</option>
            <option value="17714">My attrib</option>
            */

            /* all attributes
            <option value="17696">DynEntityUid</option>
            <option value="17697">DynEntityId</option>
            <option value="17698">ActiveVersion</option>
            <option value="17699">DynEntityConfigUid</option>
            <option value="17700">Name</option>
            <option value="17701">Revision</option>
            <option value="17702">Barcode</option>
            <option value="17703">Location</option>
            <option value="17704">Base Location</option>
            <option value="17705">Next Location</option>
            <option value="17706">Department</option>
            <option value="17707">User</option>
            <option value="17708">Owner</option>
            <option value="17709">Update User</option>
            <option value="17710">Update Date</option>
            <option value="17711">Stock Count</option>
            <option value="17712">Stock Price</option>
            <option value="17713">Document</option>
            <option value="17714">My attrib</option>
            */

            var attributeModel = {
              id: attribute.id,
              name: attribute.displayName,
              dataType: attribute.dataType
            }

            attributes.push(attributeModel);
          };
          
          this.assetAttributes[typeId] = attributes;
        },
        () => {
          this.assetAttributes[typeId] = [];
        }
      ),
      () => this.emitChange());
  },

  getState() {
    return {
      assetTypes: this.assetTypes,
      assetAttributes: this.assetAttributes
    };
  }
});
