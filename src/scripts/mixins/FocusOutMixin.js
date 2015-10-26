var FocusOutMixin = {
  handleEvent: function(event) {
    if (event.type === 'click'){
      this.focusOutHandler(event);
    }
  },

  focusOutHandler: function(e) {
    var closest = e.target.closest(this.focusOutCls);
    if(this.state.opened && !closest) {
      this.onClose && this.onClose();
      this.setState({
        opened: false
      });
    }
  },

  componentDidMount: function() {
    document.body.addEventListener('click', this, false);
  },

  componentWillUnmount: function() {
    document.body.removeEventListener('click', this, false);
  }
};

module.exports = FocusOutMixin;
