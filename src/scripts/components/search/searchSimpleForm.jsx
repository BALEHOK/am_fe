/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');

var SearchSimpleForm = React.createClass({
    mixins: [Backbone.React.Component.mixin],
    getInitialState: function () {
        return {
            selectedItemId: 1,
        }
    },
    handleSelectChanged: function (value) {

    },
    render: function() {
        var model = this.getModel();
        return (
            <form className="form">
                <div className="input-group">
                    <ReactSelectize
                    items={model.searchContext}
                    value={this.state.selectedItemId}
                    onChange={this.handleSelectChanged}
                    selectId="select-country"
                    placeholder=" "
                    label=" "
                    />
                   
                    <label className="input-txt input-txt_width_475">
                        <input type="text" className="input-txt__field" placeholder="Search asset"/>
                    </label>
                    <button type="button" className="btn btn_icon_search"></button>
                </div>
            </form>
        );
    }
});

module.exports = SearchSimpleForm;
