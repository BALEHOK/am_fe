var React = require('react');
var Flux = require('delorean').Flux;
var Loader = require('../common/loader.jsx');
var L20nMessage = require('../intl/l20n-message');

var ContactForm = React.createClass({
    mixins:[Flux.mixins.storeListener],

    watchStores: ['contact'],

    onSubmit: function(e) {
        e.preventDefault();
        var subject = React.findDOMNode(this.refs.subject).value;
        var message = React.findDOMNode(this.refs.message).value;
        this.props.actions.sendMessage({
            subject: subject,
            message: message
        });
    },

    render: function() {
        return (
            <Loader loading={this.state.stores.contact.loading}>
                <div>
                    <h1 className="page-title">{L20nMessage('contactTitle', 'Contact us')}</h1>
                    <p>{L20nMessage('contactIntro', 'If you have any questions, comments or suggestions please contact us')}</p>
                    <form onSubmit={this.onSubmit} className="contact-form">
                        <label className="input-txt input-txt_width_full">
                            <span className="input-txt__title">{L20nMessage('contactSubject', 'Subject')} *</span>
                            <input type="text" className="input-txt__field" ref="subject" required/>
                        </label>
                        <label className="input-txt input-txt_width_full">
                            <span className="input-txt__title">{L20nMessage('contactMsg', 'Message')} *</span>
                            <textarea name="" id="" className="input-txt__field input-txt__field_area" ref="message" required></textarea>
                        </label>
                        <div className="contact-form__controls txt-right">
                            <button className="btn">{L20nMessage('contactSend', 'Send')}</button>
                        </div>
                    </form>
                </div>
            </Loader>
        )
    }
});

module.exports = ContactForm;
