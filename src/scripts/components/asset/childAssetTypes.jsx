import React from 'react/addons'

export default class ChildAssetTypesSidebar extends React.Component {

    constructor() {
        super();
    }

    render() {
        var items = this.props.childAssetTypes.map((g, i) => {
            return <li key={i} className="nav-block__item">
                <a onClick={this.props.onClick.bind(this, g)} className="link link_second">{g.assetTypeName} {g.attributeName}</a>
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
