import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedAbout from "./UserDetailedAbout";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedSidebar from "./UserDetailedSidebar";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from '../../../app/layout/LoadingComponent'

class UserDetailedPage extends Component {
  render() {
    const { photos, profile, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    if(loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <Grid.Column width={16}>
          <UserDetailedHeader profile={profile} />
        </Grid.Column>
        <Grid.Column width={12}>
          <UserDetailedAbout profile={profile} />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserDetailedSidebar isCurrentUser={isCurrentUser} />
        </Grid.Column>

        <Grid.Column width={12}>
          {photos &&
            photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        </Grid.Column>

        <Grid.Column width={12}>
          <UserDetailedEvents />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.id) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    auth: state.firebase.auth,
    profile,
    userUid,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
