/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { createEvent, updateEvent, cancelToggle } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { withFirestore } from "react-redux-firebase";
import Script from "react-load-script";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(0)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  };

  componentDidMount = async () => {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  };

  componentWillUnmount = async () => {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }
  

  handleCitySelected = selected => {
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState({ cityLatLng: latlng });
      })
      .then(() => {
        this.props.change("city", selected);
      });
  };

  handleVenueSelected = selected => {
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState({ venueLatLng: latlng });
      })
      .then(() => {
        this.props.change("venue", selected);
      });
  };

  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues && this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0)
        values.venueLatLng = this.props.event.venueLatLng;
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push("/events");
    }
  };

  handleScriptLoad = () => this.setState({ scriptLoaded: true });

  render() {
    const { invalid, submitting, pristine, event, cancelToggle } = this.props;
    
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUStzPuINcmBv_HlIxPvjwJJWi9X38Ebk&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                placeholder="Event city"
                onSelect={this.handleCitySelected}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ["establishment"]
                  }}
                  onSelect={this.handleVenueSelected}
                  placeholder="Event venue"
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Date and time of event"
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              {event &&
              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type="button"
                color={event.cancelled ? "green" : "red"}
                floated="right"
                content={event.cancelled ? "Reactivate Event" : "Cancel Event"}
              />}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = (state, ownProps) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events.filter(
      e => e.id === ownProps.match.params.id
    )[0];
  }

  return {
    initialValues: event,
    event
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
      EventForm
    )
  )
);
