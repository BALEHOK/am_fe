/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');
var SearchResultsHeader = require('./searchResultsHeader');

var AssetViewType2 = React.createClass({
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
                        <div className="grid">
                            <div className="grid__item one-half">
                                <div className="asset-data">
                                    <div className="asset-data__header">
                                        <span className="asset-data__title">General</span>
                                    </div>
                                    <div className="asset-data__content">
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
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">Bic CODE:</span>
                                            BLBGGB2L
                                        </div>
                                        <div className="asset-data__param">
                                            <span className="asset-data__param-title">IBAN:</span>
                                            GB 12 CPBK 0892 9965 0449 91
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid__item one-half">
                                <div className="asset-data asset-data_empty">
                                    <div className="asset-data__header">
                                        <span className="asset-data__title"><span className="icon icon_lock"></span>Authorization</span>
                                    </div>
                                    <div className="asset-data__content">

                                    </div>
                                </div>
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
module.exports = AssetViewType2;
