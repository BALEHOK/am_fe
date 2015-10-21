import React from 'react/addons'
import Router from 'react-router'

class ChildAssetTypes extends React.Component {

    constructor() {
        super();
    }

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
                <span className="nav-block__title nav-block__title_type_second">Child asset types</span>
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

export default ChildAssetTypes;
