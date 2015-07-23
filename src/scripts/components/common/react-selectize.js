import React from "react";
import ReactSelect from "react-select";

export default class Select extends React.Component {

  static defaultProps = {
    valueField: "id",
    labelField: "name"
  }

  getValue() {
    let value;
    if(this.props.value instanceof Array) {
      value = this.props.value[0] || "";
    } else {
      value = this.props.value || "";
    }
    return value.toString();
  }

  onFocus() {
    if(!this.initialLoad) {
      this.initialLoad = true;
      this.props.onItemsRequest("");
    }
  }

  mapValues(vls) {
    return vls.map(el =>
      ({
        value: (el[this.props.valueField] || "").toString(),
        label: el[this.props.labelField]
      }));
  }

  loadMore(event) {
    if(this.loading) {
      return;
    }
    let left = event.target.scrollTop + event.target.getBoundingClientRect().height;
    if(event.target.scrollHeight - left < 50) {
      this.loading = true;
      this.props.onItemsRequest("").then(() => this.loading = false);
    }
  }

  onChange(e) {
    console.log(this.props.items.filter(el => el[this.props.valueField] == e));
    this.props.onChange(
      this.props.items.filter(el => el[this.props.valueField] == e)
    );
  }

  render() {
    let items = this.mapValues(this.props.items || []);
    return <ReactSelect
      ref={"selector"}
      value={this.getValue()}
      options={items}
      onChange={this.onChange.bind(this)}
      onFocus={this.onFocus.bind(this)}
      clearable={false}
      name={this.props.selectId}
      onScroll={this.loadMore.bind(this)}/>;
  }

}
