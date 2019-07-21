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
  Toast
} from 'native-base';
import AppContext from '../utils/appContext';
import LoginModal from '../login/loginModal';

const TopBar = props => {
  const [open, setOpen] = React.useState(false);

  const logout = async state => {
    try {
      await state.log('', '', 'logout');
      props.navigation.navigate('Calendar');
      Toast.show({ text: 'Successfully logged out.', duration: 3000 });
    } catch (err) {
      Toast.show({
        text: 'Logout failed. Please try again.',
        duration: 3000
      });
    }
  };

  return (
    <React.Fragment>
      <AppContext.Consumer>
        {state => (
          <React.Fragment>
            <Header hasSegment={props.segment}>
              <Left>
                <Button
                  transparent
                  onPress={() => props.navigation.toggleDrawer()}
                >
                  <Icon name="menu" />
                </Button>
              </Left>
              <Body>
                <Title>{props.pgName}</Title>
              </Body>
              <Right>
                {state.state.loggedIn ? (
                  <Button transparent onPress={() => logout(state)}>
                    <Text>Logout</Text>
                  </Button>
                ) : (
                  <Button transparent onPress={() => setOpen(true)}>
                    <Text>Login</Text>
                  </Button>
                )}
                <LoginModal
                  open={open}
                  onClose={() => setOpen(false)}
                  login={(a, b) => state.log(a, b, 'login')}
                />
              </Right>
            </Header>
            {props.segment}
          </React.Fragment>
        )}
      </AppContext.Consumer>
    </React.Fragment>
  );
};

export default TopBar;
