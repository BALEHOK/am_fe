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
        query: null
    }

    constructor(props){
        super(props);

        this.state.query = this.displayQuery(props);
    }

    componentWillReceiveProps(nextProps){
        this.updateQuery(nextProps);
    }

    updateQuery = _.debounce(props => {
        this.setState({
            query: this.displayQuery(props)
        });
    }, 1000)

    displayQuery(props) {
        console.log('displayQuery');

        var attributes = props.attributes;
        var query = [];

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
                var value;
                if (!!a.value){
                    if (a.value instanceof Array){
                        value = a.value.map(v => v.name).join('; ');
                    } else {
                        value = a.value.name;
                    }
                }
                else {
                    value = '';
                }

                var Condition = SearchQueryDisplay.queryComponents.condition;
                query.push(<Condition field={name} operator={operator} value={value}/>);
            }

            if (a.lo !== Consts.logicalOperators.none) {
                var Lo = SearchQueryDisplay.queryComponents.lo;
                query.push(<Lo lo={a.lo} />);
            }
        };

        return query;
    }

    render() {
        return (
            <div className="type-searh-query">
                {!!this.props.typeName
                    ? <span className="type-name">Find {this.props.typeName} where:</span>
                    : {}
                }
                <span className="attributes-query">{this.state.query}</span>
            </div>
        );
    }
};