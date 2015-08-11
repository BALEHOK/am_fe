var cx = require('classnames');

var ValidationMixin = {

	setupValidation: function (actions) {
		this.actions = actions;
		var self = this;
        this.delayedValidation = _.debounce((params) => {
            self.actions.validateAttribute({
                attributeId: params.id,
                value: params.value
            });
        }, 500);
	},

	validate: function (params) {
		this.delayedValidation(params);
	},

	getInitialState: function() {
        return {
            validation : {
                hasFeedback: false,
                validationState: undefined,
                isValid: undefined,
                groupClasses: 'form-group',
                feedbackClasses: 'glyphicon form-control-feedback',
                message: undefined,
            }
        };
    },

	componentWillReceiveProps: function (nextProps) {
        var valResult = nextProps.validation;
        if (valResult) {
            let isError = !_.isUndefined(valResult.isValid) && !valResult.isValid;
            this.setValidationResult(!isError, valResult.message);
        }
    },

    setValidationResult(isValid, message) {
        var groupClasses = cx({
            'form-group': true,
            'has-feedback': true,
            'has-error': !isValid,
            'has-success': isValid
        });

        var feedbackClasses = cx('glyphicon', 'form-control-feedback',
            'glyphicon' + (isValid ? '-ok' : '-remove'));

        this.setState({
            validation: {
                hasFeedback: true,
                isValid: isValid,
                validationState:  isValid ? 'success' : 'error',
                groupClasses: groupClasses,
                feedbackClasses: feedbackClasses,
                message: message,
            }
        });
    }

};

module.exports = ValidationMixin;
