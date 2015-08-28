import React from 'react'
import cx from 'classnames'
import ControlWrapper from './controlWrapper'
import reactMixin from 'react-mixin'
import ValidationMixin from '../../../../mixins/ValidationMixin'
import editableComponent from './editableComponent'

class StringAttribute extends React.Component {

    constructor() {
        super();
        this.valueChanged = this.valueChanged.bind(this);
        this.handleRecalc = this.handleRecalc.bind(this);
    }

    valueChanged(event) {
        var value = event.target.value;
        this.props.onValueChanged(value);
    }

    handleRecalc() {
        this.props.onValueChanged(this.props.params.value, true);
    }

    render() {
        var isMultiline =  this.props.params.datatype == 'text';
        var classes = cx('input-txt', 'input-txt_' + (isMultiline ? 'textarea' : 'text'));

        return <ControlWrapper
                        name={this.props.params.name}
                        hasFormula={this.props.params.hasFormula}
                        className={classes}
                        validationState={this.props.validation}
                        onRecalc={this.handleRecalc}>

                    {isMultiline
                        ? <textarea
                            onChange={this.valueChanged}
                            className="input-txt__field form-control"
                            value={this.props.params.value}>
                          </textarea>
                        : <input
                            type="text"
                            onChange={this.valueChanged}
                            className="input-txt__field form-control"
                            value={this.props.params.value} />}

                </ControlWrapper>
    }
}

export default editableComponent(StringAttribute);
