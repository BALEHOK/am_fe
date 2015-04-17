/**
 * @jsx React.DOM
 */
/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var Tabs = require('react-simpletabs');

var SearchSelectValues = {
    getSelectList: function () {
        return [
            { name: 'Manager', id: 1},
            { name: 'Name', id: 2},
            { name: 'District', id: 3},
            { name: 'Department', id: 4},
            { name: 'Update User', id: 5},
            { name: 'Update Date', id: 6},
            { name: 'Password', id: 7},
            { name: 'Email', id: 8},
            { name: 'User', id: 9},
            { name: 'Permissions', id: 10}
        ];
    }
};

var SearchComplexForm = React.createClass({
    getInitialState: function () {
        return {
            selectedItemId: -1,
            selectItems: SearchSelectValues.getSelectList()
        }
    },
    handleSelectChanged: function (value) {

    },
    render: function() {
        return (
            <form className="form advanced-search">
                <header className="advanced-search__header">
                    Asset type <span className="arrow-separator"></span>
                    <ReactSelectize
                        items={this.state.selectItems}
                        value={this.state.selectedItemId}
                        onChange={this.handleSelectChanged}
                        selectId="select2"
                        placeholder="Select asset"
                        label=" "
                    />
                    <span className="arrow-separator arrow-separator_size_small"></span>
                    Search in
                    <span className="radio-group">
                        <label className="radio-btn">
                            <input type="radio" className="radio-btn__input" name="radio1"/>
                            <span className="radio-btn__icon"></span>
                            Active assets
                        </label>
                        <label className="radio-btn">
                            <input type="radio" className="radio-btn__input" name="radio1"/>
                            <span className="radio-btn__icon"></span>
                            History
                        </label>
                    </span>
                    <button className="btn btn_type_second">Continue <i className=" btn__icon btn__icon_angle-right"></i></button>
                </header>
                <div className="table-search">
                    <div className="table-search__row table-search__row_header">
                        <div className="table-search__row-item table-search__row-item_type_actions">
                            &#x23;
                        </div>
                        <div className="table-search__row-item table-search__row-item_type_attr">
                            Attribute
                        </div>
                        <div className="table-search__row-item table-search__row-item_type_oper">
                            Operator
                        </div>
                        <div className="table-search__row-item table-search__row-item_type_value">
                            Search value
                        </div>
                        <div className="table-search__row-item table-search__row-item_type_sort">
                            Sort order
                        </div>
                        <div className="table-search__row-item table-search__row-item_type_additional">
                            And / or
                        </div>
                    </div>
                    <div className="table-search__content">
                        <div className="table-search__row">
                            <div className="table-search__row-item table-search__row-item_type_actions">
                                <span className="table-search__row-action table-search__row-action_delete" title="Delete"></span>
                                <span className="table-search__row-action table-search__row-action_up" title="Mover up"></span>
                                <span className="table-search__row-action table-search__row-action_down" title="Move down"></span>
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_attr">
                                <ReactSelectize
                                    items={this.state.selectItems}
                                    value={1}
                                    onChange={this.handleSelectChanged}
                                    selectId="select3"
                                    placeholder="Select asset"
                                    label=" "
                                />
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_oper">
                                <ReactSelectize
                                    items={
                                        [
                                            { name: 'LIKE', id: 1},
                                            { name: 'EQUAL', id: 2},
                                            { name: 'OPTION', id: 3}
                                        ]
                                        }
                                    value={1}
                                    onChange={this.handleSelectChanged}
                                    selectId="select4"
                                    placeholder="Select asset"
                                    label=" "
                                />
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_value">
                                <label className="input-txt input-txt_width_full">
                                    <input type="text" className="input-txt__field" placeholder="Type search value"/>
                                </label>
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_sort">
                                <ReactSelectize
                                    items={
                                        [
                                            { name: 'ASC', id: 1},
                                            { name: 'DESC', id: 2}
                                        ]
                                        }
                                    value={1}
                                    onChange={this.handleSelectChanged}
                                    selectId="select5"
                                    placeholder=" "
                                    label=" "
                                />
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_additional">

                            </div>
                        </div>
                        <div className="table-search__row table-search__row_state_complex">
                            <div className="table-search__row-item table-search__row-item_type_actions">
                                <span className="table-search__row-action table-search__row-action_delete" title="Delete"></span>
                                <span className="table-search__row-action table-search__row-action_up" title="Mover up"></span>
                                <span className="table-search__row-action table-search__row-action_down" title="Move down"></span>
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_attr">
                                <ReactSelectize
                                    items={this.state.selectItems}
                                    value={1}
                                    onChange={this.handleSelectChanged}
                                    selectId="select6"
                                    placeholder="Select asset"
                                    label=" "
                                />
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_oper">
                                <ReactSelectize
                                    items={
                                        [
                                            { name: 'LIKE', id: 1},
                                            { name: 'EQUAL', id: 2},
                                            { name: 'OPTION', id: 3}
                                        ]
                                        }
                                    value={1}
                                    onChange={this.handleSelectChanged}
                                    selectId="select7"
                                    placeholder="Select asset"
                                    label=" "
                                />
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_value">
                                <label className="input-txt input-txt_width_full">
                                    <input type="text" className="input-txt__field" placeholder="Type search value"/>
                                </label>
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_sort">
                                <ReactSelectize
                                    items={
                                        [
                                            { name: 'ASC', id: 1},
                                            { name: 'DESC', id: 2}
                                        ]
                                        }
                                    value={1}
                                    onChange={this.handleSelectChanged}
                                    selectId="select8"
                                    placeholder=" "
                                    label=" "
                                />
                            </div>
                            <div className="table-search__row-item table-search__row-item_type_additional">

                            </div>
                            <div className="table-search__row-item table-search__row-item_type_inner">
                                <Tabs defaultActiveKey={2} animation={false}>
                                    <Tabs.Panel key={1} tab="Simple condition">
                                        <div className="search-condition">
                                            <div className="search-condition__content">
                                                <div className="search-condition__row">
                                                    <label className="input-txt">
                                                        <input type="text" className="input-txt__field" placeholder="Type search value"/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel key={2} tab="Advanced condition">
                                        <div className="search-condition">
                                            <div className="search-condition__content">
                                                <div className="search-condition__row">
                                                    <div className="inputs-line">
                                                        <ReactSelectize
                                                            items={this.state.selectItems}
                                                            value={1}
                                                            onChange={this.handleSelectChanged}
                                                            selectId="select9"
                                                            placeholder="Select asset"
                                                            label=" "
                                                        />
                                                        <ReactSelectize
                                                            items={
                                                                [
                                                                    { name: '===', id: 1},
                                                                    { name: '<=', id: 2}
                                                                ]
                                                                }
                                                            value={1}
                                                            onChange={this.handleSelectChanged}
                                                            selectId="select10"
                                                            placeholder=" "
                                                            label=" "
                                                        />
                                                        <label className="input-txt">
                                                            <input type="text" className="input-txt__field" placeholder="Type search value"/>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="search-condition__row">
                                                    <div className="inputs-line">
                                                        <ReactSelectize
                                                            items={this.state.selectItems}
                                                            value={1}
                                                            onChange={this.handleSelectChanged}
                                                            selectId="select11"
                                                            placeholder="Select asset"
                                                            label=" "
                                                        />
                                                        <ReactSelectize
                                                            items={
                                                                [
                                                                    { name: '===', id: 1},
                                                                    { name: '<=', id: 2}
                                                                ]
                                                                }
                                                            value={1}
                                                            onChange={this.handleSelectChanged}
                                                            selectId="select12"
                                                            placeholder=" "
                                                            label=" "
                                                        />
                                                        <label className="input-txt">
                                                            <input type="text" className="input-txt__field" placeholder="Type search value"/>
                                                        </label>
                                                    </div>
                                                    <span className="search-condition__row-remove pull-right">Remove</span>
                                                </div>
                                            </div>
                                            <span className="search-condition__add-row">Add a new row</span>
                                        </div>
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    <footer className="table-search__footer">
                        <span className="table-search__add-row">Add a new row</span>
                        <div className="table-search__footer-actions clearfix">
                            <button className="btn pull-right"><i className=" btn__icon btn__icon_search"></i>Start search</button>
                        </div>
                    </footer>
                </div>
            </form>
        );
    }
});

module.exports = SearchComplexForm;
