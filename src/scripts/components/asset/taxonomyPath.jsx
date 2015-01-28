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
        return (
            <span>
                {taxonomy.name}
                &nbsp;<span className="icon icon_arrow_right"></span>&nbsp;
                {taxonomy.child ? <TaxonomyLink taxonomy={taxonomy.child} /> : <a href="#">admin</a>}
            </span>
        );
    }
});

var TaxonomyPath = React.createClass({
	mixins:[Flux.mixins.storeListener],
    render: function() {        
    	var path = this.state.stores.asset.taxonomyPath;   
    	return path  
            ?   <nav className="nav-block">
    			    <span className="nav-block__title nav-block__title_type_second">Asset type</span>
    			    <div className="nav-block__item">   
                        <TaxonomyLink taxonomy={path} />                  
    			    </div>
    			</nav>           
            :   <nav />;
    }
});
module.exports = TaxonomyPath;
