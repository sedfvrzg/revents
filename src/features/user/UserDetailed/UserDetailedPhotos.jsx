import React from "react";
import { Segment, Header, Image } from 'semantic-ui-react'

const UserDetailedPhotos = ({photos}) => {
  return (
    
    <Segment attached>
      <Header icon="image" content="Photos" />
      
      <Image.Group size="small">
        {photos.map((photo, index) => (
          <Image key={photo.id} src={photo.url}></Image>
        ))}
      </Image.Group>
    </Segment>
  );
};

export default UserDetailedPhotos;
