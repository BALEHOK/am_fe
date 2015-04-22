var FocusOutMixin = {
  focusOutHandler: function(e) {
    if(this.state.opened && $(e.target).closest(this.focusOutCls).length === 0) {
      this.onClose && this.onClose();
      this.setState({
        opened: false
      });
    }
  },

  componentDidUnmount: function() {
    document.body.removeEventListener('mousedown', this.focusOutHandler.bind(this), true);
  },

  componentDidMount: function() {
    document.body.addEventListener('mousedown', this.focusOutHandler.bind(this), true);
  }
};

module.exports = FocusOutMixin;