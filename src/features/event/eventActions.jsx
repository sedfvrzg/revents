import { toastr } from "react-redux-toastr";
import { DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { createNewEvent } from "../../app/common/util/helpers";

export const fetchEvents = events => ({ type: FETCH_EVENTS, payload: events });

export const createEvent = event => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    event.date = new Date(event.date).getTime() / 1000;
    let newEvent = createNewEvent(user, photoURL, event);

    try {
      let createdEvent = await firestore.add(`events`, newEvent);

      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });

      toastr.success("Success!", "Event has been created.");
    } catch (error) {
      toastr.error("Oops!", "Something went wrong.");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure that you want to cancel this event?"
    : "Are you sure that you want to reactivate this event?";
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    if (typeof event.date !== "number") event.date = event.date.unix();
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success("Success!", "Event has been updated.");
    } catch (error) {
      toastr.error("Oops!", "Something went wrong.");
    }
  };
};

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
};

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
