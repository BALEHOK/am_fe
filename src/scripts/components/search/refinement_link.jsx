/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var RefinementLink = React.createClass({
    render: function() {
        return (
            <li className="nav-block__item">
                <span onClick={this.props.onRefinementChanged.bind(this, this.props.data.id)} className="link link_second">{this.props.data.name}&nbsp;
                    <span className="light-grey">({this.props.data.count})</span>
                </span>
                &nbsp;
                {this.props.taxonomy || this.props.assetType
                    ? <span onClick={this.props.onRefinementClear.bind(this, this.props.data.id)} className="nav-block__item-clear"><span className="icon icon_cross"></span></span>
                    : <span/>
                }
            </li>
        );
    }
});

module.exports = RefinementLink;