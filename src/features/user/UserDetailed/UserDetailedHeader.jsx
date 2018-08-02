import React from "react";
import { Segment, Item, Header } from "semantic-ui-react";
import { differenceInYears } from "date-fns";

const UserDetailedHeader = ({ profile }) => {

  let age;
  if (profile && profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "Unknown Age";
  }

  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image
            avatar
            size="small"
            src={profile.photoURL || "/assets/user.png"}
          />
          <Item.Content verticalAlign="bottom">
            <Header as="h1">{profile.displayName || "AKA"}</Header>
            <br />
            <Header as="h3">{profile.occupation || "tbd"}</Header>
            <br />
            <Header as="h3">
              {age}, Lives in {profile.origin || "tbd"}
            </Header>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default UserDetailedHeader;
