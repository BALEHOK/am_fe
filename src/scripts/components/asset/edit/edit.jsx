/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Sticky = require('react-sticky');
var moment = require('moment');
var TaxonomyPath = require('../taxonomyPath');
var Panel = require('./panel');
var RevisionInfo = require('../revisionInfo');
var ValidationResult = require('./validationResult');
var LayoutSwitcher = require('../layoutSwitcher');
var ViewsFactory = require('../viewsFactory');
var Loader = require('../../common/loader.jsx');
var LoaderMixin = require('../../../mixins/LoaderMixin');
var ValueTransformer = require('../../../util/valueTransformer').ValueTransformer;
var L20nMessage = require('../../intl/l20n-message');

var Edit = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['asset'],

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillMount: function() {
        var params = this.context.router.getCurrentParams();
        this.waitFor(this.props.actions.loadAsset(params));
    },

    componentDidUpdate:function(prevProps, prevState) {
        if (prevState.loading && !this.state.loading) {
            let paramId = this.state.stores.asset.topElemDataParamId;
            let elem = document.querySelector('[data-param-id="'+paramId+'"]');
            if (paramId && elem) {
                let elemTop = elem.getBoundingClientRect().top;
                let offsetTop = document.querySelector('.asset-controls-panel').offsetHeight;
                window.scrollTo(0,  elemTop - offsetTop*2 - 40);
            }
        }
    },

    handleUndo: function () {
        var params = this.context.router.getCurrentParams();
        var query = this.context.router.getCurrentQuery();
        if(params.assetId && !query.forAttr) {
            this.context.router.transitionTo('asset-view', params);
        } else if (query.forAttr) {
            this.props.actions.returnToAsset(null, this.context.router);
        } else {
            this.context.router.goBack();
        }
    },

    onScreenChange: function(screenIndex) {
        this.props.actions.changeScreen(screenIndex);
    },

    handleSave: function() {
        var self = this;
        var model = this.state.stores.asset.asset;
        var params = this.context.router.getCurrentParams();
        var query = this.context.router.getCurrentQuery();
        this.waitFor(this.props.actions.saveAsset())
            .then(() => {
                if(!query.forAttr) {
                    self.context.router.transitionTo(
                        'asset-view', _.extend(params, {assetId: model.id}));
                } else {
                    this.props.actions.returnToAsset(query.forAttr, this.context.router);
                }
            })
            .catch(error => {
                self.stopWaiting();
                self.forceUpdate();
            });
    },

    onRecalc: function() {
        this.waitFor(this.props.actions.recalculate());
    },

    render: function() {
        var actions = this.props.actions;
        var assetStore = this.state.stores.asset;
        var asset = assetStore.asset;
        var taxonomyPath = assetStore.taxonomyPath;
        var validationData = assetStore.validation;
        var panels = assetStore.currentScreen.panels.map((el, key) => {
            return <Panel key={key}
                          data={el}
                          dispatcher={this.props.dispatcher}
                          title={el.name}
                          actions={actions}
                          validation={validationData}
                          selectedScreen={assetStore.currentScreen} />
        });

        var dateTransform = new ValueTransformer(function (date) {
          return moment(date).format('DD.MM.YYYY HH:mm');
        });

        var getHeader = () => {
            var getAssetTypeName = (taxonomyPath) => {
                if (taxonomyPath && taxonomyPath.child)
                    return getAssetTypeName(taxonomyPath.child);
                return taxonomyPath && taxonomyPath.assetType
                    ? taxonomyPath.assetType.displayName
                    : '';
            };

            var action = asset.id
                ? 'Edit'
                : 'Create';

            var name = asset.id
                ? asset.name
                : `[${getAssetTypeName(taxonomyPath)}]`;

            return  <h1 className="page-title">
                        {action}&nbsp;<span className="page-title__param">{name}</span>
                    </h1>
        };
        var loading = this.state.loading || assetStore.calculating;
        return (
            <div className="asset-page">
                {getHeader()}
                <RevisionInfo asset={asset} dateTransform={dateTransform} />
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <LayoutSwitcher
                            screens={asset.screens}
                            selectedScreen={assetStore.currentScreen}
                            onChange={this.onScreenChange} />
                        <TaxonomyPath taxonomyPath={taxonomyPath} />
                    </div>
                    <div className="grid__item ten-twelfths">
                        <Loader loading={loading}>
                            <div>
                                <Sticky>
                                    <div className="asset-controls-panel-wrapper">
                                        <div className="asset-controls-panel">
                                            <div className="inputs-line inputs-line_width_full" ref="slider">
                                                <ValidationResult validation={validationData}
                                                                  selectedScreen={assetStore.currentScreen} />
                                                <div>
                                                    <button
                                                        disabled={!assetStore.isValid || this.state.loading}
                                                        onClick={this.handleSave}
                                                        className="btn btn_size_small">
                                                        {L20nMessage('toolBarBtnSave', 'Save')}
                                                    </button>
                                                    {/*<button
                                                     disabled={!this.state.isValid}
                                                     className="btn btn_type_second btn_size_small">Save and Add new
                                                     </button>*/}
                                                    <button
                                                        disabled={this.state.loading}
                                                        className="btn btn_type_second btn_size_small"
                                                        onClick={this.handleUndo}>
                                                        <i className="btn__icon btn__icon_undo"></i>{L20nMessage('toolBarBtnUndo', 'Undo')}
                                                    </button>

                                                    {assetStore.currentScreen.hasFormula && assetStore.isEdited
                                                        ? <button
                                                            type="button"
                                                            className="btn btn_type_second btn_size_small"
                                                            onClick={this.onRecalc}>
                                                                <i className="btn__icon btn__icon_refresh"></i>
                                                                <span>{L20nMessage('toolBarBtnRecalc', 'Recalc')}</span>
                                                          </button>
                                                        : ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Sticky>
                                {panels}
                            </div>
                        </Loader>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Edit;
