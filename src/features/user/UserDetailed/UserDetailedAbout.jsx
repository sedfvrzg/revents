import React from 'react'
import { Segment, Grid, Header, List, Item, Icon } from 'semantic-ui-react'
import { format } from 'date-fns'

const UserDetailedAbout = ({profile}) => {
    let memberSince;
    if(profile && profile.createdAt){
        memberSince = format(profile.createdAt.toDate(), 'DD/MM/YYYY');
    }
  return (
    <Segment>
    <Grid columns={2}>
        <Grid.Column width={10}>
            <Header icon='smile' content='About Display Name'/>
            <p>I am a: <strong>{profile.occupation || 'tbd'}</strong></p>
            <p>Originally from <strong>{ profile.origin || 'tbd'}</strong></p>
            <p>Member Since: <strong>{memberSince || 'tbd'}</strong></p>
            <p>{ profile.about || 'tbd'}</p>

        </Grid.Column>
        <Grid.Column width={6}>

            <Header icon='heart outline' content='Interests'/>
            {profile.interests && profile.interests.length > 0 ?
            <List>
                {profile.interests.map((interest, index) => (
                    <Item key={index}>
                        <Icon name="heart"/>
                        <Item.Content>{interest}</Item.Content>

                    </Item>
                ))}
            </List> : 'No interests'}
        </Grid.Column>
    </Grid>

</Segment>
  )
}

export default UserDetailedAbout
