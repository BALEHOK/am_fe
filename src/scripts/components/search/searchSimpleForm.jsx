/**
 * @jsx React.DOM
 */
/**
 * @jsx React.DOM
 */

var React = require('react');

var SearchSimpleForm = React.createClass({
    render: function() {
        return (
            <form className="form">
                <div className="input-group">
                    <select className="form-control" value="1">
                        <option value="1">Active assets</option>
                        <option value="2">History</option>
                    </select>
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
