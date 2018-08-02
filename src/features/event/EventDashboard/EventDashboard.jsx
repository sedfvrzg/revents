import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { firestoreConnect,  isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import EventActivity from "../EventActivity/EventActivity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { deleteEvent } from "../eventActions";

const dispatchActions = {
  deleteEvent
};

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, auth } = this.props;
    if(auth) console.log(auth);
    if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

export default connect(
  mapState,
  dispatchActions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
