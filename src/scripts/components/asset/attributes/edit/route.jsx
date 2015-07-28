import React from "react";
import Google from "google-maps";
import StringAttribute from "./string";
import GoogleMapsComponent from "./googlemapsComponent";
import ReactSelect from "../../../common/react-selectize";
import _ from "underscore";

export default class RouteEdit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        Google.load(google => {
            this.google = google
            this.service = new google.maps.DirectionsService();
            this.forceUpdate();
        });
    }

    handleMapChange(coords) {
        this.props.params.value = coords.join(';');
    }

    requestRoute() {
      const origin = this.refs.source.getDOMNode().value;
      const destination = this.refs.dest.getDOMNode().value;
      if(!origin || ! destination) {
          return;
      }
      this.service.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false
      }, (result, status) => {

        if(status === google.maps.DirectionsStatus.OK) {
            this.setState({
                directions: result,
                noResults: false
            })
        }
        if(status === google.maps.DirectionsStatus.ZERO_RESULTS) {
            this.setState({
                noResults: true
            })
        }
      });
    }

    render() {
        if(this.google) {
            let distance;
            if(this.state.directions) {
              distance = this.state.directions.routes[0].legs
                .reduce((acc, el) => el.distance.value + acc, 0);
            }

            var points = this.props.params.value
                ? this.props.params.value.split(';')
                : [];
            return (
                <div className="asset-data__param">
                    <span className="asset-data__param-title">{this.props.params.name}:</span>
                    <GoogleMapsComponent
                        googleMapsApi={this.google.maps}
                        points={points}
                        viewOnly={true}
                        directions={this.state.directions}
                        onChange={this.handleMapChange} />
                    { this.state.noResults ? <div>No results for your query</div> : null }
                    { distance ? <div>Distance: {Math.round(distance/1000)}km</div> : null }
                    <div className="inputs-line inputs-line_float">
                              <input
                                  type="text"
                                  ref="source"
                                  onChange={_.debounce(this.requestRoute.bind(this), 1000)}
                                  className="input-txt__field form-control" />
                              <input
                                  type="text"
                                  ref="dest"
                                  onChange={_.debounce(this.requestRoute.bind(this), 1000)}
                                  className="input-txt__field form-control" />
                    </div>
                </div>
            );
        } else {
            return <StringAttribute params={this.props.params} />;
        }
    }
}
