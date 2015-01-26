/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchResultsHeader = require('./searchResultsHeader');

var AssetViewType3 = React.createClass({
    handleScreenChange: function() {

    },
    render: function() {
        return (
            <div>
                <SearchResultsHeader />
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
                            onChange={this.handleScreenChange}
                            selectId="select-screen"
                            placeholder="Screen:"
                            label=" "
                            className="select_width_full"
                        />
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Asset type</span>
                            <div className="nav-block__item">
                                <span>System <span className="icon icon_arrow_right"></span> <a href="#">admin</a></span>
                            </div>
                        </nav>
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Linked assets</span>
                            <div className="nav-block__item">
                                <span>Update user: <a href="#">admin</a></span>
                            </div>
                        </nav>
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Search result report</span>
                            <ul className="nav-block__list">
                                <li className="nav-block__item">
                                    <span className="link link_second"><span className="icon icon_download"></span>Default Reports</span>
                                </li>
                                <li className="nav-block__item">
                                    <span className="link link_second"><span className="icon icon_download"></span>Report with child assets</span>
                                </li>
                            </ul>
                        </nav>
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Export</span>
                            <ul className="nav-block__list">
                                <li className="nav-block__item">
                                    <span className="link link_second"><span className="icon icon_download"></span>.txt</span>
                                </li>
                                <li className="nav-block__item">
                                    <span className="link link_second"><span className="icon icon_download"></span>.xml</span>
                                </li>
                                <li className="nav-block__item">
                                    <span className="link link_second"><span className="icon icon_download"></span>.doc</span>
                                </li>
                                <li className="nav-block__item">
                                    <span className="link link_second"><span className="icon icon_download"></span>.zip all</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__item ten-twelfths">
                        <div className="asset-data">
                            <div className="asset-data__content">
                                <TabbedArea className="asset-data__tabs" defaultActiveKey={1} animation={false}>
                                    <TabPane eventKey={1} tab="Dossier">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">SOB50:</span>
                                            <label className="checkbox">
                                                <input type="checkbox" className="checkbox__input" name="checkbox1" disabled/>
                                                <span className="checkbox__icon"></span>
                                            </label>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">ILL:</span>
                                            <label className="checkbox">
                                                <input type="checkbox" className="checkbox__input" name="checkbox2" checked disabled/>
                                                <span className="checkbox__icon"></span>
                                            </label>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">SOB540:</span>
                                            <label className="checkbox">
                                                <input type="checkbox" className="checkbox__input" name="checkbox3" disabled/>
                                                <span className="checkbox__icon"></span>
                                            </label>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Dossier Number:</span>
                                            <strong>6</strong>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Person:</span>
                                            <strong><a>JOSE, GOMES MACHADO</a></strong>  |  Related items
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">State:</span>
                                            Suspended
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Type of dismissal:</span>
                                            <span className="no-data">No data</span>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Vacantex Number:</span>
                                            1320
                                        </div>
                                    </TabPane>
                                    <TabPane eventKey={2} tab="Fund">

                                    </TabPane>
                                    <TabPane eventKey={3} tab="Employment">

                                    </TabPane>
                                    <TabPane eventKey={4} tab="System">

                                    </TabPane>
                                    <TabPane eventKey={5} tab="Documents">

                                    </TabPane>
                                </TabbedArea>
                            </div>
                        </div>
                        <div className="inputs-line inputs-line_width_full">
                            <button className="btn btn_type_second btn_size_small">
                                <i className="btn__icon btn__icon_print"></i>
                            </button>
                            <button className="btn btn_type_second btn_size_small">
                                <i className="btn__icon btn__icon_history"></i>History
                            </button>
                            <button className="btn btn_type_second btn_size_small">
                                <i className="btn__icon btn__icon_edit"></i>Edit
                            </button>
                            <button className="btn btn_type_second btn_size_small">
                                <i className="btn__icon btn__icon_docs"></i>Documents
                            </button>
                            <button className="btn btn_type_warning btn_size_small pull-right">
                                <i className="btn__icon btn__icon_cross"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AssetViewType3;
