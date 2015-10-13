/**
 * @jsx React.DOM
 */
var React = require('react');
var AuthenticatedRouteMixin = require('../../mixins/AuthenticatedRouteMixin');
var FaqAssets = require('./faqAsets.jsx');

var FAQ = [
    {
        "question": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        "question": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        "question": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        "question": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

var FaqHandler = React.createClass({
    mixins:[AuthenticatedRouteMixin],

    displayName: 'Faq',

    render: function() {
        return (
            <div>
                <h1 className="page-title">FAQ</h1>
                <div className="grid">
                    <div className="grid__item two-twelfths">
                        <button className="btn" href="#">Add FAQ item</button>
                    </div>
                    <div className="grid__item ten-twelfths">
                        <FaqAssets list={FAQ}/>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FaqHandler;
