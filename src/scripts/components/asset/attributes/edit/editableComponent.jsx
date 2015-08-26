import React from 'react'
import cx from 'classnames'
import ControlWrapper from './controlWrapper'
import reactMixin from 'react-mixin'
import ValidationMixin from '../../../../mixins/ValidationMixin'

export default function editableComponent(Component) {

    @reactMixin.decorate(ValidationMixin)
    class ComponentWrapper extends React.Component {

        constructor() {
            super();
            this.valueChanged = this.valueChanged.bind(this);
        }

        componentWillMount() {
            this.setupValidation(this.props.actions);
        }

        valueChanged(value) {
            this.actions.setAttribute(this.props.params.id, value);
            this.forceUpdate();
        }

        render() {
            return <Component {...this.props} {...this.state}
                    onValueChanged={this.valueChanged}
                    validation={this.state.validation} />;
        }

    }

    return ComponentWrapper;
}
