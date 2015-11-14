import {Flux} from 'delorean';
import {always} from '../util/util';

import AssetTypeRepository from '../services/AssetTypeRepository';

export default Flux.createStore({
    searchModel: {},
    assetTypes: [],
    assetAttributes: {},
    dataTypeOperators: {},

    actions: {
        'searchByType:assetTypes': 'loadAssetTypes',
        'searchByType:assetAttributes': 'loadAssetAttributes',
        'searchByType:dataTypeOperators': 'loadDataTypeOperators'
    },

    initialize() {
        this.assetTypeRepo = new AssetTypeRepository();

        searchModel = {
            assetType: null,
            assetTypeContext: Consts.assetTypeContext.active,
            attributes: []
        };
    },

    // search model
    addRow = () => {
        var assetType = this.props.assetType;
        var allAttribs = this.state.stores.searchByType.assetAttributes;
        if (!assetType || !allAttribs[assetType.id]){
            return;
        }

        var selectedAttribs = this.state.attributes;
        var index = selectedAttribs.length;
        if (index != 0 && selectedAttribs[index - 1].parenthesis !== Consts.parenthesisType.open){
            selectedAttribs[index - 1].lo = Consts.logicalOperators.and;
        }

        var attribute = allAttribs[assetType.id][0];

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

        this.props.onChange();
    }

    addOpenParenthesis = () => {
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
    }

    addClosingParenthesis = () => {
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
    }

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
        if (!!this.dataTypeOperators[dataType]){
            this.emitChange();
        }

        always(
            this.assetTypeRepo.loadDataTypeOperators(dataType).then(
                (data) => {
                    if (!data || !data.length){
                        this.dataTypeOperators[dataType] = [];
                        return;
                    }
                    
                    this.dataTypeOperators[dataType] = data;
                },
                () => {
                    this.dataTypeOperators[dataType] = [];
                }
            ),
            () => this.emitChange()
        );
    },

    getState() {
        return {
            assetTypes: this.assetTypes,
            assetAttributes: this.assetAttributes,
            dataTypeOperators: this.dataTypeOperators
        };
    }
});
