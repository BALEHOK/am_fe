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
        var taxonomy = this.props.taxonomy;
        return (
            <span>
                <span>
                    {taxonomy.name}
                    &nbsp;<span className="icon icon_arrow_right"></span>&nbsp;
                    {taxonomy.child ? <TaxonomyLink taxonomy={taxonomy.child} /> : false}
                    {taxonomy.assetType ? taxonomy.assetType.displayName : false}
                </span>
                <br/>
            </span>
        );
    }
});

var TaxonomyPath = React.createClass({
    render: function() {
        var taxonomies = [];
        if (this.props.taxonomyPath && this.props.taxonomyPath.length){
            taxonomies = this.props.taxonomyPath.map(t => <TaxonomyLink taxonomy={t} />)
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
