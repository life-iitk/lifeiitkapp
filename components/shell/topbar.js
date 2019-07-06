import React from 'react';
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Icon,
  Container,
  Form,
  Item,
  Input
} from 'native-base';
import LoginModal from '../login/loginModal';

const TopBar = props => {
  const [open, setOpen] = React.useState(false);
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
        <Button transparent onPress={() => setOpen(true)}>
            <Text>{props.loggedIn ? 'Logout' : 'Login'}</Text>
        </Button>
        <LoginModal
        open={open}
        onClose={() => setOpen(false)}
        />          
        </Right>
    </Header>
  );
};

export default TopBar;
