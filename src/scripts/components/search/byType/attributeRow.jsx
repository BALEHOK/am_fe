/**
 * @jsx React.DOM
 */

import React from 'react';

export default class AttributeRow extends React.Component {
  constructor(props){
    super(props);

    var selected = this.props.selected;
    if (!selected.id){
      selected.id = this.props.attributes[0].id;
    }
  }

  onChange(){
    this.props.onChange(selected);
  }

  render(){
    var attributes = [];

    for (var i = 0; i < this.props.attributes.length; i++) {
      let attr = this.props.attributes[i];
      attributes.push(<option value={attr.id}>{attr.name}</option>);
    };

    return (
      <div>
        <select onChange={this.onChange.bind(this)} value={this.props.selected.id}>
          {attributes}
        </select>
      </div>
    );
  }
}