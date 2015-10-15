/**
 * @jsx React.DOM
 */

import React from 'react';
import {Link} from 'react-router';

import SearchByTypeForm from './searchByTypeForm.jsx';
import SearchByTypeDispatcher from '../../../dispatchers/SearchByTypeDispatcher';
import SearchByTypeActions from '../../../actions/SearchByTypeActions';

export default class SearchByTypePage extends React.Component {
    static displayName = 'By type';

    constructor(props) {
        super();

        this.byTypeDispatcher = SearchByTypeDispatcher;
        this.byTypeActions = new SearchByTypeActions(this.byTypeDispatcher);
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Search by type</h1>
                <div className='tabs'>
                    <nav className='tabs-navigation'>
                        <ul className='tabs-menu'>
                            <li className='tabs-menu-item'>
                                <Link to="/search">Simple</Link>
                            </li>
                            <li className='tabs-menu-item is-active'>
                                <Link to="/search/type">By type</Link>
                            </li>
                        </ul>
                    </nav>
                    <article className='tab-panel'>
                        <SearchByTypeForm actions={this.byTypeActions} dispatcher={this.byTypeDispatcher} />
                    </article>
                </div>
            </div>
        );
    }
}
