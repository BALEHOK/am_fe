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
    }

    valueChanged(event) {
        var value = event.target.value;
        this.props.onValueChanged(value);
    }

    render() {
        var isMultiline =  this.props.params.datatype == 'text';
        var isRequired = this.props.params.required;
        var classes = cx('input-txt', 'input-txt_' + (isMultiline ? 'textarea' : 'text'));
        return <ControlWrapper
                        id={this.props.params.id}
                        name={this.props.params.name}
                        className={classes}
                        validationState={this.props.validation}
                        isRequired={isRequired}
                >
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
