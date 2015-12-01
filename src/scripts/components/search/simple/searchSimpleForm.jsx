/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../common/react-selectize');
var L20nMessage = require('../../intl/l20n-message');

var SearchSimpleForm = React.createClass({
    getInitialState: function () {
        return {
            searchContextId: this.props.context || 1,
            disabled: true,
            query: this.props.value
        }
    },
    handleSelectChange: function (e) {
        this.setState({ searchContextId : e[0].id });
    },
    handleQueryChange: function (e) {
        this.setState({
            query: e.target.value,
            disabled: e.target.value.length == 0
        });
    },
    handleKeyPress: function(e) {
        if (e.keyCode == 13)
            this.doQuery();
    },
    doQuery: function() {
        this.props.changeFilter({
            searchId: undefined,
            query: this.state.query,
            page: 1,
            assetType: undefined,
            taxonomy: undefined,
            context: this.state.searchContextId,
        });
    },
    render: function() {
        var searchContext = [
            { name: L20nMessage('searchContextAssets', 'Active assets'), id: 1 },
            { name: L20nMessage('searchContextHistory', 'History'), id: 2 }
        ];
        return (
            <form className="form">
                <div className="input-group">
                    <ReactSelectize
                        items={searchContext}
                        value={this.state.searchContextId}
                        onChange={this.handleSelectChange}
                        selectId="search-type"
                        placeholder=" "
                        clearable={false}
                        searchable={false}
                        label=" "
                    />
                    <label className="input-txt input-txt_width_475">
                        <input type="text"
                            defaultValue={this.state.query}
                            className="input-txt__field"
                            placeholder="Search asset"
                            onChange={this.handleQueryChange}
                            onKeyUp={this.handleKeyPress} />
                    </label>
                    <button
                        type="button"
                        disabled={!this.props.value ? this.state.disabled : false}
                        className="btn"
                        onClick={this.doQuery}>
                            <i className="btn__icon btn__icon_search"></i>
                    </button>
                </div>
            </form>
        );
    }
});

module.exports = SearchSimpleForm;
