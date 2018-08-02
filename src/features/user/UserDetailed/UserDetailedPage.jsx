import React, { Component } from "react";
import { Grid} from "semantic-ui-react";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedAbout from "./UserDetailedAbout";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedSidebar from './UserDetailedSidebar'
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class UserDetailedPage extends Component {
  render() {
    const { photos, profile } = this.props
    return (
      <Grid>
        <Grid.Column width={16}>
          <UserDetailedHeader profile={profile} />
        </Grid.Column>
        <Grid.Column width={12}>
          <UserDetailedAbout profile={profile} />
        </Grid.Column>
        <Grid.Column width={4}>
        <UserDetailedSidebar/>
        </Grid.Column>

        <Grid.Column width={12}>
        {photos && photos.length > 0 &&
          <UserDetailedPhotos photos={photos} />}
        </Grid.Column>

        <Grid.Column width={12}>
          <UserDetailedEvents />
        </Grid.Column>
      </Grid>
    );
  }
}

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);
