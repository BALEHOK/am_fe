import React from 'react';
import Consts from './consts';
import Loader from'../../common/loader.jsx';

export default class SearchQueryDisplay extends React.Component {

    static queryComponents = {
        parenthesis:    class Parenthesis extends React.Component {
                            render(){
                                return (
                                    <span className="attributes-query_parenthesis">{this.props.parenthesis}</span>
                                );}
                            },

        lo:             class Lo extends React.Component {
                            render(){
                                return (
                                    <span className="attributes-query_lo">
                                        {this.props.lo === Consts.logicalOperators.and
                                            ? ' AND '
                                            : ' OR '}
                                    </span>
                                );}
                            },

        condition:      class Condition extends React.Component {
                            render(){
                                return (
                                    <span className="attributes-query_condition">
                                        <span className="attributes-query_condition_field">{this.props.field}</span>
                                        <span className="attributes-query_condition_operator">{this.props.operator}</span>
                                        <span className="attributes-query_condition_value">{this.props.value}</span>
                                    </span>
                                );}
                            }
    }

    state = {
        label: null,
        query: null
    }

    constructor(props){
        super(props);

        this.state.query = this.displayQuery(props);
        this.state.label = this.displayLabel(this.state.query);
    }

    componentWillReceiveProps(nextProps){
        this.updateQuery(nextProps);
    }

    updateQuery = _.debounce(props => {
        var query = this.displayQuery(props);
        this.setState({
            query: query,
            label: this.displayLabel(query)
        });
    }, 500)

    displayQuery(props) {
        var query = [];

        processAttributes(props.attributes, query);

        return query;

        function processAttributes(attributes, query){
            for (var i = 0; i < attributes.length; i++) {
                var a = attributes[i];

                if (a.parenthesis === Consts.parenthesisType.open){
                    var Parenthesis = SearchQueryDisplay.queryComponents.parenthesis;
                    query.push(<Parenthesis parenthesis={'('} />);
                } else if (a.parenthesis === Consts.parenthesisType.closing){
                    var Parenthesis = SearchQueryDisplay.queryComponents.parenthesis;
                    query.push(<Parenthesis parenthesis={')'} />);
                } else {
                    var name = a.referenceAttrib.displayName;
                    var operator = a.operators && a.operators.length
                        ? a.operators.find((o) => o.id === a.operator).name
                        : '';

                    var Condition = SearchQueryDisplay.queryComponents.condition;
                    if (!a.useComplexValue){
                        let value;
                        if (typeof a.value !== 'undefined' && a.value !== null){
                            if (a.value instanceof Array){
                                value = a.value.map(v => v.name).join('; ');
                            } else {
                                value = a.value.name;
                            }
                        }
                        else {
                            value = '';
                        }

                        query.push(<Condition field={name} operator={operator} value={value}/>);
                    } else {
                        var Parenthesis = SearchQueryDisplay.queryComponents.parenthesis;
                        query.push(<Condition field={name} operator={operator} value={''}/>);

                        query.push(<Parenthesis parenthesis={'['} />);
                        processAttributes(a.complexValue, query);
                        query.push(<Parenthesis parenthesis={']'} />);
                    }
                }

                if (a.lo !== Consts.logicalOperators.none) {
                    var Lo = SearchQueryDisplay.queryComponents.lo;
                    query.push(<Lo lo={a.lo} />);
                }
            };
        }
    }

    displayLabel(query){
        if (!this.props.typeName){
            return null;
        }

        if (query && query.length) {
            return `Find ${this.props.typeName} where:`;
        }

        return `Find any ${this.props.typeName}`;
    }

    render() {
        return (
            <div className="type-searh-query">
                <span className="type-name">{this.state.label}</span>
                <span className="attributes-query">{this.state.query}</span>
            </div>
        );
    }
};