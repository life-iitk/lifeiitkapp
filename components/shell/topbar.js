import React from 'react';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Icon
} from 'native-base';

const TopBar = props => {
  return (
    <Header>
      <Left>
        <Button transparent onPress={() => props.navigation.toggleDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>{props.pgName}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Text>{props.loggedIn ? 'Logout' : 'Login'}</Text>
        </Button>
      </Right>
    </Header>
  );
};

export default TopBar;
