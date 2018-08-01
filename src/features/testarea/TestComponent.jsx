import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import Script from "react-load-script";
import { incrementCounter, decrementCounter } from "./testActions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const dispatchActions = {
  incrementCounter,
  decrementCounter
};

const Marker = () => <Icon name="marker" size="big" color="red" />;

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    console.log("here");

    this.setState({ scriptLoaded: true });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  onChange = address => this.setState({ address });

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    const { incrementCounter, decrementCounter, data } = this.props;
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUStzPuINcmBv_HlIxPvjwJJWi9X38Ebk&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color="green" content="increment" />
        <Button onClick={decrementCounter} color="red" content="decrement" />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}

          <button type="submit">Submit</button>
        </form>

        <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDUStzPuINcmBv_HlIxPvjwJJWi9X38Ebk"
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker lat={59.955413} lng={30.337844} text={"Kreyser Avrora"} />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

const mapState = state => ({ data: state.test.data });

export default connect(
  mapState,
  dispatchActions
)(TestComponent);
