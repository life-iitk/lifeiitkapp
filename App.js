import React, { Component } from 'react';
import { Container, Root } from 'native-base';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import AppFontLoader from './components/utils/appFontLoader';
import Sidebar from './components/shell/sidebar';
import Calendar from './views/calendar';
import Feed from './views/feed';
import Admin from './views/admin';
import Mess from './components/mess/mess';
import Profile from './views/profile';

const pages = {
  Feed: { screen: Feed },
  Calendar: { screen: Calendar },
  Admin: { screen: Admin },
  Mess: { screen: Mess },
  Profile: { screen: Profile }
};

const Drawer = createDrawerNavigator(pages, {
  initialRouteName: 'Feed',
  contentOptions: {
    activeTintColor: '#e91e63'
  },
  contentComponent: props => <Sidebar {...props} />
});

const AppNavigator = createStackNavigator(
  { ...pages, Drawer: { screen: Drawer } },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  state = {
    loggedIn: false,
    details: {}
  };
  render() {
    return (
      <AppFontLoader>
        <Root>
          <Container>
            <AppContainer />
          </Container>
        </Root>
      </AppFontLoader>
    );
  }
}

export default App;
