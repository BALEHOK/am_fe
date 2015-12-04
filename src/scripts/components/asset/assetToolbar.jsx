/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var closestToOffset = require('../../util/closestToOffsetTop');
var L20nMessage = require('../intl/l20n-message');

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
        let offsetTop = document.querySelector('.asset-controls-panel').offsetHeight + 20;
        let elem = closestToOffset('[data-param-id]', offsetTop, 0);
        this.props.actions.saveTopElemPos(elem.getAttribute('data-param-id'));
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
                        <button className="btn btn_type_second btn_size_small"
                                onClick={window.print}>
                            <i className="btn__icon btn__icon_print"></i>{L20nMessage('toolBarBtnPrint', 'Print')}
                        </button>
                        {this.isCurrentButtonVisible()
                            ?   <button className="btn btn_type_second btn_size_small"
                                                onClick={this.handleTransition.bind(this, 'asset-view')}>
                                    <i className="btn__icon btn__icon_history"></i>{L20nMessage('toolBarBtnCurrentVersion', 'Current version')}
                                </button>
                            :   null
                        }

                        {this.isHistoryButtonVisible()
                            ?   <button className="btn btn_type_second btn_size_small"
                                                onClick={this.handleTransition.bind(this, 'asset-history')}>
                                    <i className="btn__icon btn__icon_history"></i>
                                    {L20nMessage('toolBarBtnHistory', 'History')}
                                </button>
                            :   null
                        }

                        {this.isEditButtonVisible()
                            ?   <button className="btn btn_type_second btn_size_small"
                                              onClick={this.handleTransition.bind(this, 'asset-edit')}>
                                    <i className="btn__icon btn__icon_edit"></i>
                                    {L20nMessage('toolBarBtnEdit', 'Edit')}
                                </button>
                            :   null
                        }

                        {this.isDeleteButtonVisible()
                            ?   <button className='btn btn_type_warning btn_size_small pull-right'
                                      onClick={this.handleAssetDeletion}>
                                    <i className='btn__icon btn__icon_cross'></i>
                                    {L20nMessage('toolBarBtnDelete', 'Delete')}
                                </button>
                            :   null
                        }

                        {this.isRestoreButtonVisible()
                            ?   <button className='btn btn_type_second btn_size_small pull-right'
                                      onClick={this.handleAssetRestoration}>
                                    <i className='btn__icon btn__icon_undo'></i>
                                    {L20nMessage('toolBarBtnRestore', 'Restore')}
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
