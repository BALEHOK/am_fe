var FocusOutMixin = {
  focusOutHandler: function(e) {
    var closest = e.target.closest(this.focusOutCls);
    if(this.state.opened && closest && closest.length === 0) {
      this.onClose && this.onClose();
      this.setState({
        opened: false
      });
    }
  },

  componentDidUnmount: function() {
    document.body.removeEventListener('mousedown', this.focusOutHandler, true);
  },

  componentDidMount: function() {
    document.body.addEventListener('mousedown', this.focusOutHandler, true);
  }
};

module.exports = FocusOutMixin;
