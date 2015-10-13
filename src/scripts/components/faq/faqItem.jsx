var React = require('react');
var cx = require('classnames');

var FaqItem = React.createClass({

    getInitialState: function() {
        return {
            open: false,
            inited: false,
            itemStyle: {
                height: 'auto'
            }
        };
    },


    componentDidMount: function() {
        var initHeight = React.findDOMNode(this.refs.title).offsetHeight;
        this.setState({
            itemStyle: {
                height: initHeight
            },
            inited: true,
            open: false
        });
    },

    handleClick: function() {
        var initHeight = React.findDOMNode(this.refs.title).offsetHeight;
        var contentHeight = React.findDOMNode(this.refs.content).offsetHeight;
        if (this.state.open) {
            this.setState({
                itemStyle: {
                    height: initHeight
                },
                open: false
            });
        } else {
            this.setState({
                itemStyle: {
                    height: initHeight + contentHeight
                },
                open: true
            });
        }
    },

    renderParagraphs: function(item, index) {
        return (
            <p key={index}>{item}</p>
        )
    },

    render: function() {
        let itemClasses = cx({
            'accordion__item': true,
            'accordion__item_state_expanded': this.state.open,
            'accordion__item_inited': this.state.inited
        });

        return (
            <div className={itemClasses} style={this.state.itemStyle}>
                <span className="accordion__item-title" ref="title" onClick={this.handleClick}>{this.props.title}</span>
                <div className="accordion__item-content" ref="content">
                    {this.props.content.paragraphs
                        ? this.props.content.paragraphs.map(this.renderParagraphs)
                        : this.props.content
                    }
                </div>
            </div>
        );
    }

});


module.exports = FaqItem;
