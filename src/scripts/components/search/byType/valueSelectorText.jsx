import React from 'react';
import _ from 'underscore';

export default class ValueSelectorText extends React.Component {
    txtValue = null

    state = {
        text: this.props.value ? this.props.value.id : ''
    }

    componentDidMount(){
        this.txtValue = this.refs.txtValue.getDOMNode();
    }

    componentWillReceiveProps(nextProps) {
        this.state.text = nextProps.value ? nextProps.value.id : '';
    }
    
    onValueChange = () => {
        this.setState({
            text: this.txtValue.value
        });

        this.notifyValueChanged();
    }

    notifyValueChanged = _.debounce(() => {
        this.props.onValueChange({id: this.txtValue.value, name: this.txtValue.value});
    }, 500)

    render() {
        return (
            <label className="input-txt input-txt_width_full">
                <input type="text" className="input-txt__field" placeholder="Type search value"
                    name="txtValue" ref="txtValue"
                    value={this.state.text} onChange={this.onValueChange}/>
            </label>
        );
    }
}