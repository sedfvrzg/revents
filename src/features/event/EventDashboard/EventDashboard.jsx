import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";

import { deleteEvent } from "../eventActions";

const dispatchActions = {
  deleteEvent,
};

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>

        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = state => ({ events: state.events });

export default connect(
  mapState,
  dispatchActions
)(EventDashboard);
