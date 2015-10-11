import React from 'react'
import ReactSelectize from '../../common/react-selectize'
import Tabs from 'react-simpletabs'

var SearchSelectValues = {
    getSelectList: function () {
        return [
            { name: 'Manager', id: 1},
            { name: 'Name', id: 2},
            { name: 'District', id: 3},
            { name: 'Department', id: 4},
            { name: 'Update User', id: 5},
            { name: 'Update Date', id: 6},
            { name: 'Password', id: 7},
            { name: 'Email', id: 8},
            { name: 'User', id: 9},
            { name: 'Permissions', id: 10}
        ];
    }
};

var assetState = {
    active: "active",
    history: "history"
};

export default class SearchComplexForm extends React.Component {
    

    state = {
        searchModel: {
            typeId: 1,
            assetState: assetState.active
        },
        assetTypes: SearchSelectValues.getSelectList()
    };

    constructor(){
        super();
        // this.dispatcher = ReportDispatcher;
        // this.actions = new ReportActions(this.dispatcher);
    }

    getInitialState() {
        return {
            searchModel: {
                typeId: 1,
                assetState: assetState.active
            },
            assetTypes: SearchSelectValues.getSelectList()
        }
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
                                items={this.state.assetTypes}
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
