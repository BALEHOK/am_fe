var React = require('react');
var PropTypes = React.PropTypes;
var Flux = require('delorean').Flux;

function connectToIntlStore(Component) {

    var IntlConnection = React.createClass({
        mixins: [Router.Navigation, LoaderMixin, Flux.mixins.storeListener],

        watchStores: ['locale'],

        render: function() {
            console.log(this);
            return (
                <Component {...this.props} />
            );
        }

    });

    return IntlConnection;
}

export default connectToIntlStore;
