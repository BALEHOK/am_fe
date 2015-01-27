/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var SearchResultsHeader = require('./searchResultsHeader');

var AssetViewType4 = React.createClass({
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
                            <span className="nav-block__title nav-block__title_type_second">Linked assets</span>
                            <div className="nav-block__item">
                                <span>Update user: <a href="#">admin</a></span>
                            </div>
                            <div className="nav-block__item">
                                <span>Asset: <a href="#">AAMBEELDSTRAAT,
                                    19, WILSELE (3012)</a></span>
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
                                    <TabPane eventKey={1} tab="General">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Name:</span>
                                            test account
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Revision:</span>
                                            <strong>6</strong>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Update user:</span>
                                            <a href="#">admin</a> | Related items
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Update date:</span>
                                            9/1/2014 11:13:47 AM
                                        </div>
                                    </TabPane>
                                    <TabPane eventKey={2} tab="Bool">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">bool:</span>
                                            <label className="checkbox">
                                                <input type="checkbox" className="checkbox__input" name="checkbox1" checked disabled/>
                                                <span className="checkbox__icon"></span>
                                            </label>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">char:</span>
                                            c
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">datetime:</span>
                                            9/1/2014 12:00:00 AM
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">float:</span>
                                            1.00
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">int:</span>
                                            1
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">long:</span>
                                            1
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">string:</span>
                                            s
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">text:</span>
                                            ttt
                                        </div>
                                    </TabPane>
                                    <TabPane eventKey={3} tab="Advanced">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">barcode:</span>
                                            <img src="assets/images/barcode.png"/>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">current date:</span>
                                            9/1/2014 11:13:47 AM
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">email:</span>
                                            <a href="mailto:test@test.com">test@test.com</a>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">euro:</span>
                                            € 10.00
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">files:</span>
                                            <ul className="files-list">
                                                <li className="files-list__item">
                                                    <a className="files-list__item-link files-list__item-link_type_image">/uploads/b/efa1df...8.jpg</a>
                                                </li>
                                                <li className="files-list__item">
                                                    <a className="files-list__item-link files-list__item-link_type_doc">/uploads/b/test.doc</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">map:</span>

                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">image:</span>

                                        </div>
                                    </TabPane>
                                    <TabPane eventKey={4} tab="Complex">
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">asset:</span>
                                            <a>JAAMBEELDSTRAAT, 19, , WILSELE (3012) </a>  |  Related items
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">assets:</span>
                                            <div className="params-block">
                                                <span className="params-block__title">Name</span>
                                                <ul className="params-block__list">
                                                    <li className="params-block__list-item">first asset</li>
                                                    <li className="params-block__list-item">second asset</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">document:</span>
                                            <span className="no-data">No data</span>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">dynlist:</span>
                                            <span className="no-data">No data</span>
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">permissions:</span>
                                            <span className="permissions-label permissions-label_active">R</span>
                                            <span className="permissions-label">W</span>
                                            <span className="permissions-label">R</span>
                                            <span className="permissions-label">W</span>
                                        </div>
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
module.exports = AssetViewType4;
