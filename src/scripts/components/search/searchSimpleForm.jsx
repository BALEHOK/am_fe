/**
 * @jsx React.DOM
 */
/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');

var SearchSelectValues = {
    getSelectList: function () {
        return [
            { name: "Active assets", id: 1},
            { name: "History", id: 2}
        ];
    }
};

var SearchSimpleForm = React.createClass({
    getInitialState: function () {
        return {
            selectedItemId: 1,
            selectItems: SearchSelectValues.getSelectList()
        }
    },
    handleSelectChanged: function (value) {

    },
    render: function() {
        return (
            <form className="form">
                <div className="input-group">
                    <ReactSelectize
                    items={this.state.selectItems}
                    value={this.state.selectedItemId}
                    onChange={this.handleSelectChanged}
                    selectId="select1"
                    placeholder=" "
                    label=" "/>
                    <label className="input-txt input-txt_width_475">
                        <input type="text" className="input-txt__field" placeholder="Search asset"/>
                    </label>
                    <button type="button" className="btn"><i className=" btn__icon btn__icon_search"></i></button>
                </div>
            </form>
        );
    }
});

module.exports = SearchSimpleForm;
