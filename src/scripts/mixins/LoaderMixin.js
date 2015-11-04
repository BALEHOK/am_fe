var LoaderMixin = {
  startWaiting(attr, ...promises) {
    this.setLoading(attr, true)
    return Promise.all(promises).then(() => {
      this.setLoading(attr, false);
    });
  },

  waitFor(...promises) {
    return this.startWaiting('loading', ...promises);
  },

  stopWaiting(...promises) {
    this.setLoading('loading', false);
  },

  setLoading(attr, val) {
    var setter = {};
    setter[attr] = val;
    this.setState(function(nextState) {
      return _.extend({}, nextState, setter)
    });
  }
};

module.exports = LoaderMixin;
