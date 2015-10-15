/**
 * @jsx React.DOM
 */

import React from 'react';
import {RouteHandler} from 'react-router';
import reactMixin from 'react-mixin';
import AuthenticatedRouteMixin from '../../mixins/AuthenticatedRouteMixin';

@reactMixin.decorate(AuthenticatedRouteMixin)
export default class SearchByTypePage extends React.Component {
    static displayName = 'Search';

    render() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
}
