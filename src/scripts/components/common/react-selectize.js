/** @jsx React.DOM */

/* React selectize wrapper */
var React = require('react');
var Selectize = require('selectize')
var $ = require('jquery');
var ReactSelectize = React.createClass({displayName: 'ReactSelectize',

  isMultiple: function (props) {
    // Selectize becomes 'multiple' when 'maxItems' is passed via settings
    return props.multiple || props.maxItems != undefined;
  },

  buildOptions: function () {
    var o = {
      preload: false,
      valueField : this.props.valueField || "id",
      labelField : this.props.labelField || "name",
      searchField : this.props.searchField || "name",
      create : this.props.create || false,
      options : this.props.items || [],
      sortField : this.props.sortField || "name"
    };

    if(this.isMultiple(this.props)){
      o.maxItems = this.props.maxItems || null;
    }

    if (this.props.onItemsRequest) {
      o.load = this.props.onItemsRequest;
    }
    return o;
  },

  getSelectizeControl: function () {
    var selectId = "#" + this.props.selectId,
      $select = $(selectId),
      selectControl = $select[0] && $select[0].selectize;

    return selectControl;
  },

  handleChange: function (e) {
    // IF Selectize is not multiple
    var control = this.getSelectizeControl();
    if(!(e instanceof Array)) {
      e = [e];
    }
    if(!this.isMultiple(this.props)){
      // THEN blur it before calling onChange to prevent dropdown reopening
      control.blur();
    }
    e = e.map(el => control.options[el]);
    if(this.props.onChange){
      this.props.onChange(e);
    }
  },

  rebuildSelectize: function () {
    var $select = null,
      selectControl = this.getSelectizeControl();
    if(selectControl && this.props.items) {
      // rebuild
      selectControl.off();
      this.props.items.map(function(item){
        selectControl.addOption(item);
      });
    } else {
      // build new
      $select = $("#" + this.props.selectId).selectize(this.buildOptions());
      selectControl = $select[0].selectize;
    }
    selectControl.$control.addClass('form-control');
    var initValue = this.props.value;
    if (typeof(initValue) !== 'undefined') {
      selectControl.setValue(initValue);
      selectControl.on('load', function(e){
        selectControl.setValue(initValue);
      });
    }

    if(this.props.onChange){
      selectControl.on('change', this.handleChange);
    }

    // load items on dropdown open
    if (this.props.onItemsRequest) {
      selectControl.on('dropdown_open', this.loadElements);
    }
  },

  trackScroll: function(dropdown) {
    var scrolledTo = dropdown[0].scrollHeight - dropdown.height() - dropdown.scrollTop();
    if(scrolledTo < 150 && !this.listLoading) {
      this.listLoading = true;
      this.props.onItemsRequest().then(() => this.listLoading = false);
    }
  },

  loadElements: function(element) {
    if(this.props.items.length < 20) {
      this.props.onItemsRequest();
    }
    var control = this.getSelectizeControl();
    var contentElement = element.find('.selectize-dropdown-content');
    var throttleTracker = _.throttle(this.trackScroll, 300).bind(this, contentElement);
    contentElement.on('scroll', throttleTracker);

    function untrackScroll() {
      contentElement.off('scroll', throttleTracker);
      control.off('dropdown_close', untrackScroll);
    }

    control.on('dropdown_close', untrackScroll);
  },

  componentDidMount: function () {
    this.rebuildSelectize();
  },

  updateList: function(list) {
    this.props.items = list;
    var control = this.getSelectizeControl();
    list.map(el => control.addOption(el));
    control.refreshOptions();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var nitems = nextProps.items;
    var oitems = this.props.items;
    nextProps.items = undefined;
    this.props.items = undefined;
    var equal = _.isEqual(nextProps, this.props);
    var iequal = _.isEqual(nitems, oitems);
    nextProps.items = nitems;
    this.props.items = oitems;
    var result = true;
    if(equal && !iequal) {
      this.updateList(nitems);
      result = false;
    }
    if(equal && iequal) {
      result = false;
    }
    return result;
  },

  componentDidUpdate: function () {
    this.rebuildSelectize();
  },

  render: function () {
    return React.DOM.label( {className: 'select', for:this.props.selectId},
      React.DOM.select( {id:this.props.selectId, placeholder:this.props.placeholder})
    )
  }
});

module.exports = ReactSelectize;
