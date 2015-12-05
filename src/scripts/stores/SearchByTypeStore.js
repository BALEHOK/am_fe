import {Flux} from 'delorean';
import {always} from '../util/util';
import Consts from '../util/searchConsts';
import appRouter from '../appRouter';

import AssetTypeRepository from '../services/AssetTypeRepository';
import SearchModelRepository from '../services/SearchModelRepository';

export default Flux.createStore({
    searchModel: null,
    assetTypes: [],
    assetAttributes: {},
    dataTypeOperators: {},

    actions: {
        'searchByType:initTypeSearch': 'initTypeSearch',
        'searchByType:setContext': 'setContext',
        'searchByType:chooseAssetType': 'chooseAssetType',
        'searchByType:addRow': 'addRow',
        'searchByType:addOpenParenthesis': 'addOpenParenthesis',
        'searchByType:addClosingParenthesis': 'addClosingParenthesis',
        'searchByType:deleteRow': 'deleteRow',
        'searchByType:moveRowUp': 'moveRowUp',
        'searchByType:moveRowDown': 'moveRowDown',
        'searchByType:changeRow': 'changeRow',
        'searchByType:ensureAttributesLoaded': 'ensureAttributesLoaded'
    },

    initialize() {
        this.assetTypeRepo = new AssetTypeRepository();
        this.searchModelRepo = SearchModelRepository;
    },

    // actions
    initTypeSearch(searchId){
        var assetTypesPromise = this.loadAssetTypes();
        var searchModelPromise = this.getTypeSearchModel(searchId);

        Promise.all([assetTypesPromise, searchModelPromise]).then(() => this.emitChange());
    },

    setContext(context) {
        this.searchModel.assetTypeContext = context;

        this.emitChange();
    },

    chooseAssetType(assetType) {
        this.searchModel.assetType = assetType;
        this.searchModel.attributes = [];

        if (assetType && assetType.id){
            if (!this.assetAttributes[assetType.id]){
                this.loadAssetAttributes(assetType.id)
                    .then(() => this.emitChange());
                return;
            }
        }

        this.emitChange();
    },

    // add another attribute row to a collection
    addRow(model) {
        var assetTypeId = model.assetTypeId;
        if (!assetTypeId || !this.assetAttributes[assetTypeId]){
            return;
        }

        var selectedAttribs = model.attributes;
        var index = selectedAttribs.length;
        if (index != 0 && selectedAttribs[index - 1].parenthesis !== Consts.parenthesisType.open){
            selectedAttribs[index - 1].lo = Consts.logicalOperators.and;
        }

        var attribute = this.assetAttributes[assetTypeId][0];

        var selectedAttribModel = this.createNewAttribModel({
            index: index,
            referenceAttrib: attribute,
            operators: [],
            complexValue: []
        });

        this.setOperators(selectedAttribModel);

        selectedAttribs.push(selectedAttribModel);

        this.emitChange();
    },

    addOpenParenthesis(attributes) {
        var index = attributes.length;

        if (index != 0 && attributes[index - 1].parenthesis !== Consts.parenthesisType.open){
            attributes[index - 1].lo = Consts.logicalOperators.and;
        }

        var selectedAttribModel = this.createNewAttribModel({
            index: index,
            parenthesis: Consts.parenthesisType.open
        });

        attributes.push(selectedAttribModel);

        this.emitChange();
    },

    addClosingParenthesis(attributes) {
        var index = attributes.length;

        var selectedAttribModel = this.createNewAttribModel({
            index: index,
            parenthesis: Consts.parenthesisType.closing
        });

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

    ensureAttributesLoaded(typeId){
        if (!this.assetAttributes[typeId]){
            this.assetAttributes[typeId] = [];
            this.loadAssetAttributes(typeId)
                .then(() => this.emitChange());
        }
    },

    // end actions

    createNewAttribModel(initializer){
        return Object.assign({
            index: 0,
            parenthesis: Consts.parenthesisType.none,
            referenceAttrib: null,
            operators: null,
            operator: null,
            value: null,
            useComplexValue: false,
            complexValue: null,
            // logical operator
            lo: Consts.logicalOperators.none
        }, initializer);
    },

    loadAssetAttributes(typeId) {
        var attributes, relatedAttributes;

        var loadAttributes = this.assetTypeRepo.loadAssetAttributes(typeId)
            .then(
                (data) => {
                    if (!data.attributes || !data.attributes.length){
                        attributes = [];
                        return;
                    }
                    
                    attributes = data.attributes.filter(a => a.dataType !== 'assets');
                },
                () => attributes = []
            );

        var loadRelatedAttributes = this.assetTypeRepo.loadChildAssetTypes(typeId)
            .then(
                (data => {
                    relatedAttributes = [];
                    if (!data || !data.length){
                        return;
                    }

                    data.forEach((relatedType) =>
                        relatedAttributes.push({
                            id: relatedType.dynEntityAttribConfigId,
                            displayName: `*${relatedType.assetTypeName}`,
                            relationId: relatedType.dynEntityConfigId,
                            dataType: 'childAssets',
                            isChildAssets: true
                        })
                    );
                }),
                () => relatedAttributes = []
            );

        return Promise.all([loadAttributes, loadRelatedAttributes])
            .then(
                () => this.assetAttributes[typeId] = attributes.concat(relatedAttributes),
                () => this.assetAttributes[typeId] = null
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

    loadAssetTypes() {
        return this.assetTypeRepo.loadAssetTypes().then(
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
        );
    },

    getTypeSearchModel(searchId){
        if (!searchId){
            this.searchModel = this.searchModelRepo.createSearchModel();
            return Promise.resolve(true);
        }
            
        return this.searchModelRepo.getSerchModel(searchId)
            .then(d => {
                this.searchModel = d;

                var typeId = d.assetType.id;
                var promises = [];
                this.ensureAssetType(typeId, promises);
                d.attributes.forEach((attr, i) => {
                    this.ensureOperators(attr, promises);
                });

                d.attributes
                    .forEach(a => {
                        if (!a.useComplexValue){
                            a.complexValue = a.complexValue || [];
                        } else {
                            this.ensureAssetType(a.referenceAttrib.relationId, promises);
                            a.complexValue.forEach((attr, i) => {
                                this.ensureOperators(attr, promises);
                                attr.index = i;
                            });
                        }
                    });

                return (promises.length ? Promise.all(promises) : Promise.resolve(true))
                    // set operators in each attribute
                    // at this point we are sure that all of them are loaded from server
                    .then(() => setOperators(d.attributes, this.dataTypeOperators));
            },
                () => this.searchModel = this.searchModelRepo.createSearchModel()
            );

        function setOperators(attributes, allOperators){
            attributes
                .filter(attr => attr.referenceAttrib && attr.referenceAttrib.dataType)
                .forEach(attr => {
                    var datatype = attr.referenceAttrib.dataType;
                    attr.operators = allOperators[datatype];
                    if (attr.useComplexValue){
                        setOperators(attr.complexValue, allOperators);
                    }
            });
        }
    },

    ensureAssetType(typeId, promises){
        if (!this.assetAttributes[typeId]){
            this.assetAttributes[typeId] = []; // to prevent another request ot server
            promises.push(this.loadAssetAttributes(typeId));
        }
    },

    ensureOperators(attr, promises){
        if (!attr.referenceAttrib || !attr.referenceAttrib.dataType){
            return;
        }

        var datatype = attr.referenceAttrib.dataType;
        var typeOperators = this.dataTypeOperators[datatype];
        if (!this.dataTypeOperators[datatype]){
            this.dataTypeOperators[datatype] = []; // to prevent another request ot server
            promises.push(this.loadDataTypeOperators(datatype));
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
