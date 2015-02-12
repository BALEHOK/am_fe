/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var AssetToolbar = React.createClass({
    mixins: [Router.State, Router.Navigation],
    handleTransition(route) {
        var params = this.getParams();
        this.transitionTo(route, params);
    },
    render: function() {
        return (
            <div className="inputs-line inputs-line_width_full">
                <button className="btn btn_type_second btn_size_small">
                    <i className="btn__icon btn__icon_print"></i>
                </button>
                <button className="btn btn_type_second btn_size_small" 
                        onClick={this.handleTransition.bind(this, 'asset-history')}>
                    <i className="btn__icon btn__icon_history"></i>History
                </button>
                <button className="btn btn_type_second btn_size_small" 
                        onClick={this.handleTransition.bind(this, 'asset-edit')}>
                    <i className="btn__icon btn__icon_edit"></i>Edit
                </button>
                <button className="btn btn_type_second btn_size_small">
                    <i className="btn__icon btn__icon_docs"></i>Documents
                </button>
                <button className="btn btn_type_warning btn_size_small pull-right">
                    <i className="btn__icon btn__icon_cross"></i>Delete
                </button>
            </div>
        );
    }
});

module.exports = AssetToolbar;