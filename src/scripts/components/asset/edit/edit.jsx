/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
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

var Edit = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    contextTypes: {
        router: React.PropTypes.func
    },

    componentWillMount: function() {
        var params = this.context.router.getCurrentParams();
        this.waitFor(this.props.actions.loadAsset(params));
    },

    getInitialState: function() {
        return {
            isValid: true,
            selectedScreen: undefined,
        }
    },

    storeDidChange: function (storeName) {
        if (storeName != 'asset') return;
        var store = this.state.stores.asset;

        var newState = {
            isValid: store.isValid
        };

        this.setState(newState);
    },

    handleUndo: function () {
        var params = this.context.router.getCurrentParams();
        this.context.router.transitionTo('asset-view', params);
    },

    onScreenChange: function(screen) {
        this.setState({
            selectedScreen: screen
        });
    },

    handleSave: function() {
        var self = this;
        var model = this.state.stores.asset.asset;
        var params = this.context.router.getCurrentParams();
        var query = this.context.router.getCurrentQuery();
        this.waitFor(this.props.actions.saveAsset(model))
            .then(() => {
                if(!query.forAttr) {
                    self.context.router.transitionTo(
                        'asset-view', _.extend(params, {assetId: model.id}));
                } else {
                    this.props.actions.returnToAsset(query.forAttr, query.uid, this.context.router);
                }
            })
            .catch(error => {
                self.stopWaiting();
                self.forceUpdate();
            });
    },

    render: function() {
        var actions = this.props.actions;
        var assetStore = this.state.stores.asset;
        var asset = assetStore.asset;
        var taxonomyPath = assetStore.taxonomyPath;
        var validationData = assetStore.validation;
        var screen = asset.screens[assetStore.selectedScreen] || {panels: []};
        var panels = screen.panels.map((el) => {
            return <Panel data={el}
                          dispatcher={this.props.dispatcher}
                          title={el.name}
                          actions={actions}
                          validation={validationData}
                          selectedScreen={screen} />
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
        return (
            <div>
                {getHeader()}
                <RevisionInfo asset={asset} dateTransform={dateTransform} />
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <LayoutSwitcher
                            screens={asset.screens}
                            selectedScreen={screen}
                            onChange={this.onScreenChange} />
                        <TaxonomyPath taxonomyPath={taxonomyPath} />
                    </div>
                    <div className="grid__item ten-twelfths">
                        <Loader loading={this.state.loading}>
                            <div>
                                {panels}
                            </div>
                        </Loader>
                        <ValidationResult validation={validationData}
                                          selectedScreen={screen} />
                        <div className="inputs-line inputs-line_width_full">
                            <button
                                disabled={!this.state.isValid || this.state.loading}
                                onClick={this.handleSave}
                                className="btn btn_size_small">Save
                            </button>
                            {/*<button
                                disabled={!this.state.isValid}
                                className="btn btn_type_second btn_size_small">Save and Add new
                            </button>*/}
                            <button
                                disabled={this.state.loading}
                                className="btn btn_type_second btn_size_small"
                                onClick={this.handleUndo}>
                                <i className="btn__icon btn__icon_undo"></i>Undo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Edit;
