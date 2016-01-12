import React, { PropTypes } from 'react';
import StickyComponent from 'react-sticky';

export default class Sticky extends React.Component {

    state = {
        wrapperHeight: 'auto'
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let height = this.getElementOuterHeight(React.findDOMNode(this.refs.stickyChildrens));
        this.setState({
            wrapperHeight: `${height}px`
        });
    }

    getElementOuterHeight(el) {
      let styles = window.getComputedStyle(el);
      //var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
      return Math.ceil(el.offsetHeight);
    }

    render() {
        return(
            <div style={{minHeight: this.state.wrapperHeight}}>
                <StickyComponent {...this.props}>
                    <div className="sticky-panel" ref="stickyChildrens">
                        {this.props.children}
                    </div>
                </StickyComponent>
            </div>
        )
    }
}
