import React from 'react'
import reactMixin from 'react-mixin'
import cx from 'classnames'
import ControlWrapper from './controlWrapper'
import ValidationMixin from '../../../../mixins/ValidationMixin'

@reactMixin.decorate(ValidationMixin)
export default class EditableComponent extends React.Component {
    
    componentWillMount() {
        this.setupValidation(this.props.actions);
    }

    valueChanged(event) {
        var value = event.target.value;
        this.props.params.value = value;
        this.validate({id: this.props.params.id, value: this.props.params.value});
        this.forceUpdate();
    }

    render() {
        var isMultiline =  this.props.params.datatype == 'text';
        var classes = cx('input-txt', 'input-txt_' + (isMultiline ? 'textarea' : 'text'));
        return (
            <ControlWrapper
                name={this.props.params.name}
                className={classes}
                validationState={this.state.validation}>

                {isMultiline
                    ? <textarea
                        onChange={this.valueChanged}
                        className="input-txt__field form-control"
                        value={this.props.params.value}></textarea>
                    : <input
                        type="text"
                        onChange={this.valueChanged}
                        className="input-txt__field form-control"
                        value={this.props.params.value} />
                }
                {this.props.params.hasFormula 
                    ? <span className="glyphicon form-control-feedback icon_asterisk"></span>
                    : ''
                }
            </ControlWrapper>
        );
    }
}
