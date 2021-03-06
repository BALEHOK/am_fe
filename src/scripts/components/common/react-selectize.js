import React from "react";
import ReactSelect from "react-select";

export default class Select extends React.Component {

  static defaultProps = {
    valueField: "id",
    labelField: "name",
    clearable: true,
    searchable: true
  };

  state = {
      loading: false
  }

  constructor(props) {
    super(props);
    this.queryChanged = _.debounce(this.queryChanged, 300);
  }

  getValue() {
    let value;
    if(this.props.value instanceof Array) {
      if(!!this.props.maxItems) {
        value = this.props.value.join(',');
      } else {
        value = this.props.value[0] || "";
      }
    } else {
      value = this.props.value || "";
    }
    return value.toString();
  }

  onFocus() {
    if(!this.initialLoad) {
      this.initialLoad = true;
      if (this.props.onItemsRequest)
        this.props.onItemsRequest("");
    }
  }

  mapValues(vls) {
    return vls
        .filter(e => !_.isUndefined(e))
        .map(el =>
          ({
            value: (el[this.props.valueField] || "").toString(),
            label: el[this.props.labelField]
          }));
  }

  loadMore(event) {
    if (!this.props.onItemsRequest || this.state.loading) {
      return;
    }

    let left = event.target.scrollTop + event.target.getBoundingClientRect().height;
    if (event.target.scrollHeight - left < 50) {
      this.setState({
          loading: true
      });
      this.props.onItemsRequest("").then(() =>
          this.setState({
              loading: false
          })
      );
    }
  }

  onChange(e) {
    this.props.onChange(
      e.split(',')
        .map(e => this.props.items.filter(el => !_.isUndefined(el) && el[this.props.valueField] == e))
        .reduce((acc, el) => acc.concat(el))
    );
  }

  queryChanged(query) {
    this.props.onItemsRequest && this.props.onItemsRequest(query);
  }

  render() {
    let items = this.mapValues(this.props.items || []);
    return <span className="select" htmlFor={this.props.selectId}>
      <ReactSelect
        ref={"selector"}
        value={this.getValue()}
        isLoading={this.state.loading}
        options={items}
        onChange={this.onChange.bind(this)}
        onFocus={this.onFocus.bind(this)}
        clearable={this.props.clearable}
        multi={!!this.props.maxItems}
        name={this.props.selectId}
        placeholder={this.props.placeholder}
        onInputChange={this.queryChanged.bind(this)}
        className="form-control"
        onScroll={this.loadMore.bind(this)}/>
    </span>;
  }

}
