var React = require('react');
var PropTypes = React.PropTypes;

var TranslatedMessage = React.createClass({

    propTypes: {
        messageId: PropTypes.string.isRequired
    },

    render: function() {
        let messageId = this.props.messageId;
        return (
            <span>{document.l10n.getSync(messageId)}</span>
        );
    }

});

module.exports = TranslatedMessage
