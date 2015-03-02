/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../common/react-selectize');
var Flux = require('delorean').Flux;
var Router = require('react-router');

var TaxonomyPath = require('../taxonomyPath');
var Panel = require('./panel');
var RevisionInfo = require('../revisionInfo');

var Edit = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State, Router.Navigation],

    componentWillMount: function() {
        var params = this.getParams();
        this.props.actions.loadAsset(params);
    },

    handleTransition(route) {
        var params = this.getParams();
        this.transitionTo('asset-view', params);
    },

    handleSelectChange: function() {

    },
    render: function() {
        var actions = this.props.actions;
        var asset = this.state.stores.asset.asset;
        var screen = asset.screens[0] || {panels: []};
        var panels = screen.panels.map(function(el) {
            return <Panel data={el} title={el.name} actions={actions} />
        });
        return (
            <div>
                <h1 className="page-title">Edit: <span className="page-title__param">{asset.name}</span></h1>
                <RevisionInfo asset={asset} />
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <ReactSelectize
                            items={[
                                { name: "Default", id: "1" },
                                { name: "Asset view 2", id: "2" },
                                { name: "Asset view 3", id: "3" },
                                { name: "Asset view 4", id: "4" }
                            ]}
                            value={0}
                            onChange={this.handleSelectChange}
                            selectId="select-screen"
                            placeholder="Screen:"
                            label=" "
                            className="select_width_full select_size_small"
                        />
                        <TaxonomyPath assetTypeId={asset.assetTypeId} actions={this.props.actions} />
                    </div>
                    <div className="grid__item ten-twelfths">
                        {panels}
                        <div className="inputs-line inputs-line_width_full">
                            <button className="btn btn_size_small">Save</button>
                            <button className="btn btn_type_second btn_size_small">Save and Add new</button>
                            <button className="btn btn_type_second btn_size_small"
                                    onClick={this.handleTransition}>
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
