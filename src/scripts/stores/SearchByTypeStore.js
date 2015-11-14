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
        'searchByType:addOpenParenthesis': 'addOpenParenthesis',
        'searchByType:addClosingParenthesis': 'addClosingParenthesis',
        'searchByType:deleteRow': 'deleteRow',
        'searchByType:moveRowUp': 'moveRowUp',
        'searchByType:moveRowDown': 'moveRowDown',
        'searchByType:changeRow': 'changeRow',
        'searchByType:setSearchModel': 'setSearchModel',
        'searchByType:assetTypes': 'loadAssetTypes',
        'searchByType:assetAttributes': 'loadAssetAttributes'
    },

    initialize() {
        this.assetTypeRepo = new AssetTypeRepository();

        this.searchModel = {
            assetType: null,
            assetTypeContext: Consts.assetTypeContext.active,
            attributes: []
        };
    },

    // actions
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

    addOpenParenthesis(attributes) {
        var index = attributes.length;

        if (index != 0 && attributes[index - 1].parenthesis !== Consts.parenthesisType.open){
            attributes[index - 1].lo = Consts.logicalOperators.and;
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

        attributes.push(selectedAttribModel);

        this.emitChange();
    },

    addClosingParenthesis(attributes) {
        var index = attributes.length;

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

        attributes.push(selectedAttribModel);

        this.emitChange();
    },

    deleteRow(model) {
        var index = model.index;
        var attribs = model.attributes;
        
        attribs.splice(index, 1);

        if (attribs.length !== 0){
            this.updateRowIndexes(index, attribs);

            if (index > 0){
                this.fixLogicalOperator(index - 1, attribs);
            }
        }

        this.emitChange();
    },

    moveRowUp(model) {
        var index = model.index;
        
        if (index === 0){
            return;
        }

        var attribs = model.attributes;
        var prevIndex = index - 1;
        var prev = attribs[prevIndex];
        attribs[prevIndex] = attribs[index];
        attribs[index] = prev;

        this.updateRowIndexes(prevIndex, attribs);

        if (index > 1){
            this.fixLogicalOperator(index - 2, attribs);
        }
        this.fixLogicalOperator(index - 1, attribs);
        this.fixLogicalOperator(index, attribs);

        this.emitChange();
    },

    moveRowDown(model) {
        var index = model.index;
        var attribs = model.attributes;

        if (index === attribs.length - 1){
            return;
        }

        var nextIndex = index + 1;
        var next = attribs[nextIndex];
        attribs[nextIndex] = attribs[index];
        attribs[index] = next;

        this.updateRowIndexes(index, attribs);

        if (index > 0){
            this.fixLogicalOperator(index - 1, attribs);
        }
        this.fixLogicalOperator(index, attribs);
        this.fixLogicalOperator(index + 1, attribs);

        this.emitChange();
    },

    changeRow(model) {
        var attribute = model.attribute;

        model.attributes[attribute.index] = attribute;

        if (attribute.parenthesis === Consts.parenthesisType.none && !attribute.operators.length){
            this.setOperators(attribute);
        }

        this.emitChange();
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

    fixLogicalOperator(index, attribs){
        var curAttrib = attribs[index];
        // last row has no LO
        if (index === attribs.length - 1){
            curAttrib.lo = Consts.logicalOperators.none;
        }

        // open parenthesis never has LO, skip it
        else if (curAttrib.parenthesis !== Consts.parenthesisType.open){
            // no LO before closing parenthesis
            if (attribs[index + 1].parenthesis === Consts.parenthesisType.closing){
                curAttrib.lo = Consts.logicalOperators.none;
            }
            // ensure there is LO before not closing parenthesis
            else if (curAttrib.lo === Consts.logicalOperators.none){
                curAttrib.lo = Consts.logicalOperators.and;
            }
        }
    },

    updateRowIndexes(startFrom, attribs){
        for (var i = startFrom; i != attribs.length; i++){
            attribs[i].index = i;
        }
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
