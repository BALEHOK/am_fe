import {Flux} from 'delorean';
import {always} from '../util/util';
import Consts from '../components/search/byType/consts';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
    searchModel: {},
    assetTypes: [],
    assetAttributes: {},
    dataTypeOperators: {},

    actions: {
        'searchByType:addRow': 'addRow',
        'searchByType:setSearchModel': 'setSearchModel',
        'searchByType:assetTypes': 'loadAssetTypes',
        'searchByType:assetAttributes': 'loadAssetAttributes',
        'searchByType:dataTypeOperators': 'loadDataTypeOperators'
    },

    initialize() {
        this.assetTypeRepo = new AssetTypeRepository();

        this.searchModel = {
            assetType: null,
            assetTypeContext: Consts.assetTypeContext.active,
            attributes: []
        };
    },

    setSearchModel(modelDiff) {
        Object.assign(this.searchModel, modelDiff);
        this.emitChange();
    },

    // add another attribute row to a collection
    addRow(model) {
        var assetType = model.assetType;
        if (!assetType || !this.assetAttributes[assetType.id]){
            return;
        }

        var selectedAttribs = model.attributes;
        var index = selectedAttribs.length;
        if (index != 0 && selectedAttribs[index - 1].parenthesis !== Consts.parenthesisType.open){
            selectedAttribs[index - 1].lo = Consts.logicalOperators.and;
        }

        var attribute = this.assetAttributes[assetType.id][0];

        var selectedAttribModel = {
            index: index,
            parenthesis: Consts.parenthesisType.none,
            referenceAttrib: attribute,
            operators: [],
            operator: null,
            value: null,
            // logical operator
            lo: Consts.logicalOperators.none
        };

        this.setOperators(selectedAttribModel);

        selectedAttribs.push(selectedAttribModel);

        this.emitChange();
    },

    addOpenParenthesis() {
        var assetType = this.state.searchModel.assetType;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!assetType || !allAttribs[assetType.id]){
            return;
        }

        var selectedAttribs = this.state.searchModel.attributes;
        var index = selectedAttribs.length;

        if (index != 0 && selectedAttribs[index - 1].parenthesis !== Consts.parenthesisType.open){
            selectedAttribs[index - 1].lo = Consts.logicalOperators.and;
        }

        var selectedAttribModel = {
            index: index,
            parenthesis: Consts.parenthesisType.open,
            referenceAttrib: null,
            operators: null,
            operator: null,
            value: null,
            // logical operator
            lo: Consts.logicalOperators.none
        };

        selectedAttribs.push(selectedAttribModel);

        this.forceUpdate();
    },

    addClosingParenthesis() {
        var assetType = this.state.searchModel.assetType;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!assetType || !allAttribs[assetType.id]){
            return;
        }

        var index = this.state.searchModel.attributes.length;

        var selectedAttribModel = {
            index: index,
            parenthesis: Consts.parenthesisType.closing,
            referenceAttrib: null,
            operators: null,
            operator: null,
            value: null,
            // logical operator
            lo: Consts.logicalOperators.none
        };

        this.state.searchModel.attributes.push(selectedAttribModel);

        this.forceUpdate();
    },

    setOperators(selectedAttribute) {
        var dataTypeOperators = this.dataTypeOperators;
        var datatype = selectedAttribute.referenceAttrib.dataType;
        if (!setDataTypeOperators())
        {
            this.loadDataTypeOperators(datatype)
                .then(() => setDataTypeOperators())
                .then(() => this.emitChange());
        }

        function setDataTypeOperators() {
            var ops = dataTypeOperators[datatype];
            if (ops && ops.length){
                selectedAttribute.operators = ops;
                selectedAttribute.operator = ops[0].id;
                return true;
            }
            return false;
        }
    },

    // end search model

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
                    
                    this.assetAttributes[typeId] = data.attributes;
                },
                () => {
                    this.assetAttributes[typeId] = [];
                }
            ),
            () => this.emitChange()
      );
    },

    loadDataTypeOperators(dataType) {
        return this.assetTypeRepo.loadDataTypeOperators(dataType)
            .then(
                (data) => {
                    if (!data || !data.length){
                        this.dataTypeOperators[dataType] = [];
                        return;
                    }
                    
                    this.dataTypeOperators[dataType] = data;
                },
                () => {
                    this.dataTypeOperators[dataType] = [];
                });
    },

    getState() {
        return {
            searchModel: this.searchModel,
            assetTypes: this.assetTypes,
            assetAttributes: this.assetAttributes,
            dataTypeOperators: this.dataTypeOperators
        };
    }
});
