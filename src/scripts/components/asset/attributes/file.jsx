/**
 * @jsx React.DOM
 */

var React = require('react');
var cx = require('classnames');
var fileapi = require('fileapi');
var LoginStore = require('../../../stores/LoginStore').store;

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
                Authorization: 'Bearer ' + LoginStore.access_token
            },
            files: {
                file: files[0]
            },
            complete: (err, xhr) => {
                var response = JSON.parse(xhr.responseText);
                if (!err) {
                    this.props.onUpload(response.filename, response.imageUrl);
                }
                else if (err && xhr.status == 400 && _.isFunction(this.props.onUploadFail)) {
                    this.props.onUploadFail(response.message);
                }
            }
        });
    },

    render: function() {
        return (
            <input type="file" name="files" ref="fel" />
        );
    }
});

module.exports = File;
