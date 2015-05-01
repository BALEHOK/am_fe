/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var fileapi = require('fileapi');

var File = React.createClass({

    componentDidMount: function() {
        fileapi.event.on(this.refs.fel.getDOMNode(), 'change', this.handleFile);
    },

    handleFile: function(evt) {
        this.props.onStart();
        var files = fileapi.getFiles(evt);
        fileapi.upload({
            url: APIURL + '/api/uploads',
            headers: {
                Authorization: 'Bearer ' + app.tokenStore.getToken()
            },
            files: {
                file: files[0]
            },
            data: {
                assetTypeId: this.props.assetTypeId,
                assetId: this.props.assetId,
                attributeId: this.props.attributeId
            },
            complete: (err, xhr) => {
                this.props.onUpload(JSON.parse(xhr.responseText));
            }
        });
    },

    valueChanged: function(event) {
        // this.validate({id: this.props.params.id, value: this.props.params.value});
    },

    render: function() {
        return (
            <input type="file" name="files" ref="fel" />
        );
    }
});

module.exports = File;
