var React = require('react');
import fetch from "../../util/fetch";

var ContactForm = React.createClass({

    onSubmit: function(e) {
        e.preventDefault();
        console.log('submit');
        var subject = React.findDOMNode(this.refs.subject).value;
        var message = React.findDOMNode(this.refs.message).value;
        var response = fetch('/api/Contacts').post({
             subject: subject,
             message: message,
        });
    },

    render: function() {
        return (
            <form onSubmit={this.onSubmit} className="contact-form">
                <label className="input-txt input-txt_width_full">
                    <span className="input-txt__title">Subject *</span>
                    <input type="text" className="input-txt__field" ref="subject" required/>
                </label>
                <label className="input-txt input-txt_width_full">
                    <span className="input-txt__title">Message *</span>
                    <textarea name="" id="" className="input-txt__field input-txt__field_area" ref="message" required></textarea>
                </label>
                <div className="contact-form__controls txt-right">
                    <button className="btn">Send</button>
                </div>
            </form>
        )
    }
});

module.exports = ContactForm;
