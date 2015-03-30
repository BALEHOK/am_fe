/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');

var TaxonomyPath = require('../taxonomyPath');
var Panel = require('./panel');
var RevisionInfo = require('../revisionInfo');
var ValidationResult = require('./validationResult');
var LayoutSwitcher = require('../layoutSwitcher');
var ViewsFactory = require('../viewsFactory');

var Edit = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State, Router.Navigation],

    componentWillMount: function() {
        var params = this.getParams();
        this.props.actions.loadAsset(params);
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
        this.setState({
            isValid: store.isValid
        });

        var asset = store.asset;
        var defaultScreen = _
            .chain(asset.screens)
            .findWhere({isDefault: true})
            .value();
        if (!this.state.selectedScreen) {
            this.setState({
                selectedScreen: defaultScreen
            });
        }
    },

    handleUndo: function () {
        var params = this.getParams();
        this.transitionTo('asset-view', params);
    },

    onScreenChange: function(screen) {
        this.setState({
            selectedScreen: screen
        });
    },

    handleSave: function() {
        this.props.actions.saveAsset(this.state.stores.asset.asset);
    },

    render: function() {
        var actions = this.props.actions;
        var assetStore = this.state.stores.asset;
        var asset = assetStore.asset;
        var taxonomyPath = assetStore.taxonomyPath;
        var screen = this.state.selectedScreen || {panels: []};
        var panels = screen.panels.map(function(el) {
            return <Panel data={el} title={el.name} actions={actions} />
        });
        var validationData = this.state.stores.asset.validation;
        return (
            <div>
                <h1 className="page-title">Edit: <span className="page-title__param">{asset.name}</span></h1>
                <RevisionInfo asset={asset} />
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <LayoutSwitcher 
                            screens={asset.screens} 
                            selectedScreen={this.state.selectedScreen}
                            onChange={this.onScreenChange} />
                        <TaxonomyPath taxonomyPath={taxonomyPath} />
                    </div>
                    <div className="grid__item ten-twelfths">
                        {panels}
                        <ValidationResult validation={validationData} />
                        <div className="inputs-line inputs-line_width_full">
                            <button 
                                disabled={!this.state.isValid}
                                onClick={this.handleSave}
                                className="btn btn_size_small">Save
                            </button>
                            {/*<button 
                                disabled={!this.state.isValid}
                                className="btn btn_type_second btn_size_small">Save and Add new
                            </button>*/}
                            <button 
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
