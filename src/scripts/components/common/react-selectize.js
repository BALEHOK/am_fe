/** @jsx React.DOM */

/* React selectize wrapper */
var React = require('react');
var ReactSelectize = React.createClass({displayName: 'ReactSelectize',

  isMultiple: function (props) {
    // Selectize becomes 'multiple' when 'maxItems' is passed via settings
    return props.multiple || props.maxItems != undefined;
  },

  buildOptions: function () {
    var o = {
      preload: true,
      valueField : this.props.valueField || "id",
      labelField : this.props.labelField || "name",
      searchField : this.props.searchField || "name",
      create : this.props.create || false,
      options : this.props.items || [],
      sortField : this.props.sortField || "name",
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
    if(!this.isMultiple(this.props)){
      // THEN blur it before calling onChange to prevent dropdown reopening
      this.getSelectizeControl().blur();
    }

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

    var initValue = this.props.value;
    if (initValue) {
      selectControl.setValue(initValue);  
      selectControl.on('load', function(e){
          selectControl.setValue(initValue);  
      });
    }
    
    if(this.props.onChange){
      selectControl.on('change', this.handleChange);
    }

  },

  componentDidMount: function () {
    this.rebuildSelectize();
  },

  componentDidUpdate: function () {    
    this.rebuildSelectize();
  },

  render: function () {
    //var classes = this.props.classes;
    return React.DOM.label( {className:'select '+this.props.className, for:this.props.selectId},
      React.DOM.select( {id:this.props.selectId, placeholder:this.props.placeholder})
    )
  }
});

module.exports = ReactSelectize;
