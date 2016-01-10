/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Link = Router.Link;
var L20nMessage = require('../intl/l20n-message');

var TaxonomyLink = React.createClass({
    render: function() {
        var assetTypeName = this.props.assetTypeName;
        var taxonomyPath = this.props.taxonomyPath || {};
        return (
            <span>
                <span>
                    {taxonomyPath.name}
                    &nbsp;<span className="icon icon_arrow_right"></span>&nbsp;
                    {taxonomyPath.child ? <TaxonomyLink assetTypeName={assetTypeName}
                                            taxonomyPath={taxonomyPath.child} />
                                        : false}
                    {assetTypeName ? assetTypeName : false}
                </span>
                <br/>
            </span>
        );
    }
});

var TaxonomyPath = React.createClass({
    render: function() {

        var taxonomies = [];
        if (this.props.taxonomy){
            if (this.props.taxonomy.taxonomyPath && this.props.taxonomy.taxonomyPath.length){
                taxonomies = this.props.taxonomy.taxonomyPath.map(t =>
                    <TaxonomyLink assetTypeName={this.props.taxonomy.assetType.displayName}
                        taxonomyPath={t} />)
            } else {
                taxonomies.push(<TaxonomyLink assetTypeName={this.props.taxonomy.assetType.displayName} />)
            }
        }

    	return <nav className="nav-block">
    			    <span className="nav-block__title nav-block__title_type_second">{L20nMessage('assetPageType', 'Asset type')}</span>
    			    <div className="nav-block__item">
                        {taxonomies}
    			    </div>
    			</nav>
    }
});
module.exports = TaxonomyPath;
