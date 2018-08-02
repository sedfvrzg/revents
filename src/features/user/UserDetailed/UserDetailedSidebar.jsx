import React from "react";
import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";

const UserDetailedSidebar = () => {
  return (
    <Segment>
      <Button
        as={Link}
        to={`/settings/basic`}
        color="teal"
        fluid
        basic
        content="Edit Profile"
      />
    </Segment>
  );
};

export default UserDetailedSidebar;
