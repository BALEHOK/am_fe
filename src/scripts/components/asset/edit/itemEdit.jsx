/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../common/react-selectize');
var Flux = require('delorean').Flux;
var Router = require('react-router');

var Panel = require('./panel');

var itemEdit = React.createClass({
    mixins:[Flux.mixins.storeListener, Router.State],

    componentWillMount: function() {
        var params = this.getParams();
        this.props.actions.loadAsset(params);
    },

    handleSelectChange: function() {

    },
    render: function() {
        var screen = this.state.stores.asset.asset.screens[0]  || {panels: []};
        var panels = screen.panels.map(function(el) {
            return <Panel data={el} title={el.name}/>
        });
        return (
            <div>
                <h1 className="page-title">Edit: <span className="page-title__param">test1</span></h1>
                <nav className="back-nav">
                    <span className="light-grey">[r.1  -  11/21/2013 11:23:10 PM]</span>
                </nav>
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
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Categories</span>
                            <div className="nav-block__item">
                                <span>System > <a href="#">admin</a></span>
                            </div>
                        </nav>
                    </div>
                    <div className="grid__item ten-twelfths">
                        {panels}
                        <div className="inputs-line inputs-line_width_full">
                            <button className="btn btn_size_small">Save</button>
                            <button className="btn btn_type_second btn_size_small">Save and Add new</button>
                            <button className="btn btn_type_second btn_size_small">
                                <i className="btn__icon btn__icon_undo"></i>Undo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = itemEdit;
