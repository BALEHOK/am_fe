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
            hasFeedback: false,
            validationState: undefined,
        };
    },

	componentWillReceiveProps: function (nextProps) {
        var valResult = nextProps.validation;
        if (valResult) {
            this.setState({
                hasFeedback: true,
                isValid: valResult.isValid,
                validationState:  valResult.isValid ? 'success' : 'error',
            });
        }
    },

};

module.exports = ValidationMixin;