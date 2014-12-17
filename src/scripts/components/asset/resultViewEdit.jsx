/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactSelectize = require('../common/react-selectize');

var resultViewEdit = React.createClass({
    handleScreenChange: function() {

    },
    render: function() {
        return (
            <div>
                <h1 className="page-title">Edit: <span className="page-title__param">test1</span></h1>
                <nav className="back-nav">
                    <span className="light-grey">[r.1  -  11/21/2013 11:23:10 PM]</span>
                </nav>
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
                    </div>
                    <div className="grid__item ten-twelfths">
                        <div className="asset-data asset-data_aside_true">
                            <div className="asset-data__header">
                                <span className="asset-data__title">General</span>
                            </div>
                            <div className="asset-data__content">
                                <form className="asset-data__form">
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Name:</span>
                                        <label className="input-txt input-txt_size_small">
                                            <input type="text" className="input-txt__field" />
                                        </label>
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Revision:</span>
                                        <strong>1</strong>
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Location:</span>
                                        <div className="input-group">
                                            <ReactSelectize
                                                items={[
                                                    { name: "Arlon", id: "1" },
                                                    { name: "Antwerp", id: "2" },
                                                    { name: "Bruges", id: "3" },
                                                    { name: "Brussels", id: "4" }
                                                ]}
                                                value={0}
                                                onChange={this.handleScreenChange}
                                                selectId="select-locationn"
                                                placeholder=" "
                                                label=" "
                                                className="select_size_small"
                                            />
                                            <button className="btn btn_size_small btn_type_second">
                                                <i className="btn__icon btn__icon_plus_circle"></i>
                                            </button>
                                        </div>

                                        &nbsp;&nbsp;&nbsp;Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Base Location:</span>
                                        <div className="input-group">
                                            <ReactSelectize
                                                items={[
                                                    { name: "Arlon", id: "1" },
                                                    { name: "Antwerp", id: "2" },
                                                    { name: "Bruges", id: "3" },
                                                    { name: "Brussels", id: "4" }
                                                ]}
                                                value={0}
                                                onChange={this.handleScreenChange}
                                                selectId="select-base-location"
                                                placeholder=" "
                                                label=" "
                                                className="select_size_small"
                                            />
                                            <button className="btn btn_size_small btn_type_second">
                                                <i className="btn__icon btn__icon_plus_circle"></i>
                                            </button>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Next Location:</span>
                                        <div className="input-group">
                                            <ReactSelectize
                                                items={[
                                                    { name: "Arlon", id: "1" },
                                                    { name: "Antwerp", id: "2" },
                                                    { name: "Bruges", id: "3" },
                                                    { name: "Brussels", id: "4" }
                                                ]}
                                                value={0}
                                                onChange={this.handleScreenChange}
                                                selectId="select-next-location"
                                                placeholder=" "
                                                label=" "
                                                className="select_size_small"
                                            />
                                            <button className="btn btn_size_small btn_type_second">
                                                <i className="btn__icon btn__icon_plus_circle"></i>
                                            </button>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Department:</span>
                                        <div className="input-group">
                                            <ReactSelectize
                                                items={[
                                                    { name: "Arlon", id: "1" },
                                                    { name: "Antwerp", id: "2" },
                                                    { name: "Bruges", id: "3" },
                                                    { name: "Brussels", id: "4" }
                                                ]}
                                                value={0}
                                                onChange={this.handleScreenChange}
                                                selectId="select-department"
                                                placeholder=" "
                                                label=" "
                                                className="select_size_small"
                                            />
                                            <button className="btn btn_size_small btn_type_second">
                                                <i className="btn__icon btn__icon_plus_circle"></i>
                                            </button>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">User:</span>
                                        <div className="input-group">
                                            <ReactSelectize
                                                items={[
                                                    { name: "Admin", id: "1" },
                                                    { name: "user", id: "2" }
                                                ]}
                                                value={1}
                                                onChange={this.handleScreenChange}
                                                selectId="select-user"
                                                placeholder=" "
                                                label=" "
                                                className="select_size_small"
                                            />
                                            <button className="btn btn_size_small btn_type_second">
                                                <i className="btn__icon btn__icon_plus_circle"></i>
                                            </button>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Owner:</span>
                                        <div className="input-group">
                                            <ReactSelectize
                                                items={[
                                                    { name: "Admin", id: "1" },
                                                    { name: "user", id: "2" }
                                                ]}
                                                value={1}
                                                onChange={this.handleScreenChange}
                                                selectId="select-owner"
                                                placeholder=" "
                                                label=" "
                                                className="select_size_small"
                                            />
                                            <button className="btn btn_size_small btn_type_second">
                                                <i className="btn__icon btn__icon_plus_circle"></i>
                                            </button>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Update user:</span>
                                        <a href="#">admin</a> | Related items
                                    </div>
                                    <div className="asset-data__param">
                                        <span className="asset-data__param-title">Update date:</span>
                                        9/1/2014 11:13:47 AM
                                    </div>
                                    <div className="asset-data__aside">
                                        <p>Barcode:</p>
                                        <img src="assets/images/barcode.png"/>
                                        <label className="input-txt input-txt_width_full input-txt_size_small">
                                            <input type="text" className="input-txt__field" />
                                        </label>
                                        <p>Document:</p>
                                        <button className="btn btn_type_second btn_size_small">
                                            Attach document
                                            <input type="file" name=" " className="input-file"/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="inputs-line inputs-line_width_full">
                            <button className="btn btn_size_small">Save</button>
                            <button className="btn btn_type_second btn_size_small">Save and Add new</button>
                            <button className="btn btn_type_second btn_size_small">
                                <i className="btn__icon btn__icon_undo"></i>Undo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = resultViewEdit;
