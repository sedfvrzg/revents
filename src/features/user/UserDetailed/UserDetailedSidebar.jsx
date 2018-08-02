import React from "react";
import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";

const UserDetailedSidebar = ({ isCurrentUser }) => {
  return (
    <Segment>
      {isCurrentUser ? (
        <Button
          as={Link}
          to={`/settings/basic`}
          color="teal"
          fluid
          basic
          content="Edit Profile"
        />
      ) : (
        <Button color="teal" fluid basic content="Follow" />
      )}
    </Segment>
  );
};

export default UserDetailedSidebar;
