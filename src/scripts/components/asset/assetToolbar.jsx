/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');

var AssetToolbar = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            deleted: false
        };
    },
    handleTransition(route) {
        var params = this.context.router.getCurrentParams();
        this.context.router.transitionTo(route, params);
    },
    handleAssetDeletion() {
        this.props.onAssetDelete();
        this.setState({
            deleted: true
        });
    },
    handleAssetRestoration() {
        this.props.onAssetRestore();
        this.setState({
            deleted: false
        });
    },
    isCurrentButtonVisible() {
        return this.props.isHistory
            && !this.props.isDeleted;
    },
    isHistoryButtonVisible() {
        return !this.props.isHistory
            && !this.props.isDeleted;
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
            <div className="asset-controls-panel-wrapper">
                <div className="asset-controls-panel">
                    <div className="inputs-line inputs-line_width_full">
                        {this.isCurrentButtonVisible()
                            ?   <button className="btn btn_type_second btn_size_small"
                                                onClick={this.handleTransition.bind(this, 'asset-view')}>
                                    <i className="btn__icon btn__icon_history"></i>Current version
                                </button>
                            :   null
                        }

                        {this.isHistoryButtonVisible()
                            ?   <button className="btn btn_type_second btn_size_small"
                                                onClick={this.handleTransition.bind(this, 'asset-history')}>
                                    <i className="btn__icon btn__icon_history"></i>History
                                </button>
                            :   null
                        }

                        {this.isEditButtonVisible()
                            ?   <button className="btn btn_type_second btn_size_small"
                                              onClick={this.handleTransition.bind(this, 'asset-edit')}>
                                    <i className="btn__icon btn__icon_edit"></i>Edit
                                </button>
                            :   null
                        }

                        {this.isDeleteButtonVisible()
                            ?   <button className='btn btn_type_warning btn_size_small pull-right'
                                      onClick={this.handleAssetDeletion}>
                                    <i className='btn__icon btn__icon_cross'></i>
                                    Delete
                                </button>
                            :   null
                        }

                        {this.isRestoreButtonVisible()
                            ?   <button className='btn btn_type_second btn_size_small pull-right'
                                      onClick={this.handleAssetRestoration}>
                                    <i className='btn__icon btn__icon_undo'></i>
                                    Restore
                                </button>
                            :   null
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AssetToolbar;
