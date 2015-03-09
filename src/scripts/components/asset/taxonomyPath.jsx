/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Link = Router.Link;

var TaxonomyLink = React.createClass({
    render: function() {
        var taxonomy = this.props.taxonomy;
        if (taxonomy.assetType) {
            return (
                <span>
                    {taxonomy.assetType.displayName}
                </span>
            );
        } else {
            return (
                <span>
                    {taxonomy.name}
                    &nbsp;<span className="icon icon_arrow_right"></span>&nbsp;
                    {taxonomy.child ? <TaxonomyLink taxonomy={taxonomy.child} /> : false}
                </span>
            );
        }
    }
});

var TaxonomyPath = React.createClass({
    render: function() {        
    	return <nav className="nav-block">
    			    <span className="nav-block__title nav-block__title_type_second">Asset type</span>
    			    <div className="nav-block__item">  
                        {this.props.taxonomyPath ? <TaxonomyLink taxonomy={this.props.taxonomyPath} /> : false} 
    			    </div>
    			</nav>           
    }
});
module.exports = TaxonomyPath;
