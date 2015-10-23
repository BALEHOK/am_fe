var React = require('react');
var PropTypes = React.PropTypes;
var Flux = require('delorean').Flux;
var LocaleDispatcher = require('../../dispatchers/LocaleDispatcher');

var TranslatedMessage = React.createClass({
    mixins: [Flux.mixins.storeListener],

    watchStores: ['locale'],

    propTypes: {
        messageId: PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            dispatcher: LocaleDispatcher
        };
    },

    render: function() {
        let messageId = this.props.messageId;
        let locale = this.state.stores.locale;
        return (
            <span>{locale.ready ? locale.ctx.getSync(messageId) : ''}</span>
        );
    }

});

module.exports = TranslatedMessage
