/**
 * @jsx React.DOM
 */
var React = require('react');

var ContactForm = React.createClass({

    render: function() {
        return (
            <form action="" className="contact-form">
                <label className="input-txt input-txt_width_full">
                    <span className="input-txt__title">Subject *</span>
                    <input type="text" className="input-txt__field" required/>
                </label>
                <label className="input-txt input-txt_width_full">
                    <span className="input-txt__title">Message *</span>
                    <textarea name="" id="" className="input-txt__field input-txt__field_area" required></textarea>
                </label>
                <div className="contact-form__controls txt-right">
                    <button className="btn">Send</button>
                </div>
            </form>
        )
    }
});

module.exports = ContactForm;
