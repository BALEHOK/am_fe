import React from 'react/addons'
import Router from 'react-router'
import {_} from 'underscore'
import L20nMessage from '../intl/l20n-message'

export default class ChildAssetTypes extends React.Component {

    render() {
        var currentParams = this.context.router.getCurrentParams();
        var items = this.props.childAssetTypes.map((g, i) => {
            var params = {
                assetType: g.dynEntityConfigId,
                attributeId: g.dynEntityAttribConfigId,
                assetId: currentParams.assetId
            };
            return <li key={i} className="nav-block__item">
                <Router.Link to="result" query={params}>{g.assetTypeName} ({g.attributeName})</Router.Link>
            </li>
        });
        return _.size(items) > 0
            ? <nav className="nav-block">
                <span className="nav-block__title nav-block__title_type_second">
                    {L20nMessage('assetPageChildType', 'Child asset types')}
                </span>
                <ul className="nav-block__list">
                    {items}
                </ul>
             </nav>
            : false;
    }
}

ChildAssetTypes.contextTypes = {
    router: React.PropTypes.func.isRequired
}
