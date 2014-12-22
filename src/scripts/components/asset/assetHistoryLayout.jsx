/**
 * @jsx React.DOM
 */

var React = require('react');

var AssetHistoryLayout = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className="page-title"><span className="icon icon_history"></span>Asset history - <span className="page-title__param">test</span></h1>
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <a href="" className="back-btn"><span className="icon icon_arrow-c_right"></span>Current revision</a>
                        <nav className="nav-block">
                            <span className="nav-block__title nav-block__title_type_second">Category</span>
                            <div className="nav-block__item">
                                <span>System <span className="icon icon_arrow_right"></span> <a href="#">AssetTest</a></span>
                            </div>
                        </nav>
                    </div>
                    <div className="grid__item ten-twelfths">
                        <table className="table">
                            <tr>
                                <th width="11%">Revision</th>
                                <th width="15%">Update</th>
                                <th width="14%">Field</th>
                                <th width="27%">Revision Value</th>
                                <th width="27%">Old Value</th>
                                <th width="6%"><span className="small">Action</span></th>
                            </tr>
                            <tr>
                                <td width="11%">1</td>
                                <td width="15%">
                                    12. 1. 1923 <br/>
                                    12:00:00 AM <br/>
                                    <a href="#">Admin</a>
                                </td>
                                <td width="68%" colSpan="3">
                                    <div className="field-cell">
                                        <span className="field-cell__name">[address]</span>
                                        <span className="field-cell__value">
                                            Otto-Lilienthal-Straße 25 <br/>
                                            Friedrichshafen, Germany
                                        </span>
                                        <span className="field-cell__value field-cell__value_old">
                                            Otto-Lilienthal-Straße 25 <br/>
                                            Friedrichshafen, Germany
                                        </span>
                                    </div>
                                </td>
                                <td width="6%">
                                    <a className="link link_second" href="#"><span className="icon icon_eye"></span></a>
                                </td>
                            </tr>
                            <tr>
                                <td width="11%">2</td>
                                <td width="15%">
                                    12. 1. 1923 <br/>
                                    12:00:00 AM <br/>
                                    <a href="#">Admin</a>
                                </td>
                                <td width="68%" colSpan="3">
                                    <div className="field-cell">
                                        <span className="field-cell__name">[address]</span>
                                        <span className="field-cell__value">
                                            Lise-Meitner-Straße 14, Ulm, Germany
                                        </span>
                                        <span className="field-cell__value field-cell__value_old">
                                            Meitner-Weg 14, Ulm, Germany
                                        </span>
                                    </div>
                                </td>
                                <td width="6%">
                                    <a className="link link_second"  href="#"><span className="icon icon_eye"></span></a>
                                </td>
                            </tr>
                            <tr>
                                <td width="11%">3</td>
                                <td width="15%">
                                    12. 1. 1923 <br/>
                                    12:00:00 AM <br/>
                                    <a href="#">Admin</a>
                                </td>
                                <td width="68%" colSpan="3">
                                    <div className="field-cell">
                                        <span className="field-cell__name">[hq_address]</span>
                                        <span className="field-cell__value">
                                            <span className="field-cell__deleted">Field was deleted</span>
                                        </span>
                                    </div>
                                </td>
                                <td width="6%">
                                    <a className="link link_second"  href="#"><span className="icon icon_eye"></span></a>
                                </td>
                            </tr>
                            <tr>
                                <td width="11%">4</td>
                                <td width="15%">
                                    12. 1. 1923 <br/>
                                    12:00:00 AM <br/>
                                    <a href="#">Admin</a>
                                </td>
                                <td width="68%" colSpan="3">
                                    <div className="field-cell">
                                        <span className="field-cell__name">[map_test]</span>
                                        <span className="field-cell__value">
                                            <span className="field-cell__created">Field was created</span>
                                        </span>
                                    </div>
                                </td>
                                <td width="6%">
                                    <a className="link link_second"  href="#"><span className="icon icon_eye"></span></a>
                                </td>
                            </tr>
                            <tr>
                                <td width="11%">5</td>
                                <td width="15%">
                                    12. 1. 1923 <br/>
                                    12:00:00 AM <br/>
                                    <a href="#">Admin</a>
                                </td>
                                <td width="68%" colSpan="3">
                                    <div className="field-cell">
                                        <span className="field-cell__name">[user_test]</span>
                                        <span className="field-cell__value">
                                            <span className="field-cell__created">Field was created</span>
                                        </span>
                                    </div>
                                    <div className="field-cell">
                                        <span className="field-cell__name">[hq_address]</span>
                                        <span className="field-cell__value">
                                            Gehringstraße 20, 13088 Berlin, <br/>
                                            Germany
                                        </span>
                                        <span className="field-cell__value field-cell__value_old">
                                            Gehring weg 15, 13088 Ulm, <br/>
                                            Germany
                                        </span>
                                    </div>
                                    <div className="field-cell">
                                        <span className="field-cell__name">[location_gps]</span>
                                        <span className="field-cell__value">
                                            44.22255 , 55,12188
                                        </span>
                                        <span className="field-cell__value field-cell__value_old">
                                            42.511 , 50,1588
                                        </span>
                                    </div>
                                </td>
                                <td width="6%">
                                    <a className="link link_second"  href="#"><span className="icon icon_eye"></span></a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetHistoryLayout;
