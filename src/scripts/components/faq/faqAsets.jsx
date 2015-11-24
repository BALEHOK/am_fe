var React = require('react');
var Router = require('react-router');
var FixedDataTable = require('fixed-data-table');
var Link = Router.Link;
var Flux = require('delorean').Flux;
var cx = require('classnames');
var FaqItem = require('./faqItem.jsx');
var LoaderMixin = require('../../mixins/LoaderMixin');
var Loader = require('../common/loader.jsx');
var DataGrid = require('../common/grid');

var Column = FixedDataTable.Column;

var FaqAssets = React.createClass({
    mixins:[Flux.mixins.storeListener, LoaderMixin],

    watchStores: ['faq'],

    componentDidMount: function() {
        this.waitFor(this.props.actions.loadFaq());
    },

    renderItem: function(item, index) {
        var key = 'faq-item_' + index;
        return (
            <FaqItem title={item.question} content={item.answer} key={key}/>
        )
    },

    render: function() {
        return (
            <div>
                <h1 className="page-title">FAQ</h1>
                <Loader loading={this.state.loading}>
                    <div className="grid">
                        <div className="grid__item two-twelfths">
                            <Link
                                className="btn"
                                to="asset-create-from-type"
                                params={{assetTypeId: 93}}
                            >
                                Add FAQ item
                            </Link>
                        </div>
                        <div className="grid__item ten-twelfths">
                            {this.state.stores.faq.list.length > 0
                                ? <DataGrid
                                    source={this.state.stores.faq.list}
                                    rowHeight={50}
                                    maxHeight={600}
                                    headerHeight={50}
                                    filtering={true}
                                    filterFields={[
                                        {dataKey: 'question', label: 'Question', width: 0.5},
                                        {dataKey: 'answer', label: 'Answer', width: 0.5},
                                    ]}
                                  >
                                    <Column
                                        label="Question"
                                        width={0.5}
                                        dataKey="question"
                                    />
                                    <Column
                                        label="Answer"
                                        width={0.5}
                                        dataKey="answer"
                                    />
                                  </DataGrid>
                                : null
                            }
                        </div>
                    </div>
                </Loader>
            </div>

        );
    }

});

module.exports = FaqAssets;
