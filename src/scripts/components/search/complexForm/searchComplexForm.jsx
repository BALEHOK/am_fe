import React from 'react';
import reactMixin from 'react-mixin';
import {Flux} from 'delorean';
import ReactSelectize from '../../common/react-selectize';
import Tabs from 'react-simpletabs';

var assetState = {
    active: "active",
    history: "history"
};

@reactMixin.decorate(Flux.mixins.storeListener)
export default class SearchComplexForm extends React.Component {

    watchStores = ['searchComplexForm']

    _isMounted = false

    isMounted(){
        return this._isMounted;
    }

    componentDidMount(){
        this._isMounted = true;
    }

    state = {
        searchModel: {
            typeId: 0,
            assetState: assetState.active
        },
        assetTypes: []
    }

    constructor(props){
        super(props);

        this.props.actions.loadAssetTypes()
    }

    handleAssetTypeChanged = (value) => {
        if (!value || !value.length){
            this.setSearchModel({
                typeId: 0
            });
            return;
        }

        this.setSearchModel({
            typeId: value[0].id
        });
    }

    onAssetStateChanged = (e) => {
        this.setSearchModel({
            assetState: e.currentTarget.name
        });
    }

    setSearchModel(o){
        var searchModel = this.state.searchModel;
        for (var prop in o){
            searchModel[prop] = o[prop];
        }

        this.setState({
            searchModel: searchModel
        });
    }

    render() {
        return (
            <form className="form advanced-search">
                <header className="advanced-search__header">
                    <div className="input-group">
                        <span className="input-group__item">
                            <span className="input-group__item-title">
                                Asset type
                            </span>
                            <ReactSelectize
                                items={this.state.stores.searchComplexForm.assetTypes}
                                value={this.state.searchModel.typeId}
                                onChange={this.handleAssetTypeChanged}
                                selectId="asset-type"
                                placeholder="Select asset"
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
                                    <input type="radio" className="radio-btn__input" name={assetState.active}
                                        checked={this.state.searchModel.assetState === assetState.active}
                                        onChange={this.onAssetStateChanged} />
                                    <span className="radio-btn__icon"></span>
                                    Active assets
                                </label>
                                <label className="radio-btn">
                                    <input type="radio" className="radio-btn__input" name={assetState.history}
                                        checked={this.state.searchModel.assetState === assetState.history}
                                        onChange={this.onAssetStateChanged} />
                                    <span className="radio-btn__icon"></span>
                                    History
                                </label>
                            </span>
                        </span>
                    </div>
                </header>

                <div className="table-search">
                    <footer className="table-search__footer">
                        <div className="table-search__footer-actions clearfix">
                            <button className="btn pull-right"><i className="btn__icon btn__icon_search"></i>Start search</button>
                        </div>
                    </footer>
                </div>
            </form>
        );
    }
}
