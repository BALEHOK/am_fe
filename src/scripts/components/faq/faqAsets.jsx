var React = require('react');
var cx = require('classnames');
var FaqItem = require('./faqItem.jsx');

var FaqAssets = React.createClass({

    getDefaultProps: function() {
        return {
            list: []
        };
    },

    renderItem: function(item, index) {
        var key = 'faq-item_' + index;
        return (
            <FaqItem title={item.question} content={item.answer} key={key}/>
        )
    },

    render: function() {
        return (
            <div className="accordion">
                {this.props.list.map(this.renderItem)}
            </div>
        );
    }

});

module.exports = FaqAssets;
