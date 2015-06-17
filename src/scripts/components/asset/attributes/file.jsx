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
        var url = APIURL + `/api/uploads?assetTypeId=${this.props.assetTypeId}&attributeId=${this.props.attributeId}`;
        if (this.props.assetId)
            url += `&assetId=${this.props.assetId}`;
        fileapi.upload({
            url: url,
            headers: {
                Authorization: 'Bearer ' + app.tokenStore.getToken()
            },
            files: {
                file: files[0]
            },
            complete: (err, xhr) => {
                var response = JSON.parse(xhr.responseText);
                if (!err)
                    this.props.onUpload(response.filename, response.imageUrl);
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
