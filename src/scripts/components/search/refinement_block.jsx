/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Flux = require('delorean').Flux;
var RefinementLink = require('./refinement_link.jsx');

var RefinementBlock = React.createClass({

    getDefaultProps: function() {
        return {
            maxItems: 7
        };
    },
    getInitialState: function() {
        return {
            showAllRefinements: false
        };
    },
    toggleRefinementsView: function(state) {
        this.setState({showAllRefinements: state});
    },
    render: function() {
        var self = this;

        var refinementRows = this.state.showAllRefinements ? undefined : parseInt(this.props.maxItems);
        var refinementsList = this.props.list.slice(0, refinementRows);

        return (
            <nav className={this.props.navBlockClasses}>
                <span className="nav-block__title">{this.props.title}</span>
                <ul className="nav-block__list">
                    {refinementsList
                        .map(function(counter) {
                            return <RefinementLink
                                actions={self.props.actions}
                                type={self.props.type}
                                filters={self.props.filters}
                                key={counter.id}
                                data={counter}/>;
                        })}
                    {this.props.list.length > parseInt(this.props.maxItems) && !this.state.showAllRefinements
                        ? <li onClick={this.toggleRefinementsView.bind(this,true)} className="nav-block__item"><strong>More&nbsp;({this.props.list.length-refinementRows})&nbsp;<i className="icon icon_angle-d-right"></i></strong></li>
                        : {}
                    }
                    {this.props.list.length > parseInt(this.props.maxItems) && this.state.showAllRefinements
                        ? <li onClick={this.toggleRefinementsView.bind(this,false)} className="nav-block__item"><strong><i className="icon icon_angle-d-left"></i>&nbsp;Less</strong></li>
                        : {}
                    }
                </ul>
            </nav>
        );
    }
});

module.exports = RefinementBlock;
