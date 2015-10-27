var React = require('react');
var Flux = require('delorean').Flux;
var ReactToastr = require('react-toastr');

var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var NotificationsContainer = React.createClass({
    mixins:[Flux.mixins.storeListener],

    watchStores: ['notifications'],

    componentWillUpdate: function(nextProps, nextState) {
        if (!_.isEqual(this.state.stores.notifications.notification, nextState.stores.notifications.notification)) {
            let notification = nextState.stores.notifications.notification;
            if (notification.type === 'error') {
                this.refs.toastr.error(
                    notification.msg,
                    'Error', {
                        timeOut: 5000,
                        extendedTimeOut: 8000,
                        closeButton: true
                    }
                );
            }
            if (notification.type === 'success') {
                this.refs.toastr.success(
                    notification.msg,
                    'Success', {
                        timeOut: 5000,
                        extendedTimeOut: 8000,
                        closeButton: true
                    }
                );
            }
            this.props.actions.clear();
        }
    },

    render: function() {
        return (
            <div>
                <ToastContainer
                    ref="toastr"
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                />
            </div>
        );
    }

});

module.exports = NotificationsContainer;
