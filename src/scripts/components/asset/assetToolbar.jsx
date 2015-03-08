/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var AssetToolbar = React.createClass({
    mixins: [Router.State, Router.Navigation],
    getInitialState() {
        return {
            deleted: false
        };
    },
    handleTransition(route) {
        var params = this.getParams();
        this.transitionTo(route, params);
    },
    handleAssetDeletion() {
        var deleted = this.state.deleted;
        
        if (!deleted)
            this.props.onAssetDelete();
        else
            this.props.onAssetRestore();

        this.setState({
            deleted: !deleted
        });
    },
    isEditButtonVisible() {
        return !this.props.isHistory 
            && !this.props.isDeleted 
            && this.props.canEdit;
    },
    isDeleteButtonVisible() {
        return !this.props.isHistory
            && !this.props.isDeleted 
            && this.props.canDelete;
    },
    isRestoreButtonVisible() {
        return this.props.isDeleted 
           // && this.state.deleted;
    },
    render: function() {
        return (
            <div className="inputs-line inputs-line_width_full">
                <button className="btn btn_type_second btn_size_small">
                    <i className="btn__icon btn__icon_print"></i>
                </button>

                {this.props.isHistory
                    ?   <button className="btn btn_type_second btn_size_small" 
                                onClick={this.handleTransition.bind(this, 'asset-view')}>
                            <i className="btn__icon btn__icon_history"></i>Current version
                        </button>
                    :   <button className="btn btn_type_second btn_size_small" 
                                onClick={this.handleTransition.bind(this, 'asset-history')}>
                            <i className="btn__icon btn__icon_history"></i>History
                        </button> 
                }

                {this.isEditButtonVisible()
                    ? <button className="btn btn_type_second btn_size_small" 
                             onClick={this.handleTransition.bind(this, 'asset-edit')}>
                         <i className="btn__icon btn__icon_edit"></i>Edit
                      </button> 
                    : ''
                }

                <button className="btn btn_type_second btn_size_small">
                    <i className="btn__icon btn__icon_docs"></i>Documents
                </button>

                {this.isDeleteButtonVisible()
                    ? <button className='btn btn_type_warning btn_size_small pull-right'
                            onClick={this.handleAssetDeletion}>
                        <i className='btn__icon btn__icon_cross'></i>
                        Delete
                     </button>
                    : ''
                }

                {this.isRestoreButtonVisible()
                    ? <button className='btn btn_type_second btn_size_small pull-right' 
                            onClick={this.handleAssetDeletion}>
                        <i className='btn__icon btn__icon_undo'></i>
                        Restore 
                      </button>
                    : ''
                }
            </div>
        );
    }
});

module.exports = AssetToolbar;