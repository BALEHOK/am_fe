/**
 * @jsx React.DOM
 */

var React = require('react'),
    NoteModel = require('./noteModel.ts'),
    Note = require('./note'),
    note = new NoteModel();

var Page = React.createClass({

    render: function() {

        return (
            <div>
                <Note model={note}/>
            </div>
        );

    }

});

module.exports = Page;
