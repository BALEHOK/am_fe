/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Flux = require('delorean').Flux;

var RefinementLink = React.createClass({

    onRefinementChanged: function(id) {
        var filter = {};
        filter[this.props.type] = id;
        filter['page'] = 1;
        this.props.actions.changeSearchFilter(filter);
    },

    onRefinementClear: function() {
        var filter = {};
        filter[this.props.type] = undefined;
        filter['page'] = 1;
        this.props.actions.changeSearchFilter(filter);
    },

    render: function() {
        return (
            <li className="nav-block__item">
                <span onClick={this.onRefinementChanged.bind(this, this.props.data.id)} className="link link_second">{this.props.data.name}&nbsp;
                    <span className="light-grey">({this.props.data.count})</span>
                </span>
                &nbsp;
                {this.props.filters[this.props.type]
                    ? <span onClick={this.onRefinementClear} className="nav-block__item-clear"><span className="icon icon_cross"></span></span>
                    : <span/>
                }
            </li>
        );
    }
});

module.exports = RefinementLink;
