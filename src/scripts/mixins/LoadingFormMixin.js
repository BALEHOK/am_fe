var cx = require('classNames');

module.exports = {
    onStart: function() {
        this.setState({
            validation: {
                hasFeedback: true,
                feedbackClasses: cx(this.state.validation.feedbackClasses, 'form-control-feedback_loading')
            }
        });
    },

    onLoadEnd: function() {
        this.setState({
            validation: {
                feedbackClasses: cx(this.state.validation.feedbackClasses, {
                    'form-control-feedback_loading': false
                })
            }
        });
    }
}
