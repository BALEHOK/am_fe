import React from 'react';
import {Link} from 'react-router';

import SearchByTypeForm from './searchByTypeForm.jsx';
import SearchDispatcher from '../../../dispatchers/SearchDispatcher';
import SearchByTypeActions from '../../../actions/SearchByTypeActions';
import L20nMessage from '../../intl/l20n-message';

export default class SearchByTypePage extends React.Component {
    static displayName = 'By type';

    constructor(props) {
        super();

        this.dispatcher = SearchDispatcher;
        this.byTypeActions = new SearchByTypeActions(this.dispatcher);
    }

    render() {
        return (
            <div>
                <h1 className="page-title">{L20nMessage('searchTypeTitle', 'Search by type')}</h1>
                <div className='tabs'>
                    <nav className='tabs-navigation'>
                        <ul className='tabs-menu'>
                            <li className='tabs-menu-item'>
                                <Link to="/search">{L20nMessage('searchTabSimple', 'Simple')}</Link>
                            </li>
                            <li className='tabs-menu-item is-active'>
                                <Link to="/search/type">{L20nMessage('searchTabType', 'By type')}</Link>
                            </li>
                        </ul>
                    </nav>
                    <article className='tab-panel'>
                        <SearchByTypeForm actions={this.byTypeActions} dispatcher={this.dispatcher} />
                    </article>
                </div>
            </div>
        );
    }
}
