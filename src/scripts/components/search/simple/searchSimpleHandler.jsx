/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var SearchSimpleForm = require('./searchSimpleForm');
var L20nMessage = require('../../intl/l20n-message');

var SearchDispatcher = require('../../../dispatchers/SearchDispatcher');
var SearchMainActions = require('../../../actions/SearchMainActions');

var SearchPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    displayName: L20nMessage('searchTabSimple', 'Simple'),

    componentWillMount: function() {
        this.dispatcher = SearchDispatcher;
        this.actions = new SearchMainActions(this.dispatcher);
    },

    render: function() {
        return (
            <div>
                <h1 className="page-title">{L20nMessage('searchTitle', 'Search')}</h1>
                <div className='tabs'>
                    <nav className='tabs-navigation'>
                        <ul className='tabs-menu'>
                            <li className='tabs-menu-item is-active'>
                                <Link to="/search">{L20nMessage('searchTabSimple', 'Simple')}</Link>
                            </li>
                            <li className='tabs-menu-item'>
                                <Link to="/search/type">{L20nMessage('searchTabType', 'By type')}</Link>
                            </li>
                        </ul>
                    </nav>
                    <article className='tab-panel'>
                        <SearchSimpleForm changeFilter={this.actions.changeSearchFilter.bind(this.actions)} dispatcher={this.dispatcher} />
                    </article>
                </div>
            </div>
      );
    }
});
module.exports = SearchPage;
