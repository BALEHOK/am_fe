var React = require('react');
var PropTypes = React.PropTypes;
var Flux = require('delorean').Flux;
var LocaleDispatcher = require('../../dispatchers/LocaleDispatcher');
var LocaleActions = require('../../actions/LocaleActions');
var LocalesManifest = require('json!../../../locales/browser.json');

var LocaleSwitcher = React.createClass({
    mixins: [Flux.mixins.storeListener],

    watchStores: ['locale'],

    getDefaultProps: function() {
        return {
            dispatcher: LocaleDispatcher,
            actions: new LocaleActions(LocaleDispatcher),
            locales: LocalesManifest.locales
        };
    },

    handleClick: function(locale) {
        this.props.actions.changeLocale(locale);
    },

    render: function() {
        return (
            <ul className="locale-switcher">
                {this.props.locales.map(
                    (locale, index) =>
                        <li
                            className={locale === this.state.stores.locale.currentLocale ? 'locale-switcher__item locale-switcher__item_active' : 'locale-switcher__item'}
                            onClick={this.handleClick.bind(this, locale)}
                            key={index}
                        >
                            <span className={'icon icon_locale_' + locale}></span>
                        </li>
                )}
            </ul>
        );
    }

});

module.exports = LocaleSwitcher
