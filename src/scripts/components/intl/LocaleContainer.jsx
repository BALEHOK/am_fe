var React = require('react');
var Flux = require('delorean').Flux;
var LocaleDispatcher = require('../../dispatchers/LocaleDispatcher');

var LocaleContainer = React.createClass({
    mixins: [Flux.mixins.storeListener],

    watchStores: ['locale'],

    getDefaultProps: function() {
        return {
            dispatcher: LocaleDispatcher
        };
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (this.state.stores.locale.currentLocale !== nextState.stores.locale.currentLocale) {
            this.forceUpdate();
        }
    },

    render: function() {
        let locale = this.state.stores.locale;
        if (locale.ready) {
            return(this.props.children)
        } else return null
    }

});

module.exports = LocaleContainer
