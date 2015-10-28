import React from 'react';
import Consts from './consts';
import Loader from'../../common/loader.jsx';

export default class SearchQueryDisplay extends React.Component {

    static queryComponents = {
        parenthesis:    class Parenthesis extends React.Component {
                            render(){
                                return (
                                    <span className="parenthesis">{this.props.parenthesis}</span>
                                );}
                            },

        lo:             class Lo extends React.Component {
                            render(){
                                return (
                                    <span className="lo">
                                        {this.props.lo === Consts.logicalOperators.and
                                            ? ' AND '
                                            : ' OR '}
                                    </span>
                                );}
                            },

        condition:      class Condition extends React.Component {
                            render(){
                                return (
                                    <span className="condition">
                                        <span className="field">{this.props.field}</span>
                                        <span className="operator">{this.props.operator}</span>
                                        <span className="value">{this.props.value}</span>
                                    </span>
                                );}
                            }
    }

    constructor(props){
        super(props);

        //this.displayQuery(props);
    }

    componentWillReceiveProps(nextProps) {
        //this.displayQuery(nextProps);
    }

    displayQuery(props) {
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
                var value = a.value || '';

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
            <div className={'type-searh-query ' + this.props.className}>
                <span className="type-name">{this.props.typeName}</span>
                <span className="attributes-query">{this.displayQuery(this.props)}</span>
            </div>
        );
    }
};