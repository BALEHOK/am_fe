/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var ReactSelectize = require('../common/react-selectize');

var SearchSimpleForm = React.createClass({
    mixins: [Backbone.React.Component.mixin, Router.Navigation],
    getInitialState: function () {
        return {
            selectedItemId: 1,
            disabled: true
        }
    },
    handleSelectChange: function (value) {

    },
    handleQueryChange: function (e) {
        this.setState({
            query: e.target.value,
            disabled: e.target.value.length == 0
        });
    },
    doQuery: function() {
        this.getModel().query = this.state.query;
        this.transitionTo('/search/result', {}, {'query' : this.state.query});
    },
    render: function() {
        var model = this.getModel();
        return (
            <form className="form">
                <div className="input-group">
                    <ReactSelectize
                    items={model.searchContext}
                    value={this.state.selectedItemId}
                    onChange={this.handleSelectChange}
                    selectId="select-country"
                    placeholder=" "
                    label=" "
                    />

                    <label className="input-txt input-txt_width_475">
                        <input type="text" className="input-txt__field" placeholder="Search asset" onChange={this.handleQueryChange} />
                    </label>
                    <button type="button" disabled={this.state.disabled} className="btn" onClick={this.doQuery}>
                        <i className="btn__icon btn__icon_search"></i>
                    </button>
                </div>
            </form>
        );
    }
});

module.exports = SearchSimpleForm;
