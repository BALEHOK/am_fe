import React from 'react';
import classNames from 'classnames';
import DeloreanComponent from '../../common/DeloreanComponent';
import Loader from'../../common/loader.jsx';
import LoaderMixin from'../../../mixins/LoaderMixin';
import ReactSelectize from '../../common/react-selectize';
import AttributesTableHeader from './attributesTableHeader';
import AttributeRows from './attributeRows';
import RowsControls from './rowsControls';
import SearchQueryDisplay from './searchQueryDisplay';
import Consts from '../../../util/searchConsts';

import L20nMessage from '../../intl/l20n-message';

import reactMixin from 'react-mixin';
import {Flux} from 'delorean';

@reactMixin.decorate(Flux.mixins.storeListener)
@reactMixin.decorate(LoaderMixin)
export default class SearchByTypeForm extends DeloreanComponent {

    static contextTypes = {
        router: React.PropTypes.func
    }

    watchStores = ['searchByType']

    state = {
        loading: true
    }

    requestedSearchId = null;

    componentDidMount(){
        super.componentDidMount();

        this.requestedSearchId = this.context.router.getCurrentQuery().searchId;
        this.context.router.getLocation().addChangeListener(this.requestedSearchIdChanged);

        this.waitFor(
            this.props.actions.initTypeSearch(this.requestedSearchId)
        );
    }

    componentWillUnmount() {
        this.context.router.getLocation().removeChangeListener(this.requestedSearchIdChanged);
    }

    requestedSearchIdChanged = () => {
        var currentSearchId = this.context.router.getCurrentQuery().searchId;
        if (this.requestedSearchId != currentSearchId){
            this.requestedSearchId = currentSearchId;
            this.waitFor(
                this.props.actions.initTypeSearch(this.requestedSearchId)
            );
        }
    }

    handleAssetTypeChanged = (values) => {
        if (!values || !values.length){
            this.props.actions.chooseAssetType(null);
            return;
        }

        this.waitFor(
            this.props.actions.chooseAssetType(values[0])
        )
    }

    onContextChanged = (e) => {
        this.props.actions.setContext(e.currentTarget.value);
    }

    addRow = () => {
        var searchModel = this.state.stores.searchByType.searchModel;
        this.props.actions.addRow({
            assetTypeId: searchModel.assetType.id,
            attributes: searchModel.attributes
        });
    }

    addOpenParenthesis = () => {
        this.props.actions.addOpenParenthesis(this.state.stores.searchByType.searchModel.attributes);
    }

    addClosingParenthesis = () => {
        this.props.actions.addClosingParenthesis(this.state.stores.searchByType.searchModel.attributes);
    }

    doSearch(e) {
        e.preventDefault && e.preventDefault();
        this.props.actions.doSearch(this.state.stores.searchByType.searchModel);
    }

    render() {
        var searchModel = this.state.stores.searchByType.searchModel;
        if (!searchModel){
            return (<Loader loading={this.state.loading} />)
        }

        var assetTypeId = searchModel.assetType ? searchModel.assetType.id : 0;
        return (
            <Loader  loading={this.state.loading}>
                <form className="form advanced-search">
                    <header className="advanced-search__header">
                        <div className="input-group">
                            <span className="input-group__item">
                                <span className="input-group__item-title">
                                    {L20nMessage('searchTypeSelect', 'Asset type')}
                                </span>
                                <ReactSelectize
                                    items={this.state.stores.searchByType.assetTypes}
                                    value={assetTypeId}
                                    onChange={this.handleAssetTypeChanged}
                                    selectId="asset-type"
                                    placeholder={L20nMessage('searchSelectAsset', 'Select asset')}
                                    label=" "
                                    clearable={false}
                                />
                            </span>
                            <span className="input-group__item">
                                <span className="input-group__item-title">
                                    Search in
                                </span>
                                <span className="radio-group">
                                    <label className="radio-btn">
                                        <input type="radio" className="radio-btn__input" name="assetTypeState"
                                            value={Consts.assetTypeContext.active}
                                            checked={searchModel.assetTypeContext == Consts.assetTypeContext.active}
                                            onChange={this.onContextChanged} />
                                        <span className="radio-btn__icon"></span>
                                        {L20nMessage('searchContextAssets', 'Active assets')}
                                    </label>
                                    <label className="radio-btn">
                                        <input type="radio" className="radio-btn__input" name="assetTypeState"
                                            value={Consts.assetTypeContext.history}
                                            checked={searchModel.assetTypeContext == Consts.assetTypeContext.history}
                                            onChange={this.onContextChanged} />
                                        <span className="radio-btn__icon"></span>
                                        {L20nMessage('searchContextHistory', 'History')}
                                    </label>
                                </span>
                            </span>
                        </div>
                    </header>

                    <div className={classNames('table-search', { hide: !assetTypeId })}>
                        <div className={classNames({ hide: !searchModel.attributes.length })}>
                            <AttributesTableHeader />
                            <div className="table-search__content">
                                <AttributeRows
                                    actions={this.props.actions}
                                    assetType={searchModel.assetType}
                                    attributes={searchModel.attributes}
                                    allTypeAttribs={searchModel.assetType
                                                        ? this.state.stores.searchByType.assetAttributes[searchModel.assetType.id]
                                                        : []} />
                            </div>
                        </div>
                        <footer className="table-search__footer">
                            <RowsControls
                                addRow={this.addRow}
                                addOpenParenthesis={this.addOpenParenthesis}
                                addClosingParenthesis={this.addClosingParenthesis} />
                            <div className="table-search__footer-actions clearfix">
                                <button className="btn pull-right"
                                    disabled={!searchModel.assetType}
                                    onClick={this.doSearch.bind(this)}>
                                    <i className="btn__icon btn__icon_search"></i> {L20nMessage('searchStart', 'Start search')}
                                </button>

                                <SearchQueryDisplay
                                    attributes={searchModel.attributes} />
                            </div>
                        </footer>
                    </div>
                </form>
            </Loader>
        );
    }
}
