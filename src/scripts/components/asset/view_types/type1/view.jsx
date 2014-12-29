/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../../../common/react-selectize');
var Panel = require('./panel');

var AssetViewType1 = React.createClass({
    handleScreenChange: function() {

    },

    render: function() {
        var panels = this.props.screen.panels.map(function(el) {
            return <Panel data={el} title={el.name}/>
        });
        return (
            <div>
                <h1 className="page-title">Search results: <span className="page-title__param">test</span></h1>
                <nav className="back-nav">
                    <a href="" className="link link_second"><span className="icon icon_arrow-c_right"></span>Back to search</a>
                </nav>
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <ReactSelectize
                            items={this.props.screens}
                            value={this.props.selectedScreen}
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
                        {panels}
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
module.exports = AssetViewType1;
