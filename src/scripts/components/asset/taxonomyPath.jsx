/**
 * @jsx React.DOM
 */

var React = require('react');
var Flux = require('delorean').Flux;
var Router = require('react-router');
var Link = Router.Link;

var TaxonomyPath = React.createClass({
	mixins:[Router.State, Flux.mixins.storeListener],
    componentWillMount: function() {
        var params = this.getParams();    
        this.props.actions.loadTaxonomyPath(params.assetTypeUid);
    },
    render: function() {
    	var path = this.state.stores.asset.taxonomyPath;
    	console.log(path);
    	return (
			<nav className="nav-block">
			    <span className="nav-block__title nav-block__title_type_second">Asset type</span>
			    <div className="nav-block__item">
			        <span>System <span className="icon icon_arrow_right"></span> <a href="#">admin</a></span>
			    </div>
			</nav>
        );
    }
});
module.exports = TaxonomyPath;
